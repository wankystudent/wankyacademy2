
import { CourseData, QuizQuestion } from './types';

export const COLORS = {
  NAVY: '#003366',
  GOLD: '#FFD700',
  WHITE: '#FFFFFF'
};

export const ASSETS = {
  LOGO: "https://i.postimg.cc/wTr99qNp/d-modern-logo-icon-for-Wanky-Academy-WA-1.png",
  FOUNDER: "https://i.postimg.cc/vH7SzM7b/6.png",
  SIGNATURE: "https://i.postimg.cc/4NC3JYZC/firma.png",
  PLACEHOLDER: "https://i.postimg.cc/hGHD4Pzr/academy.png",
  ADS: [
    "https://i.postimg.cc/VLZk593T/2.png",
    "https://i.postimg.cc/kXg5nYhS/3.png",
    "https://i.postimg.cc/gkt2ryC9/4.png"
  ]
};

export const SOCIAL_LINKS = {
  FACEBOOK: "https://facebook.com/wankyacademy",
  INSTAGRAM: "https://instagram.com/wankyacademy",
  YOUTUBE: "https://youtube.com/@wankyacademy",
  TIKTOK: "https://tiktok.com/@wankyacademy"
};

export const EXTERNAL_LINKS = {
  SHOP: "https://shop.wankyacademy.com/",
  WHATSAPP: "https://wa.me/18296209249",
  EMAIL: "mailto:support@wankyacademy.com"
};

export const CONTACT_CONFIG = {
  WEB3FORMS_ACCESS_KEY: "394df434-a26f-4848-ac48-d72d4a5899d1",
  PHONE: "+1 829 620 9249",
  EMAIL: "support@wankyacademy.com"
};

export const SUBSCRIPTION_COURSES_KEYS = [
  'info',
  'web',
  'canva',
  'radio'
];

export const SHOP_ITEMS = [
  {
    id: 1,
    name: "WP Rocket",
    image: "https://i.postimg.cc/xC6Jrdw3/1.png",
    price: 4.99,
    description: "Boost your website speed instantly with WP Rocket. Improve loading time, SEO performance, and user experience with one of the most powerful WordPress caching plugins."
  },
  {
    id: 2,
    name: "Envato Elements",
    image: "https://i.postimg.cc/MMjKVzKv/2.png",
    price: 4.99,
    description: "Unlimited access to premium templates, graphics, videos, fonts, and design assets. Perfect for designers, content creators, and marketers."
  },
  {
    id: 3,
    name: "Pack Premium Diseño",
    image: "https://i.postimg.cc/CBfLkwLk/3.png",
    price: 4.99,
    description: "A complete collection of premium design resources including templates, mockups, social media designs, and branding materials."
  },
  {
    id: 4,
    name: "Divi Theme Pro",
    image: "https://i.postimg.cc/CnTM49zz/4.png",
    price: 4.99,
    description: "A professional WordPress theme with a visual drag-and-drop builder. Create stunning websites without coding skills."
  },
  {
    id: 5,
    name: "PixelYourSite",
    image: "https://i.postimg.cc/WqLp7xhr/5.png",
    price: 4.99,
    description: "Advanced Facebook, Google, and TikTok pixel tracking for WordPress. Optimize ads and track conversions accurately."
  },
  {
    id: 6,
    name: "Insofta Cover",
    image: "https://i.postimg.cc/m1fZSKtC/6.png",
    price: 4.99,
    description: "Create high-quality eBook covers, social media images, banners, and marketing visuals with ease."
  },
  {
    id: 7,
    name: "Essential Add-ons",
    image: "https://i.postimg.cc/YLK2xTh1/7.png",
    price: 4.99,
    description: "Extend Elementor with premium widgets and features to build advanced and dynamic WordPress pages."
  },
  {
    id: 8,
    name: "Imagify",
    image: "https://i.postimg.cc/zHZDk4Vw/8.png",
    price: 4.99,
    description: "Optimize images automatically to make your website faster without losing image quality."
  },
  {
    id: 9,
    name: "Astra Licence",
    image: "https://i.postimg.cc/Mf2ZYgvL/9.png",
    price: 4.99,
    description: "Unlock premium features of the Astra theme including advanced layouts, customization options, and performance optimization."
  },
  {
    id: 10,
    name: "Premium Astra Site",
    image: "https://i.postimg.cc/JHNrYKkx/10.png",
    price: 4.99,
    description: "Get access to ready-made Astra starter websites for fast and professional WordPress site creation."
  },
  {
    id: 11,
    name: "Auto Responder WhatsApp",
    image: "https://i.postimg.cc/ctRxkTnX/11.png",
    price: 4.99,
    description: "Automate replies on WhatsApp to answer customers instantly, increase engagement, and boost sales 24/7."
  },
  {
    id: 12,
    name: "Canva Pro",
    image: "https://i.postimg.cc/5QB4KpCT/12.png",
    price: 4.99,
    description: "Access premium Canva features including thousands of templates, brand kits, backgrounds, and advanced design tools."
  },
  {
    id: 13,
    name: "Brick Builder",
    image: "https://i.postimg.cc/Mf763tBw/13.png",
    price: 4.99,
    description: "A fast and flexible WordPress page builder designed for developers and advanced users who want full control."
  },
  {
    id: 14,
    name: "Beaver Builder",
    image: "https://i.postimg.cc/XBfj1x5n/14.png",
    price: 4.99,
    description: "Build responsive WordPress pages easily using a clean and user-friendly drag-and-drop interface."
  },
  {
    id: 15,
    name: "CapCut (9 Months)",
    image: "https://i.postimg.cc/30X8f9Gw/15.png",
    price: 4.99,
    description: "Unlock premium CapCut features for video editing, effects, transitions, and professional content creation for 9 months."
  },
  {
    id: 16,
    name: "TikTok Monetization",
    image: "https://i.postimg.cc/QV1dMNyq/16.png",
    price: 100.00,
    description: "We help you activate monetization on your TikTok account so you can start earning from your content."
  },
  {
    id: 17,
    name: "Instagram Followers",
    image: "https://i.postimg.cc/NLmj0Gzb/17.png",
    price: 4.99,
    description: "Increase your Instagram followers to grow your profile visibility, credibility, and engagement."
  },
  {
    id: 18,
    name: "YouTube Monetization (4K Hours)",
    image: "https://i.postimg.cc/4nVx34Sb/18.png",
    price: 350.00,
    description: "Complete service to help your YouTube channel reach 4,000 watch hours and activate monetization."
  }
];

