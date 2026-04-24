// About, Writing index, Services, Agentic Cyber, Contact, Post pages

function AboutPage({ navigate }) {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="section-label">// About</div>
          <h1 className="page-title display">
            Six years <em>Army.</em><br />
            Seven years <em>cyber.</em><br />
            Same instincts.<br />
            Different adversary.
          </h1>
        </div>
      </section>

      <AsciiDivider>░░░ OPERATOR NOTES ░░░</AsciiDivider>

      <section className="section about-section">
        <div className="container-prose">
          <div className="portrait-block">
            <div className="portrait-placeholder">
              <span className="portrait-meta">CM · PORTRAIT</span>
            </div>
            <div className="portrait-caption">
              <div className="portrait-name">Christopher Moore</div>
              <div className="portrait-title">Commercial &amp; Federal Cyber Architect · Moore Security Group LLC</div>
            </div>
          </div>

          <div className="prose">
            <p>
              I enlisted in 2015 and spent six years as a 12B combat engineer — a sapper. Route clearance. Breaching. The kind of work where pattern recognition keeps your team alive and <em>ops tempo</em> isn't a buzzword. I left in 2022 with a cybersecurity degree already in hand and went straight into the work.
            </p>
            <p>
              The job is still pattern recognition under pressure. It's still leading small teams through problems nobody else wants to touch. The uniform changed. The posture didn't.
            </p>

            <h2>Why this practice exists</h2>
            <p>
              Commercial enterprises and federal contractors are buying Cloud security licenses they're using at 20% capacity. E5 stacks sitting idle. Sentinel workspaces collecting logs nobody queries. Defender XDR deployed and untuned. Purview purchased and unconfigured. The spend is already booked — the value isn't getting extracted.
            </p>
            <blockquote>
              Most consultants sell you more tooling. I make the tooling you already own actually work. That's the practice.
            </blockquote>
            <p>
              Commercially fluent, federal-native. Most of the stack I work in is the same on both sides — but commercial and federal Cloud licenses, endpoints, and feature availability diverge in ways that break any architecture copied from one to the other. The hardest environments I've operated in are sovereign — GCC High, DISA-constrained, cleared programs — and those constraints make everything else look easy. If I can ship Sentinel into Azure Government against a cabinet-level agency tenant, I can ship it into your commercial Azure on a Tuesday.
            </p>

            <h2>What makes me different</h2>
            <p>
              I'm the operator, not the salesperson. If I'm on the contract, I'm the one writing KQL at 2 PM after sitting with your CIO at 10 AM — no hand-off to a junior, no white-labeled subcontractor doing the actual work.
            </p>
            <p>
              Seven years deep in the Cloud security stack across <strong>ReliaQuest, Southern Company, Follett, Alaska Airlines, IBM Federal, and Lumen</strong> means I've seen the same architectural mistakes in commercial, federal, and everywhere in between. I currently hold a forward-deployed engineering role at <strong>Tenex</strong>, a Series B a16z-backed AI-native MDR company, which keeps me hands-on with agentic SOC workflows and the Google Cloud security surface at the same time.
            </p>
            <p>Commercial scale. Federal depth. No pigeonhole.</p>

            <h2>Recent work worth mentioning</h2>
            <p>A few representative pieces of work — anonymized where required, specific where permitted:</p>

            <h4>// Three-Tier Logic App SOAR Architecture</h4>
            <p>
              Orchestrator, decision engine, execution — integrating DomainTools, FortiAnalyzer, BloxOne, and Defender ATP enrichment. Real SOAR that the SOC actually uses. Shipped for a federal prime supporting a cabinet-level agency tenant in Azure Government.
            </p>

            <h4>// DISA STIG Automation Pipeline</h4>
            <p>
              PowerSTIG, Azure Machine Configuration, custom Sentinel evidence tables. MOF successfully compiled against a five-phase architecture that survives audits without breaking production workloads.
            </p>

            <h4>// Defender for Cloud Remediation at Scale</h4>
            <p>
              Arc VM <code>noScanData</code> root-cause analysis, <code>offByPolicy</code> NSG finding disposition across a hub-and-spoke architecture, and durable Azure Policy exemption patterns when the DfC portal falls short on deprecated recommendations. The unglamorous plumbing that separates a clean posture from a noisy one.
            </p>

            <h2>What I'm building toward</h2>
            <p>
              In three years, this practice is the commercial and federal advisory shop that enterprises, primes, and cleared programs call when their Cloud security stack is underperforming and they've run out of patience for vendor pitches.
            </p>
            <p>
              Boutique by design. Known for <em>extraction, not accumulation.</em> The operator you bring in when the license is already paid for and the value still isn't showing up.
            </p>

            <hr />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--bone-ghost)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Based in North Scottsdale, AZ · Engagements run fully remote with periodic on-site as required · U.S. clients only
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-label">// By the Numbers</div>
          <div className="stats-grid">
            <div className="stat"><div className="stat-number">6</div><div className="stat-label">Years · U.S. Army</div></div>
            <div className="stat"><div className="stat-number">7+</div><div className="stat-label">Years · Cybersecurity</div></div>
            <div className="stat"><div className="stat-number">GCCHigh</div><div className="stat-label">Sovereign Cloud</div></div>
            <div className="stat"><div className="stat-number">4</div><div className="stat-label">Active Cloud Certs</div></div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}

