// Shared components for Moore on Cyber prototype
// React globals: React, useState, useEffect, useRef
const { useState, useEffect, useRef } = React;

// ===== NAV =====
function Nav({ currentPath, navigate }) {
  const items = [
    { path: 'home', label: 'Home' },
    { path: 'writing', label: 'Writing' },
    { path: 'services', label: 'Services' },
    { path: 'agentic-cyber', label: 'Agentic Cyber' },
    { path: 'about', label: 'About' },
  ];
  return (
    <nav className="site-nav">
      <a href="#" className="nav-brand" onClick={(e) => { e.preventDefault(); navigate('home'); }}>
        MOORE ON CYBER
      </a>
      <div className="nav-links">
        {items.map((it) => (
          <a
            key={it.path}
            href="#"
            className={currentPath === it.path ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); navigate(it.path); }}
          >
            {it.label}
          </a>
        ))}
      </div>
      <a
        href="#"
        className="nav-cta"
        onClick={(e) => { e.preventDefault(); navigate('contact'); }}
      >
        Contact
      </a>
    </nav>
  );
}

// ===== FOOTER =====
function Footer({ navigate }) {
  const nav = (e, p) => { e.preventDefault(); navigate(p); };
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand-name">Christopher Moore</div>
          <p className="footer-brand-desc">
            Commercial and federal cybersecurity architecture. Cloud security extraction, not accumulation. Practicing operator, not a vendor. Written under Moore Security Group LLC.
          </p>
        </div>
        <div>
          <div className="footer-heading">Site</div>
          <ul className="footer-links">
            <li><a href="#" onClick={(e) => nav(e, 'home')}>Home</a></li>
            <li><a href="#" onClick={(e) => nav(e, 'writing')}>Writing</a></li>
            <li><a href="#" onClick={(e) => nav(e, 'services')}>Services</a></li>
            <li><a href="#" onClick={(e) => nav(e, 'agentic-cyber')}>Agentic Cyber</a></li>
            <li><a href="#" onClick={(e) => nav(e, 'about')}>About</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-heading">Engage</div>
          <ul className="footer-links">
            <li><a href="#" onClick={(e) => nav(e, 'contact')}>Scoping Call</a></li>
            <li><a href="#" onClick={(e) => nav(e, 'contact')}>Advisory</a></li>
            <li><a href="#" onClick={(e) => nav(e, 'contact')}>Build</a></li>
            <li><a href="#" onClick={(e) => nav(e, 'contact')}>Expert Witness</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-heading">Subscribe</div>
          <ul className="footer-links">
            <li><a href="#newsletter">Moore Cyber Memo</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>RSS Feed</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 Moore Security Group LLC</div>
        <div>Scottsdale, AZ · U.S. Federal &amp; Commercial</div>
      </div>
    </footer>
  );
}

// ===== NEWSLETTER =====
function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubmitted(true);
  };
  return (
    <section className="section" id="newsletter">
      <div className="container">
        <div className="newsletter-block">
          <div className="newsletter-label">// Moore Cyber Memo · Weekly</div>
          <h3 className="display">
            Field reports from inside<br />
            the <em>Cloud security</em> stack.
          </h3>
          <p>
            Every week, one practical piece on Sentinel, Defender XDR, STIG automation, agentic SOC, or the GCCHigh plumbing most consultants can't actually work in. Written for operators, by an operator. No fluff, no vendor pitches.
          </p>
          {submitted ? (
            <div className="newsletter-success">
              ✓ SUBSCRIBED — CHECK {email.toUpperCase()} FOR CONFIRMATION
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={onSubmit}>
              <input
                type="email"
                name="email"
                placeholder="operator@yourdomain.gov"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          )}
          <div className="newsletter-meta">
            Private · No spam · Unsubscribe in one click
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Reveal-on-scroll (auto-wraps .section) =====
function useRevealObserver(deps) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section:not(.reveal)').forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });
    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, deps || []);
}

// ===== ASCII DIVIDER =====
function AsciiDivider({ children }) {
  return <div className="ascii-divider">{children}</div>;
}

Object.assign(window, {
  Nav,
  Footer,
  Newsletter,
  AsciiDivider,
  useRevealObserver,
});