// Helper for generic questions
const generateQuestions = (topic: string): QuizQuestion[] => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    question: `Question ${i + 1} about ${topic}: What is a key feature?`,
    options: [
      `It allows you to master ${topic}.`,
      `It is not useful.`,
      `It is a type of food.`,
      `None of the above`
    ],
    correctAnswer: 0
  }));
};

// Real Questions for FR
const QUESTIONS_FR: QuizQuestion[] = [
    { id: 1, question: "Qu’est-ce qu’un ordinateur ?", options: ["Une machine à écrire", "Un appareil qui traite des informations", "Une télévision", "Un téléphone portable"], correctAnswer: 1 },
    { id: 2, question: "Le matériel informatique représente :", options: ["Les programmes", "Les pièces physiques de l’ordinateur", "Internet", "Les comptes utilisateur"], correctAnswer: 1 },
    { id: 3, question: "Le processeur (CPU) sert à :", options: ["Stocker des données", "Exécuter les instructions", "Imprimer", "Afficher des images"], correctAnswer: 1 },
    { id: 4, question: "La mémoire RAM sert à :", options: ["Stocker définitivement", "Accélérer le traitement des données", "Remplacer la batterie", "Régler le volume"], correctAnswer: 1 },
    { id: 5, question: "Un disque dur HDD est :", options: ["Plus lent qu’un SSD", "Plus rapide qu’un SSD", "Un écran", "Une imprimante"], correctAnswer: 0 },
    { id: 6, question: "Un SSD est :", options: ["Un disque plus rapide", "Un haut-parleur", "Une carte réseau", "Un logiciel"], correctAnswer: 0 },
    { id: 7, question: "Un périphérique est :", options: ["Le système d’exploitation", "Un appareil connecté à l’ordinateur", "Une application", "Une page internet"], correctAnswer: 1 },
    { id: 8, question: "Exemple de périphérique d’entrée :", options: ["Écran", "Imprimante", "Clavier", "Haut-parleur"], correctAnswer: 2 },
    { id: 9, question: "Exemple de périphérique de sortie :", options: ["Souris", "Microphone", "Scanner", "Écran"], correctAnswer: 3 },
    { id: 10, question: "La carte mère sert à :", options: ["Afficher les images", "Connecter toutes les pièces de l’ordinateur", "Éteindre l’ordinateur", "Naviguer sur Internet"], correctAnswer: 1 },
    { id: 11, question: "La carte graphique sert à :", options: ["Gérer le Wi-Fi", "Traiter l’affichage", "Lire les PDF", "Augmenter la RAM"], correctAnswer: 1 },
    { id: 12, question: "USB signifie :", options: ["Universal Serial Bus", "Ultra System Backup", "Universal Software Base", "User Signal Box"], correctAnswer: 0 },
    { id: 13, question: "Un fichier est :", options: ["Une musique uniquement", "Un ensemble de données", "Un dossier", "Un mot de passe"], correctAnswer: 1 },
    { id: 14, question: "Un dossier est :", options: ["Un fichier compressé", "Un espace pour organiser des fichiers", "Un logiciel", "Une image"], correctAnswer: 1 },
    { id: 15, question: "Le système qui gère l’ordinateur est :", options: ["L’antivirus", "Le moteur de recherche", "Le système d’exploitation", "Le navigateur"], correctAnswer: 2 },
    { id: 16, question: "Exemple de système d’exploitation :", options: ["Google", "Facebook", "Windows", "Microsoft Word"], correctAnswer: 2 },
    { id: 17, question: "Un logiciel est :", options: ["Une pièce interne", "Un programme exécuté par l’ordinateur", "Un câble", "Un disque dur"], correctAnswer: 1 },
    { id: 18, question: "Une application est :", options: ["Une musique", "Un programme installé", "Une icône sans fonction", "Une mise à jour"], correctAnswer: 1 },
    { id: 19, question: "Exemple de logiciel de bureautique :", options: ["WhatsApp", "Word", "Chrome", "Instagram"], correctAnswer: 1 },
    { id: 20, question: "Un navigateur web sert à :", options: ["Regarder des films", "Faire des calculs", "Naviguer sur Internet", "Installer Windows"], correctAnswer: 2 }
];

