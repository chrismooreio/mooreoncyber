// Individual post page — data-driven by slug.
// Looks up metadata from window.POSTS (defined in Pages.jsx) and body content from POSTS_CONTENT below.

const POSTS_CONTENT = {
  'agentic-soc-mcp-data-lake': () => (
    <>
      <p>Every federal SOC I've walked into in the last three years has the same shape. Sentinel on top. A lake of cold storage somewhere underneath — ADX, Log Analytics at basic tier, Purview, maybe Snowflake for the data science team that got budget last year. And a thick layer of Logic Apps and Python scripts bridging the two, written by whoever was on-call when the ask came in.</p>
      <p>The SIEM is where the SOC lives. The data lake is where the truth lives. The gap between them is where incidents hide.</p>
      <p>Agentic AI is about to change that gap. Not by making the SIEM smarter — by routing around it.</p>

      <h2>The data lake problem, before MCP</h2>
      <p>The orthodox architecture looks clean in a slide deck. Sentinel ingests your high-value telemetry — identity, endpoint, email, network. Analytic rules fire. Incidents surface. Analysts triage. Logic Apps automate the boring parts.</p>
      <p>Underneath that, you have the lake. Raw data that's too expensive to keep hot, too noisy to analyze in real time, too valuable to throw away. Authentication firehose. EDR process telemetry. Proxy logs. Cloud audit events. All of it sitting in cheap storage waiting for someone to ask a useful question.</p>
      <p>The problem is that nobody asks useful questions of the lake during incident response. Not because they don't want to — because the question-to-answer loop is too slow. You need to know the data schema, write the query in the lake's native language (KQL variant, SQL, whatever), run it, wait, iterate, and do all of that while the incident clock is running.</p>
      <p>So what happens in practice? Analysts query what's in Sentinel. They write detections against what's in Sentinel. They build SOAR playbooks against what's in Sentinel. The lake becomes a compliance artifact — evidence that the data was retained, not evidence that it was used.</p>
      <p>This is the silent failure mode of modern detection. Your detection surface is defined by your SIEM's hot tier budget, not by your actual threat model.</p>

      <h2>What MCP actually changes</h2>
      <p>Model Context Protocol isn't new technology. It's a standardized way for LLM-based agents to talk to external systems — tools, databases, APIs — through a defined interface. If you've used function calling with the OpenAI or Anthropic APIs, MCP is that pattern, extracted into a protocol so the tools become reusable across models and contexts.</p>
      <p>The reason MCP matters for the SOC isn't the AI capability itself. It's the <em>interface pattern</em>. MCP lets you expose a data source or a tool to an agent without the agent needing to know the underlying query language, schema, or authentication model. You write the adapter once. The agent composes queries against it indefinitely.</p>
      <p>Apply that to the data lake problem and the picture changes fast.</p>
      <ul>
        <li><strong>Yesterday:</strong> Analyst wants to check whether an impossible-travel alert in Sentinel correlates with proxy logs in the lake. They have to know the lake's schema, write the query themselves, pivot manually. In practice: they skip it.</li>
        <li><strong>With MCP:</strong> The lake is exposed as an MCP server. The agent receives the alert context, composes the query against the lake, returns the correlation in natural language. The analyst asks a question; the agent does the pivoting.</li>
      </ul>
      <p>The SIEM and the lake haven't merged. The retrieval layer has.</p>

      <h2>The architecture that emerges</h2>
      <p>Here's the shape of the agentic SOC I'm watching form up across the environments I work in. Generic enough to hold across clouds, opinionated where the design decisions matter.</p>
      <blockquote>The agent isn't replacing the SOC. The agent is the query layer between the SOC and everything the SOC has historically under-queried.</blockquote>
      <p>Four things sit at the core:</p>
      <p><strong>1. A detection fabric that still lives in the SIEM.</strong> Sentinel, Chronicle, Splunk — whatever. This is where high-confidence analytics run and incidents get generated. You don't move this into the agent. The SIEM is still the system of record for what the SOC is responding to.</p>
      <p><strong>2. MCP servers exposing every non-SIEM data source.</strong> The lake. The threat intel platform. The identity provider. The endpoint detection tool's raw API. The ticketing system. Each of these becomes a typed, authenticated, permissioned MCP endpoint. Writing these is the unglamorous work most teams skip — and it's where the leverage lives.</p>
      <p><strong>3. An agent orchestration layer.</strong> Could be Claude via API, could be local model, could be a commercial MDR product's agent layer (disclosure: I work at Tenex, which is building in exactly this lane). The agent takes alert context as input, has access to the MCP servers, and composes multi-step investigations.</p>
      <p><strong>4. A guardrails and observability layer around the agent.</strong> This is where most agentic SOC implementations go sideways. You need to log every tool call, every LLM generation, every outbound action. You need policy boundaries — the agent can read from the identity provider, but it cannot disable accounts without a human-in-the-loop approval. You need evaluation infrastructure — how do you know the agent is getting better instead of worse?</p>

      <h2>What this looks like during an actual investigation</h2>
      <p>Let me make this concrete. Here's a real-shape scenario I've run variations of in agentic SOC prototypes.</p>
      <p><strong>Alert fires in Sentinel:</strong> User account flagged for impossible travel — login from Houston at 2:03 PM CT, login from Kyiv at 3:47 PM CT. High severity, routed to tier-2 queue.</p>
      <p><strong>Traditional investigation flow:</strong> Analyst opens the incident. Checks the user's recent activity in M365. Queries Entra sign-in logs for the full 24-hour window. Pivots to Defender for Endpoint to check the device posture. Looks at the network flow logs if they have time, but probably doesn't because the log volume is too expensive to query interactively. Closes the ticket as legitimate VPN use based on partial evidence in about 22 minutes.</p>
      <p><strong>Agentic investigation flow:</strong> Incident routes to the agent first. The agent has MCP access to Entra, Defender, the proxy logs in the lake, the IdP session data, the user's recent ticket history, and the organization's travel system. In about 45 seconds:</p>
      <ul>
        <li>Pulls the full sign-in trajectory across Entra — confirms the Kyiv login used a legacy auth flow, not MFA</li>
        <li>Queries the proxy lake for the user's session immediately prior — finds the session origin was a known commercial VPN exit node, not a corporate VPN</li>
        <li>Checks the travel system — no approved travel for this user</li>
        <li>Pulls Defender posture — device compliance dropped 14 hours before the alert, exact time a persistent cookie would have been extractable from memory</li>
        <li>Checks the ticketing system — no recent password reset, no recent IT interaction</li>
      </ul>
      <p>The agent returns a structured investigation summary with confidence scores and evidence links. The analyst's job shifts from gathering evidence to deciding on response.</p>
      <p>This is not the agent replacing the analyst. This is the agent doing the 20 minutes of query-writing and context-assembly that the analyst was skipping anyway.</p>

      <h2>Why this is harder in GCCHigh</h2>
      <p>Everything above is easier to prototype in commercial Azure than in Azure Government, and easier in commercial cloud than in any sovereign environment. A few of the reasons:</p>
      <ul>
        <li><strong>API surface differences.</strong> Graph API in GCCHigh has a different base URL and, more importantly, different feature gating than commercial. Some endpoints lag by quarters. Your MCP adapters need to handle the delta cleanly.</li>
        <li><strong>Private networking requirements.</strong> Many federal tenants require that the agent infrastructure itself live in-tenant, private-linked to data sources, with no egress to public model providers. That pushes you toward Azure OpenAI in GCCHigh, or toward self-hosted open-weights models on in-tenant GPU, both of which have real deployment friction.</li>
        <li><strong>Audit and evidence retention.</strong> Every tool call the agent makes is a data point a FedRAMP auditor will want to see a year from now. You need to design for evidence collection as a first-class output, not as a bolt-on log pipeline.</li>
        <li><strong>Explainability as a compliance control.</strong> The agent reached a conclusion. Why? What did it query? What did it see? In a federal context, "the model decided" is not an acceptable answer. Your investigation outputs have to include the chain of evidence in a form that holds up in an incident review.</li>
      </ul>
      <p>None of these are reasons not to do it. They're reasons the federal version of this is 6–18 months behind where commercial MDR shops are already shipping. Which is also why the primes that build this capability internally — or bring in operators who have — are going to have a real advantage in the next wave of federal cyber contracts.</p>

      <h2>Where to start, if you're building this</h2>
      <p>If you're running a SOC and the above sounds like the direction you want to move, the order of operations matters. Most teams I talk to want to start with the agent. That's the wrong end of the problem.</p>
      <p><strong>Start with the MCP servers for your existing data sources.</strong> Pick the three data sources your analysts pivot to most during investigations. Expose each of them as an MCP server with typed query interfaces. Do this even before you pick an agent or model — the MCP layer is the long-lived asset. The model will change. The adapters shouldn't.</p>
      <p><strong>Then layer in an agent for a narrow, high-volume use case.</strong> Alert triage on a specific high-volume detection. Not your whole SOC. Not even your whole alert queue. Pick one detection that generates 30+ alerts a day and most of them are false positives. Measure triage time before and after. Iterate until the numbers move.</p>
      <p><strong>Then expand the tool surface, not the agent scope.</strong> The temptation is to give the agent more alerts. Resist it. The better move is to give the existing narrow agent more tools — more data sources, more enrichment adapters. Depth over breadth. An agent with great coverage on one alert class is more valuable than an agent with mediocre coverage on ten.</p>
      <p><strong>Build the observability and guardrails before you need them, not after.</strong> Every tool call logged. Every generation logged. Every outbound action behind a policy check. Eval sets that you can re-run after every model change. If you can't answer "how did the agent's performance change after we upgraded the model last week," you don't have an agentic SOC, you have a chatbot sitting on a data lake.</p>

      <h2>The part that actually matters</h2>
      <p>Strip away the architecture. The reason this matters, for the federal cyber operators reading this, is simpler than the stack diagram makes it look.</p>
      <p>The adversary has already figured out that the defenders are only looking at the data the SIEM can afford to keep hot. They're operating in the cold tier on purpose. They're using techniques that don't fire your analytics because your analytics are written against hot-tier data.</p>
      <p>Agentic SOC with MCP isn't a productivity play. It's a coverage play. It's the first architecture that makes the cold tier part of the investigation surface in real time, without requiring every analyst to be a lake-query specialist.</p>
      <p>The defenders who figure this out first stay ahead. The ones who wait become the training data for whatever comes after.</p>

      <hr />
      <p><em>I'm writing about this stack, agentic SOC architecture, and the federal Cloud security surface weekly. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'powerstig-mof-compilation': () => (
    <>
      <p>DISA STIG compliance for Windows Server in Azure Government has historically been a manual project. Hundreds of controls, V-numbers, rationale write-ups, screenshots. Multiple weeks per server. The auditor leaves, the program team breathes out, the next assessment is six months away — and someone has to do it all again.</p>
      <p>It doesn't have to be that way.</p>
      <p>The right PowerSTIG pipeline turns the entire workflow into something repeatable: a single configuration compiles into a complete compliance baseline, audit-mode testing verifies the live server against every STIG rule without making any changes, and the results map back to V-numbers in the format DISA auditors actually want. Three stages, every output the assessment process needs.</p>
      <p>This is the pipeline I ship in GCC High. Here's what it produces.</p>

      <h2>The pipeline, end to end</h2>
      <p>Three stages move from a thin PowerShell entry point to an auditor-ready CKL file.</p>
      <p><strong>Stage 1: Compile.</strong> The compliance baseline becomes a single MOF — every Windows Server 2022 STIG rule, every V-number, every desired state, in one artifact the DSC engine can consume.</p>
      <p><strong>Stage 2: Verify.</strong> The MOF runs against the live server in audit mode. No changes. Output is per-rule compliance state — what passed, what failed, what isn't measurable. Ten to twenty minutes for a full STIG.</p>
      <p><strong>Stage 3: Report.</strong> Audit results get enriched with V-numbers, severities, and rule titles, then exported to CSV and CKL. Output is an auditor-ready evidence package.</p>
      <p>The same pipeline runs against domain controllers, Windows Server 2019, Windows Server 2025 when the STIG ships, and adjacent OS roles. The compilation infrastructure is the long-lived asset. Everything else is configuration.</p>

      <h2>Stage 1 — The compiled baseline</h2>
      <p>The MOF is the compiled compliance baseline. About 300 KB for a full Windows Server 2022 STIG. Every rule, every V-number, every desired state, encoded as DSC resources in a single file.</p>
      <p>The artifact matters more than the script that produces it. The MOF is what gets stored, version-controlled, and regenerated when DISA publishes a new STIG release. It's the contract between what the baseline says and what the server has to be.</p>
      <p><strong>What this gets you.</strong> Reproducibility and diff-ability. Two compilations against the same STIG version produce byte-identical output. Two compilations across successive STIG releases produce a clean diff showing exactly which controls changed — the answer to "what changed since last quarter," ready before the assessment team asks.</p>

      <h2>Stage 2 — Audit-mode verification</h2>
      <p>Audit mode measures the live server against the MOF without making any changes. Three properties make this stage valuable for federal compliance work.</p>
      <p><strong>Non-destructive.</strong> Nothing on the server changes. You can run this on a production domain controller during business hours and the only side effect is some CPU and a log entry. Safe to run continuously, not just during pre-assessment scrambles.</p>
      <p><strong>Deterministic per rule.</strong> Every STIG rule maps to a discrete pass/fail state. No ambiguous "partially compliant," no "manual review required" — either the configuration matches the baseline or it doesn't.</p>
      <p><strong>Structured output.</strong> Every result is a typed record with a status and a hash of the expected versus actual state. The difference between handing an auditor a PDF and handing them a queryable artifact.</p>
      <p><strong>What this gets you.</strong> Continuous compliance verification. You stop waiting until the auditor schedules the next assessment to find out where the server has drifted. The pipeline runs nightly, the deltas surface in tickets, remediation happens before the audit.</p>

      <h2>Stage 3 — Auditor-ready evidence</h2>
      <p>DSC speaks in resource names. DISA speaks in V-numbers. Bridging that gap is what makes the pipeline output assessment-ready.</p>
      <p>Two outputs matter for federal work.</p>
      <p><strong>Enriched CSV.</strong> Audit results joined against the STIG catalog produce a per-rule report with VulnId, Severity, RuleTitle, and Status — the exact columns assessors request. No reformatting, no screenshot collection. It goes straight into the assessment package.</p>
      <p><strong>CKL file.</strong> STIG Viewer is the tool DISA assessors actually use. Its native format is the .ckl checklist — XML-structured, V-number-aligned. The pipeline generates the CKL directly from the audit results with every finding pre-populated. The assessor reviews, marks closed or open, exports — and the assessment moves at the speed of review, not the speed of evidence collection.</p>
      <p><strong>What this gets you.</strong> Time-to-evidence drops from weeks to hours. A team running this pipeline walks into a STIG assessment with the CKL already built and the gaps already known. The assessment becomes a review, not a discovery exercise.</p>

      <h2>What's different in GCC High</h2>
      <p>The pipeline architecture is identical to what runs in commercial Azure. What makes GCC High harder is the operating surface around it.</p>
      <p>Sovereign cloud module sourcing follows different rules than the public registry. Hardened image execution policies shape how every component runs. FedRAMP retention requirements make evidence collection a first-class output, not a bolt-on. Most consultants underestimate this surface area, slip the timeline, and call it "sovereign cloud weirdness."</p>
      <p>It isn't weirdness. It's discipline. The MOF is still the cleanest evidence artifact in this environment — small, deterministic, auditor-friendly. The surrounding pipeline has to be designed for federal-tenant constraints from day one, not retrofitted in week eight.</p>

      <h2>What this enables</h2>
      <p>A working PowerSTIG pipeline in GCC High changes the economics of STIG compliance from project-mode to operations-mode.</p>
      <blockquote>STIG compliance moves from "the thing we do before each audit" to "the thing the pipeline produces continuously."</blockquote>
      <p><strong>Pre-assessment dry runs.</strong> A team running this pipeline walks into the assessment knowing exactly which controls fail and why, with V-number-aligned evidence already exported. The assessor's job becomes review, not discovery.</p>
      <p><strong>Continuous compliance.</strong> The pipeline runs in CI/CD against representative VMs and on a nightly schedule against production servers. Drift surfaces in tickets. Remediation happens before the audit, not during it.</p>
      <p><strong>Evidence at the speed of an API call.</strong> When an Authorizing Official asks "show me current STIG posture for this enclave," the answer is a report generated this morning, not a six-week evidence collection sprint.</p>
      <p><strong>Cross-OS coverage.</strong> The same pipeline pattern works for Windows Server 2019, 2022, 2025, Windows 10/11, Domain Controllers, IIS, SQL Server, and the OpenSSH and RHEL composites PowerSTIG ships. One compilation infrastructure, many baselines.</p>
      <p>That's the value. The C3PAO assessment becomes a review of evidence the program team already has — not a fire drill.</p>

      <hr />
      <p><em>I'm writing weekly on federal Windows STIG automation, PowerSTIG patterns at scale, and the GCC High deployment surface most consultants skip. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),
};

function PostPage({ navigate, postSlug }) {
  const slug = postSlug || 'agentic-soc-mcp-data-lake';
  const meta = (window.POSTS || []).find((p) => p.slug === slug);
  const ContentComponent = POSTS_CONTENT[slug];

  if (!meta || !ContentComponent) {
    return (
      <>
        <section className="page-header">
          <div className="container-prose">
            <p className="page-intro">
              Post not found.{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('writing'); }} style={{ color: 'var(--accent)' }}>
                Back to all writing →
              </a>
            </p>
          </div>
        </section>
        <Newsletter />
      </>
    );
  }

  return (
    <>
      <article className="post">
        <section className="post-header">
          <div className="container-prose">
            <div className="post-meta">
              <a href="#" className="post-back" onClick={(e) => { e.preventDefault(); navigate('writing'); }}>← All Writing</a>
            </div>
            <div className="post-tags">
              {meta.tags.map((t) => (
                <span key={t} className="post-tag">{t}</span>
              ))}
            </div>
            <h1 className="post-title display">{meta.title}</h1>
            <p className="post-description">{meta.description}</p>
            <div className="post-byline">
              <div className="post-byline-author">
                <div className="post-byline-name">Christopher Moore</div>
                <div className="post-byline-role">Federal Cyber Architect</div>
              </div>
              <div className="post-byline-meta">
                <div className="post-byline-date">{meta.publishDateLong || meta.publishDate}</div>
                <div className="post-byline-readtime">{meta.readTime}</div>
              </div>
            </div>
          </div>
        </section>

        <AsciiDivider>░░░ FIELD REPORT ░░░</AsciiDivider>

        <section className="post-body">
          <div className="container-prose">
            <div className="prose">
              <ContentComponent />
            </div>
          </div>
        </section>

        <section className="post-footer">
          <div className="container-prose">
            <div className="post-sig">
              <div className="post-sig-label">// Signed</div>
              <div className="post-sig-name">Christopher Moore</div>
              <div className="post-sig-title">Moore Security Group LLC · Scottsdale, AZ</div>
            </div>
          </div>
        </section>
      </article>

      <Newsletter />
    </>
  );
}

Object.assign(window, { PostPage });
