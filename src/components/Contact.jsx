import { motion } from 'framer-motion'
import { useState } from 'react'

function Contact() {
  const [copied, setCopied] = useState('')
  const copy = async (value, key) => {
    await navigator.clipboard.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied(''), 1400)
  }

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <p className="mb-3 font-mono text-xs text-indigo-600 dark:text-indigo-300">[ terminal/contact ]</p>
      <h2 className="mb-6 text-3xl font-bold md:text-4xl">Send a Message</h2>
      <div className="rounded-xl border border-emerald-400/40 bg-[#101010] p-6 font-mono text-sm text-zinc-100">
        <p className="mb-4 text-emerald-400">&gt; send_message --name="" --email="" --message=""</p>
        <form className="space-y-5">
          <input className="w-full border-b border-zinc-600 bg-transparent pb-2 outline-none" placeholder="--name" />
          <input className="w-full border-b border-zinc-600 bg-transparent pb-2 outline-none" placeholder="--email" />
          <textarea className="w-full border-b border-zinc-600 bg-transparent pb-2 outline-none" placeholder="--message" rows="4" />
          <button type="button" className="rounded-md border border-emerald-500 px-3 py-1 text-emerald-400">
            ./send.sh
          </button>
        </form>
        <div className="mt-6 flex flex-wrap gap-3 text-xs">
          <button
            onClick={() => copy('pandey.pitambar2004@gmail.com', 'email')}
            className="rounded border border-zinc-700 px-3 py-1"
          >
            Copy Email {copied === 'email' ? '✓' : ''}
          </button>
          <button onClick={() => copy('Pitambar004', 'github')} className="rounded border border-zinc-700 px-3 py-1">
            Copy GitHub {copied === 'github' ? '✓' : ''}
          </button>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact
