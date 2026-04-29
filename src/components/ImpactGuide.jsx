import { Users, Scale, Shield } from 'lucide-react';

export const ImpactGuide = () => (
  <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">Guía de Impacto ASG</h2>
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex gap-4">
        <div className="mt-1 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400 shrink-0 h-12 w-12 flex items-center justify-center">
          <Users size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ambiental (Environment)</h3>
          <p className="text-slate-600 dark:text-slate-300">Incluye la Sostenibilidad Ecológica. Evalúa el impacto de la empresa en los ecosistemas, la gestión de residuos, el uso de energías renovables y el diseño de productos bajo principios de economía circular.</p>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex gap-4">
        <div className="mt-1 bg-rose-100 dark:bg-rose-900/30 p-3 rounded-full text-rose-600 dark:text-rose-400 shrink-0 h-12 w-12 flex items-center justify-center">
          <Scale size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Social (Social)</h3>
          <p className="text-slate-600 dark:text-slate-300">Engloba la Dignidad Humana, Solidaridad y Justicia Social. Mide las condiciones laborales, la equidad salarial, la inclusión, la seguridad en el trabajo y el impacto positivo en la comunidad local.</p>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex gap-4">
        <div className="mt-1 bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full text-purple-600 dark:text-purple-400 shrink-0 h-12 w-12 flex items-center justify-center">
          <Shield size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Gobernanza (Governance)</h3>
          <p className="text-slate-600 dark:text-slate-300">Incluye Transparencia y Democracia. Se refiere a la ética empresarial, la participación de los empleados en la toma de decisiones, la lucha contra la corrupción y la responsabilidad fiscal.</p>
        </div>
      </div>
    </div>
  </div>
);
