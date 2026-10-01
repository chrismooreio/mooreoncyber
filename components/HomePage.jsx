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
          </div>

          <div className="hero-grid">
            <div>
              <h1 className="display hero-h1">
                You bought enterprise security.<br />
                Let's make it <em>act</em> like it.
              </h1>

              <p className="hero-sub">
                You licensed E5. Deployed Sentinel. Bought Defender XDR and Purview. Now you're watching the stack run at 20% capacity. That's the gap I close. Before renewal hits and the spend has to justify itself.
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
                <span className="hero-portrait-title">Moore Security Group LLC · Houston, TX</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <AsciiDivider>░░░░ COMMERCIAL // FEDERAL // CLEARED ░░░░</AsciiDivider>

      {/* WHO THIS IS FOR */}
      <section className="section">
        <div className="container">
          <div className="section-label">// Three audiences · One operator</div>
          <h2 className="section-title display">
            Who I <em>help.</em>
          </h2>
          <p className="section-intro">
            Initial deployment, Tuning, and Validating. I step in at any stage of the journey. Here's the version of "you" I work with most.
          </p>
          <div className="audience-grid audience-grid-3col">
            <div className="audience">
              <div className="audience-label">// 01</div>
              <h4>Commercial security leaders</h4>
              <p>Your E5 is licensed. Sentinel and Defender XDR are deployed. The dashboards are green and your CFO still doesn't know what the license actually bought. You want the value extracted before renewal — without buying more tools.</p>
            </div>
            <div className="audience">
              <div className="audience-label">// 02</div>
              <h4>Federal primes &amp; cleared programs</h4>
              <p>GCC High Sentinel slipping. STIG automation breaking workloads. CMMC Level 2 readiness on the calendar. You need an operator who has actually shipped this into Azure Government — not someone reading the documentation alongside you.</p>
            </div>
            <div className="audience">
              <div className="audience-label">// 03</div>
              <h4>MSSP &amp; MDR practices</h4>
              <p>Multi-tenant Sentinel, KQL detection packs, and an agentic SOC roadmap your competitors haven't shipped yet. You need someone who's run both the customer side and the operator side.</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE JOURNEY */}
      <section className="section">
        <div className="container">
          <div className="section-label">01 / The Journey</div>
          <h2 className="section-title display">
            Wherever you are. <em>One operator.</em>
          </h2>
          <p className="section-intro">
            Most Cloud security work falls into one of four stages. Most consultants only do one or two. I work the whole journey — and if you're not sure where you are, that's the first scoping-call question.
          </p>

          <div className="problems-grid">
            <ProblemCard num="// 01 · Deploy" title={<>Initial <em>deployment.</em></>} body="Sentinel quick-start, Defender XDR baseline, Purview foundation, Intune and Entra setup, GCC High tenant architecture. Greenfield builds or expansion into new tenants — built right the first time." />
            <ProblemCard num="// 02 · Tune" title={<><em>Tuning</em> what's deployed.</>} body="KQL detection authoring, alert prioritization, ASIM normalization, Conditional Access design, policy refinement. Turning green dashboards into detections that actually fire on real threats." />
            <ProblemCard num="// 03 · Validate" title={<><em>Validating</em> against the bar.</>} body="CMMC gap assessment, DISA STIG automation, audit-mode compliance verification, control mapping, evidence pipelines. Proving the stack does what you bought it for." />
            <ProblemCard num="// 04 · Operate" title={<>Long-term <em>operation.</em></>} body="Three-tier Logic App SOAR, agentic SOC integration, multi-tenant MSSP architecture, ongoing detection engineering. The defenders who integrate early keep the advantage. The ones who wait become the training data." />
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
            {(window.POSTS || []).filter((p) => p.live).slice(0, 3).map((post) => (
              <a key={post.slug} href="#" className="writing-card" onClick={(e) => { e.preventDefault(); navigate('post', post.slug); }}>
                <div className="writing-meta">
                  <span className="writing-tag">{post.tags[0]}</span>
                  <span className="writing-date">{post.publishDate}</span>
                </div>
                <h3 className="writing-title">{post.title}</h3>
                <p className="writing-excerpt">{post.description}</p>
                <div className="writing-read-more">Read the field report →</div>
              </a>
            ))}
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
            Six months from now: your Sentinel workspace fires on real threats, not the same three false positives. Your Defender XDR dashboard shows what it bought. Your CFO stops asking. Every engagement starts with a free scoping call and ends with a defined deliverable — no retainer traps, no scope creep, no surprise invoices.
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
          End-to-end implementation across the Microsoft security stack. GCC High Microsoft Sentinel quick-start, Azure Logic Apps SOAR architecture, KQL detection packs, or MCP agent workflows — delivered in 2–12 weeks.
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
