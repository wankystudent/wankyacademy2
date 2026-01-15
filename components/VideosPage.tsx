
import React, { useEffect, useState, useMemo } from 'react';
import { Loader2, Play, ExternalLink, Youtube, X, AlertTriangle, AlertCircle } from 'lucide-react';
import { TranslationDictionary, Language } from '../types';
import { ASSETS } from '../constants';

interface VideoItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: { url: string };
      high: { url: string };
      maxres?: { url: string };
    };
    resourceId: {
      videoId: string;
    };
    publishedAt: string;
  };
}

interface Props {
  t: TranslationDictionary;
  lang: Language;
}

const PLAYLIST_ID = "PLhPq9kX3w0HzODWOWaDxIeVcIi91xyUxL";
const OFFICIAL_EXEMPT_PLAYLIST_ID = "PLhPq9kX3w0HzO9BBjT3mo9udbhzkDINQr";
const API_KEY = process.env.YOUTUBE_API_KEY || "AIzaSyCn2W7BL-GzpTJo1D79I059Ey0m0vu754s";
const CACHE_KEY = 'wanky_playlist_cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

const VideosPage: React.FC<Props> = ({ t, lang }) => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Fix: Cast to string to resolve TypeScript error regarding comparison of non-overlapping literal types
  const isOfficialExempt = useMemo(() => (PLAYLIST_ID as string) === OFFICIAL_EXEMPT_PLAYLIST_ID, []);

  useEffect(() => {
    const fetchVideos = async () => {
      // 1. Check Cache
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const { timestamp, data } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setVideos(data);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error("Cache parsing error", e);
          localStorage.removeItem(CACHE_KEY);
        }
      }

      // 2. Fetch from API
      if (!API_KEY) {
        console.warn("YOUTUBE_API_KEY is missing.");
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=24&playlistId=${PLAYLIST_ID}&key=${API_KEY}`
        );
        
        if (!response.ok) {
           throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        const items = data.items || [];
        
        setVideos(items);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: items }));
        setError(false);
      } catch (err) {
        console.error("YouTube API Error:", err);
        setError(true); // Trigger fallback
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const openModal = (videoId: string) => {
    setSelectedVideo(videoId);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'unset';
  };

  const DisclaimerBanner = () => (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 flex items-start gap-3 shadow-sm mb-4">
      <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
      <p className="text-sm text-yellow-800 font-medium leading-relaxed">
        ⚠️ Cette vidéo provient d’une source externe. Wanky Academy n’est pas le propriétaire du contenu.<br/>
        La vidéo est utilisée uniquement à des fins éducatives.
      </p>
    </div>
  );

  return (
    <div className="pt-24 pb-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
           <h1 className="text-4xl font-bold text-[#003366] mb-4 flex items-center justify-center gap-3">
             <Youtube className="w-10 h-10 text-red-600" />
             {t.nav.videos}
           </h1>
           <p className="text-gray-600 max-w-2xl mx-auto">
             Watch the latest tutorials directly from the Wanky Academy YouTube channel.
           </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-[#003366] animate-spin" />
          </div>
        ) : error ? (
          // Fallback UI
          <div className="max-w-4xl mx-auto">
             <div className="bg-white p-6 rounded-xl shadow-lg border border-yellow-100 mb-8 text-center">
                <p className="text-gray-600 mb-4 flex items-center justify-center gap-2">
                   <AlertCircle className="w-5 h-5 text-[#FFD700]" />
                   Unable to load dynamic grid. Showing playlist directly.
                </p>
                {!isOfficialExempt && <DisclaimerBanner />}
                <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl bg-black">
                   <iframe 
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/videoseries?list=${PLAYLIST_ID}`}
                      title="Wanky Academy Playlist"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                   ></iframe>
                </div>
                <div className="mt-6">
                    <a 
                      href={`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#003366] text-white px-6 py-2 rounded-full font-bold hover:bg-[#002244] transition"
                    >
                      View Full Playlist on YouTube <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
             </div>
          </div>
        ) : (
          // Video Grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((item) => {
              const { title, description, thumbnails, resourceId, publishedAt } = item.snippet;
              if (title === 'Private video') return null;

              const date = new Date(publishedAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
              const thumbUrl = thumbnails.maxres?.url || thumbnails.high?.url || thumbnails.medium?.url || ASSETS.PLACEHOLDER;

              return (
                <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-[#FFD700] transition group flex flex-col h-full">
                  <div className="aspect-video bg-gray-200 relative overflow-hidden group cursor-pointer" onClick={() => openModal(resourceId.videoId)}>
                    <img 
                      src={thumbUrl} 
                      alt={title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                      onError={(e) => e.currentTarget.src = ASSETS.PLACEHOLDER}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                       <button className="bg-[#FFD700] text-[#003366] px-6 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition shadow-lg hover:scale-105">
                          <Play className="w-4 h-4 fill-current" /> Play Video
                       </button>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs text-gray-500 mb-2 font-medium">{date}</div>
                    <h3 className="text-lg font-bold text-[#003366] mb-3 line-clamp-2 leading-tight" title={title}>
                      {title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
                      {description}
                    </p>
                    <button 
                      onClick={() => openModal(resourceId.videoId)}
                      className="text-[#003366] font-bold text-sm hover:text-[#FFD700] transition-colors flex items-center gap-1 mt-auto self-start"
                    >
                      Watch Now <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            
            {/* Disclaimer check for individual videos in modal */}
            {!isOfficialExempt && <DisclaimerBanner />}
            
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-[#FFD700] hover:text-black transition"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo}?autoplay=1`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideosPage;
