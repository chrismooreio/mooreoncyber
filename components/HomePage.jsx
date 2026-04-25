// Home page
const { useState: useStateHome } = React;

function HomePage({ navigate }) {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-meta">
            <span>Commercial &amp; Federal Cyber Architect</span>
            <span>Sentinel</span>
            <span>Defender XDR</span>
            <span>Purview</span>
            <span>Writing weekly</span>
            <span className="no-dot">Available Now</span>
          </div>

          <div className="hero-grid">
            <div>
              <h1 className="display hero-h1">
                Cloud security,<br />
                <em>extracted</em>—<br />
                not&nbsp;accumulated.
              </h1>

              <p className="hero-sub">
                Most organizations are running their Cloud security stack at 20% capacity. E5 licensed. Sentinel deployed. Defender XDR untuned. Purview unconfigured. I'm the operator you bring in when the spend is already booked and the value still isn't showing up.
              </p>

              <div className="hero-actions">
                <a href="#newsletter" className="btn btn-primary" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
                }}>Subscribe to the Memo</a>
                <a href="#" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); navigate('writing'); }}>Read Field Reports</a>
              </div>

              <ul className="credential-strip">
                <li><span>CISSP</span><em>ACTIVE</em></li>
                <li><span>AZ-500</span><em>ACTIVE</em></li>
                <li><span>SC-200</span><em>ACTIVE</em></li>
                <li><span>SC-100</span><em>ACTIVE</em></li>
                <li><span>U.S. ARMY 12B</span><em>2015–2022</em></li>
              </ul>
            </div>

            <figure className="hero-portrait-frame">
              <img src="assets/chris-moore.jpg" alt="Christopher Moore — Federal Cyber Architect" />
              <figcaption>
                <span className="hero-portrait-label">// Operator</span>
                <span className="hero-portrait-name">Christopher Moore</span>
                <span className="hero-portrait-title">Moore Security Group LLC · Scottsdale, AZ</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <AsciiDivider>░░░░ COMMERCIAL // FEDERAL // CLEARED ░░░░</AsciiDivider>

      {/* THESIS */}
      <section className="section">
        <div className="container">
          <div className="section-label">01 / The Thesis</div>
          <h2 className="section-title display">
            Your license is <em>already paid for.</em><br />
            The value isn't getting extracted.
          </h2>
          <p className="section-intro">
            Commercial enterprises and federal contractors are buying Cloud security licenses they're using at 20% capacity. E5 stacks sitting idle. Sentinel workspaces collecting logs nobody queries. Defender XDR deployed and untuned. Purview purchased and unconfigured. The spend is booked. The value isn't.
          </p>

          <div className="problems-grid">
            <ProblemCard num="// 01" title={<>GCCHigh Sentinel <em>isn't</em> commercial Sentinel.</>} body="Connector gaps, ASIM normalization edge cases, CMMC overlap — most teams underestimate how different the sovereign cloud is until deployment slips six months. I've shipped it multiple times." />
            <ProblemCard num="// 02" title={<>DISA STIG automation, <em>without</em> breaking workloads.</>} body="PowerSTIG, Azure Machine Configuration, custom Sentinel evidence tables. Automated hardening that survives audits and doesn't wreck production." />
            <ProblemCard num="// 03" title={<>SOAR that the SOC <em>actually</em> uses.</>} body="Three-tier Logic App architecture — orchestrator, decision engine, execution — with DomainTools, FortiAnalyzer, BloxOne, and Defender ATP enrichment. Real SOAR, not demo-ware." />
            <ProblemCard num="// 04" title={<>Agentic cyber is <em>coming</em> — most shops aren't ready.</>} body="MCP servers, agent workflows, AI-native detection engineering. The defenders who integrate this early keep the advantage. The ones who wait become the training data." />
          </div>
        </div>
      </section>

      {/* RECENT WRITING */}
      <section className="section">
        <div className="container">
          <div className="section-label">02 / Recent Field Reports</div>
          <h2 className="section-title display">
            Writing for <em>operators,</em><br />
            not buyers.
          </h2>
          <p className="section-intro">
            I publish weekly. No vendor pitches, no recycled Gartner takes — just practical pieces on what I'm actually building across commercial and federal Cloud environments and the wider agentic cyber surface.
          </p>

          <div className="writing-list">
            <a href="#" className="writing-card" onClick={(e) => { e.preventDefault(); navigate('post'); }}>
              <div className="writing-meta">
                <span className="writing-tag">Agentic</span>
                <span className="writing-date">Apr 22, 2026</span>
              </div>
              <h3 className="writing-title">The Agentic SOC, MCP, and the Security Data Lake Problem</h3>
              <p className="writing-excerpt">
                Why the next generation of SOC automation lives in the data lake, not the SIEM — and how MCP servers change who gets to query it.
              </p>
              <div className="writing-read-more">Read the field report →</div>
            </a>
            <a href="#" className="writing-card writing-card-ghost" onClick={(e) => { e.preventDefault(); navigate('writing'); }}>
              <div className="writing-meta">
                <span className="writing-tag">GCCHigh</span>
                <span className="writing-date">Coming soon</span>
              </div>
              <h3 className="writing-title">The GCCHigh Sentinel Deployment Playbook</h3>
              <p className="writing-excerpt">
                Connector gaps, ASIM edge cases, the M365 → Sentinel pipeline in sovereign cloud, and every mistake I've watched primes make.
              </p>
              <div className="writing-read-more">Subscribe to get it first →</div>
            </a>
            <a href="#" className="writing-card writing-card-ghost" onClick={(e) => { e.preventDefault(); navigate('writing'); }}>
              <div className="writing-meta">
                <span className="writing-tag">SOAR</span>
                <span className="writing-date">Coming soon</span>
              </div>
              <h3 className="writing-title">Three-Tier Logic App SOAR — Commercial &amp; Federal</h3>
              <p className="writing-excerpt">
                Orchestrator / decision engine / execution — the architecture I ship when SOCs are drowning in alerts and Logic Apps have turned into spaghetti.
              </p>
              <div className="writing-read-more">Subscribe to get it first →</div>
            </a>
          </div>

          <div style={{ marginTop: 48 }}>
            <a href="#" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); navigate('writing'); }}>View All Writing</a>
          </div>
        </div>
      </section>

      <Newsletter />

      {/* TIERS */}
      <section className="section" id="engage">
        <div className="container">
          <div className="section-label">03 / Work Together</div>
          <h2 className="section-title display">
            Three ways in. <em>No retainer traps.</em>
          </h2>
          <p className="section-intro">
            Every engagement starts with a scoping call and ends with a defined deliverable. No open-ended hourly contracts, no scope creep, no surprise invoices.
          </p>
          <Tiers navigate={navigate} />
          <div style={{ marginTop: 48 }}>
            <a href="#" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); navigate('services'); }}>View All Services</a>
          </div>
        </div>
      </section>
    </>
  );
}

