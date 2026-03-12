"use client";
import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0a;
    --surface: #111;
    --accent: #e8ff47;
    --accent2: #ff6b35;
    --text: #f0ede6;
    --muted: #666;
    --border: #222;
  }

  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }

  .portfolio { min-height: 100vh; overflow-x: hidden; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.2rem 4rem;
    border-bottom: 1px solid var(--border);
    background: rgba(10,10,10,0.85);
    backdrop-filter: blur(12px);
  }
  .nav-logo {
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.2rem;
    color: var(--accent); letter-spacing: -0.5px;
  }
  .nav-links { display: flex; gap: 2.5rem; }
  .nav-links a {
    color: var(--muted); text-decoration: none; font-size: 0.85rem;
    letter-spacing: 1px; text-transform: uppercase;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--text); }

  /* HERO */
  .hero {
    min-height: 100vh; display: flex; flex-direction: column;
    justify-content: flex-end; padding: 8rem 4rem 5rem;
    position: relative; overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 60% at 70% 30%, rgba(232,255,71,0.06) 0%, transparent 70%),
                radial-gradient(ellipse 50% 50% at 20% 80%, rgba(255,107,53,0.05) 0%, transparent 60%);
  }
  .hero-tag {
    font-size: 0.8rem; letter-spacing: 3px; text-transform: uppercase;
    color: var(--accent); margin-bottom: 1.5rem; font-weight: 300;
  }
  .hero h1 {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(3.5rem, 10vw, 9rem); line-height: 0.92;
    letter-spacing: -3px; margin-bottom: 2rem;
  }
  .hero h1 span { color: var(--accent); }
  .hero-sub {
    max-width: 480px; font-size: 1rem; color: var(--muted);
    line-height: 1.7; font-weight: 300; margin-bottom: 3rem;
  }
  .hero-cta {
    display: inline-flex; align-items: center; gap: 0.75rem;
    background: var(--accent); color: #0a0a0a;
    padding: 0.9rem 2rem; font-family: 'Syne', sans-serif;
    font-weight: 700; font-size: 0.85rem; letter-spacing: 1px;
    text-transform: uppercase; text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer; border: none;
  }
  .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(232,255,71,0.25); }
  .scroll-indicator {
    position: absolute; right: 4rem; bottom: 3rem;
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  }
  .scroll-line {
    width: 1px; height: 60px; background: linear-gradient(to bottom, var(--accent), transparent);
    animation: scrollAnim 2s ease-in-out infinite;
  }
  @keyframes scrollAnim {
    0%, 100% { opacity: 1; transform: scaleY(1); }
    50% { opacity: 0.3; transform: scaleY(0.6); }
  }

  /* SECTION BASE */
  section { padding: 6rem 4rem; border-top: 1px solid var(--border); }
  .section-label {
    font-size: 0.75rem; letter-spacing: 3px; text-transform: uppercase;
    color: var(--accent); margin-bottom: 3rem; font-weight: 300;
  }

  /* ABOUT */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
  .about h2 {
    font-family: 'Syne', sans-serif; font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 800; letter-spacing: -2px; line-height: 1.1; margin-bottom: 1.5rem;
  }
  .about p { color: var(--muted); line-height: 1.8; font-weight: 300; margin-bottom: 1rem; }
  .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .skill-pill {
    border: 1px solid var(--border); padding: 0.6rem 1rem;
    font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase;
    color: var(--muted); transition: all 0.2s;
  }
  .skill-pill:hover { border-color: var(--accent); color: var(--accent); }

  /* PROJECTS */
  .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; }
  .project-card {
    background: var(--surface); border: 1px solid var(--border);
    padding: 2rem; position: relative; overflow: hidden;
    transition: transform 0.3s, border-color 0.3s;
    cursor: pointer;
  }
  .project-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--accent); transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s;
  }
  .project-card:hover { transform: translateY(-4px); border-color: #333; }
  .project-card:hover::before { transform: scaleX(1); }
  .project-num { font-size: 0.75rem; color: var(--muted); margin-bottom: 1.5rem; }
  .project-card h3 {
    font-family: 'Syne', sans-serif; font-size: 1.3rem;
    font-weight: 700; margin-bottom: 0.75rem;
  }
  .project-card p { color: var(--muted); font-size: 0.9rem; line-height: 1.6; font-weight: 300; }
  .project-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.5rem; }
  .tag {
    font-size: 0.7rem; letter-spacing: 1px; text-transform: uppercase;
    color: var(--accent2); border: 1px solid rgba(255,107,53,0.3);
    padding: 0.25rem 0.6rem;
  }

  /* CONTACT */
  .contact { text-align: center; }
  .contact h2 {
    font-family: 'Syne', sans-serif; font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 800; letter-spacing: -2px; margin-bottom: 1.5rem;
  }
  .contact h2 span { color: var(--accent); }
  .contact p { color: var(--muted); font-weight: 300; margin-bottom: 3rem; }
  .contact-links { display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; }
  .contact-link {
    border: 1px solid var(--border); padding: 0.8rem 1.8rem;
    color: var(--text); text-decoration: none; font-size: 0.85rem;
    letter-spacing: 1px; text-transform: uppercase;
    transition: all 0.2s;
  }
  .contact-link:hover { border-color: var(--accent); color: var(--accent); }
  .contact-link.primary {
    background: var(--accent); color: #0a0a0a;
    border-color: var(--accent); font-family: 'Syne', sans-serif; font-weight: 700;
  }
  .contact-link.primary:hover { background: transparent; color: var(--accent); }

  /* FOOTER */
  footer {
    padding: 2rem 4rem; border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: center;
  }
  footer span { color: var(--muted); font-size: 0.8rem; }

  @media (max-width: 768px) {
    nav { padding: 1rem 1.5rem; }
    .nav-links { gap: 1.5rem; }
    .hero, section { padding-left: 1.5rem; padding-right: 1.5rem; }
    .about-grid { grid-template-columns: 1fr; gap: 2rem; }
    .scroll-indicator { display: none; }
    footer { flex-direction: column; gap: 0.5rem; text-align: center; }
  }
