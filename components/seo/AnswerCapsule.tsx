type AnswerCapsuleProps = {
  children: React.ReactNode
  heading?: string
}

export default function AnswerCapsule({
  children,
  heading = 'Quick answer',
}: AnswerCapsuleProps) {
  return (
    <section
      id="answer"
      aria-label={heading}
      className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 -mt-6 mb-4"
    >
      <div className="glass-card p-6 md:p-8 border-gold/30">
        <p className="font-montserrat text-[11px] tracking-[0.2em] uppercase text-gold mb-3">
          {heading}
        </p>
        <div className="font-inter text-foreground/90 text-base md:text-lg leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  )
}
