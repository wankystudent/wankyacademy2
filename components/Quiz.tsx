
import React, { useState, useEffect } from 'react';
import { QuizQuestion, User, QuizHistoryItem } from '../types';
import { COLORS } from '../constants';
import { CheckCircle, XCircle, RefreshCcw, ArrowRight, Info, ChevronLeft, ChevronRight, Send } from 'lucide-react';

interface Props {
  questions: QuizQuestion[];
  courseId: string;
  courseTitle?: string;
  onComplete: (score: number) => void;
  lang: string;
  quizType?: 'MCQ' | 'TrueFalse' | 'Static';
}

const Quiz: React.FC<Props> = ({ questions, courseId, courseTitle, onComplete, lang, quizType = 'Static' }) => {
  const [current, setCurrent] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Labels pour la navigation
  const navLabels: Record<string, { prev: string; next: string; finish: string }> = {
    fr: { prev: "Précédent", next: "Suivant", finish: "Terminer le Quiz" },
    es: { prev: "Anterior", next: "Siguiente", finish: "Finalizar Quiz" },
    ht: { prev: "Precedan", next: "Pwochèn", finish: "Fini Quiz la" },
    en: { prev: "Previous", next: "Next", finish: "Finish Quiz" }
  };

  const labels = navLabels[lang] || navLabels.en;

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('wa_logged_user');
      if (userStr) {
        const user: User = JSON.parse(userStr);
        user.lastActiveCourse = courseId;
        localStorage.setItem('wa_logged_user', JSON.stringify(user));
      }
    } catch (e) {}
  }, [courseId]);

  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [current]: optionIndex
    }));
    
    // Auto-advance logic could be here, but standard navigation is preferred for review
  };

  const goToNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const goToPrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const finishQuiz = () => {
    if (!questions || questions.length === 0) return;

    let correctCount = 0;
    // Calcul du score basé sur les clés de l'objet userAnswers
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });
    
    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScore(finalScore);
    setFinished(true);
    onComplete(finalScore);

    try {
      const historyItem: QuizHistoryItem = {
        lesson_id: courseId,
        course_title: courseTitle || courseId,
        score: correctCount,
        total: questions.length,
        date: new Date().toISOString(),
        type: (quizType as any) || 'Static'
      };
      
      const rawHistory = localStorage.getItem('wanky_quiz_history');
      const history = rawHistory ? JSON.parse(rawHistory) : [];
      if (Array.isArray(history)) {
        history.push(historyItem);
        localStorage.setItem('wanky_quiz_history', JSON.stringify(history));
      }

      const userStr = localStorage.getItem('wa_logged_user');
      if (userStr) {
        const user: User = JSON.parse(userStr);
        if (!user.quizScores) user.quizScores = {};
        
        if (!user.quizScores[courseId] || finalScore > user.quizScores[courseId]) {
            user.quizScores[courseId] = finalScore;
        }
        
        user.lastActiveCourse = courseId; 
        
        if (!user.courses) user.courses = [];
        if (finalScore >= 70 && !user.courses.includes(courseId)) {
          user.courses.push(courseId);
        }

        localStorage.setItem('wa_logged_user', JSON.stringify(user));
        localStorage.setItem('WA_SESSION', JSON.stringify(user));
      }
    } catch (e) {
      console.error("Error saving quiz results", e);
    }
  };

  const retryQuiz = () => {
    setCurrent(0);
    setUserAnswers({});
    setFinished(false);
    setScore(0);
  };

  if (!questions || questions.length === 0) {
    return <div className="text-center p-8 bg-white rounded-xl shadow">No questions available for this course.</div>;
  }

  if (finished) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg border-t-4" style={{ borderColor: COLORS.NAVY }}>
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-2 text-gray-900">Quiz Results</h3>
          <div className="text-6xl font-bold mb-4 transition-all scale-110" style={{ color: score >= 70 ? '#10B981' : COLORS.GOLD }}>
            {score}%
          </div>
          <p className="text-gray-600 mb-6 text-lg">
            You answered <span className="font-bold text-gray-900">{Math.round((score / 100) * questions.length)}</span> out of <span className="font-bold text-gray-900">{questions.length}</span> correctly.
          </p>
          
          <button 
            onClick={retryQuiz} 
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#003366] text-white rounded-full font-bold hover:bg-[#002244] transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <RefreshCcw className="w-5 h-5" /> Try Again
          </button>
        </div>

        <div className="space-y-8">
          <h4 className="text-2xl font-bold text-[#003366] border-b pb-4">Detailed Corrections</h4>
          {questions.map((q, idx) => {
            const userAnswer = userAnswers[idx];
            const isCorrect = userAnswer === q.correctAnswer;
            
            return (
              <div key={q.id || idx} className={`p-6 rounded-xl border-2 ${isCorrect ? 'border-green-100 bg-green-50/50' : 'border-red-100 bg-red-50/50'}`}>
                <div className="flex items-start gap-4">
                  <div className={`mt-1 p-2 rounded-full shrink-0 ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                     {isCorrect ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  </div>
                  
                  <div className="w-full">
                    <p className="font-bold text-gray-900 mb-4 text-lg">{idx + 1}. {q.question}</p>
                    
                    <div className="space-y-2 mb-4">
                      {q.options?.map((opt, optIdx) => {
                        let style = "flex items-center p-3 rounded-lg border text-sm font-medium transition-colors ";
                        let icon = null;

                        if (optIdx === q.correctAnswer) {
                            style += "bg-green-100 border-green-300 text-green-900 ring-1 ring-green-300";
                            icon = <CheckCircle className="w-4 h-4 mr-2 text-green-600" />;
                        } else if (optIdx === userAnswer && !isCorrect) {
                            style += "bg-red-100 border-red-300 text-red-900 opacity-80";
                            icon = <XCircle className="w-4 h-4 mr-2 text-red-600" />;
                        } else {
                            style += "bg-white border-gray-200 text-gray-500 opacity-60";
                        }
                        
                        return (
                          <div key={optIdx} className={style}>
                            {icon}
                            <span className="font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                            {opt}
                          </div>
                        );
                      })}
                    </div>

                    {!isCorrect && q.options && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-green-700 bg-green-100 p-3 rounded-lg border border-green-200 mb-4">
                            <ArrowRight className="w-4 h-4" />
                            <span className="font-bold">Correct Answer:</span> {q.options[q.correctAnswer]}
                        </div>
                    )}

                    {q.explanation && (
                      <div className="flex items-start gap-2 bg-[#003366]/5 p-4 rounded-lg border border-[#003366]/10 text-gray-700 text-sm">
                        <Info className="w-5 h-5 text-[#003366] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-[#003366] mb-1">Explanation:</p>
                          <p>{q.explanation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const q = questions[current];
  const isLastQuestion = current === questions.length - 1;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto border" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
      <div className="flex justify-between mb-4 text-sm font-medium text-gray-500">
        <span>Question {current + 1} / {questions.length}</span>
        <span>{Math.round(((Object.keys(userAnswers).length) / questions.length) * 100)}% Progress</span>
      </div>
      
      <div className="h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full transition-all duration-500 ease-out" 
          style={{ width: `${((current + 1) / questions.length) * 100}%`, backgroundColor: COLORS.NAVY }}
        ></div>
      </div>

      <h3 className="text-xl md:text-2xl font-bold mb-8 text-gray-800 leading-relaxed">{q.question}</h3>
      
      <div className="space-y-3">
        {q.options?.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectOption(idx)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center group ${
              userAnswers[current] === idx 
              ? 'border-[#003366] bg-blue-50' 
              : 'border-transparent bg-gray-50 hover:bg-blue-50 hover:border-blue-200'
            }`}
          >
            <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold transition-colors ${
              userAnswers[current] === idx 
              ? 'bg-[#003366] text-white' 
              : 'bg-white text-gray-600 border shadow-sm group-hover:border-blue-300'
            }`}>
              {String.fromCharCode(65 + idx)}
            </span>
            <span className={`font-medium ${userAnswers[current] === idx ? 'text-[#003366]' : 'text-gray-700 group-hover:text-gray-900'}`}>
              {opt}
            </span>
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
        <button
          onClick={goToPrev}
          disabled={current === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-all active:scale-95"
        >
          <ChevronLeft size={20} /> {labels.prev}
        </button>

        {isLastQuestion ? (
          <button
            onClick={finishQuiz}
            disabled={Object.keys(userAnswers).length < questions.length}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 transition-all shadow-lg active:scale-95"
          >
            {labels.finish} <Send size={20} />
          </button>
        ) : (
          <button
            onClick={goToNext}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-[#003366] hover:bg-[#002244] transition-all shadow-lg active:scale-95"
          >
            {labels.next} <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
