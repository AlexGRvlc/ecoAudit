import React, { useState, useEffect } from 'react';
import { 
  Home, ClipboardList, BarChart2, BookOpen, Sun, Moon, Menu, X, Leaf 
} from 'lucide-react';

// Importación de componentes externos[cite: 5, 6, 7, 8]
import { Hero } from './components/Hero';
import { AuditForm } from './components/AuditForm';
import { DashboardResult } from './components/DashboardResult';
import { ImpactGuide } from './components/ImpactGuide';

// Importación del hook personalizado[cite: 4]
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Usamos el hook centralizado[cite: 1, 4]
  const [isDarkMode, setIsDarkMode] = useLocalStorage('ecoAudit-theme', false);
  const [savedAnswers, setSavedAnswers] = useLocalStorage('ecoAudit-answers', {});

  // Sincronización con el DOM para el modo oscuro
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const hasResults = Object.keys(savedAnswers).length > 0;

  const navigateTo = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  const handleCompleteAudit = (answers) => {
    setSavedAnswers(answers);
    setCurrentView('results');
  };

  const handleReset = () => {
    if (window.confirm('¿Seguro que quieres borrar tus resultados actuales?')) {
      setSavedAnswers({});
      setCurrentView('home');
    }
  };

  const NAV_ITEMS = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'audit', label: 'Realizar Test', icon: ClipboardList },
    { id: 'results', label: 'Mis Resultados', icon: BarChart2, disabled: !hasResults },
    { id: 'guide', label: 'Guía de Impacto', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 flex flex-col md:flex-row overflow-x-hidden">
      
      {/* Estilos para impresión */}
      <style>{`
        @media print {
          body { background-color: white !important; color: black !important; }
          .dark { background-color: white !important; color: black !important; }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
          @page { margin: 1cm; }
        }
      `}</style>

      {/* Header Móvil[cite: 1] */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 print:hidden">
        <div className="flex items-center font-bold text-xl text-emerald-600 dark:text-emerald-400">
          <Leaf className="mr-2" size={24} /> Eco-Audit
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-slate-500 dark:text-slate-400">
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-800 dark:text-slate-200">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Sidebar Desktop[cite: 1] */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:flex-shrink-0 flex flex-col print:hidden
        ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <div className="hidden md:flex p-6 items-center font-extrabold text-2xl text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-slate-700/50">
          <Leaf className="mr-3" size={28} /> Eco-Audit
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                disabled={item.disabled}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 font-medium 
                  ${item.disabled 
                    ? 'opacity-50 cursor-not-allowed text-slate-400 dark:text-slate-600' 
                    : isActive 
                      ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 shadow-sm' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200'}`}
              >
                <Icon size={20} className={`mr-3 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-700/50">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="hidden md:flex w-full items-center justify-center px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-medium"
          >
            {isDarkMode ? <><Sun size={18} className="mr-2" /> Modo Claro</> : <><Moon size={18} className="mr-2" /> Modo Oscuro</>}
          </button>
        </div>
      </aside>

      {/* Área de Contenido Principal[cite: 1] */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto print:h-auto print:overflow-visible">
        <div className="flex-1 p-6 md:p-10 lg:p-16 max-w-7xl mx-auto w-full">
          {currentView === 'home' && <Hero onStart={() => navigateTo('audit')} />}
          {currentView === 'audit' && <AuditForm onComplete={handleCompleteAudit} existingAnswers={savedAnswers} />}
          {currentView === 'results' && <DashboardResult answers={savedAnswers} onReset={handleReset} />}
          {currentView === 'guide' && <ImpactGuide />}
        </div>

        <footer className="py-6 text-center text-slate-500 dark:text-slate-400 text-sm border-t border-slate-200 dark:border-slate-800 print:hidden mt-auto">
          <p>
            Basado en los principios de la <a href="https://www.ecogood.org/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">Economía del Bien Común (EBC)</a>
          </p>
        </footer>
      </main>

      {/* Overlay para móvil[cite: 1] */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </div>
  );
}