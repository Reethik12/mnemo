export default function DeveloperLoading() {
  return (
    <div className="flex-1 animate-pulse space-y-6 p-8">
      <div className="h-8 w-48 rounded bg-white/5" />
      <div className="mt-2 h-4 w-96 rounded bg-white/5" />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="h-64 rounded-2xl bg-white/5 md:col-span-2" />
        <div className="h-64 rounded-2xl bg-white/5" />
      </div>
    </div>
  );
}
