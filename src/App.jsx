import { useCallback, useEffect, useRef, useState } from 'react'
import { content } from './content.js'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experiences' },
  { id: 'feedback', label: 'References' },
  { id: 'contact', label: 'Contact' },
]

// Things that rise and fade in as they scroll into view.
const REVEAL = '.section h2, .lead, .card, .case, .job, .quote, .chips, .two-col, .section .hero-actions, .contact-card'

// Scroll effects modeled on mannp.com: content reveals, section lines that
// draw in, and a nav that tints and underlines the section you're in.
function useScrollEffects(setActive, setScrolled) {
  useEffect(() => {
    const items = [...document.querySelectorAll(REVEAL)]
    items.forEach((el) => {
      el.classList.add('reveal')
      // Stagger siblings in a grid so they cascade in.
      const i = [...el.parentElement.children].indexOf(el)
      el.style.setProperty('--delay', `${Math.min(i, 5) * 0.08}s`)
    })
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          // Animate in on the way down; reset once it is back below the
          // screen, so scrolling down to a section plays it again.
          if (e.isIntersecting) e.target.classList.add('in')
          else if (e.boundingClientRect.top > window.innerHeight) e.target.classList.remove('in')
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    items.forEach((el) => reveal.observe(el))

    // Section dividers draw in when a section arrives, and reset once it is
    // back below the screen so they play again on the way down.
    const lines = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('drawn')
          else if (e.boundingClientRect.top > window.innerHeight) e.target.classList.remove('drawn')
        }),
      { rootMargin: '0px 0px -10% 0px' },
    )
    document.querySelectorAll('.section').forEach((el) => lines.observe(el))

    const onScroll = () => {
      // Reset anything that is now below the screen, even if a fast jump
      // (Back to top, a nav link) skipped past it, so every section title,
      // block and divider animates again on the way down.
      const below = window.innerHeight
      document.querySelectorAll('.reveal.in, .section.drawn').forEach((el) => {
        if (el.getBoundingClientRect().top > below) el.classList.remove('in', 'drawn')
      })
      // "Scrolled" once the first section (the hero) is behind you.
      const hero = document.querySelector('.hero')
      setScrolled(hero ? hero.getBoundingClientRect().bottom < 80 : window.scrollY > 40)
      // The current section is the last one whose top has passed 35% of the screen.
      const line = window.innerHeight * 0.35
      let current = null
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= line) current = s.id
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = 'contact'
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      reveal.disconnect()
      lines.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [setActive, setScrolled])
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function parseYM(ym) {
  if (!ym) {
    const now = new Date()
    return [now.getFullYear(), now.getMonth() + 1]
  }
  const [y, m] = ym.split('-').map(Number)
  return [y, m]
}

function fmtYM(ym) {
  if (!ym) return 'Present'
  const [y, m] = parseYM(ym)
  return `${MONTHS[m - 1]} ${y}`
}

// Counts months the way LinkedIn does: start and end month both included.
function duration(start, end) {
  const [y1, m1] = parseYM(start)
  const [y2, m2] = parseYM(end)
  const total = (y2 - y1) * 12 + (m2 - m1) + 1
  const yrs = Math.floor(total / 12)
  const mos = total % 12
  const parts = []
  if (yrs) parts.push(`${yrs} yr${yrs > 1 ? 's' : ''}`)
  if (mos) parts.push(`${mos} mo${mos > 1 ? 's' : ''}`)
  return parts.join(' ')
}

function Logo({ src, org, color }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div className="logo logo-fallback" style={{ background: color }} aria-hidden="true">
        {initials(org.replace(/\(.*\)/, ''))}
      </div>
    )
  }
  return <img className="logo" src={src} alt={`${org} logo`} onError={() => setFailed(true)} />
}

function initials(name) {
  return name
    .split(' ')
    .filter((w) => /^[A-Za-z]/.test(w))
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

// Popup showing a project's slide. Closes on Esc, the X, or a click outside.
function SlideModal({ cs, onClose }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(true))
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])
  return (
    <div className={`modal-overlay${open ? ' is-open' : ''}`} onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            <p className="case-client">{cs.client}</p>
            <h3 id="modal-title">{cs.title}</h3>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close" autoFocus>
            <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l10 10M16 6L6 16" />
            </svg>
          </button>
        </div>
        <p className="modal-caption">{cs.slide.caption}</p>
        <img className="modal-slide" src={cs.slide.src} alt={cs.slide.alt} width="1600" height="800" />
      </div>
    </div>
  )
}

