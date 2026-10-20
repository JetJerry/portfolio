"use client";

import { useEffect, useMemo, useState } from "react";

type Project = {
  id: string; title: string; description: string; language: string;
  categories: string[]; colors: [string, string]; symbol: string; image?: string;
  details: string; stack: string[];
};

const PROJECTS: Project[] = [
  { id: "ai_recommendation", title: "AI Recommendation", description: "Personalized recommendations powered by machine learning.", language: "Python", categories: ["AI / ML", "Data"], colors: ["#3f4c2c", "#b8d26c"], symbol: "✳", image: "/projects/ai-recommendation.svg", details: "An exploration of recommendation logic, matching signals and turning user context into useful next steps.", stack: ["Python", "Machine Learning", "Data"], },
  { id: "gene-ai", title: "Gene AI", description: "An ongoing exploration into creative generative AI systems.", language: "Generative AI", categories: ["LLMs", "Generative AI"], colors: ["#303d54", "#8daee2"], symbol: "g", image: "/projects/gene-ai.svg", details: "A generative AI playground focused on prompt-driven creation and making abstract ideas feel tangible.", stack: ["Generative AI", "LLMs"], },
  { id: "pocket_research", title: "Pocket Research", description: "A compact workspace for collecting, exploring and connecting ideas.", language: "Python", categories: ["AI / ML", "Product"], colors: ["#3d4a3e", "#b7d38b"], symbol: "⌂", image: "/projects/pocket-research.svg", details: "A quiet research workspace for capturing notes, connecting concepts and keeping curiosity organized.", stack: ["Python", "Research", "Knowledge systems"], },
  { id: "River-Flood-Predictor", title: "River Flood Predictor", description: "A data-driven look at forecasting and understanding flood risk.", language: "Jupyter", categories: ["Data", "AI / ML"], colors: ["#19445b", "#77bfd1"], symbol: "≈", image: "/projects/river-flood.svg", details: "A predictive data science project that studies river levels and communicates future flood risk through visual signals.", stack: ["Python", "Jupyter", "Prediction"], },
  { id: "shortClip", title: "ShortClip", description: "Experiments in turning longer content into concise, useful clips.", language: "Python", categories: ["AI / ML", "Product"], colors: ["#563c34", "#d79a78"], symbol: "◌", image: "/projects/shortclip.svg", details: "An experiment in finding the strongest moments in long-form content and shaping them into shareable clips.", stack: ["Python", "Media", "Automation"], },
  { id: "logistic_management_assistant", title: "Logistics Management Assistant", description: "Using intelligent automation to make logistics workflows clearer.", language: "Python", categories: ["AI / ML", "Product"], colors: ["#3b4650", "#9ebbc4"], symbol: "→", image: "/projects/logistic-management.svg", details: "A workflow assistant concept for tracking shipments, surfacing exceptions and giving logistics teams a clearer operational view.", stack: ["Python", "Automation", "Operations"], },
];

const ALL_PROJECTS: Project[] = [...PROJECTS, { id: "truth.x_V2", title: "Truth X", description: "Exploring trust, signals and information in an AI-first world.", language: "Python", categories: ["AI / ML"], colors: ["#283b52", "#9dca83"], symbol: "t", details: "An ongoing system exploration around trust and information.", stack: ["Python", "AI"] }, { id: "FT-HuggingFace", title: "Fine-tuning Lab", description: "Experiments with adapting open models for focused tasks.", language: "Python", categories: ["LLMs", "Generative AI"], colors: ["#765d31", "#e2c56a"], symbol: "∿", details: "Model adaptation experiments using open tooling.", stack: ["Python", "Hugging Face"] }, { id: "rag-01-kn", title: "RAG Knowledge Base", description: "Retrieval-augmented generation experiments for grounded answers.", language: "Jupyter", categories: ["LLMs", "AI / ML"], colors: ["#244b4a", "#83c6b2"], symbol: "⌁", details: "Experiments in making language model answers more grounded.", stack: ["Python", "RAG"] }];
const FILTERS = ["All", "AI / ML", "LLMs", "Generative AI", "Data", "Product"];
const resumeUrl = "https://drive.google.com/file/d/1R4WzOYs5JUD_Rb2n-p4oYWQbU9VWUNP8/view?usp=sharing";

