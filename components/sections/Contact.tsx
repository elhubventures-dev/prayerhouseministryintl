'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react'
import { staggerContainer, fadeUp, fadeLeft, fadeRight } from '@/lib/animations'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', isPrayer: false })
  const [submitted, setSubmitted] = useState(false)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-background-alt overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(201,168,76,0.07)_0%,transparent_60%)] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">Get In Touch</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            Contact <span className="text-gold-gradient">Us</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="gold-divider" />
          <motion.p variants={fadeUp} className="font-inter text-muted-foreground max-w-lg mx-auto">
            We'd love to hear from you. Reach out for prayer, information, or to connect with our team.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8 lg:p-10 relative">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent rounded-t-2xl" />

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-montserrat text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Full Name *</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-montserrat text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Email *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-montserrat text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Phone (optional)</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+237 6XX XXX XXX"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-montserrat text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Subject *</label>
                      <input
                        required
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="How can we help?"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-montserrat text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Message *</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      placeholder="Write your message here..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gold/5 border border-gold/15 rounded-lg">
                    <input
                      type="checkbox"
                      id="prayerCheck"
                      checked={form.isPrayer}
                      onChange={(e) => setForm({ ...form, isPrayer: e.target.checked })}
                      className="w-4 h-4 accent-gold"
                    />
                    <label htmlFor="prayerCheck" className="font-inter text-muted-foreground text-sm cursor-pointer">
                      🙏 This is a prayer request — please forward to the prayer team
                    </label>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="btn-gold w-full flex items-center justify-center gap-2 text-sm font-semibold"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-gold" />
                  </div>
                  <h4 className="font-cinzel text-xl text-foreground font-bold mb-3">Message Sent!</h4>
                  <p className="font-inter text-muted-foreground text-sm leading-relaxed mb-6">
                    Thank you for reaching out to us. Our team will respond to your message within 24–48 hours.
                    God bless you!
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-glass text-sm px-8">
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Info cards */}
            {[
              {
                icon: MapPin,
                label: 'Visit Us',
                value: 'Opposite Wotutu Okada Park, Mile 4 Limbe, Cameroon',
                href: 'https://maps.google.com/?q=Mile+4+Limbe+Cameroon',
              },
              {
                icon: Phone,
                label: 'Call Us',
                value: '653 270 752',
                href: 'tel:+237653270752',
              },
              {
                icon: Mail,
                label: 'Email Us',
                value: 'info@prayerhouseministryintl.org',
                href: 'mailto:info@prayerhouseministryintl.org',
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} target={label === 'Visit Us' ? '_blank' : undefined} rel="noopener noreferrer"
                className="glass-card p-6 flex items-start gap-4 group hover:border-gold/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-montserrat text-xs text-gold uppercase tracking-wider mb-1">{label}</p>
                  <p className="font-inter text-muted-foreground text-sm leading-relaxed">{value}</p>
                </div>
              </a>
            ))}

            {/* WhatsApp */}
            <a
              href="https://wa.me/237653270752?text=Hello%20Solution%20Center%2C%20I%20would%20like%20to%20connect."
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 flex items-center gap-4 border-[#25D366]/20 hover:border-[#25D366]/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p className="font-montserrat text-xs text-[#25D366] uppercase tracking-wider mb-1">WhatsApp</p>
                <p className="font-inter text-muted-foreground text-sm">Chat with us on WhatsApp</p>
              </div>
            </a>

            {/* Map embed */}
            <div className="glass-card overflow-hidden rounded-2xl flex-1 min-h-[200px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8!2d9.2!3d4.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMDAnMDAuMCJOIDnCsDEyJzAwLjAiRQ!5e0!3m2!1sen!2scm!4v1"
                width="100%"
                height="200"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Prayer House Ministry International Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