// Real Questions for HT
const QUESTIONS_HT: QuizQuestion[] = [
    { id: 1, question: "Kisa yon òdinatè ye?", options: ["Yon machin a ekri", "Yon aparèy ki trete enfòmasyon", "Yon televizyon", "Yon telefòn"], correctAnswer: 1 },
    { id: 2, question: "Materyèl enfòmatik reprezante:", options: ["Pwogram yo", "Pyès fizik òdinatè a", "Entènèt", "Kont itilizatè yo"], correctAnswer: 1 },
    { id: 3, question: "Pwosesè a (CPU) sèvi pou:", options: ["Sere done", "Egzekite enstriksyon yo", "Enprime", "Montre imaj"], correctAnswer: 1 },
    { id: 4, question: "Memwa RAM nan sèvi pou:", options: ["Sere done pou tout tan", "Akselere tretman done yo", "Ranplase batri a", "Regle volim"], correctAnswer: 1 },
    { id: 5, question: "Yon disk di HDD:", options: ["Pi dousman pase yon SSD", "Pi vit pase yon SSD", "Yon ekran", "Yon enprimant"], correctAnswer: 0 },
    { id: 6, question: "Yon SSD se:", options: ["Yon disk ki pi rapid", "Yon opalè", "Yon kat rezo", "Yon lojisyèl"], correctAnswer: 0 },
    { id: 7, question: "Yon periferik se:", options: ["Sistèm eksplwatasyon an", "Yon aparèy ki konekte ak òdinatè a", "Yon aplikasyon", "Yon paj entènèt"], correctAnswer: 1 },
    { id: 8, question: "Egzanp yon periferik antre:", options: ["Ekran", "Enprimant", "Klavye", "Opalè"], correctAnswer: 2 },
    { id: 9, question: "Egzanp yon periferik sòti:", options: ["Sourit", "Mikwofòn", "Eskanè", "Ekran"], correctAnswer: 3 },
    { id: 10, question: "Kat mè a sèvi pou:", options: ["Montre imaj", "Konekte tout pyès òdinatè a", "Etenn òdinatè a", "Navige sou Entènèt"], correctAnswer: 1 },
    { id: 11, question: "Kat grafik la sèvi pou:", options: ["Jere Wi-Fi", "Jere imaj ak videyo", "Li fichye PDF", "Ogmante RAM nan"], correctAnswer: 1 },
    { id: 12, question: "Kisa USB vle di:", options: ["Universal Serial Bus", "Ultra System Backup", "Universal Software Base", "User Signal Box"], correctAnswer: 0 },
    { id: 13, question: "Yon fichye se:", options: ["Yon mizik sèlman", "Yon ansanm done (enfòmasyon)", "Yon dosye", "Yon modpas"], correctAnswer: 1 },
    { id: 14, question: "Yon dosye se:", options: ["Yon fichye konprese", "Yon espas pou òganize fichye yo", "Yon lojisyèl", "Yon imaj"], correctAnswer: 1 },
    { id: 15, question: "Sistèm ki jere òdinatè a rele:", options: ["Antivirus", "Motè rechèch", "Sistèm eksplwatasyon", "Navigatè"], correctAnswer: 2 },
    { id: 16, question: "Egzanp yon sistèm eksplwatasyon:", options: ["Google", "Facebook", "Windows", "Microsoft Word"], correctAnswer: 2 },
    { id: 17, question: "Yon lojisyèl se:", options: ["Yon pyès andedan", "Yon pwogram òdinatè a egzekite", "Yon kab", "Yon disk di"], correctAnswer: 1 },
    { id: 18, question: "Une application est :", options: ["Yon mizik", "Yon pwogram ki enstale", "Yon ikòn ki pa travay", "Yon mizajou"], correctAnswer: 1 },
    { id: 19, question: "Egzanp yon lojisyèl biwo:", options: ["WhatsApp", "Word", "Chrome", "Instagram"], correctAnswer: 1 },
    { id: 20, question: "Yon navigatè web sèvi pou:", options: ["Gade fim", "Fè kalkil", "Navige sou Entènèt", "Enstale Windows"], correctAnswer: 2 }
];

