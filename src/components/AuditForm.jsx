import { useEffect, useState } from 'react';
import { BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { QUESTIONS_DATA } from '../data/questions';
import { SCORING_OPTIONS } from '../data/scoringOptions';
import { SkeletonLoader } from './SkeletonLoader';

export const AuditForm = ({ onComplete, existingAnswers }) => {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(existingAnswers || {});
  const [showJustification, setShowJustification] = useState(false);

  useEffect(() => {
    // Simulate Skeleton load for UX professionalism
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectOption = (points) => {
    setAnswers(prev => ({ ...prev, [QUESTIONS_DATA[currentIndex].id]: points }));
    setShowJustification(true);
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS_DATA.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowJustification(false);
    } else {
      onComplete(answers);
    }
  };

  if (loading) return <SkeletonLoader />;

  const question = QUESTIONS_DATA[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS_DATA.length) * 100;
  const currentAnswer = answers[question.id];
  const isAnswered = currentAnswer !== undefined;

  return (
    <div className="max-w-2xl mx-auto w-full animate-in fade-in duration-500">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
          <span>Pregunta {currentIndex + 1} de {QUESTIONS_DATA.length}</span>
          <span>{Math.round(progress)}% Completado</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          <div 
            className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 transition-colors">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
          {question.categoria} • {question.grupo}
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          {question.pregunta}
        </h2>

        <div className="space-y-3 mb-8">
          {SCORING_OPTIONS.map((opt) => {
            const isSelected = currentAnswer === opt.points;
            return (
              <button
                key={opt.points}
                onClick={() => handleSelectOption(opt.points)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between group
                  ${isSelected 
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-md' 
                    : 'border-slate-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                aria-pressed={isSelected}
              >
                <div>
                  <span className={`block font-bold ${isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200'}`}>
                    {opt.label}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 mt-1 sm:mt-0 block">
                    {opt.desc}
                  </span>
                </div>
                {isSelected && <CheckCircle2 className="text-emerald-500 mt-2 sm:mt-0 hidden sm:block animate-in zoom-in" />}
              </button>
            );
          })}
        </div>

        {/* Justification Feedback */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showJustification ? 'max-h-40 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 flex items-start">
            <BookOpen className="text-emerald-500 mr-3 shrink-0" size={18} />
            <p><strong>Criterio Técnico:</strong> {question.justificacion} <br/><span className="text-xs opacity-70 mt-1 block">Asociado al valor: {question.valorEBC}</span></p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className={`flex items-center px-6 py-3 rounded-xl font-bold transition-all duration-200
              ${isAnswered 
                ? 'bg-slate-900 dark:bg-emerald-600 text-white hover:shadow-lg hover:-translate-y-0.5' 
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'}`}
          >
            {currentIndex === QUESTIONS_DATA.length - 1 ? 'Finalizar y ver Resultados' : 'Siguiente Pregunta'}
            {currentIndex !== QUESTIONS_DATA.length - 1 && <ArrowRight className="ml-2" size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};
