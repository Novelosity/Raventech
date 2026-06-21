export default function ServiceLoading() {
  return (
    <div className="fixed inset-0 bg-void flex flex-col items-center justify-center z-[9999]">
      <div className="relative">
        {/* Pulsing ring */}
        <div className="w-16 h-16 rounded-full border border-violet/30 animate-ping absolute inset-0" />
        <div className="w-16 h-16 rounded-full border border-violet/60 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet to-cyan animate-pulse" />
        </div>
      </div>
      <p className="mt-8 text-xs font-display tracking-[0.4em] uppercase text-white/25">
        RAVENTECH
      </p>
    </div>
  );
}