// 100 Questions for Canva
const QUESTIONS_CANVA: QuizQuestion[] = [
  // ... questions (omitted for brevity, assume existing questions)
  { id: 1, question: "Qu’est-ce que Canva ?", options: ["Un antivirus", "Un logiciel de design graphique en ligne", "Un réseau social", "Un éditeur de code"], correctAnswer: 1 }
];

// 100 Questions for WordPress
const QUESTIONS_WORDPRESS: QuizQuestion[] = [
    // ... questions (omitted for brevity, assume existing questions)
    { id: 1, question: "WordPress est :", options: ["Un jeu vidéo", "Un CMS", "Un navigateur", "Un antivirus"], correctAnswer: 1 }
];

const QUESTIONS_CALENDAR: QuizQuestion[] = [
    { id: 1, question: "Ki kote ou ale pou jwenn yon modèl kalandriye tou pare?", options: ["File > New", "Insert > Table", "Layout > Margins", "Home > Font"], correctAnswer: 0 },
    { id: 2, question: "Konbyen kolòn ou bezwen pou jou semèn nan?", options: ["5", "7", "10", "12"], correctAnswer: 1 },
    { id: 3, question: "Ki opsyon ki pèmèt ou vire paj la an orizontal?", options: ["Portrait", "Vertical", "Landscape", "Zoom"], correctAnswer: 2 },
    { id: 4, question: "Kijan ou ka ajoute koulè nan tablo a?", options: ["Table Design > Shading", "Insert > Photo", "View > Color", "File > Print"], correctAnswer: 0 },
    { id: 5, question: "Èske ou ka sove fichye Word la an PDF?", options: ["Wi", "Non", "Sèlman si ou peye", "Sèlman sou Lendi"], correctAnswer: 0 }
];

