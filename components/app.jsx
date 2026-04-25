// Main App — compiled from the inline script in the prototype.
// useState / useEffect come from shared.js's top-level destructure (shared global lexical scope).
// Relies on window globals set by shared.js, HomePage.js, Pages.js, PostPage.js.

const TWEAK_DEFAULTS = { accentColor: 'lime', scanLines: true };

const ACCENTS = {
  lime:   { main: '#c3ff3a', dim: '#8aba20', label: 'LIME' },
  amber:  { main: '#ffb347', dim: '#c48126', label: 'AMBER' },
  cyan:   { main: '#5eead4', dim: '#3aa08c', label: 'CYAN' },
  red:    { main: '#ff5a4a', dim: '#c03828', label: 'RED' },
  bone:   { main: '#ebe4d8', dim: '#b8b1a4', label: 'BONE' },
};

function App() {
  const [page, setPage] = useState(() => localStorage.getItem('moc-page') || 'home');
  const [postSlug, setPostSlug] = useState(() => localStorage.getItem('moc-post-slug') || 'agentic-soc-mcp-data-lake');
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [accent, setAccent] = useState(TWEAK_DEFAULTS.accentColor);
  const [scanLines, setScanLines] = useState(TWEAK_DEFAULTS.scanLines);

  const navigate = (p, slug) => {
    setPage(p);
    localStorage.setItem('moc-page', p);
    if (slug !== undefined) {
      setPostSlug(slug);
      localStorage.setItem('moc-post-slug', slug);
    }
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }));
  };

  useEffect(() => {
    const a = ACCENTS[accent] || ACCENTS.lime;
    document.documentElement.style.setProperty('--accent', a.main);
    document.documentElement.style.setProperty('--accent-dim', a.dim);
  }, [accent]);

  useEffect(() => {
    document.body.style.setProperty('--scan-opacity', scanLines ? '1' : '0');
    if (!scanLines) {
      const style = document.getElementById('scan-toggle') || document.createElement('style');
      style.id = 'scan-toggle';
      style.textContent = 'body::after { display: none; }';
      document.head.appendChild(style);
    } else {
      const style = document.getElementById('scan-toggle');
      if (style) style.remove();
    }
  }, [scanLines]);

  useEffect(() => {
    const handler = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const persistEdit = (edits) => {
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
  };

  useRevealObserver([page]);

  let PageComponent = HomePage;
  if (page === 'about') PageComponent = AboutPage;
  else if (page === 'writing') PageComponent = WritingIndexPage;
  else if (page === 'services') PageComponent = ServicesPage;
  else if (page === 'agentic-cyber') PageComponent = AgenticCyberPage;
  else if (page === 'contact') PageComponent = ContactPage;
  else if (page === 'post') PageComponent = PostPage;

  return (
    <>
      <Nav currentPath={page} navigate={navigate} />
      <main key={page === 'post' ? `post-${postSlug}` : page} data-screen-label={`${page}`}>
        <PageComponent navigate={navigate} postSlug={postSlug} />
      </main>
      <Footer navigate={navigate} />

      {tweaksOpen && (
        <div className="tweaks-panel">
          <div className="tweaks-title">
            <span>// Tweaks</span>
            <span style={{ color: 'var(--bone-ghost)' }}>MOC v1</span>
          </div>

          <div className="tweak-group">
            <div className="tweak-label">Accent Color</div>
            <div className="swatch-row">
              {Object.entries(ACCENTS).map(([key, val]) => (
                <div
                  key={key}
                  className={`swatch ${accent === key ? 'active' : ''}`}
                  style={{ background: val.main }}
                  title={val.label}
                  onClick={() => { setAccent(key); persistEdit({ accentColor: key }); }}
                />
              ))}
            </div>
          </div>

          <div className="tweak-group">
            <div className="tweak-label">Scan Lines</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[true, false].map((v) => (
                <button
                  key={String(v)}
                  onClick={() => { setScanLines(v); persistEdit({ scanLines: v }); }}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    border: `1px solid ${scanLines === v ? 'var(--accent)' : 'var(--line-2)'}`,
                    color: scanLines === v ? 'var(--accent)' : 'var(--bone-dim)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  {v ? 'On' : 'Off'}
                </button>
              ))}
            </div>
          </div>

          <div className="tweak-group">
            <div className="tweak-label">Jump to Page</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {[
                ['home','Home'],['about','About'],['writing','Writing'],
                ['post','Post'],['services','Services'],['agentic-cyber','Agentic'],
                ['contact','Contact'],
              ].map(([k,lbl]) => (
                <button
                  key={k}
                  onClick={() => navigate(k)}
                  style={{
                    padding: '6px 8px',
                    border: `1px solid ${page===k?'var(--accent)':'var(--line-2)'}`,
                    color: page===k?'var(--accent)':'var(--bone-dim)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    background: 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
