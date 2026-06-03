'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetDate: Date
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(targetDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ]

  return (
    <div className="flex items-center gap-2">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div className="bg-background-alt border border-gold/30 rounded-lg px-3 py-2 min-w-[52px] text-center">
              <span className="font-cinzel text-xl font-bold text-gold">
                {String(unit.value).padStart(2, '0')}
              </span>
            </div>
            <span className="font-montserrat text-[9px] text-muted-foreground uppercase tracking-wider mt-1">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="font-cinzel text-xl text-gold/60 mb-4">:</span>
          )}
        </div>
      ))}
    </div>
  )
}