// ==========================================

const POSTS = [
  {
    slug: 'agentic-soc-mcp-data-lake',
    title: 'The Agentic SOC, MCP, and the Security Data Lake Problem',
    description: "Why the next generation of SOC automation lives in the data lake, not the SIEM — and how MCP servers change who gets to query it.",
    publishDate: 'Apr 22, 2026',
    publishDateLong: 'April 22, 2026',
    tags: ['Agentic', 'MCP', 'Sentinel', 'Data Lake', 'Detection Engineering'],
    readTime: '9 min',
    live: true,
  },
  {
    slug: 'unused-microsoft-licenses',
    title: "Why 80% of Federal Cloud Security Licenses Are Unused",
    description: "The core thesis behind the practice — the extraction vs accumulation problem. Why the spend is already booked and the value still isn't showing up.",
    publishDate: 'May 5, 2026',
    tags: ['Cloud', 'Federal', 'Operator Take'],
    readTime: '7 min',
    live: false,
  },
  {
    slug: 'gcchigh-sentinel-deployment-playbook',
    title: 'The GCCHigh Cloud Sentinel Deployment Playbook',
    description: "Connector gaps, ASIM edge cases, the M365 → Sentinel pipeline in sovereign cloud, and every mistake I've watched primes make.",
    publishDate: 'May 26, 2026',
    tags: ['GCCHigh', 'Sentinel', 'Pillar Guide'],
    readTime: '18 min',
    live: false,
  },
  {
    slug: 'logic-app-soar-architecture',
    title: 'The Three-Tier Logic App SOAR Architecture',
    description: "Orchestrator, decision engine, execution — the SOAR pattern I ship when SOCs are drowning in alerts and Logic Apps have turned into spaghetti.",
    publishDate: 'Jul 7, 2026',
    tags: ['SOAR', 'Logic Apps', 'Pillar Guide'],
    readTime: '14 min',
    live: false,
  },
];