`;

const projects = [
  {
    id: "01",
    title: "E-Commerce Platform",
    desc: "Full-stack shopping app with cart, auth, and payment integration using Stripe.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: "02",
    title: "Task Management App",
    desc: "Drag-and-drop kanban board with real-time sync and team collaboration.",
    tags: ["React", "Firebase", "Tailwind"],
  },
  {
    id: "03",
    title: "Weather Dashboard",
    desc: "Interactive weather app consuming OpenWeatherMap API with dynamic visuals.",
    tags: ["JavaScript", "REST API", "CSS"],
  },
];

const skills = [
  "React", "JavaScript", "HTML/CSS",
  "Node.js", "Git", "REST APIs",
  "Python", "SQL",
];

export default function Portfolio() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="portfolio" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s" }}>

        {/* NAV */}
        <nav>
          <div className="nav-logo">PORTFOLIO</div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        {/* HERO */}
        <div className="hero">
          <div className="hero-bg" />
          <p className="hero-tag">Available for work</p>
          <h1>
            Creative<br />
            <span>Developer</span>
          </h1>
          <p className="hero-sub">
            I build clean, functional web experiences with a focus on
            performance and thoughtful design. Based in Lagos, Nigeria.
          </p>
          <button className="hero-cta" onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}>
            View My Work →
          </button>
          <div className="scroll-indicator">
            <div className="scroll-line" />
          </div>
        </div>

        {/* ABOUT */}
        <section className="about" id="about">
          <p className="section-label">01 — About</p>
          <div className="about-grid">
            <div>
              <h2>Building things that work beautifully.</h2>
              <p>
                I'm a mechanical engineering student with a passion for software development.
                I love bridging the gap between engineering logic and clean user interfaces.
              </p>
              <p>
                When I'm not studying, I'm building side projects, learning new frameworks,
                and obsessing over the details that make great products.
              </p>
            </div>
            <div>
              <p className="section-label" style={{ marginBottom: "1.5rem" }}>Skills</p>
              <div className="skills-grid">
                {skills.map((s) => (
                  <div className="skill-pill" key={s}>{s}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <p className="section-label">02 — Projects</p>
          <div className="projects-grid">
            {projects.map((p) => (
              <div className="project-card" key={p.id}>
                <div className="project-num">{p.id}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact" id="contact">
          <p className="section-label" style={{ textAlign: "center" }}>03 — Contact</p>
          <h2>Let's <span>work</span><br />together.</h2>
          <p>Open to internships, freelance, and full-time opportunities.</p>
          <div className="contact-links">
            <a href="mailto:hello@example.com" className="contact-link primary">Say Hello</a>
            <a href="#" className="contact-link">GitHub</a>
            <a href="#" className="contact-link">LinkedIn</a>
            <a href="#" className="contact-link">Resume</a>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <span>© 2025 — Your Name</span>
          <span>Designed & Built with React</span>
        </footer>

      </div>
    </>
  );
}