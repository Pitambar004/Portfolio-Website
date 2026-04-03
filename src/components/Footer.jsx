import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="px-6 pb-10 pt-14">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-black/10 bg-lightCard/70 py-10 text-center shadow-lg backdrop-blur dark:border-white/10 dark:bg-darkCard/70">
          <p className="font-mono text-xs font-semibold tracking-widest text-indigo-600 dark:text-indigo-300">
            [ LET&apos;S BUILD SOMETHING ]
          </p>
          <p className="mt-2 text-3xl font-extrabold md:text-4xl">Let&apos;s Build Something Amazing Together</p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
            Pitambar Pandey — Software Engineering student and developer. Open to internships and collaboration.
          </p>

          <nav
            className="mx-auto mt-6 flex max-w-lg flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-medium text-zinc-600 dark:text-zinc-400"
            aria-label="Footer section links"
          >
            <a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-300">
              About
            </a>
            <a href="#skills" className="hover:text-indigo-600 dark:hover:text-indigo-300">
              Skills
            </a>
            <a href="#projects" className="hover:text-indigo-600 dark:hover:text-indigo-300">
              Projects
            </a>
            <a href="#experience" className="hover:text-indigo-600 dark:hover:text-indigo-300">
              Experience
            </a>
            <a href="#schooling" className="hover:text-indigo-600 dark:hover:text-indigo-300">
              Schooling
            </a>
            <a href="#coursework" className="hover:text-indigo-600 dark:hover:text-indigo-300">
              Coursework
            </a>
            <a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-300">
              Contact
            </a>
          </nav>

          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/60 text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow dark:border-white/10 dark:bg-black/20 dark:text-zinc-200 dark:hover:border-indigo-500/30"
              href="https://github.com/Pitambar004"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/60 text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow dark:border-white/10 dark:bg-black/20 dark:text-zinc-200 dark:hover:border-indigo-500/30"
              href="https://www.linkedin.com/in/pitambar-pandey-50265a2ba/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/60 text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow dark:border-white/10 dark:bg-black/20 dark:text-zinc-200 dark:hover:border-indigo-500/30"
              href="https://www.instagram.com/pri_nce.pandey/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>

          <div className="mx-auto mt-10 h-px max-w-3xl bg-black/10 dark:bg-white/10" />
          <p className="mt-6 font-mono text-xs text-zinc-500">© {new Date().getFullYear()} Pitambar Pandey. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
