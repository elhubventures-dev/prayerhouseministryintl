export function getNextDayOfWeek(dayOfWeek: number, hour: number, minute: number): Date {
  const now = new Date()
  const result = new Date(now)
  result.setHours(hour, minute, 0, 0)
  
  // If today is the day and time has passed, or if today is not the day
  if (now.getDay() === dayOfWeek && now.getTime() > result.getTime()) {
    result.setDate(result.getDate() + 7)
  } else {
    result.setDate(result.getDate() + ((dayOfWeek + 7 - now.getDay()) % 7))
  }
  return result
}

export function getLastFridayOfMonth(): Date {
  const now = new Date()
  let year = now.getFullYear()
  let month = now.getMonth()

  // Find last day of current month
  let lastDay = new Date(year, month + 1, 0)
  
  // Subtract days until it's a Friday (5)
  while (lastDay.getDay() !== 5) {
    lastDay.setDate(lastDay.getDate() - 1)
  }
  lastDay.setHours(21, 0, 0, 0) // 9:00 PM

  // If last Friday of this month has already passed, get last Friday of next month
  if (now.getTime() > lastDay.getTime()) {
    lastDay = new Date(year, month + 2, 0)
    while (lastDay.getDay() !== 5) {
      lastDay.setDate(lastDay.getDate() - 1)
    }
    lastDay.setHours(21, 0, 0, 0)
  }

  return lastDay
}

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

export function getDynamicEvents() {
  const bibleStudy = getNextDayOfWeek(3, 18, 0) // Wednesday 6:00 PM
  const choir = getNextDayOfWeek(6, 16, 0) // Saturday 4:00 PM
  const prophetic = getNextDayOfWeek(0, 9, 0) // Sunday 9:00 AM
  const allNight = getLastFridayOfMonth() // Last Friday 9:00 PM

  return [
    {
      id: 'bible-study',
      title: 'Bible Study',
      type: 'Weekly Service',
      dateObj: bibleStudy,
      month: MONTHS[bibleStudy.getMonth()],
      day: String(bibleStudy.getDate()).padStart(2, '0'),
      dates: bibleStudy.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
      time: '6:00 PM',
      location: 'Solution Center',
      description: 'Deep dive into the Scriptures. Build your foundation in the Word of God.',
      image: '/images/phmi-8.jpeg',
      tags: ['Word', 'Study'],
    },
    {
      id: 'choir',
      title: 'Choir Rehearsal',
      type: 'Weekly Practice',
      dateObj: choir,
      month: MONTHS[choir.getMonth()],
      day: String(choir.getDate()).padStart(2, '0'),
      dates: choir.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
      time: '4:00 PM',
      location: 'Solution Center',
      description: "Preparing hearts and voices to usher in God's presence through worship.",
      image: '/images/phmi-15.jpeg',
      tags: ['Worship', 'Music'],
    },
    {
      id: 'prophetic',
      title: 'Prophetic Service',
      type: 'Sunday Service',
      dateObj: prophetic,
      month: MONTHS[prophetic.getMonth()],
      day: String(prophetic.getDate()).padStart(2, '0'),
      dates: prophetic.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
      time: '9:00 AM',
      location: 'Solution Center',
      description: "Experience the prophetic anointing. Receive a fresh word and encounter God's power.",
      image: '/images/phmi-12.jpeg',
      tags: ['Prophetic', 'Sunday'],
    },
    {
      id: 'all-night',
      title: 'All Night Service',
      type: 'Monthly Service',
      dateObj: allNight,
      month: MONTHS[allNight.getMonth()],
      day: String(allNight.getDate()).padStart(2, '0'),
      dates: allNight.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
      time: '9:00 PM',
      location: 'Solution Center',
      description: 'A night of intense intercession, worship, and breakthrough. Come expecting a miracle.',
      image: '/images/phmi-17.png',
      tags: ['Prayer', 'Special'],
    }
  ].sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
}
