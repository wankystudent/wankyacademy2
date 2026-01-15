
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Loader2, BrainCircuit, Languages } from 'lucide-react';
import { QuizQuestion, TranslationDictionary, Language } from '../types';

interface Props {
  courseTitle: string;
  courseDescription: string;
  lang: Language;
  onQuizGenerated: (questions: QuizQuestion[], type: 'MCQ' | 'TrueFalse') => void;
  t: TranslationDictionary['quiz_generator'];
}

const AIQuizGenerator: React.FC<Props> = ({ courseTitle, onQuizGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const generateQuiz = async (retries = 2) => {
    setLoading(true);
    setError(false);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // EXACT PROMPT TEMPLATE from instructions
      const prompt = `You are an educational quiz generator for Wanky Academy.

IMPORTANT RULE:
You MUST generate the quiz strictly in FRENCH.

Do NOT use English or Spanish.

Generate 10 multiple-choice questions based on the following course:

${courseTitle}

Rules:
- Each question must be in French
- Provide 4 options (A, B, C, D)
- Only one correct answer
- Provide a detailed explanation in French
- Use clear academic language suitable for beginners

Return ONLY valid JSON in this exact format:

{
  "quiz": [
    {
      "question": "...",
      "options": {
        "A": "...",
        "B": "...",
        "C": "...",
        "D": "..."
      },
      "correct": "A",
      "explanation": "..."
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      const text = response.text || "{}";
      const rawData = JSON.parse(text);
      
      if (!rawData.quiz || !Array.isArray(rawData.quiz)) {
        throw new Error("Invalid response structure from AI");
      }

      // SAFETY CHECK: Verify language is French
      const firstQ = rawData.quiz[0].question.toLowerCase();
      const frenchMarkers = ["est", "le ", "la ", "les ", "que ", "qui ", "une ", "dans ", "pour ", "avec "];
      const isFrench = frenchMarkers.some(marker => firstQ.includes(marker));

      if (!isFrench && retries > 0) {
        console.warn("AI response was not in French. Retrying automatically...");
        return generateQuiz(retries - 1);
      }

      // Map from Gemini format to existing app QuizQuestion type
      const letterToIndex: Record<string, number> = { "A": 0, "B": 1, "C": 2, "D": 3 };
      
      const questions: QuizQuestion[] = rawData.quiz.map((item: any, index: number) => ({
        id: index,
        question: item.question || "Question sans titre",
        options: [
          item.options.A || "Option A",
          item.options.B || "Option B",
          item.options.C || "Option C",
          item.options.D || "Option D"
        ],
        correctAnswer: letterToIndex[item.correct] ?? 0,
        explanation: item.explanation || "Pas d'explication disponible."
      }));

      if (questions.length > 0) {
        // Callback with generated questions, forcing MCQ type
        onQuizGenerated(questions, 'MCQ');
      } else {
        throw new Error("No questions found in AI response");
      }
    } catch (err) {
      console.error("Gemini Quiz Generation Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 my-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#003366] rounded-bl-full opacity-5"></div>
      <div className="relative z-10 text-center">
         <div className="inline-flex items-center justify-center p-4 bg-blue-50 text-[#003366] rounded-2xl mb-4">
            <BrainCircuit size={32} />
         </div>
         <h3 className="text-2xl font-bold text-[#003366] mb-2">Quiz Instantané (Français)</h3>
         <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Générez un quiz de 10 questions en français basé sur ce cours pour valider vos acquis et obtenir votre certificat.
         </p>

         {error && (
             <div className="mb-6 bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-bold border border-red-100">
                 Une erreur est survenue. Veuillez vérifier votre connexion et réessayer la génération en français.
             </div>
         )}

         {loading ? (
             <div className="flex flex-col items-center justify-center py-4">
                 <Loader2 className="w-10 h-10 text-[#003366] animate-spin mb-3" />
                 <p className="text-[#003366] font-bold animate-pulse">Génération du quiz en français par l'IA...</p>
             </div>
         ) : (
             <button 
               onClick={() => generateQuiz()}
               className="flex items-center justify-center gap-3 px-10 py-5 bg-[#003366] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#002244] transition-all shadow-xl hover:shadow-2xl active:scale-95 group"
             >
                <Languages size={22} className="group-hover:rotate-12 transition-transform" /> 
                Générer 10 Questions (MCQ)
             </button>
         )}
         
         <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Langue forcée : Français
         </div>
      </div>
    </div>
  );
};

export default AIQuizGenerator;
