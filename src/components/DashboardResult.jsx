import { useMemo } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { Download, RefreshCw } from 'lucide-react';
import { QUESTIONS_DATA } from '../data/questions';

export const DashboardResult = ({ answers, onReset }) => {
  // Calculate Scores
  const results = useMemo(() => {
    if (!answers || Object.keys(answers).length === 0) return null;

    // Group "Transparencia" and "Democracia" into one category for standard 5-point radar
    const categories = {
      "Dignidad Humana": { score: 0, max: 0 },
      "Justicia Social": { score: 0, max: 0 },
      "Sost. Ecológica": { score: 0, max: 0 },
      "Solidaridad": { score: 0, max: 0 },
      "Transp. y Democracia": { score: 0, max: 0 }
    };

    QUESTIONS_DATA.forEach(q => {
      const val = answers[q.id] || 0;
      let cat = q.valorEBC;
      if (cat === "Transparencia" || cat === "Democracia") {
        cat = "Transp. y Democracia";
      }
      categories[cat].score += val;
      categories[cat].max += 10;
    });

    let totalScore = 0;
    let totalMax = 0;
    
    const chartData = Object.keys(categories).map(key => {
      totalScore += categories[key].score;
      totalMax += categories[key].max;
      return {
        subject: key,
        A: Math.round((categories[key].score / categories[key].max) * 100),
        fullMark: 100,
      };
    });

    const finalPercentage = Math.round((totalScore / totalMax) * 100);
    
    let grade, colorClass;
    if (finalPercentage < 40) {
      grade = 'Crítico'; colorClass = 'text-red-500 dark:text-red-400';
    } else if (finalPercentage <= 70) {
      grade = 'En Desarrollo'; colorClass = 'text-yellow-500 dark:text-yellow-400';
    } else {
      grade = 'Excelente'; colorClass = 'text-emerald-500 dark:text-emerald-400';
    }

    return { chartData, finalPercentage, grade, colorClass };
  }, [answers]);

  if (!results) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">No hay resultados disponibles</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Debes completar la auditoría primero.</p>
        <button onClick={onReset} className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold">Volver al Inicio</button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 print:max-w-full">
      <div className="flex justify-between items-center mb-8 print:hidden">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Tu Informe ASG</h1>
        <div className="flex gap-3">
          <button onClick={handlePrint} className="flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 font-medium transition-colors">
            <Download size={18} className="mr-2" /> Exportar
          </button>
          <button onClick={onReset} className="flex items-center px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 font-medium transition-colors">
            <RefreshCw size={18} className="mr-2" /> Reiniciar
          </button>
        </div>
      </div>

      {/* Print Header */}
      <div className="hidden print:block mb-8 text-center">
        <h1 className="text-3xl font-bold text-black mb-2">Reporte de Madurez Sostenible (EBC)</h1>
        <p className="text-gray-600">Generado por Eco-Audit App</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Score Card */}
        <div className="md:col-span-1 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col justify-center items-center text-center print:border-gray-300 print:shadow-none">
          <h3 className="text-slate-500 dark:text-slate-400 font-semibold mb-2">Puntuación Global</h3>
          <div className="relative inline-flex items-center justify-center mb-2">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100 dark:text-slate-700" />
              <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent"
                strokeDasharray="351.858"
                strokeDashoffset={351.858 - (351.858 * results.finalPercentage) / 100}
                className={results.colorClass}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-4xl font-extrabold text-slate-800 dark:text-white">{results.finalPercentage}</span>
          </div>
          <span className={`text-lg font-bold px-4 py-1 rounded-full bg-slate-50 dark:bg-slate-900/50 mt-2 ${results.colorClass}`}>
            {results.grade}
          </span>
        </div>

        {/* Radar Chart */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 min-h-[350px] print:border-gray-300 print:shadow-none print:break-inside-avoid">
          <h3 className="text-slate-800 dark:text-slate-200 font-bold mb-4 text-center">Desglose por Valores EBC</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={results.chartData}>
              <PolarGrid stroke="#cbd5e1" className="dark:stroke-slate-600" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} className="dark:text-slate-300" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Puntuación" dataKey="A" stroke="#10b981" strokeWidth={3} fill="#10b981" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800 print:break-inside-avoid">
        <h3 className="text-emerald-800 dark:text-emerald-300 font-bold text-lg mb-2">Resumen Ejecutivo</h3>
        <p className="text-emerald-700 dark:text-emerald-400/80 leading-relaxed text-sm md:text-base">
          Esta auditoría evalúa el nivel de integración de la sostenibilidad en el modelo de negocio. 
          Los resultados superiores al 70% indican una estrategia consolidada en los pilares ASG (Ambiental, Social y Gobernanza), 
          fomentando el Bien Común. Las áreas con menor puntuación en el gráfico radial indican oportunidades estratégicas para futuras políticas corporativas.
        </p>
      </div>
    </div>
  );
};
