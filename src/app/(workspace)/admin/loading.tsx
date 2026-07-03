export default function AdminLoading() {
  return (
    <div className="flex-1 animate-pulse space-y-6 p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-white/5" />
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="h-64 rounded-2xl bg-white/5 md:col-span-2" />
        <div className="h-64 rounded-2xl bg-white/5" />
      </div>
    </div>
  );
}
