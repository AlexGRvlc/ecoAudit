export const SkeletonLoader = () => (
  <div className="animate-pulse space-y-6 w-full max-w-2xl mx-auto mt-8">
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-8"></div>
    <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-8"></div>
    <div className="space-y-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-16 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>
      ))}
    </div>
  </div>
);
