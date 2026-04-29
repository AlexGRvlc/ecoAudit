import { Leaf, ArrowRight } from 'lucide-react';

export const Hero = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="inline-block p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-6">
      <Leaf size={48} strokeWidth={1.5} />
    </div>
    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
      Mide tu Madurez en <br/>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
        Sostenibilidad ASG
      </span>
    </h1>
    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mb-10 leading-relaxed">
      Eco-Audit te ayuda a evaluar el impacto real de tu organización basándose en la <strong>Matriz del Bien Común (EBC)</strong>. Descubre tus fortalezas y áreas de mejora en minutos.
    </p>
    <button 
      onClick={onStart}
      className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-slate-900 dark:bg-emerald-600 font-pj rounded-xl hover:bg-slate-800 dark:hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 shadow-lg hover:shadow-xl hover:-translate-y-1"
      aria-label="Iniciar Auditoría"
    >
      Iniciar Auditoría
      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
    </button>
  </div>
);
