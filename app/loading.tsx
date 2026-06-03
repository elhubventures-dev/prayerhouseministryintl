export default function Loading() {
  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated cross */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-gold/20 animate-ping" />
          <div className="absolute inset-0 rounded-full border-2 border-gold/40 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-cinzel text-2xl text-gold animate-pulse">✝</span>
          </div>
        </div>
        <div className="text-center">
          <p className="font-cinzel text-gold text-sm tracking-widest uppercase animate-pulse">
            Solution Center
          </p>
          <p className="font-inter text-silver/40 text-xs mt-1">Loading...</p>
        </div>
      </div>
    </div>
  )
}