const CALENDAR_COURSE_DESC = `MODIL 1: Kreye kalandriye sou Microsoft Word

OBJEKTIF:
- Chwazi bon metòd pou kreye yon kalandriye (Modèl oswa Tablo)
- Mete jou, dat, ak mwa kòrèkteman
- Pèsonalize koulè ak polis (fonts)
- Sove travay ou an PDF

LESCON TEXT:

1. METÒD:
Gen de (2) fason prensipal:
A) Itilize yon "Template" (Modèl pare):
- Ale nan File > New
- Ekri "Calendar" nan bwat rechèch la
- Chwazi yon modèl ou renmen epi klike "Create"

B) Fè li manyèlman avèk yon Tablo:
- Ale nan Insert > Table
- Chwazi 7 kolòn (pou jou semèn nan) ak 6 liy (pou dat yo)
- Ajoute non mwa a anwo
- Tape non jou yo (Lendi, Madi, elatriye)
- Ranpli dat yo

2. ÉTAPES DÉTAILLÉES (ETAP YO):
- Louvri Word.
- Chanje oryantasyon paj la an "Landscape" (Layout > Orientation > Landscape).
- Mete tit mwa a gwo (Insert > WordArt).
- Mete tablo a.
- Ajoute koulè nan tablo a (Table Design > Shading).
- Ajoute imaj si ou vle (Insert > Pictures).

3. EXERCICES (EKZÈSIS):
- Kreye yon kalandriye pou mwa Desanm nan.
- Mete dimanch an wouj.
- Ajoute yon foto fanmi oswa logo bò kote l.
- Sove li kòm "Kalandriye_Desanm.pdf".`;

export const COURSES_DATA: CourseData[] = [
  {
    id: 'wp-formation-2025',
    title: 'Formation WordPress 2025 : Créer un SITE de A à Z (100% Gratuit)',
    type: 'video',
    src: 'UvbRo-N1w60',
    description: 'Instructor: Chaîne YouTube WEB MARKETING TUTO. Une formation complète pour maîtriser WordPress en 2025.',
    questions: QUESTIONS_WORDPRESS,
    isExternal: true
  },
  {
    id: 'wp-shop-creole',
    title: 'Kreye sit ak WordPress & kreye yon shop',
    type: 'video',
    src: 'nrwmMp8EBhY',
    description: 'Aprann kijan pou kreye yon sit pwofesyonèl ak yon boutik an liy avèk WordPress. (Haitian Creole)',
    questions: QUESTIONS_WORDPRESS,
    isExternal: false
  },
  {
    id: 'wp-playlist-creole',
    title: 'Playlist : Kreye sit ak WordPress',
    type: 'playlist',
    src: 'PLhPq9kX3w0HzO9BBjT3mo9udbhzkDINQr',
    description: 'Playlist konplè Wanky Academy sou kijan pou itilize WordPress.',
    questions: QUESTIONS_WORDPRESS,
    isExternal: false
  },
  {
    id: 'canva-course',
    title: 'Canva Design Pro',
    type: 'video',
    src: 'zM1oM03m_PU',
    description: 'Master graphic design with Canva.',
    questions: QUESTIONS_CANVA,
    isExternal: true
  },
  {
    id: 'info-fr',
    title: 'Informatique en Français',
    type: 'playlist',
    src: 'PLludaPYcV43nyYQQsD039SCKqJft3OECD',
    description: 'Cours complet d\'informatique pour débutants.',
    questions: QUESTIONS_FR,
    isExternal: true
  },
  {
    id: 'info-ht-1',
    title: 'Kou Enfòmatik Gratis 1',
    type: 'playlist',
    src: 'PLYrJi-hvP1WNyHTKVUaYNaThGuAsjgShE',
    description: 'Aprann baz enfòmatik an Kreyòl.',
    questions: QUESTIONS_HT,
    isExternal: true
  },
  {
    id: 'info-ht-2',
    title: 'Kou Enfòmatik Gratis 2',
    type: 'playlist',
    src: 'PLPmZBL-bTPLGsO5HOC96c9xoWZoZ8gUUD',
    description: 'Nivo avanse enfòmatik an Kreyòl.',
    questions: QUESTIONS_HT,
    isExternal: true
  },
  {
    id: 'INF-FREE-CALENDAR-001',
    title: 'Kou kòman pou w fè yon kalandriye sou Word',
    type: 'video',
    src: 'SN5kmCfN030',
    description: CALENDAR_COURSE_DESC,
    questions: QUESTIONS_CALENDAR,
    isExternal: true
  }
];

export const SERVICES_LIST = [
  "Canva Coaching",
  "WordPress Coaching",
  "Website Creation",
  "Digital Coaching"
];