function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("midnight");
  const [filter, setFilter] = useState("All");
  const [caseStudy, setCaseStudy] = useState<Project | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [github, setGithub] = useState({ repos: 29 });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme) setTheme(savedTheme);
    fetch("https://api.github.com/users/JetJerry").then((response) => response.ok ? response.json() : null).then((data) => data && setGithub({ repos: data.public_repos })).catch(() => undefined);
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => reveal.observe(element));
    const moveGlow = (event: MouseEvent) => { document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`); document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`); };
    const keydown = (event: KeyboardEvent) => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setCommandOpen(true); } if (event.key === "Escape") { setCommandOpen(false); setCaseStudy(null); setAssistantOpen(false); } };
    window.addEventListener("mousemove", moveGlow); window.addEventListener("keydown", keydown);
    return () => { reveal.disconnect(); window.removeEventListener("mousemove", moveGlow); window.removeEventListener("keydown", keydown); };
  }, []);

  useEffect(() => { document.documentElement.dataset.theme = theme; window.localStorage.setItem("portfolio-theme", theme); }, [theme]);

  const visibleProjects = useMemo(() => PROJECTS.filter((project) => filter === "All" || project.categories.includes(filter)), [filter]);
  const navigate = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setCommandOpen(false); setMenuOpen(false); };
  const copyEmail = async () => {
    await navigator.clipboard.writeText("rishil.mittal009@gmail.com");
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 2200);
  };
  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name") || "a visitor"}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`);
    window.location.href = `mailto:rishil.mittal009@gmail.com?subject=${subject}&body=${body}`;
  };

  return <>
    <div className="noise" />
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Rishil Mittal home"><span>RM</span><i /></a>
      <nav className={`desktop-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">{[["work", "Work"], ["stack", "Stack"], ["about", "About"], ["contact", "Contact"]].map(([id, label]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
      <button className="header-tool" onClick={() => setCommandOpen(true)} aria-label="Open command palette">⌘ K</button>
      <ExternalLink className="header-link" href="https://github.com/JetJerry">GitHub <span>↗</span></ExternalLink>
      <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? "×" : "☰"}</button>
    </header>

    <main id="top">
      <section className="hero section-shell reveal">
        <div className="hero-copy"><p className="eyebrow"><span className="pulse" /> AI/ML engineer in the making</p><h1>Building useful<br /><em>intelligence.</em></h1><p className="hero-intro">I’m Rishil — a final-year B.Tech CSE student specializing in AI/ML. I turn curious questions into practical systems, from intelligent agents to computer vision tools.</p><div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <span>↓</span></a><ExternalLink className="text-link" href={resumeUrl}>View my resume <span>↗</span></ExternalLink></div><div className="hero-metrics"><div><strong>{github.repos}+</strong><span>public builds</span></div><div><strong>2027</strong><span>graduation</span></div><div><strong>AI ×</strong><span>product thinking</span></div></div></div>
        <div className="hero-visual" aria-label="Rishil Mittal profile image"><img className="profile-image" src="/Rishil_image.jpeg" alt="Rishil Mittal" /><div className="visual-label"><span>01</span><span>systems / thinking</span></div><div className="visual-caption">Curious by default.<br />Deliberate by design.</div><span className="image-tag">RISHIL / AI · ML</span></div>
      </section>

      <section className="marquee" aria-label="Areas of focus"><div>ARTIFICIAL INTELLIGENCE <span>✳</span> MACHINE LEARNING <span>✳</span> GENERATIVE AI <span>✳</span> BUILDING IN PUBLIC <span>✳</span></div></section>

      <section className="section-shell work-section reveal" id="work">
        <div className="section-heading"><div><p className="eyebrow">Selected work / 01</p><h2>Things I’ve<br /><em>been building.</em></h2></div><div className="section-aside"><p>Explore the ideas, experiments and useful systems behind the repositories.</p><ExternalLink className="text-link" href="https://github.com/JetJerry?tab=repositories">Browse all on GitHub <span>↗</span></ExternalLink></div></div>
        <div className="filter-bar" aria-label="Filter projects">{FILTERS.map((item) => <button className={filter === item ? "active" : ""} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <div className="project-grid">{visibleProjects.map((project, index) => <article className="project-card" key={project.id} onClick={() => setCaseStudy(project)} tabIndex={0} onKeyDown={(event) => event.key === "Enter" && setCaseStudy(project)}><div className="project-image" style={{ "--c1": project.colors[0], "--c2": project.colors[1] } as React.CSSProperties}>{project.image && <img src={project.image} alt={`${project.title} preview`} />}<span className="project-index">0{index + 1} / 0{visibleProjects.length}</span><span className="project-symbol">{project.symbol}</span></div><div className="project-meta"><div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.stack.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div></div><span className="project-arrow">↗</span></div></article>)}</div>
        <div className="work-footer"><span>Click a project for its story</span><ExternalLink className="button button-outline" href="https://github.com/JetJerry?tab=repositories">See all repositories ↗</ExternalLink></div>
      </section>

      <section className="github-section reveal"><div className="section-shell github-inner"><div><p className="eyebrow">Open source / 02</p><h2>Building in<br /><em>the open.</em></h2><p className="section-copy">My GitHub is a living lab: experiments, learning projects and ideas becoming more useful over time.</p><ExternalLink className="button button-light" href="https://github.com/JetJerry">Visit my GitHub ↗</ExternalLink></div><div className="github-stats"><div><strong>{github.repos}</strong><span>public repositories</span></div><div className="activity-bars" aria-label="GitHub activity visualization">{Array.from({ length: 42 }, (_, index) => <i key={index} style={{ opacity: 0.25 + ((index * 7) % 7) / 10 }} />)}</div><small>activity / always learning</small></div></div></section>

      <section className="stack-section reveal" id="stack"><div className="section-shell stack-inner"><div><p className="eyebrow">Toolkit / 03</p><h2>The tools behind<br /><em>the thinking.</em></h2><div className="stack-orbit"><span>PY</span><span>AI</span><span>API</span><span>LLM</span></div></div><div className="stack-list"><div className="stack-row"><span>01</span><strong>Languages</strong><p>Python · JavaScript · C · Go</p></div><div className="stack-row"><span>02</span><strong>AI / ML</strong><p>Deep Learning · Computer Vision · NLP · LLMs · Fine-tuning · RAG</p></div><div className="stack-row"><span>03</span><strong>Building</strong><p>FastAPI · Docker · Airflow · Git · REST APIs</p></div><div className="stack-row"><span>04</span><strong>Currently exploring</strong><p>Production AI systems · evaluation · reliable agents</p></div></div></div></section>

      <section className="section-shell skills-section reveal"><div><p className="eyebrow">Working knowledge / 04</p><h2>Tools I use<br /><em>with intent.</em></h2><p className="section-copy">A practical snapshot of where I’m strongest today and what I’m actively sharpening.</p></div><div className="skills-list"><div><span>Python</span><strong>Strong</strong><i className="skill-meter"><b style={{ width: "86%" }} /></i></div><div><span>Machine Learning</span><strong>Strong</strong><i className="skill-meter"><b style={{ width: "78%" }} /></i></div><div><span>LLMs & RAG</span><strong>Growing</strong><i className="skill-meter"><b style={{ width: "70%" }} /></i></div><div><span>FastAPI & REST APIs</span><strong>Growing</strong><i className="skill-meter"><b style={{ width: "67%" }} /></i></div></div></section>

      <section className="section-shell focus-section reveal"><div><p className="eyebrow">Now / 04</p><h2>Currently<br /><em>building.</em></h2></div><div className="focus-grid"><div className="focus-card"><span>01</span><strong>Reliable LLM applications</strong><p>Moving from impressive demos to systems people can trust.</p></div><div className="focus-card"><span>02</span><strong>RAG & evaluation</strong><p>Grounded answers, useful retrieval and measurable quality.</p></div><div className="focus-card"><span>03</span><strong>AI agents with FastAPI</strong><p>Small, composable tools that turn intent into action.</p></div></div></section>

      <section className="section-shell about-section reveal" id="about"><div className="about-number">05<span>/07</span></div><div className="about-copy"><p className="eyebrow">A little context</p><h2>Learning fast,<br /><em>building often.</em></h2><p>I’m pursuing my B.Tech in Computer Science & Engineering with a specialization in Artificial Intelligence and Machine Learning at Maharishi Markandeshwar University, graduating in 2027.</p><p>Hackathons, ambitious prototypes and the messy middle between an idea and something that actually works keep me curious.</p><ExternalLink className="text-link" href="https://www.linkedin.com/in/rishil-mittal/">More about my journey <span>↗</span></ExternalLink></div><div className="about-card"><span className="card-mark">RM</span><div><span className="card-label">Based in</span><strong>India</strong></div><div><span className="card-label">University</span><strong>MMU</strong></div><div><span className="card-label">Graduating</span><strong>2027</strong></div><div><span className="card-label">Focus</span><strong>AI × product</strong></div></div></section>

      <section className="section-shell journey-section reveal"><div><p className="eyebrow">The journey / 06</p><h2>From curiosity<br /><em>to systems.</em></h2></div><div className="timeline"><div><span>2023 — now</span><strong>Computer Science & AI/ML</strong><p>Building foundations across software, data and intelligent systems.</p></div><div><span>Always</span><strong>Hackathons & prototypes</strong><p>Learning by shipping, collaborating and testing ideas in the real world.</p></div><div><span>Next</span><strong>Production AI</strong><p>Looking for opportunities to build reliable, human-centered AI.</p></div></div></section>

      <section className="section-shell achievements-section reveal"><div><p className="eyebrow">Beyond the code / 07</p><h2>Curiosity<br /><em>in motion.</em></h2></div><div className="achievement-grid"><div className="achievement-card"><span>01</span><strong>Hackathons</strong><p>Participated in and won hackathons by turning ideas into working prototypes with a team.</p></div><div className="achievement-card"><span>02</span><strong>Learning in public</strong><p>Every repository is a record of experiments, lessons and a willingness to keep shipping.</p></div><div className="achievement-card"><span>03</span><strong>Open to opportunity</strong><p>Looking for collaborations, internships and teams solving meaningful problems with AI.</p></div></div></section>

      <section className="resume-section reveal"><div className="section-shell resume-inner"><div><p className="eyebrow">Keep exploring / 08</p><h2>One page.<br /><em>More context.</em></h2><p>Get the concise version of my education, projects and technical direction.</p></div><div className="resume-actions"><ExternalLink className="button button-primary" href={resumeUrl}>Open resume PDF <span>↗</span></ExternalLink><span>Hosted securely on Google Drive</span></div></div></section>

      <section className="contact-section reveal" id="contact"><div className="section-shell contact-inner"><div className="contact-copy"><p className="eyebrow">Have a problem worth solving?</p><h2>Let’s make something<br /><em>meaningful.</em></h2><p>I’m open to conversations, collaborations, and interesting opportunities.</p><div className="contact-actions"><button className="button button-light copy-button" onClick={copyEmail}>{emailCopied ? "Email copied ✓" : "Copy email"}</button><ExternalLink className="button button-light" href="https://www.linkedin.com/in/rishil-mittal/">LinkedIn ↗</ExternalLink><ExternalLink className="button button-light" href={resumeUrl}>Download resume ↗</ExternalLink></div><p className="email-display">rishil.mittal009@gmail.com</p></div><form className="contact-form" onSubmit={handleContactSubmit}><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@example.com" /></label><label>Message<textarea required name="message" rows={4} placeholder="Tell me what you’re building..." /></label><button className="button button-primary" type="submit">Send message <span>→</span></button></form></div></section>
    </main>

    <footer className="site-footer section-shell"><span>© 2026 Rishil Mittal</span><span>Designed & built with curiosity <i>✳</i></span><button onClick={() => setTheme(theme === "midnight" ? "laboratory" : "midnight")}>Switch theme</button><a href="#top">Back to top ↑</a></footer>

    <button className="assistant-trigger" onClick={() => setAssistantOpen((open) => !open)} aria-label="Open portfolio assistant">✦</button>
    {assistantOpen && <aside className="assistant-card"><button onClick={() => setAssistantOpen(false)} aria-label="Close assistant">×</button><p className="eyebrow">Portfolio assistant</p><h3>Ask about Rishil.</h3><p>Rishil is an AI/ML builder focused on LLMs, computer vision and useful products.</p><div className="assistant-links"><a href="#work" onClick={() => setAssistantOpen(false)}>View projects →</a><a href="#contact" onClick={() => setAssistantOpen(false)}>Contact him →</a></div></aside>}
    {commandOpen && <div className="command-backdrop" onClick={(event) => event.target === event.currentTarget && setCommandOpen(false)}><div className="command-palette" role="dialog" aria-modal="true"><p className="eyebrow">Quick navigation</p><h3>Where should we go?</h3>{[["work", "Explore projects"], ["stack", "View technology stack"], ["about", "Read about Rishil"], ["contact", "Start a conversation"]].map(([id, label]) => <button key={id} onClick={() => navigate(id)}>{label}<span>↵</span></button>)}<small>Press Ctrl K anytime to open</small></div></div>}
    {caseStudy && <div className="case-backdrop" onClick={(event) => event.target === event.currentTarget && setCaseStudy(null)}><article className="case-modal" role="dialog" aria-modal="true"><button className="modal-close" onClick={() => setCaseStudy(null)} aria-label="Close project details">×</button>{caseStudy.image && <img src={caseStudy.image} alt="" /> }<p className="eyebrow">Project / {caseStudy.language}</p><h2>{caseStudy.title}</h2><p>{caseStudy.details}</p><div className="tag-row">{caseStudy.stack.map((tag) => <span key={tag}>{tag}</span>)}</div><ExternalLink className="button button-primary" href={`https://github.com/JetJerry/${caseStudy.id}`}>View repository ↗</ExternalLink></article></div>}
  </>;
}