function ProblemCard({ num, title, body }) {
  return (
    <div className="problem">
      <div className="problem-number">{num}</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

function Tiers({ navigate }) {
  const go = (e) => { e.preventDefault(); navigate('contact'); };
  return (
    <div className="tiers">
      <div className="tier">
        <div className="tier-name">// Targeted</div>
        <h3 className="tier-title">Targeted Engagement</h3>
        <div className="tier-price">Fixed scope · From $2,500</div>
        <p className="tier-description">
          One-off engagements where you need senior cyber expertise applied to a specific problem. Two weeks or less, defined scope, defined deliverable.
        </p>
        <ul className="tier-features">
          <li>Single-scope project</li>
          <li>Fixed-fee, fixed-timeline</li>
          <li>2-week delivery typical</li>
          <li>Written deliverable + walkthrough</li>
        </ul>
        <a href="#" className="btn btn-secondary" onClick={go}>Inquire</a>
      </div>
      <div className="tier tier-featured">
        <div className="tier-name">// Advisory</div>
        <h3 className="tier-title">Strategic Security Advisory</h3>
        <div className="tier-price">Monthly retainer · From $4,500/mo</div>
        <p className="tier-description">
          Your on-call senior cyber architect — strategic, not hands-on. Three engagement levels for commercial, federal, and active-deployment cadences.
        </p>
        <ul className="tier-features">
          <li>10–20 strategic hours / month</li>
          <li>Architecture review access</li>
          <li>Vendor &amp; tooling guidance</li>
          <li>Slack / Teams direct line</li>
        </ul>
        <a href="#" className="btn btn-primary" onClick={go}>Book Intro</a>
      </div>
      <div className="tier">
        <div className="tier-name">// Build</div>
        <h3 className="tier-title">Done-For-You Build</h3>
        <div className="tier-price">Project-based · From $25,000</div>
        <p className="tier-description">
          End-to-end implementation across the Cloud security stack. GCC High Sentinel quick-start, SOAR architecture, KQL detection packs, or MCP agent workflows — delivered in 2–12 weeks.
        </p>
        <ul className="tier-features">
          <li>Fixed-scope, fixed-price</li>
          <li>2–12 week delivery windows</li>
          <li>Full documentation</li>
          <li>30-day post-launch support</li>
        </ul>
        <a href="#" className="btn btn-secondary" onClick={go}>Scope a Build</a>
      </div>
    </div>
  );
}

Object.assign(window, { HomePage, Tiers });
