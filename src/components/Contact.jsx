import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaEnvelope, FaLocationDot, FaPhone } from 'react-icons/fa6'
import { FiSend } from 'react-icons/fi'

function Contact() {
  const [copied, setCopied] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const directEmail = 'pandey.pitambar@gmail.com'

  const copy = async (value, key) => {
    await navigator.clipboard.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied(''), 1400)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const subject = `Portfolio message from ${form.name || 'someone'}`
    const body = [
      `Name: ${form.name || ''}`,
      `Email: ${form.email || ''}`,
      '',
      form.message || '',
    ].join('\n')

    const mailto = `mailto:${directEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
  }

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <p className="mb-3 text-center font-mono text-xs text-indigo-600 dark:text-indigo-300">[ contact.jsx ]</p>
      <h2 className="text-center text-4xl font-extrabold tracking-tight md:text-5xl">Get In Touch</h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-zinc-600 dark:text-zinc-400">
        Ready to start a project or just want to chat? I&apos;d love to hear from you.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-lightCard/70 p-7 shadow-lg backdrop-blur dark:border-white/10 dark:bg-darkCard/70">
          <h3 className="text-xl font-bold">Let&apos;s Connect</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            I&apos;m always open to discussing new opportunities, interesting projects, or just having a friendly chat
            about technology and development.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-sm font-semibold">Email</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{directEmail}</p>
                  <button
                    onClick={() => copy(directEmail, 'email')}
                    className="rounded-md border border-black/10 px-2 py-0.5 text-[11px] text-zinc-600 hover:bg-black/5 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
                    type="button"
                  >
                    {copied === 'email' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                <FaPhone />
              </div>
              <div>
                <p className="text-sm font-semibold">Phone</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">+1 (920) 217-9139</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                <FaLocationDot />
              </div>
              <div>
                <p className="text-sm font-semibold">Location</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Green Bay, WI</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-lightCard/70 p-7 shadow-lg backdrop-blur dark:border-white/10 dark:bg-darkCard/70">
          <h3 className="text-xl font-bold">Send Message</h3>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">Name</label>
              <input
                className="mt-2 w-full rounded-lg border border-black/10 bg-white/60 px-4 py-3 text-sm outline-none ring-indigo-500/30 focus:ring-4 dark:border-white/10 dark:bg-black/30"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">Email</label>
              <input
                className="mt-2 w-full rounded-lg border border-black/10 bg-white/60 px-4 py-3 text-sm outline-none ring-indigo-500/30 focus:ring-4 dark:border-white/10 dark:bg-black/30"
                placeholder="your.email@example.com"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">Message</label>
              <textarea
                className="mt-2 w-full rounded-lg border border-black/10 bg-white/60 px-4 py-3 text-sm outline-none ring-indigo-500/30 focus:ring-4 dark:border-white/10 dark:bg-black/30"
                placeholder="Tell me about your project or just say hello!"
                rows={6}
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              />
            </div>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-95"
            >
              <FiSend />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact
