"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  language: string;
  colors: [string, string];
  symbol: string;
};

const PROJECTS: Project[] = [
  { id: "truth.x_V2", title: "truth.x", description: "A system for exploring trust, signals and information in an AI-first world.", language: "Python", colors: ["#283b52", "#9dca83"], symbol: "t" },
  { id: "ai-podcast-clipper", title: "AI Podcast Clipper", description: "Turning long-form conversations into concise, shareable moments.", language: "TypeScript", colors: ["#3d294e", "#d3959e"], symbol: "◒" },
  { id: "FT-HuggingFace", title: "Fine-tuning lab", description: "Experiments with adapting open models for focused, useful tasks.", language: "Python", colors: ["#765d31", "#e2c56a"], symbol: "∿" },
  { id: "rag-01-kn", title: "RAG knowledge base", description: "Retrieval-augmented generation experiments for grounded answers.", language: "Jupyter", colors: ["#244b4a", "#83c6b2"], symbol: "⌁" },
  { id: "voiceLedger", title: "voiceLedger", description: "Exploring voice as a faster, more natural interface for personal finance.", language: "Python", colors: ["#3a3b58", "#a69ad9"], symbol: "⌁" },
  { id: "River-Flood-Predictor", title: "River flood predictor", description: "A data-driven look at forecasting and understanding flood risk.", language: "Jupyter", colors: ["#19445b", "#77bfd1"], symbol: "≈" },
  { id: "face_recgonition-system", title: "Face recognition system", description: "Computer vision experiments around identity and visual patterns.", language: "Python", colors: ["#4a3b32", "#d59b73"], symbol: "◎" },
  { id: "ai_recommendation", title: "AI recommendation", description: "Personalized recommendations powered by machine learning.", language: "Python", colors: ["#3f4c2c", "#b8d26c"], symbol: "✳" },
  { id: "Walamar_Analytics", title: "Walamar analytics", description: "Making patterns in data easier to see and act on.", language: "Python", colors: ["#4b3446", "#d89ab3"], symbol: "↗" },
  { id: "gene-ai", title: "gene-ai", description: "An ongoing exploration into creative generative AI systems.", language: "TypeScript", colors: ["#303d54", "#8daee2"], symbol: "g" },
  { id: "licence_plate_detection", title: "Licence plate detection", description: "Real-time computer vision for detecting vehicle licence plates.", language: "JavaScript", colors: ["#424b38", "#c2d18a"], symbol: "▦" },
  { id: "logistic_management_assistant", title: "Logistic management assistant", description: "Using intelligent automation to make logistics workflows clearer.", language: "Python", colors: ["#3b4650", "#9ebbc4"], symbol: "→" },
  { id: "pocket_research", title: "Pocket research", description: "A compact workspace for collecting, exploring and connecting ideas.", language: "Python", colors: ["#3d4a3e", "#b7d38b"], symbol: "⌂" },
  { id: "shortClip", title: "shortClip", description: "Experiments in turning longer content into concise, useful clips.", language: "Python", colors: ["#563c34", "#d79a78"], symbol: "◌" },
  { id: "Income-expense-Website", title: "Income & expense website", description: "A practical web tool for making personal finances easier to understand.", language: "Python", colors: ["#30485b", "#8eb8c9"], symbol: "＋" },
];

const DEFAULT_SELECTION = ["ai_recommendation", "gene-ai", "pocket_research", "River-Flood-Predictor", "shortClip", "Income-expense-Website"];
const STORAGE_KEY = "featuredProjects-v2";

function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

export default function Home() {
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTION);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setSelected(JSON.parse(saved));
  }, []);

  const featuredProjects = selected.map((id) => PROJECTS.find((project) => project.id === id)).filter((project): project is Project => Boolean(project));

  function toggleProject(id: string) {
    setSelected((current) => current.includes(id) ? current.filter((projectId) => projectId !== id) : [...current, id]);
  }

  function saveSelection() {
    const nextSelection = selected.length ? selected : [DEFAULT_SELECTION[0]];
    setSelected(nextSelection);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSelection));
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="noise" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Rishil Mittal home"><span>RM</span><i /></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#work">Work</a><a href="#stack">Stack</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
        <ExternalLink className="header-link" href="https://github.com/JetJerry">GitHub <span>↗</span></ExternalLink>
        <button className="menu-toggle" aria-label="Open navigation">☰</button>
      </header>

      <main id="top">
        <section className="hero section-shell">
          <div className="hero-copy">
            <p className="eyebrow"><span className="pulse" /> AI/ML engineer in the making</p>
            <h1>Building useful<br /><em>intelligence.</em></h1>
            <p className="hero-intro">I’m Rishil — a final-year B.Tech CSE student specializing in AI/ML. I turn curious questions into practical systems, from intelligent agents to computer vision tools.</p>
            <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <span>↓</span></a><ExternalLink className="text-link" href="https://drive.google.com/file/d/1R4WzOYs5JUD_Rb2n-p4oYWQbU9VWUNP8/view?usp=sharing">View my resume <span>↗</span></ExternalLink></div>
          </div>
          <div className="hero-visual" aria-label="Abstract AI neural network illustration"><div className="orb orb-one" /><div className="orb orb-two" /><div className="signal signal-one" /><div className="signal signal-two" /><div className="signal signal-three" /><div className="visual-label"><span>01</span><span>systems / thinking</span></div><div className="visual-caption">Curious by default.<br />Deliberate by design.</div></div>
        </section>

        <section className="marquee" aria-label="Areas of focus"><div>ARTIFICIAL INTELLIGENCE <span>✳</span> MACHINE LEARNING <span>✳</span> GENERATIVE AI <span>✳</span> ARTIFICIAL INTELLIGENCE <span>✳</span> MACHINE LEARNING <span>✳</span></div></section>

        <section className="section-shell work-section" id="work">
          <div className="section-heading"><div><p className="eyebrow">Selected work / 01</p><h2>Things I’ve<br /><em>been building.</em></h2></div><div className="section-aside"><p>A selection of experiments, products and learning projects. Each one is a small step toward building AI that feels useful in the real world.</p><button className="manage-button" onClick={() => setIsModalOpen(true)}>Manage selection <span>＋</span></button></div></div>
          <div className="project-grid">{featuredProjects.map((project, index) => <ExternalLink className="project-card" href={`https://github.com/JetJerry/${project.id}`} key={project.id}><div className="project-image" style={{ "--c1": project.colors[0], "--c2": project.colors[1] } as React.CSSProperties}><span className="project-index">0{index + 1} / 0{featuredProjects.length}</span><span className="project-symbol">{project.symbol}</span></div><div className="project-meta"><div><h3>{project.title}</h3><p>{project.description}</p></div><span className="project-arrow">↗</span></div></ExternalLink>)}</div>
          <div className="work-footer"><span>More experiments on GitHub</span><ExternalLink className="button button-outline" href="https://github.com/JetJerry?tab=repositories">See all repositories ↗</ExternalLink></div>
        </section>

        <section className="stack-section" id="stack"><div className="section-shell stack-inner"><div><p className="eyebrow">Toolkit / 02</p><h2>The tools behind<br /><em>the thinking.</em></h2></div><div className="stack-list"><div className="stack-row"><span>01</span><strong>Languages</strong><p>Python · TypeScript · JavaScript · C · Go</p></div><div className="stack-row"><span>02</span><strong>AI / ML</strong><p>Deep Learning · Computer Vision · NLP · LLMs · Fine-tuning · RAG</p></div><div className="stack-row"><span>03</span><strong>Building</strong><p>FastAPI · React · Docker · Airflow · Git · REST APIs</p></div><div className="stack-row"><span>04</span><strong>Currently exploring</strong><p>Production AI systems · evaluation · reliable agents</p></div></div></div></section>

        <section className="section-shell about-section" id="about"><div className="about-number">02<span>/04</span></div><div className="about-copy"><p className="eyebrow">A little context</p><h2>Learning fast,<br /><em>building often.</em></h2><p>I’m currently pursuing my B.Tech in Computer Science & Engineering with a specialization in Artificial Intelligence and Machine Learning at Maharishi Markandeshwar University, graduating in 2027.</p><p>Outside the classroom, I’m drawn to hackathons, ambitious prototypes and the messy middle between an idea and something that actually works. I’ve participated in — and won — hackathons, and I’m always looking for the next problem worth unpacking.</p><ExternalLink className="text-link" href="https://www.linkedin.com/in/rishil-mittal/">More about my journey <span>↗</span></ExternalLink></div><div className="about-card"><span className="card-mark">RM</span><div><span className="card-label">Based in</span><strong>India</strong></div><div><span className="card-label">University</span><strong>MMU</strong></div><div><span className="card-label">Graduating</span><strong>2027</strong></div><div><span className="card-label">Focus</span><strong>AI × product</strong></div></div></section>

        <section className="contact-section" id="contact"><div className="section-shell contact-inner"><p className="eyebrow">Have a problem worth solving?</p><h2>Let’s make something<br /><em>meaningful.</em></h2><p>I’m open to conversations, collaborations, and interesting opportunities.</p><div className="contact-actions"><a className="button button-primary" href="mailto:rishil.mittal009@gmail.com">Email me ↗</a><ExternalLink className="button button-light" href="https://www.linkedin.com/in/rishil-mittal/">Say hello on LinkedIn ↗</ExternalLink><ExternalLink className="button button-light" href="https://github.com/JetJerry">Visit GitHub ↗</ExternalLink></div></div></section>
      </main>

      <footer className="site-footer section-shell"><span>© 2026 Rishil Mittal</span><span>Designed & built with curiosity <i>✳</i></span><a href="#top">Back to top ↑</a></footer>

      {isModalOpen && <div className="modal-backdrop is-open" role="presentation" onClick={(event) => event.target === event.currentTarget && setIsModalOpen(false)}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close project manager">×</button><p className="eyebrow">Portfolio editor</p><h2 id="modal-title">Choose your<br /><em>featured work.</em></h2><p className="modal-note">Your choices are saved in this browser. To update the default selection for everyone, edit <code>PROJECTS</code> in <code>app/page.tsx</code>.</p><div className="project-selector">{PROJECTS.map((project) => <label className="selector-item" key={project.id}><input type="checkbox" checked={selected.includes(project.id)} onChange={() => toggleProject(project.id)} /><span>{project.title}</span><span className="selector-language">{project.language}</span></label>)}</div><button className="button button-primary modal-save" onClick={saveSelection}>Save selection <span>→</span></button></div></div>}
    </>
  );
}
