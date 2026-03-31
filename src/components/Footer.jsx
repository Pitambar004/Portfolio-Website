import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="border-t border-black/10 px-6 py-6 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <p className="font-mono text-sm text-zinc-500">// Built by Pitambar Pandey · 2025</p>
        <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-300">
          <a href="https://github.com/Pitambar004" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/pitambar-pandey" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
          <a href="mailto:pandey.pitambar2004@gmail.com">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