// One PDF page drawn onto a canvas with PDF.js, redrawn sharp at each width.
function PdfPage({ doc, num, width, onDrawn }) {
  const canvas = useRef(null)
  useEffect(() => {
    let task
    let cancelled = false
    doc.getPage(num).then((page) => {
      if (cancelled) return
      const dpr = Math.min(window.devicePixelRatio || 1, 3)
      const base = page.getViewport({ scale: 1 })
      const viewport = page.getViewport({ scale: (width * dpr) / base.width })
      const el = canvas.current
      el.width = Math.floor(viewport.width)
      el.height = Math.floor(viewport.height)
      task = page.render({ canvasContext: el.getContext('2d'), viewport })
      task.promise.then(() => !cancelled && onDrawn(num)).catch(() => {})
    })
    return () => {
      cancelled = true
      task?.cancel()
    }
  }, [doc, num, width, onDrawn])
  return <canvas ref={canvas} className="pdf-page-canvas" />
}

// Full-screen resume viewer modeled on mannp.com: PDF.js renders the real
// PDF, with page controls, fit width / fit page, a download button, and
// Esc / X / outside click to close.
function ResumeModal({ pdf, onClose }) {
  const [open, setOpen] = useState(false)
  const [fit, setFit] = useState('width')
  const [box, setBox] = useState({ w: 0, h: 0 })
  const [current, setCurrent] = useState(1)
  const [doc, setDoc] = useState(null)
  const [pages, setPages] = useState([])
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState({})
  const onDrawn = useCallback((n) => setLoaded((l) => (l[n] ? l : { ...l, [n]: true })), [])
  const scroller = useRef(null)

  // Load PDF.js only when the viewer opens, so the main page stays light.
  useEffect(() => {
    let task
    let alive = true
    Promise.all([import('pdfjs-dist'), import('pdfjs-dist/build/pdf.worker.min.mjs?url')])
      .then(async ([pdfjs, worker]) => {
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default
        task = pdfjs.getDocument(pdf)
        const d = await task.promise
        const sizes = []
        for (let i = 1; i <= d.numPages; i++) {
          const vp = (await d.getPage(i)).getViewport({ scale: 1 })
          sizes.push({ num: i, w: vp.width, h: vp.height })
        }
        if (alive) {
          setDoc(d)
          setPages(sizes)
        }
      })
      .catch(() => alive && setFailed(true))
    return () => {
      alive = false
      task?.destroy()
    }
  }, [pdf])

  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(true))
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // Track the viewing area so a page can fit its width or its height.
  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const ro = new ResizeObserver(() => setBox({ w: el.clientWidth, h: el.clientHeight }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const pad = box.w < 600 ? 32 : 56
  const pageWidth = (p) => {
    const byWidth = Math.min(box.w - pad, 900)
    const byHeight = ((box.h - pad - 18) * p.w) / p.h
    return Math.max(160, Math.floor(fit === 'width' ? byWidth : Math.min(byWidth, byHeight)))
  }

  const onScroll = () => {
    const el = scroller.current
    const mid = el.scrollTop + el.clientHeight / 3
    let n = 1
    el.querySelectorAll('.pdf-sheet').forEach((s, i) => s.offsetTop <= mid && (n = i + 1))
    setCurrent(n)
  }
  const goTo = (n) => {
    const sheet = scroller.current.querySelectorAll('.pdf-sheet')[n - 1]
    if (sheet) scroller.current.scrollTo({ top: sheet.offsetTop - 28, behavior: 'smooth' })
  }

  const done = Object.keys(loaded).length
  return (
    <div className={`pdf-overlay${open ? ' is-open' : ''}`} onClick={onClose}>
      <div className="pdf-modal" role="dialog" aria-modal="true" aria-label="Resume" onClick={(e) => e.stopPropagation()}>
        <div className="pdf-modal-bar">
          <div className="pdf-modal-title">
            <small>PDF</small>
            <strong>Resume</strong>
          </div>
          <div className="pdf-pager">
            <button type="button" className="pdf-icon-btn" aria-label="Previous page" disabled={current <= 1} onClick={() => goTo(current - 1)}>
              <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13.5 5.5L8 11l5.5 5.5" />
              </svg>
            </button>
            <output className="pdf-pager-count">
              {pages.length ? `Page ${current} of ${pages.length}` : 'Loading…'}
            </output>
            <button type="button" className="pdf-icon-btn" aria-label="Next page" disabled={current >= pages.length} onClick={() => goTo(current + 1)}>
              <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8.5 5.5L14 11l-5.5 5.5" />
              </svg>
            </button>
          </div>
          <span className="pdf-sep" aria-hidden="true" />
          <div className="pdf-fit" role="group" aria-label="Zoom">
            <button type="button" aria-pressed={fit === 'width'} onClick={() => setFit('width')}>
              Fit width
            </button>
            <button type="button" aria-pressed={fit === 'page'} onClick={() => setFit('page')}>
              Fit page
            </button>
          </div>
          <a className="btn pdf-download-btn" href={pdf} download="Meet_Patel_Resume.pdf">
            <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 4v10M11 14l-4-4M11 14l4-4" />
              <path d="M5 17h12" />
            </svg>
            Download
          </a>
          <button type="button" className="pdf-icon-btn" aria-label="Close" onClick={onClose} autoFocus>
            <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l10 10M16 6L6 16" />
            </svg>
          </button>
        </div>
        <div className="pdf-progress" aria-hidden="true">
          <i
            style={{
              width: `${pages.length ? (done / pages.length) * 100 : 8}%`,
              opacity: pages.length && done === pages.length ? 0 : 1,
            }}
          />
        </div>
        <div className="pdf-pages" ref={scroller} onScroll={onScroll}>
          {failed && (
            <div className="pdf-pages-message">
              <p>
                The preview couldn&rsquo;t load. <a href={pdf} target="_blank" rel="noopener">Open the PDF</a> instead.
              </p>
            </div>
          )}
          {box.w > 0 &&
            doc &&
            pages.map((p) => (
              <div key={p.num} className="pdf-sheet">
                <div
                  className="pdf-page"
                  role="img"
                  aria-label={`Resume page ${p.num}`}
                  style={{ width: pageWidth(p), aspectRatio: `${p.w} / ${p.h}` }}
                >
                  <PdfPage doc={doc} num={p.num} width={pageWidth(p)} onDrawn={onDrawn} />
                  {!loaded[p.num] && <div className="pdf-page-skeleton" />}
                </div>
                <span className="pdf-page-number" aria-hidden="true">
                  {p.num}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

// Opens a Gmail draft to me, pre-filled.
const gmailLink = (to, subject = '', body = '') =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

// Contact section modeled on mannp.com: one note form that opens Gmail
// pre-filled.
function Contact({ contact }) {
  const [error, setError] = useState('')
  const send = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const message = String(f.get('message') || '').trim()
    if (!message) return setError('Write a message first.')
    setError('')
    const name = String(f.get('name') || '').trim()
    const from = String(f.get('email') || '').trim()
    const sign = [name, from].filter(Boolean).join(' · ')
    window.open(gmailLink(contact.email, name ? `Note from ${name}` : 'Hello from your website', sign ? `${message}

${sign}` : message), '_blank', 'noopener')
  }
  const icon = (d) => (
    <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d}
    </svg>
  )
  return (
    <div className="contact-cards">
      <article className="contact-card contact-card-form">
        <p className="contact-label">Let’s chat!</p>
        <form onSubmit={send} noValidate>
          <div className="contact-field-row">
            <label className="contact-field">
              <span className="contact-label">Name</span>
              <input type="text" name="name" autoComplete="name" />
            </label>
            <label className="contact-field">
              <span className="contact-label">Email</span>
              <input type="email" name="email" autoComplete="email" />
            </label>
          </div>
          <label className="contact-field">
            <span className="contact-label">Message</span>
            <textarea name="message" rows="3" onInput={() => error && setError('')} />
          </label>
          {error && <p className="contact-error">{error}</p>}
          <div className="contact-send">
            <button className="btn" type="submit">
              {icon(<path d="M18 4L10 12M18 4l-5.5 14-2.5-6-6-2.5L18 4z" />)}
              Send it
            </button>
            <span className="contact-label">Opens Gmail, pre-filled</span>
          </div>
        </form>
      </article>
    </div>
  )
}

// Turns **words** into gold highlights, ++words++ into blue ones, and a \n
// into a line break.
function gold(text) {
  return text.split(/(\*\*.+?\*\*|\+\+.+?\+\+)/g).flatMap((part, i) => {
    if (part.startsWith('**')) return [<strong key={i} className="gold">{part.slice(2, -2)}</strong>]
    if (part.startsWith('++')) return [<strong key={i} className="blue">{part.slice(2, -2)}</strong>]
    return part.split('\n').flatMap((line, j) => (j ? [<br key={`${i}-${j}`} />, line] : [line]))
  })
}

// Round photo with a layered blue ring.
function Headshot({ photo, name }) {
  return (
    <div className="headshot-ring intro">
      <span className="headshot-glow" aria-hidden="true" />
      <span className="headshot-photo">
        <img src={photo} alt={`Photo of ${name}`} width="800" height="800" />
      </span>
    </div>
  )
}

export default function App() {
  const c = content
  const [active, setActive] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [openCase, setOpenCase] = useState(null)
  const closeCase = useCallback(() => setOpenCase(null), [])
  const [resumeOpen, setResumeOpen] = useState(false)
  const closeResume = useCallback(() => setResumeOpen(false), [])
  useScrollEffects(setActive, setScrolled)
  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#top" className="wordmark" tabIndex={scrolled ? 0 : -1}>
          {c.name}
        </a>
        <nav aria-label="Sections">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'active' : undefined}>
              {s.label}
            </a>
          ))}
        </nav>
        <span aria-hidden="true" />
      </header>

      <main id="top">
        <section className="hero">
          {c.photo && <Headshot photo={c.photo} name={c.name} />}
          <div className="hero-text">
          <h1 className="intro intro-2">{c.name}</h1>
          <p className="tagline intro intro-3">{c.tagline}</p>
          <div className="hero-actions intro intro-4">
            <a
              className="btn btn-icon"
              href={c.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
            <a
              className="btn"
              href={c.resume}
              target="_blank"
              rel="noopener"
              onClick={(e) => {
                e.preventDefault()
                setResumeOpen(true)
              }}
            >
              Download Resume
            </a>
            <a className="btn" href="#work">
              See My Work
            </a>
          </div>
          </div>
        </section>

        <section id="about" className="section">
          <h2>About</h2>
          {c.about.map((p, i) => (
            <p key={i} className="lead">
              {gold(p)}
            </p>
          ))}
        </section>

        <section id="expertise" className="section">
          <h2>What I Do</h2>
          <div className="cards two">
            {c.expertise.map((e) => (
              <div key={e.name} className="card">
                <h3>{e.name}</h3>
                <p>{e.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="section">
          <h2>Work</h2>
          <div className="cases">
            {c.caseStudies.map((cs) => (
              <article key={cs.title} className="case">
                <div className="case-top">
                  {cs.slide && (
                    <button
                      type="button"
                      className="case-media"
                      onClick={() => setOpenCase(cs)}
                      aria-label={`${cs.title}: view full slide`}
                    >
                      <img src={cs.slide.src} alt={cs.slide.alt} width="1600" height="800" loading="lazy" />
                      <span className="case-zoom" aria-hidden="true">
                        <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M13 4h5v5M9 18H4v-5M18 4l-6 6M4 18l6-6" />
                        </svg>
                      </span>
                    </button>
                  )}
                  <div className="case-body">
                    <p className="case-client">{cs.client}</p>
                    <h3>{cs.title}</h3>
                    <p className="case-text">{cs.summary}</p>
                    <ul className="chips small">
                      {cs.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <ol className="case-steps">
                  {[
                    ['Problem', cs.problem],
                    ['What I Did', cs.did],
                    ['Result', cs.result],
                  ].map(([label, text], i) => (
                    <li key={label} className="case-step">
                      <span className="case-step-node" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="case-step-title">{label}</span>
                      <span className="case-step-text">{text}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section">
          <h2>Experience</h2>
          <ol className="jobs">
            {c.experience.map((job, i) => (
              <li key={i} className="job">
                {job.url ? (
                  <a
                    className="logo-link"
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Visit ${job.org.replace(/\s*\(.*\)/, '')}`}
                  >
                    <Logo src={job.logo} org={job.org} color={job.color} />
                  </a>
                ) : (
                  <Logo src={job.logo} org={job.org} color={job.color} />
                )}
                <div className="job-body">
                  <h3>{job.role}</h3>
                  <p className="job-org">{job.org}</p>
                  <p className="job-meta job-dates">
                    {fmtYM(job.start)} – {fmtYM(job.end)} · {duration(job.start, job.end)}
                  </p>
                  <p className="job-meta">{job.location}</p>
                  {job.bullets && (
                    <ul className="job-bullets">
                      {job.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="feedback" className="section">
          <h2>References</h2>
          <div className="quotes">
            {c.testimonials.map((t, i) => (
              <figure key={i} className="quote">
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  <strong>{t.who}</strong>
                  <span>{t.org}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <span className="contact-band" aria-hidden="true" />
          <h2>Contact</h2>
          <Contact contact={c.contact} />
        </section>
      </main>

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} {c.name}
        </span>
        <button
          type="button"
          className="btn footer-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 17V5M11 5l-5 5M11 5l5 5" />
          </svg>
          Back to top
        </button>
      </footer>

      {openCase && <SlideModal cs={openCase} onClose={closeCase} />}
      {resumeOpen && <ResumeModal pdf={c.resume} onClose={closeResume} />}
    </>
  )
}