function WritingIndexPage({ navigate }) {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="section-label">// Writing</div>
          <h1 className="page-title display">
            Field reports from inside<br />
            the <em>Cloud security</em> stack.
          </h1>
          <p className="page-intro">
            Weekly pieces on Sentinel, Defender XDR, STIG automation, agentic SOC, commercial-vs-GCCHigh licensing divergence, and the sovereign-cloud plumbing most consultants can't actually work in. Written for operators, by an operator. No fluff, no vendor pitches.
          </p>
        </div>
      </section>

      <AsciiDivider>░░░ THE ARCHIVE ░░░</AsciiDivider>

      <section className="section writing-archive">
        <div className="container">
          <div className="posts-list">
            {POSTS.map((post) => (
              <a
                key={post.slug}
                href="#"
                className={`post-row ${post.live ? '' : 'post-row-ghost'}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (post.live) navigate('post');
                }}
              >
                <div className="post-row-date">{post.publishDate}</div>
                <div className="post-row-content">
                  <div className="post-row-tags">
                    {post.tags.slice(0, 3).map((t) => (
                      <span key={t} className="post-row-tag">{t}</span>
                    ))}
                  </div>
                  <h2 className="post-row-title">{post.title}</h2>
                  <p className="post-row-description">{post.description}</p>
                </div>
                <div className="post-row-meta">
                  <span className="post-row-readtime">{post.live ? post.readTime : 'Upcoming'}</span>
                  <span className="post-row-arrow">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}

// ==========================================

function ServicesPage({ navigate }) {
  const services = [
    {
      num: '01',
      title: 'Commercial & Federal Cybersecurity Consulting',
      tagline: 'Direct to enterprises, primes, end clients, and sub-contract vehicles.',
      body: "Architecture review, security program uplift, CMMC readiness, and Cloud-native commercial and GCCHigh engagements. Licensing, endpoints, and feature parity mapped across both sides — most templates copied from commercial to federal silently fail. Works at the speed of a cleared operator who's shipped this work before, not at the speed of a generic consulting firm learning on your dime.",
      tags: ['Commercial', 'GCCHigh', 'CMMC L2', 'Licensing', 'Architecture Review'],
    },
    {
      num: '02',
      title: 'Curriculum & Training Authorship',
      tagline: 'Course development for Cloud Sentinel, Defender XDR, Purview.',
      body: 'Training material written by someone who ships in production. For consulting firms building internal capability, for certification platforms needing technical accuracy, for federal programs standing up new cyber curricula. Every lesson is tested against a real environment before it reaches a student.',
      tags: ['Sentinel', 'Defender XDR', 'Purview', 'Course Design'],
    },
    {
      num: '03',
      title: 'Assessment Framework Development',
      tagline: 'Methodologies, maturity models, repeatable evaluation frameworks.',
      body: "For consulting firms and federal contractors who need to productize their security services. I'll design the rubric, author the controls, build the scoring model, and document the delivery playbook so your team can run it consistently across engagements.",
      tags: ['Methodology', 'Maturity Models', 'Productization'],
    },
    {
      num: '04',
      title: 'KQL Detection Engineering',
      tagline: 'Custom Sentinel analytics, ASIM normalization, multi-tenant MDR.',
      body: 'Detection content tuned for federal and defense workloads. Custom Sentinel analytic rules that actually match your threat model, ASIM normalization for cross-source correlation, and multi-tenant architecture for MSSPs and primes running Sentinel MDR at scale.',
      tags: ['KQL', 'ASIM', 'Multi-Tenant', 'Detection Engineering'],
    },
    {
      num: '05',
      title: 'Expert Witness',
      aside: '/ Independent',
      tagline: 'Cybersecurity expert witness engagements for litigation support.',
      body: 'Handled through a separate professional structure. Case inquiries routed through established expert directories and direct attorney relationships. Federal Cloud security, incident response, and cloud architecture disputes — areas where actual practice matters more than theoretical opinion.',
      tags: ['Litigation', 'Cyber Forensics', 'Deposition & Trial'],
    },
  ];

  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="section-label">// Services</div>
          <h1 className="page-title display">
            Five pillars.<br />
            <em>One operator.</em><br />
            No pass-offs.
          </h1>
          <p className="page-intro">
            Everything I deliver is hands-on work from a practicing cyber architect — not a salesperson, not a junior associate, not a white-labeled subcontractor. Commercial enterprises, federal primes, cleared programs. If I'm on the contract, I'm building the thing.
          </p>
        </div>
      </section>

      <AsciiDivider>▸ ▸ ▸ &nbsp; WHAT I DELIVER &nbsp; ◂ ◂ ◂</AsciiDivider>

      <section className="section">
        <div className="container">
          <div className="section-label">01 / Core Services</div>
          <div className="services-detail">
            {services.map((s) => (
              <div className="service-detail-row" key={s.num}>
                <div className="service-detail-number">{s.num}</div>
                <div className="service-detail-content">
                  <h3>
                    {s.title}
                    {s.aside && <span className="service-detail-aside"> {s.aside}</span>}
                  </h3>
                  <p className="service-detail-tagline">{s.tagline}</p>
                  <p className="service-detail-body">{s.body}</p>
                  <div className="service-detail-tags">
                    {s.tags.map((t) => (
                      <span key={t} className="service-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-label">02 / Engagement Models</div>
          <h2 className="section-title display">
            Three ways in. <em>No retainer traps.</em>
          </h2>
          <p className="section-intro">
            Every engagement starts with a scoping call and ends with a defined deliverable. No open-ended hourly contracts, no scope creep, no surprise invoices.
          </p>
          <Tiers navigate={navigate} />
        </div>
      </section>

      <Newsletter />
    </>
  );
}

// ==========================================

function AgenticCyberPage({ navigate }) {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="section-label">// Agentic Cyber</div>
          <h1 className="page-title display">
            The agent isn't<br />
            replacing the SOC.<br />
            It's the <em>query layer</em><br />
            between them.
          </h1>
          <p className="page-intro">
            MCP servers, agent architectures for security operations, and AI-native workflow automation. Where commercial and federal Cloud security meet the agent infrastructure most teams are still six months away from needing.
          </p>
        </div>
      </section>

      <AsciiDivider>░░░ AI // AUTOMATION // SECURITY ░░░</AsciiDivider>

      <section className="section">
        <div className="container-prose">
          <div className="section-label">01 / Why This Exists</div>
          <div className="prose">
            <p>Most SOC automation lives inside the SIEM. That made sense for a decade. It doesn't anymore.</p>
            <p>The data analysts actually need during investigations isn't in the SIEM. It's in the lake. In the IdP. In the threat intel platform. In the ticketing system. In ten other places nobody queries during an incident because the pivot cost is too high.</p>
            <p>Agentic cyber — done right — solves exactly this problem. It's not about replacing analysts with AI. It's about giving the agent access to every data source the analyst would query if they had time, and letting the agent do the pivoting.</p>
            <p><strong>The practices that build this capability first keep the advantage. The ones that wait become the training data.</strong></p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-label">02 / What I Build</div>
          <div className="capabilities-grid">
            <Capability code="MCP" title="MCP Server Development" body="Custom Model Context Protocol servers exposing security data sources to agents. Sentinel, Defender XDR, Entra, Purview, lake queries, threat intel platforms, ticketing — typed, authenticated, permissioned interfaces that an agent can actually compose against." />
            <Capability code="AGT" title="Agentic SOC Architecture" body={`End-to-end design for agent-assisted investigation workflows. Alert routing, tool composition, guardrails, human-in-the-loop policy enforcement, audit-grade observability. Built for federal constraints where "the model decided" isn't an acceptable answer.`} />
            <Capability code="DET" title="AI-Native Detection Engineering" body="Detection content designed to operate alongside agent-assisted triage. Alerts that return context-rich payloads, not flat incident tickets. KQL queries that produce structured input for downstream agent investigation rather than opaque tables." />
            <Capability code="GOV" title="Federal Agentic Architecture" body="The GCCHigh version of all of the above. In-tenant model hosting, Azure OpenAI deployment patterns, FedRAMP-compliant observability, and evidence collection that survives an audit. The 6–18 month lead commercial shops have — closed." />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-label">03 / Who This Is For</div>
          <h2 className="section-title display">
            Primes. MSSPs.<br />
            <em>Forward-leaning</em> SOCs.
          </h2>
          <div className="audience-grid">
            <Audience n="// 01" title="Commercial Enterprises" body="Running Cloud security at scale and watching agent-assisted triage from the sidelines. Want a working prototype against their actual detection fabric — not a vendor slide deck." />
            <Audience n="// 02" title="Federal Primes" body="Building agentic capability into the next round of cyber contracts. Need someone who's operated in GCCHigh and understands the federal constraint model, not someone who's only deployed in commercial Azure." />
            <Audience n="// 03" title="Commercial MSSPs" body="Shipping multi-tenant Sentinel and looking to differentiate with agent-assisted investigation. Already have the detection fabric — need the MCP layer and the orchestration architecture." />
            <Audience n="// 04" title="Security Product Companies" body="Building MCP-compatible tooling or agent-adjacent security products. Need domain expertise from someone who has run commercial and federal SOCs and knows what breaks under real load." />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-label">04 / Read More</div>
          <h2 className="section-title display">
            Field reports on <em>the agentic stack.</em>
          </h2>
          <a href="#" className="reading-card" onClick={(e) => { e.preventDefault(); navigate('post'); }}>
            <div className="reading-card-meta">
              <span className="reading-card-tag">Agentic · MCP · Data Lake</span>
              <span className="reading-card-date">Apr 22, 2026</span>
            </div>
            <h3>The Agentic SOC, MCP, and the Security Data Lake Problem</h3>
            <p>Why the next generation of SOC automation lives in the data lake, not the SIEM — and how MCP servers change who gets to query it.</p>
            <div className="reading-card-cta">Read the field report →</div>
          </a>
        </div>
      </section>

      <Newsletter />
    </>
  );
}

function Capability({ code, title, body }) {
  return (
    <div className="capability">
      <div className="capability-icon">{code}</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

function Audience({ n, title, body }) {
  return (
    <div className="audience">
      <div className="audience-label">{n}</div>
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  );
}

// ==========================================

function ContactPage({ navigate }) {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="section-label">// Contact</div>
          <h1 className="page-title display">
            Got a Cloud security<br />
            problem?<br />
            <em>Let's scope it.</em>
          </h1>
          <p className="page-intro">
            30-minute scoping calls are free. No pitch, no deck — just a structured conversation about whether I'm the right operator for your problem. If yes, we talk scope and terms. If no, I'll point you toward who is.
          </p>
        </div>
      </section>

      <AsciiDivider>░░░ HOW TO REACH ME ░░░</AsciiDivider>

      <section className="section">
        <div className="container">
          <div className="section-label">01 / Intake Routes</div>
          <div className="intake-grid">
            <a href="mailto:chris@mooreoncyber.com" className="intake-card intake-card-primary">
              <div className="intake-card-label">// Primary</div>
              <h3>Scoping Call</h3>
              <p className="intake-tagline">30 minutes · Free · No sales pitch</p>
              <p className="intake-body">
                For anyone considering a commercial or federal cyber consulting engagement, curriculum project, assessment framework build, or agentic cyber prototype. Bring your actual problem. I'll tell you honestly whether I can help.
              </p>
              <div className="intake-cta">Email chris@mooreoncyber.com →</div>
            </a>
            <a href="mailto:chris@mooreoncyber.com" className="intake-card">
              <div className="intake-card-label">// Retainer</div>
              <h3>Strategic Advisory</h3>
              <p className="intake-tagline">Monthly retainer · From $4,500/mo</p>
              <p className="intake-body">
                On-call senior cyber architect — commercial, federal, or both. 10 strategic hours per month, architecture review access, vendor guidance, direct Slack or Teams line. For teams that need ongoing thinking-partner support, not a one-off project.
              </p>
              <div className="intake-cta">Inquire about fit →</div>
            </a>
            <a href="mailto:chris@mooreoncyber.com" className="intake-card">
              <div className="intake-card-label">// Delivery</div>
              <h3>Done-For-You Build</h3>
              <p className="intake-tagline">Fixed scope · From $25,000</p>
              <p className="intake-body">
                End-to-end delivery of a scoped security build. GCCHigh Sentinel quick-start, three-tier Logic App SOAR, KQL detection pack, STIG automation pipeline, or MCP agentic workflow. 2–8 week delivery windows.
              </p>
              <div className="intake-cta">Scope a build →</div>
            </a>
            <a href="mailto:chris@mooreoncyber.com" className="intake-card">
              <div className="intake-card-label">// Independent</div>
              <h3>Expert Witness Inquiry</h3>
              <p className="intake-tagline">Separate professional structure</p>
              <p className="intake-body">
                For attorneys and litigation support teams. Federal Cloud security, incident response disputes, cloud architecture matters. Cases routed through established expert directories or direct counsel relationships.
              </p>
              <div className="intake-cta">Case inquiry →</div>
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-label">02 / Direct Channels</div>
          <h2 className="section-title display">
            Where I <em>actually</em> read.
          </h2>
          <div className="channels-grid">
            <div className="channel">
              <div className="channel-label">// Email</div>
              <a href="mailto:chris@mooreoncyber.com" className="channel-address">chris@mooreoncyber.com</a>
              <p className="channel-desc">Preferred for anything project-related. I read and respond within 1–2 business days.</p>
            </div>
            <div className="channel">
              <div className="channel-label">// LinkedIn</div>
              <a href="#" className="channel-address" onClick={(e) => e.preventDefault()}>linkedin.com/in/christopher-moore</a>
              <p className="channel-desc">Best for professional introductions and lighter questions. Accept connection requests with a note.</p>
            </div>
            <div className="channel">
              <div className="channel-label">// Newsletter</div>
              <a href="#newsletter" className="channel-address">Moore Cyber Memo</a>
              <p className="channel-desc">The fastest way to stay in my orbit. Weekly field reports, zero noise, one-click unsubscribe.</p>
            </div>
            <div className="channel">
              <div className="channel-label">// Location</div>
              <span className="channel-address">North Scottsdale, AZ</span>
              <p className="channel-desc">Remote-first. On-site engagements available for commercial enterprise and federal / defense work requiring in-person presence.</p>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}

Object.assign(window, {
  AboutPage,
  WritingIndexPage,
  ServicesPage,
  AgenticCyberPage,
  ContactPage,
  POSTS,
});
