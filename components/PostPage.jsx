// Individual post page — data-driven by slug.
// Looks up metadata from window.POSTS (defined in Pages.jsx) and body content from POSTS_CONTENT below.

const POSTS_CONTENT = {
  'checking-the-checker': () => (
    <>
      <p>Three years ago, the question for AI in security operations was <em>can it work.</em> Today it's <em>can we trust it.</em> A year from now it'll be the only question that matters.</p>
      <p>Every commercial MDR shop and federal SOC I've worked with is integrating AI into the detection and vulnerability surface. Triage agents that disposition alerts. Models that score CVEs against an environment. LLM-powered investigators that summarize incidents. Agents that suggest remediation paths and, in some shops, take the action themselves.</p>
      <p>This work is producing real value. It's also producing a problem the industry isn't yet prepared to talk about openly: when an AI agent closes a finding as benign, who verifies the agent was right?</p>
      <p>This is the checker problem. And the way most teams are answering it — informally, by spot-check, with no discipline — is going to surface in incident retrospectives over the next eighteen months.</p>

      <h2>The compounding error nobody is metering</h2>
      <p>The traditional SOC has a measurable false-positive rate because every alert eventually crosses a human's desk. The denominator is visible. The human sees the noise, learns the pattern, and the team can argue honestly about whether the detection is too loose or too tight.</p>
      <p>Insert an AI triage agent and that denominator disappears. The human now reviews only what the agent escalated. The only feedback the team gets is on the alerts the agent thought were worth a human's time. The alerts the agent quietly closed never enter the discussion.</p>
      <p>The compounding error is obvious in hindsight. The agent learned a pattern during training or prompt design — say, that any login from a known cloud egress is benign. Six months later, threat actors are routing through known cloud egresses on purpose. The agent keeps closing those alerts as benign. The team has no visibility into the closures because the closures don't generate tickets.</p>
      <p>This isn't hypothetical. It's the failure mode of every automation layer that doesn't keep a human in some kind of audit loop. We've seen it with SOAR playbooks. With auto-suppression rules. With vendor-shipped allowlists. The AI agent is the same problem at higher confidence and lower transparency.</p>

      <h2>What checking the checker actually looks like</h2>
      <p>The discipline isn't complicated. The teams that haven't built it yet just haven't named the problem yet.</p>
      <p><strong>Sampling.</strong> Take a random sample of the agent's closed-as-benign decisions every week and put it in front of a senior analyst. Not a review of escalations — a review of dismissals. This is exactly the way regulated call centers sample agent calls, the way airlines sample crew decisions, the way labs sample QC. The sample doesn't have to be large. It just has to exist.</p>
      <p><strong>Adversarial probing.</strong> Build a corpus of known-malicious patterns and feed them to the agent on a regular cadence. New CVEs. Crafted alerts. Synthetic phishing payloads. Track the agent's hit rate over time. When a model changes — when the vendor pushes an update, when a prompt is tuned, when the underlying API moves a version — the corpus tells you immediately whether the agent's coverage moved with it.</p>
      <p><strong>Drift instrumentation.</strong> Every tool call the agent makes, every decision it produces, every confidence score it assigns — logged. Not for the audit. For the trend line. Most teams discover their agent has degraded from a customer escalation. The teams that instrument can see degradation in the metrics weeks earlier.</p>
      <p>These three together cost less than one full-time analyst and protect against the entire class of <em>we trusted the agent and it missed it</em> failure modes that are coming.</p>

      <h2>The audit dimension nobody priced in</h2>
      <p>In federal environments and increasingly in regulated commercial ones, the question gets sharper. An assessor asks: how do you know your AI-assisted vulnerability triage is sound? What's your evidence?</p>
      <blockquote>"The vendor's eval scores" is not an answer. The vendor's evals tested the model on their corpus, in their environment, against their threat assumptions. None of that reflects your environment, your threat surface, or the controls you claim.</blockquote>
      <p>The teams that can answer the assessor's question with their own sampling data, their own adversarial corpus, and their own drift charts have an audit posture. The teams that can't are about to learn that <em>the AI handles it</em> is the new <em>we have a firewall.</em></p>

      <h2>Why this is an operator problem, not a vendor problem</h2>
      <p>Every AI security vendor is building eval tooling and explainability features into their products. That's good. It's also not the answer.</p>
      <p>The vendor's eval is the vendor's view of the agent's behavior. Your view of the agent's behavior — in your environment, on your data, against your threats — is yours to build. The same way your SIEM detection content is yours to author and your SOC playbooks are yours to maintain. Outsourcing the validation of AI security work to the vendor that sold you the AI security tool is exactly the conflict-of-interest pattern that brought us SOC 2 reports nobody trusts.</p>
      <p>The teams that figure this out first build a real moat. Their AI security work compounds in trustworthiness over time. The teams that wait are about to discover that <em>the model decided</em> is the new <em>the vendor said it was secure.</em></p>

      <h2>The part that actually matters</h2>
      <p>Strip away the methodology. The reason this matters is simpler than the framework makes it look.</p>
      <p>The next generation of security incidents are not going to be pattern-matched against the last generation. The adversaries know your tooling. They know your AI tooling specifically. They are already crafting techniques designed to look benign to a triage model and known to a human analyst.</p>
      <p>Checking the checker is how you keep the human's pattern recognition in the loop without giving up the throughput the agent provides. It's not friction on the AI. It's the discipline that makes the AI worth deploying.</p>
      <p>The defenders who build this discipline now stay ahead. The ones who don't — and discover the problem in retrospective — become the cautionary tales the next wave of operators learn from.</p>

      <hr />
      <p><em>I'm writing weekly on agentic SOC architecture, AI security validation, and the federal Cloud security surface most consultants skip. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

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

  'poam-evidence-pipeline': () => (
    <>
      <p>Every program team I've worked with has a Plan of Action and Milestones that behaves the same way. It grows before every assessment. It shrinks a little after a remediation push. Then it quietly grows again. Twelve months later the spreadsheet is longer than it was when the program started, and nobody can say with confidence which items are actually still open.</p>
      <p>That isn't a discipline problem. The people maintaining the POA&amp;M are usually the hardest-working people in the program. It's an evidence problem.</p>
      <p>A POA&amp;M that never shrinks is a POA&amp;M that's being maintained by hand, against evidence collected by hand, on a cadence set by the assessment calendar instead of the environment.</p>

      <h2>Why the list keeps growing</h2>
      <p>Walk through how most POA&amp;M items get closed. An engineer fixes the finding. Someone takes a screenshot. The screenshot goes into a shared folder. The ISSO updates the spreadsheet. Three months later, a configuration change, a reimaged server, or a new baseline quietly reopens the gap — and nobody notices until the next scan or the next assessment.</p>
      <p>Now the item comes back. Sometimes as the same finding. Sometimes as a new line with a new ID, because whoever logged it didn't realize it was a regression. The list grows, the team works harder, and the trend line goes the wrong direction anyway.</p>
      <p>Three things drive this, and none of them are fixed by working harder:</p>
      <ul>
        <li><strong>Point-in-time evidence.</strong> A screenshot proves the control was in place the afternoon someone took it. It says nothing about yesterday or tomorrow.</li>
        <li><strong>No drift signal.</strong> Nothing tells the program team when a closed item quietly reopens. Regressions are discovered, not detected.</li>
        <li><strong>Disconnected sources of truth.</strong> The scanner, the configuration baseline, the ticketing system, and the POA&amp;M spreadsheet each hold a piece of the story. Reconciling them is manual work that happens right before the assessment, when there's the least time to do it.</li>
      </ul>

      <h2>What an evidence pipeline changes</h2>
      <p>In the PowerSTIG field report, I walked through a pipeline that turns Windows STIG compliance into a continuous output: compiled baseline, audit-mode verification, auditor-ready CSV and CKL. The same pattern applies to the POA&amp;M as a whole.</p>
      <blockquote>The POA&amp;M shouldn't be a document your team maintains. It should be a report your pipeline produces.</blockquote>
      <p>That shift has three parts.</p>
      <p><strong>Machine-verifiable controls get verified by machines.</strong> Configuration baselines, policy assignments, MFA enforcement, logging coverage, encryption settings — anything with a deterministic pass/fail state gets measured on a schedule. Not before the assessment. Every night.</p>
      <p><strong>Every finding has a stable identity.</strong> A STIG V-number, a policy definition, a control ID mapped to an asset. When the same gap reappears, the pipeline recognizes it as a regression of a known item, not a brand-new line. That alone stops a surprising amount of list growth.</p>
      <p><strong>Status comes from evidence, not from updates.</strong> An item is closed when the latest verification run says it passes — and reopens automatically when the next run says it doesn't. The spreadsheet stops being the source of truth and becomes a view on top of the evidence.</p>

      <h2>The plan, in order</h2>
      <p>Programs that try to automate the entire POA&amp;M at once usually stall. The order of operations matters.</p>
      <p><strong>Step 1: Sort the list by evidence type.</strong> Go through the open items and tag each one. Machine-verifiable configuration. Process or documentation. Architectural, requiring a design change. Risk-accepted. In most programs, a meaningful share of the list turns out to be machine-verifiable — and that's the share eating the most manual effort.</p>
      <p><strong>Step 2: Automate verification for the largest machine-verifiable category.</strong> Usually that's operating system baselines or cloud policy compliance. Build the verification run, land the results somewhere queryable — a Log Analytics workspace, a custom Sentinel table, a database — and stop collecting screenshots for that category.</p>
      <p><strong>Step 3: Map results to POA&amp;M items.</strong> Each automated check maps to the control and the POA&amp;M line it supports. Now the status column is driven by data. Drift opens a ticket. Remediation closes it when the next run passes.</p>
      <p><strong>Step 4: Give the process items a cadence and an owner.</strong> Not everything is automatable. Policy reviews, training records, tabletop exercises — those still need humans. But they need dates, owners, and an artifact location defined up front, so they stop being rediscovered every assessment cycle.</p>
      <p><strong>Step 5: Report the trend, not the snapshot.</strong> Open items over time. Mean time to close. Regression rate. That's the story an Authorizing Official or a C3PAO actually wants to hear: not "here's our list," but "here's how fast our list moves."</p>

      <h2>What success looks like</h2>
      <p>The program team walks into the next assessment with the POA&amp;M already reconciled against current evidence. Every closed item has a verification record behind it, not a screenshot from four months ago. Every open item has an owner, a date, and a reason.</p>
      <p>Regressions surface in days, not quarters. The ISSO stops spending the month before an assessment chasing engineers for proof. The engineers stop re-fixing things they already fixed because nobody noticed the drift.</p>
      <p>And the list finally starts shrinking — not because the team worked harder, but because closed items stay closed and reopened items get caught early.</p>

      <h2>Where this goes wrong</h2>
      <p>A few failure modes worth naming before you build:</p>
      <ul>
        <li><strong>Automating the spreadsheet instead of the evidence.</strong> A script that updates the POA&amp;M from ticket status is still trusting a human to close the ticket honestly. The automation has to sit on the verification, not the paperwork.</li>
        <li><strong>Ignoring the risk-accepted items.</strong> Risk acceptances expire. Build the review dates into the pipeline so accepted risks get revisited on schedule, not when someone happens to notice.</li>
        <li><strong>Treating GCC High as an afterthought.</strong> Sovereign cloud environments often have tooling gaps and integration differences compared to commercial. Validate what's actually available in your tenant before designing the pipeline around a feature you've only seen in commercial documentation.</li>
      </ul>

      <h2>The real cost of a list that won't move</h2>
      <p>A growing POA&amp;M isn't just an administrative burden. It's a signal to every assessor and authorizing official that the program doesn't have a grip on its own environment. It erodes trust in the program team — even when the team is doing excellent work.</p>
      <p>The fix isn't more effort. It's building the evidence once, running it continuously, and letting the POA&amp;M become what it was always supposed to be: an honest, current picture of where the risk actually is.</p>

      <hr />
      <p><em>I'm writing weekly on federal compliance automation, evidence pipelines, and the GCC High surface most consultants skip. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'pim-privileged-access': () => (
    <>
      <p>Most account takeovers that turn into real incidents have one thing in common: at some point, the attacker got hold of an identity that had standing administrative access. Not access that was requested, approved, and time-boxed. Access that was just <em>there</em>, all day, every day, waiting.</p>
      <p>Microsoft Entra Privileged Identity Management exists to make that standing access go away. And in a lot of tenants I look at, it's licensed, it's technically turned on, and it isn't doing much of anything.</p>
      <p>The good news: you don't need to configure every setting in PIM to get most of the protection. A small set of decisions does the heavy lifting.</p>

      <h2>The problem PIM actually solves</h2>
      <p>Standing privilege is the attacker's best friend. A Global Administrator who holds that role permanently is a Global Administrator whose stolen session token, phished password, or compromised device is immediately catastrophic.</p>
      <p>PIM changes the default from "always privileged" to "eligible to become privileged." The admin activates the role when they need it, for a defined window, under conditions you control. Outside that window, a stolen credential gets the attacker a regular user account.</p>
      <blockquote>The goal isn't to make admins' lives harder. It's to make the blast radius of a compromised admin account small by default.</blockquote>
      <p>That's the whole idea. The rest is configuration.</p>

      <h2>The 20% that matters</h2>
      <p><strong>1. Convert permanent assignments to eligible.</strong> This is the single highest-value change. Inventory every permanent assignment to the high-impact directory roles — Global Administrator, Privileged Role Administrator, Security Administrator, Exchange and SharePoint administrators, Conditional Access and application administrators. Move them to eligible. The only permanent assignments left should be your break-glass accounts.</p>
      <p><strong>2. Require strong authentication on activation.</strong> Activation should require MFA at minimum, and ideally a phishing-resistant method or a Conditional Access authentication context that enforces one. If an attacker can activate a role with the same factor they used to sign in, PIM becomes a speed bump instead of a wall.</p>
      <p><strong>3. Keep activation windows short.</strong> The default maximum duration is often longer than any real task requires. Set it to what the work actually takes. Admins can always re-activate. Attackers holding a token benefit from every extra hour.</p>
      <p><strong>4. Require approval for the crown jewels.</strong> Not every role needs approval — that just creates friction and approval fatigue. But Global Administrator and Privileged Role Administrator should. Those are the roles that can change everything else.</p>
      <p><strong>5. Require justification, and actually read it.</strong> A ticket number or a reason on every activation turns the PIM audit log into an investigation asset. "Fixing stuff" is not a justification. Make it a norm that the reason connects to real work.</p>
      <p><strong>6. Alert on activations and on assignment changes.</strong> Route PIM activation events and role assignment changes into your SIEM. A role activation at an unusual hour, from an unusual location, or by an account that rarely activates is exactly the signal you want an analyst to see in real time.</p>

      <h2>What most teams skip</h2>
      <p><strong>Break-glass accounts done properly.</strong> You need at least two emergency access accounts that sit outside normal Conditional Access dependencies, with strong credentials stored securely, and with sign-in alerting that fires on any use. Break-glass accounts that nobody monitors are just permanent Global Admins with weaker oversight.</p>
      <p><strong>Access reviews.</strong> Eligible assignments drift just like permanent ones. People change roles, contractors roll off, project teams dissolve. Recurring access reviews on privileged role eligibility keep the eligible list honest. Without them, "eligible" slowly becomes the new "permanent."</p>
      <p><strong>Azure resource roles.</strong> PIM covers Azure RBAC roles too — Owner, Contributor, User Access Administrator on subscriptions and management groups. Teams often lock down Entra roles and leave subscription Owner as a permanent assignment for a dozen people. That's a direct path to your workloads, your key vaults, and your logs.</p>
      <p><strong>Groups for privileged access.</strong> If your admins get rights through group membership, PIM for Groups lets you apply the same just-in-time model to the group itself. Otherwise the group becomes a side door around everything above.</p>

      <h2>A plan you can run this month</h2>
      <p><strong>Week 1: Inventory.</strong> Pull every permanent privileged assignment across directory roles, Azure resource roles, and privileged groups. Identify break-glass accounts and confirm they're monitored.</p>
      <p><strong>Week 2: Configure role settings.</strong> Set activation requirements, durations, approval, and justification for your top-tier roles. Get the settings right before you move people, so nobody's first experience of PIM is a broken workflow.</p>
      <p><strong>Week 3: Convert assignments.</strong> Move permanent assignments to eligible, team by team. Communicate first. Admins who understand why will adopt it. Admins who are surprised will look for workarounds.</p>
      <p><strong>Week 4: Wire up detection and reviews.</strong> Get activation and assignment-change events into the SIEM with alerting. Schedule the first access review.</p>
      <p>A note for federal tenants: PIM is available in GCC High, but feature parity with commercial can lag, and some integrations behave differently. Confirm what your tenant supports before you design a workflow around a capability you've only seen in commercial documentation.</p>

      <h2>Why this is worth the friction</h2>
      <p>Every security program eventually faces the scenario where a privileged credential is compromised. The question is what that credential can do in the moment the attacker uses it.</p>
      <p>With standing access, the answer is "everything." With PIM configured well, the answer is "nothing, unless they can also pass a phishing-resistant MFA challenge, provide a justification, possibly get an approval, and do it all inside a window that's being watched."</p>
      <p>That's not a small difference. That's the difference between an incident and a headline.</p>

      <hr />
      <p><em>I'm writing weekly on Entra identity architecture, privileged access, and the federal Cloud security surface most consultants skip. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'multi-tenant-sentinel-lighthouse': () => (
    <>
      <p>Every MSSP running Microsoft Sentinel hits the same wall. The first five customers are manageable. Somebody logs into each tenant, tunes a few rules, checks the incident queue. By customer fifteen, the analysts are spending more time switching contexts than investigating. By customer thirty, detection content has drifted into thirty slightly different versions, and nobody knows which one is right.</p>
      <p>Azure Lighthouse is the foundation for fixing that. But Lighthouse on its own just gets you access. Scaling requires a set of patterns on top of it.</p>

      <h2>What Lighthouse gives you — and what it doesn't</h2>
      <p>Lighthouse lets your analysts work in customer subscriptions from your own tenant, using delegated access defined in a template the customer approves. No guest accounts scattered across thirty directories. No separate credentials per customer. One identity, governed in your tenant, with scoped permissions into each customer's resources.</p>
      <p>That solves the access problem. It doesn't solve:</p>
      <ul>
        <li><strong>Content drift.</strong> Analytic rules, workbooks, playbooks, and watchlists deployed independently to each workspace diverge over time.</li>
        <li><strong>Operational visibility.</strong> Analysts still need a way to see incidents across customers without clicking through each workspace.</li>
        <li><strong>Least privilege at scale.</strong> Delegations that start narrow tend to widen as people request access to fix one-off problems.</li>
        <li><strong>Customer-specific tuning.</strong> Every customer's environment is different. A rule that's quiet in one tenant floods the queue in another.</li>
      </ul>
      <p>The MSSPs that scale cleanly solve each of these deliberately.</p>

      <h2>Pattern 1: Detection content as a product</h2>
      <blockquote>Your detection library is the thing you're actually selling. Treat it like software.</blockquote>
      <p>Store analytic rules, hunting queries, workbooks, and playbooks in source control. Deploy them to customer workspaces through a pipeline, not through the portal. Every customer gets the same baseline version, and every change is reviewed, tested, and traceable.</p>
      <p>This is the same principle behind detection-as-code for internal teams, applied across tenants. When a rule improves, every customer gets the improvement. When a rule breaks, you can see exactly which change broke it and roll it back everywhere.</p>

      <h2>Pattern 2: Baseline plus overlay</h2>
      <p>Customers need tuning. They don't need forks.</p>
      <p>Separate the shared baseline from customer-specific configuration. Exclusions, thresholds, allowlists, and environment details live in per-customer parameters or watchlists, not in edited copies of the rule. The rule logic stays identical across tenants. The overlay captures what's different.</p>
      <p>This is what keeps content upgradeable. Once a customer's rule is hand-edited, it's frozen out of every future improvement — and in my experience, those frozen rules are where coverage gaps hide.</p>

      <h2>Pattern 3: Delegations designed for least privilege</h2>
      <p>The Lighthouse delegation template is a security boundary. Design it like one.</p>
      <p><strong>Map roles to functions.</strong> Tier 1 analysts get Sentinel Responder. Detection engineers get Sentinel Contributor. Automation identities get exactly what the playbooks need. Very few people need broad Contributor or anything above it on a customer subscription.</p>
      <p><strong>Use groups, not individuals.</strong> Delegate to security groups in your tenant. Onboarding and offboarding analysts then happens once, in your directory, rather than through template updates across every customer.</p>
      <p><strong>Use eligible authorizations for elevated access.</strong> Lighthouse supports just-in-time eligible authorizations through PIM in the managing tenant, where your licensing supports it. Elevated rights should be activated when needed, not held permanently across every customer.</p>
      <p>Your customers are trusting you with access to their security data. A tight delegation model is part of what you're promising them.</p>

      <h2>Pattern 4: A single pane for operations</h2>
      <p>Sentinel supports viewing and querying across multiple workspaces, and Lighthouse makes those workspaces visible from your tenant. Build the operational layer on top: cross-workspace incident views for triage, cross-tenant workbooks for SLA and volume reporting, and cross-workspace hunting for when a new threat breaks and you need to know which customers are exposed.</p>
      <p>Microsoft has also been building unified multi-tenant experiences in the Defender portal. Capabilities and availability vary, so validate what fits your customer mix rather than assuming parity with what you've seen in a demo.</p>

      <h2>Pattern 5: Automation that knows which tenant it's in</h2>
      <p>Playbooks that run across customers need to be tenant-aware. Notification routing, escalation contacts, and response permissions differ per customer. A containment action that's pre-approved for one customer may require a phone call for another.</p>
      <p>Encode those differences as data — customer configuration the playbook reads at runtime — rather than as separate playbook copies. Same principle as the detection overlay: shared logic, per-customer parameters.</p>

      <h2>The federal wrinkle</h2>
      <p>If you serve both commercial and GCC High customers, plan for two operating environments. Cross-cloud delegation between commercial Azure and Azure Government isn't something you can design around — the clouds are separate, and the managing tenant has to live in the same cloud as the customers it manages. That usually means a parallel management tenant, pipeline targets, and an operating model for the federal side. Budget for it from the start.</p>

      <h2>What scale actually feels like</h2>
      <p>When these patterns are in place, onboarding a new customer is a template deployment and a content push, not a week of portal clicking. Analysts triage from one queue. Detection engineers ship one improvement and it lands everywhere. Customer-specific tuning is visible and reviewable instead of buried in edited rules.</p>
      <p>And the margin stops eroding with every new logo. That's the real point. An MSSP that can't scale its Sentinel operation without scaling its headcount at the same rate isn't building a business — it's building a staffing problem.</p>

      <hr />
      <p><em>I'm writing weekly on Sentinel architecture, MSSP operating models, and the commercial-versus-GCC High divide most consultants skip. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'defensible-security-evidence': () => (
    <>
      <p>Most security teams build logging for detection. That's the right priority. But eventually, some of those logs end up somewhere they were never designed for: a dispute, an investigation, a regulatory inquiry, or a courtroom.</p>
      <p>When that happens, the question changes. It's no longer "did we detect it?" It's "can we prove what happened — and can we prove the record itself is trustworthy?"</p>
      <p>Those are different questions, and most environments are only built to answer the first one.</p>
      <p><em>A quick note before going further: this is an operator's perspective on evidence practices, not legal advice. Rules on admissibility and discovery vary by jurisdiction and by matter. If you're anticipating litigation or an investigation, bring counsel in early.</em></p>

      <h2>Why detection-grade logs aren't always evidence-grade</h2>
      <p>A log that's good enough to fire an alert might not be good enough to stand up to scrutiny. The difference usually comes down to questions the other side will ask:</p>
      <ul>
        <li>Who could have modified these records, and how would you know if they did?</li>
        <li>Are the timestamps accurate, and are they consistent across systems?</li>
        <li>Is this the complete record, or was data dropped, filtered, or aged out?</li>
        <li>How was this data collected, exported, and handled after the fact?</li>
        <li>Can someone explain how the system works and why it's reliable?</li>
      </ul>
      <p>If your team can't answer those confidently, the evidence becomes something to argue about rather than something that settles the argument.</p>

      <h2>The five practices that make logs defensible</h2>
      <p><strong>1. Integrity controls on the log store.</strong> Restrict who can modify or delete log data, and make sure deletion and configuration changes are themselves logged somewhere the same administrators can't touch. Immutable or write-once storage for long-term retention removes an entire class of "how do you know it wasn't altered" questions. The point isn't that your admins are untrustworthy. It's that you can demonstrate they couldn't have changed it.</p>
      <p><strong>2. Time synchronization everywhere.</strong> Reconstructing an incident across endpoints, identity providers, firewalls, and cloud services depends on timestamps lining up. Clock drift of even a few minutes turns a clean timeline into a debate. Make sure systems sync to reliable time sources, know which time zone each source records in, and normalize consistently in your analysis.</p>
      <p><strong>3. Retention that's set on purpose.</strong> Retention periods are often set by cost and default configuration rather than by what you might need to prove later. Define retention based on regulatory requirements, contractual obligations, and realistic investigation timelines — then document that decision. When a legal hold is issued, you need a way to preserve relevant data beyond normal retention without scrambling.</p>
      <p><strong>4. Documented collection and chain of custody.</strong> When data leaves the system of record — an export, a query result, a disk image — record who collected it, when, how, and where it went. Hash exported files at collection time so their integrity can be verified later. Store them in controlled locations with access logging. Chain of custody isn't paperwork for its own sake. It's the answer to "how do we know this is the same data?"</p>
      <p><strong>5. Documentation of how your systems work.</strong> Architecture diagrams, data flow descriptions, configuration baselines, and change records all matter. When someone has to explain how a log got from the source to the report, written documentation that predates the incident carries far more weight than a reconstruction after the fact.</p>

      <h2>Where cloud environments complicate this</h2>
      <p>Cloud platforms handle a lot of the integrity burden for you — but you still need to understand what they guarantee and what they don't.</p>
      <p><strong>Know your platform's retention defaults.</strong> Many cloud audit logs have default retention windows that are shorter than most investigation timelines. If you're not exporting them to a longer-term store, they may be gone before anyone thinks to look.</p>
      <p><strong>Know what's logged at your license tier.</strong> Some audit detail depends on licensing and configuration. Discovering during an investigation that a key data source was never enabled is a common and painful gap.</p>
      <p><strong>Know what your SIEM transforms.</strong> Parsing, normalization, and filtering at ingestion are valuable for detection, but they change the data. Be able to explain what transformations occur, and consider whether raw records should be retained alongside normalized ones for evidentiary purposes.</p>

      <h2>A plan for getting ahead of it</h2>
      <p><strong>Map your critical sources.</strong> Identity, endpoint, email, network perimeter, cloud control plane, and the systems holding your most sensitive data. For each, document where logs go, how long they're kept, and who can modify them.</p>
      <p><strong>Close the integrity gaps.</strong> Lock down deletion and modification rights on long-term log storage. Turn on logging of changes to the logging configuration itself.</p>
      <p><strong>Verify time.</strong> Check time synchronization across your critical sources. Fix drift before it matters.</p>
      <p><strong>Write the playbook.</strong> Create a documented procedure for evidence collection, hashing, handling, and storage. Make sure your incident response team follows it every time — not just when someone thinks a case might go legal. You often don't know which incidents will end up in front of a judge until much later.</p>
      <p><strong>Establish the counsel relationship.</strong> Know who to call for legal holds and preservation questions before you need them. Your IR plan should include when and how legal gets involved.</p>

      <h2>What this buys you</h2>
      <p>Defensible evidence doesn't just help in court. It speeds up every serious investigation, because the team trusts its own data. It satisfies regulators who ask how you know what happened. It strengthens insurance claims. And it gives leadership confidence that when the organization says "here's what happened," the record backs it up.</p>
      <blockquote>The best time to make your logs defensible is before anyone is questioning them.</blockquote>
      <p>The organizations that get this right don't scramble when the subpoena or the regulator letter arrives. They already have the record — and they can prove it's real.</p>

      <hr />
      <p><em>I'm writing weekly on incident evidence, security operations, and the federal Cloud security surface most consultants skip. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'six-months-agentic-soc': () => (
    <>
      <p>Back in April, I published two field reports that laid out how I think about AI in security operations. The first, <em>The Agentic SOC, MCP, and the Security Data Lake Problem</em>, argued that the agentic SOC would be built on MCP servers exposing the data lake, not on smarter SIEMs. The second, <em>Checking the Checker</em>, argued that the teams deploying AI agents needed a discipline for validating the agents' work — sampling, adversarial probing, drift instrumentation.</p>
      <p>Six months is long enough to look back honestly. Some of those principles held up exactly as written. Some I'd refine. A couple I'd emphasize much more heavily if I were writing them today.</p>
      <p>This isn't a victory lap. It's a recalibration — and if you're building an agentic SOC right now, it's the version of the advice I'd give you today.</p>

      <h2>What held up</h2>
      <p><strong>The MCP layer is the long-lived asset.</strong> I said the adapters exposing your data sources would outlast whichever model or agent you picked. That principle has only gotten stronger. Models change on a cadence that would have seemed absurd a few years ago. Teams that invested in clean, typed, well-scoped tool interfaces can swap the reasoning layer without rebuilding everything underneath it. Teams that wired a specific model directly into a specific data source are rebuilding.</p>
      <p><strong>Start narrow.</strong> The advice to pick one high-volume, low-fidelity detection and build an agent for that alone still stands. Narrow scope makes measurement possible. Measurement makes trust possible. Trust is what lets you expand.</p>
      <p><strong>Checking the checker isn't optional.</strong> The core argument — that an AI agent closing alerts hides its own error rate unless you deliberately sample its dismissals — is, if anything, more relevant now. The more an agent handles, the less any human sees of what it decided not to escalate. Sampling, adversarial testing, and drift tracking remain the minimum.</p>
      <p><strong>Coverage, not just productivity.</strong> I framed agentic SOC as a coverage play — making cold-tier data part of live investigations. That framing still holds. The productivity gains are real, but the strategic value is reaching data your analysts never had time to query.</p>

      <h2>What I'd refine</h2>
      <p><strong>Least privilege for tools deserves its own chapter.</strong> In April, I treated guardrails as one bullet among several. I'd elevate it now. Every MCP server is a new access path into sensitive data, and every tool an agent can call is something a manipulated agent might call on an attacker's behalf. Scoping what each tool can read, what each tool can do, and under whose identity it acts is foundational architecture, not a hardening step for later.</p>
      <p><strong>Prompt injection is a detection problem too.</strong> An agent reading alert content, email bodies, or log fields is reading attacker-influenced text. I underweighted that in the original piece. Defending against it means filtering at the model boundary, yes — but also logging and detecting on agent behavior, so that when an agent does something unexpected, someone sees it.</p>
      <p><strong>Human-in-the-loop needs design, not just presence.</strong> I advocated for approval gates on outbound actions. That's still right, but the harder lesson is that approval gates degrade when humans approve everything reflexively. A gate that's rubber-stamped is not a control. The gate has to show the approver enough context to make a real decision, and the volume of approvals has to stay low enough that people actually read them.</p>
      <p><strong>Evaluation sets need owners.</strong> I recommended re-running evals after every model change. The refinement: somebody has to own that eval corpus, keep it current with new techniques, and have the authority to block a change when the numbers drop. Without an owner, the eval set goes stale and becomes a formality.</p>

      <h2>What I'd emphasize more</h2>
      <p><strong>The audit trail is a product.</strong> In federal and regulated environments, the record of what an agent queried, what it concluded, and why is going to be examined. I mentioned this in April as a GCC High consideration. It's broader than that. Any organization that may one day have to explain an agent-driven decision — to an assessor, an insurer, a regulator, or a court — needs that record designed in from day one.</p>
      <p><strong>The operating model matters as much as the architecture.</strong> Who tunes the agent? Who reviews its sampled dismissals? Who decides when it gets a new tool? Teams that answer those questions before deployment move faster and safer than teams that answer them after the first surprise.</p>

      <h2>The updated plan</h2>
      <p>If you're starting or restarting an agentic SOC effort, here's the order I'd follow now:</p>
      <ol>
        <li><strong>Define the operating model.</strong> Owners for the agent, the eval set, the tool surface, and the review process.</li>
        <li><strong>Build scoped MCP servers</strong> for your most-used investigation data sources, with least-privilege identities and full call logging.</li>
        <li><strong>Deploy one narrow agent</strong> against one high-volume detection. Measure before and after.</li>
        <li><strong>Stand up the checker discipline</strong> — sampling, adversarial corpus, drift metrics — before the agent goes from advisory to autonomous.</li>
        <li><strong>Add detection on agent behavior</strong> so manipulated or misbehaving agents are visible.</li>
        <li><strong>Expand tools before scope.</strong> Deeper coverage on one alert class beats shallow coverage on ten.</li>
      </ol>

      <h2>Where this leaves us</h2>
      <p>The thesis from April holds: the defenders who build this capability deliberately — with clean data access, validation discipline, and real guardrails — will have a durable advantage. The six months since have mostly sharpened <em>how</em> to build it.</p>
      <p>The biggest lesson is that the hard part of an agentic SOC is not the AI. It's the engineering and operational discipline around it. The teams treating it that way are the ones whose agents are earning trust. The ones treating it as a product to switch on are the ones who will be writing retrospectives of a very different kind.</p>

      <hr />
      <p><em>I'm writing weekly on agentic SOC architecture, AI security validation, and the federal Cloud security surface most consultants skip. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),
  'dspm-for-ai-copilot-exposure': () => (
    <>
      <p>Every organization rolling out an AI assistant asks the same first question: is it secure? It's the wrong question. The assistant is usually fine. The real question is what the assistant can see, and almost nobody can answer it before turning the thing on.</p>
      <p>AI assistants like Microsoft 365 Copilot don't create new access. They respect the permissions you already have. That sounds reassuring until you remember what your permissions actually look like. Ten years of "share with everyone in the org" links. Project sites nobody archived. HR folders inherited by a group that grew from twelve people to four hundred.</p>
      <p>Before AI, oversharing was a latent risk. Finding the wrong file meant knowing it existed and going looking for it. An assistant that searches everything a user can reach turns that latent risk into an active one. Ask a well-phrased question and the overshared file comes to you.</p>
      <p>That's the problem Data Security Posture Management for AI is meant to solve. And it's the problem an auditor will eventually ask you about.</p>

      <h2>Oversharing was always there. AI made it discoverable.</h2>
      <p>The permission debt in most Microsoft 365 tenants has been piling up for years. It was tolerable because discovery was hard. Search was mediocre, most users didn't know where to look, and the data that leaked was mostly the data people already knew about.</p>
      <p>An AI assistant gets rid of that friction. It's designed to find relevant content across everything the user is allowed to access and summarize it. That's the value. It's also the exposure. A sales rep asking for "last year's compensation planning" shouldn't get anything useful back. Whether they do depends on permission hygiene you may never have checked.</p>
      <blockquote>The assistant didn't break your access model. It finally used your access model the way it was written.</blockquote>
      <p>This is why AI rollouts that skip a data posture review end up in the same place. The pilot goes well. The broad rollout goes well. Then a user surfaces something they shouldn't have seen, screenshots it, and the program gets paused while legal catches up.</p>

      <h2>What DSPM for AI actually gives you</h2>
      <p>Microsoft Purview's DSPM for AI capabilities, along with comparable tools on other platforms, are built to answer three questions before an auditor or an incident asks them for you.</p>
      <p><strong>What sensitive data exists, and where.</strong> Sensitivity labels and classification tell you which content matters. Without them, every conversation about AI exposure is guesswork. If your labeling coverage is thin, start there. It's the foundation everything else depends on.</p>
      <p><strong>Who can reach it, and how broadly.</strong> Oversharing assessments look for sensitive content behind overly broad permissions: org-wide links, sites with large membership, inherited access nobody intended. This is the list your remediation work comes from.</p>
      <p><strong>What the AI is actually doing with it.</strong> Visibility into AI interactions, meaning which prompts touch sensitive content and which responses cite labeled files, turns a policy question into a measurable one. You stop guessing whether the assistant exposes regulated data. You can see it.</p>
      <p>Feature names and availability change, and parity between commercial and government clouds varies. Check what's actually licensed and available in your tenant before you build a plan around a specific capability. The approach holds no matter which tool you use.</p>

      <h2>The order of operations</h2>
      <p>The teams that roll out AI assistants without a data incident tend to follow the same sequence. It isn't glamorous, and it works.</p>
      <p><strong>Assess before you enable.</strong> Run the oversharing assessment against the sites and repositories your pilot users can reach. Don't wait for broad rollout. The pilot group is usually senior and broadly permissioned, which makes it the highest-exposure group you'll have.</p>
      <p><strong>Fix the worst of the permission debt first.</strong> You won't clean up ten years of sharing before go-live, so don't try. Go after the high-sensitivity, high-breadth intersection: regulated or confidential content behind org-wide access. That's a short list, and fixing it removes most of the real risk.</p>
      <p><strong>Label what matters, then enforce on labels.</strong> Once your most sensitive content is labeled, you can use controls that keep labeled content out of AI responses or out of the hands of the wrong audience. Labels turn a permission problem into a policy problem, and policy scales.</p>
      <p><strong>Monitor AI interactions as a security signal.</strong> Treat prompts that touch sensitive content as telemetry, not just compliance records. A user suddenly asking an assistant about data well outside their role is an insider-risk signal worth a look.</p>
      <p><strong>Make it continuous.</strong> Permissions drift. New sites appear. The assessment you ran before go-live is stale within a quarter. Schedule it, track the trend, and report the number.</p>

      <h2>The question your auditor is going to ask</h2>
      <p>Regulated organizations, federal and commercial alike, are going to get a version of the same assessment question: how do you know your AI assistant isn't exposing controlled information to people who shouldn't see it?</p>
      <p>"We trust the vendor's permission model" doesn't answer that. The vendor's permission model faithfully enforces whatever you configured. The answer the assessor wants is evidence: the oversharing assessment, the remediation record, the labeling coverage, the interaction monitoring, and the trend over time.</p>
      <p>Teams that can produce that package turn the AI conversation into a compliance strength. Teams that can't will find their AI rollout paused at the worst possible time, after the business already depends on it.</p>

      <h2>Why this pays off beyond AI</h2>
      <p>Here's the part most AI governance pitches miss. Everything you do for DSPM for AI makes the rest of your security program better too.</p>
      <p>Cleaning up oversharing shrinks the blast radius of a compromised account. Labeling coverage makes DLP smarter. Interaction monitoring feeds insider-risk detection. AI rollout is the forcing function that finally gets the data hygiene project funded, the one that's been on the roadmap for five years.</p>
      <p>You're not just making the assistant safe. You're paying off permission debt the assistant exposed.</p>

      <h2>Where this leaves you</h2>
      <p>The organizations that get real value from AI assistants aren't the ones that moved fastest. They're the ones that knew what the assistant could see before they turned it on, and kept knowing afterward.</p>
      <p>Know your data. Shrink your oversharing. Watch the interactions. Then roll out with confidence instead of crossing your fingers.</p>

      <hr />
      <p><em>I write weekly on AI data security, Purview, and the controls that make AI rollouts survive contact with auditors. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'intune-compliance-baselines': () => (
    <>
      <p>Every Intune rollout starts with a clean plan. A security baseline, a compliance policy, Conditional Access tied to compliance, and a go-live date. Then the policy hits real users and the help desk lights up.</p>
      <p>The executive whose laptop is suddenly "noncompliant" can't open email before a board meeting. The field team's shared devices fail a check nobody knew about. The developer workstation breaks because a hardening setting blocked their toolchain. Within two weeks someone with authority says the magic words: <em>just turn it off until we figure it out.</em></p>
      <p>Then the baseline stays off. Compliance becomes a report nobody reads. Conditional Access stops requiring a compliant device, and the zero-trust story goes back to being a slide.</p>
      <p>It doesn't have to go that way. Baselines that survive real users are designed differently from day one.</p>

      <h2>Why baselines fail in production</h2>
      <p>The failure is rarely technical. The settings work. The policies apply. What breaks is the gap between what the baseline assumes and how people actually work.</p>
      <p><strong>One baseline for everyone.</strong> A single policy for knowledge workers, kiosks, developers, and executives guarantees it fits none of them. Settings that are invisible to a call-center workstation can wreck a developer's day.</p>
      <p><strong>Enforcement before visibility.</strong> Teams flip on compliance requirements without first measuring how many devices would fail. Day one turns into a mass lockout, and the rollback becomes permanent.</p>
      <p><strong>No path back to compliant.</strong> A user whose device fails a check gets a vague error and no instructions. They call the help desk. The help desk doesn't know either. Frustration builds into political pressure, and the pressure wins.</p>
      <p><strong>No owner for exceptions.</strong> Every environment has legitimate exceptions. Without a defined, time-boxed exception process, the exceptions turn into permanent exclusion groups that quietly grow until the baseline only covers the devices that never mattered.</p>

      <h2>Design for personas, not policies</h2>
      <p>Durable baselines start by sorting devices into a small number of personas, usually four to six. Standard knowledge worker. Privileged admin workstation. Developer. Shared or frontline device. Executive. Maybe a federal or high-sensitivity enclave.</p>
      <p>Each persona gets a baseline built for how it works. The privileged workstation gets the strictest hardening because it holds the keys. The developer baseline allows what the toolchain needs while keeping the controls that actually stop attacks. The frontline device gets settings built for shared use.</p>
      <p>This isn't about relaxing security. It's about putting the strictest controls where the risk is highest instead of spreading friction evenly and watching the whole thing get rolled back.</p>
      <blockquote>A baseline that's 90% as strict and stays on forever beats a perfect baseline that gets turned off in week two.</blockquote>

      <h2>Report-only first, then enforce in rings</h2>
      <p>The single biggest predictor of a baseline that survives is whether the team measured before it enforced.</p>
      <p><strong>Start in report-only.</strong> Deploy compliance policies and pair Conditional Access with report-only mode. Let it run long enough to cover a normal business cycle. Now you know exactly which devices would fail, for what reason, and who owns them.</p>
      <p><strong>Fix the fleet before you enforce.</strong> Most noncompliance is fixable without user involvement: outdated OS versions, encryption that never finished, a missing agent. Fix it centrally first so enforcement day is a non-event for most people.</p>
      <p><strong>Enforce in rings.</strong> IT first, then a pilot group with a mix of personas, then broad rollout. Each ring gives you real feedback at a manageable volume. Problems surface while there are still dozens of users involved, not thousands.</p>
      <p><strong>Use grace periods deliberately.</strong> Compliance policies can give users a window to remediate before access is blocked. Use it. A grace period plus a clear notification turns a lockout into a to-do item.</p>

      <h2>Give users a way back</h2>
      <p>The user experience of noncompliance decides whether your baseline survives politically. Invest in it.</p>
      <p>When a device falls out of compliance, the user should know why, what to do, and how long they have, in plain language rather than a policy GUID. The Company Portal experience, custom notifications, and a short help article per common failure reason go a long way. So does briefing the help desk before enforcement starts, not after.</p>
      <p>Every ticket you avoid is political capital you keep for the next control.</p>

      <h2>Make exceptions expire</h2>
      <p>You will need exceptions. Approve them on purpose.</p>
      <p>Every exception should have an owner, a business reason, compensating controls where possible, and an expiration date. Review the exclusion groups on a schedule. If an exception can't be justified at renewal, it ends. That one discipline keeps exclusion lists from turning into the gaps attackers find.</p>
      <p>For regulated and federal environments, the exception record is also evidence. Assessors expect deviations from baseline to be documented, approved, and reviewed. A clean exception process is part of your audit posture, not just your ops hygiene.</p>

      <h2>What success looks like</h2>
      <p>Strip away the configuration detail. The goal of a compliance baseline isn't a green dashboard. It's a device trust signal good enough that Conditional Access can depend on it.</p>
      <p>When compliance is accurate and enforced, "require a compliant device" becomes one of the strongest controls you have. Stolen credentials stop being enough. Unmanaged devices stop reaching corporate data. Your identity controls and your endpoint controls start reinforcing each other.</p>
      <p>That only happens if the baseline stays on. Design for your users, measure before you enforce, give people a way back, and make exceptions expire. Then the baseline outlasts the rollout.</p>

      <hr />
      <p><em>I write weekly on Intune, Conditional Access, and turning the Microsoft security stack you already own into controls that actually hold. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'microsoft-vs-google-ai-soc': () => (
    <>
      <p>If you run a SOC today, someone has asked you which AI platform you're betting on. Microsoft or Google. Copilot-assisted Sentinel and Defender, or Gemini in Google Security Operations. The question usually comes with a deadline and a budget cycle attached.</p>
      <p>The vendor pitches won't help you answer it. Each one shows the best-case demo: a natural-language question, a clean answer, an incident summarized in seconds. Both platforms demo well. Neither demo tells you how it will behave on your data, with your analysts, against your threats.</p>
      <p>This is an operator's comparison. Not a feature matrix, which goes stale the moment either vendor ships. Just the questions that decide which platform fits your SOC, and where each one tends to be strong.</p>

      <h2>Start with where your data already lives</h2>
      <p>The most important factor in an AI-assisted SOC isn't the model. It's the data the model can reason over.</p>
      <p><strong>If your environment is Microsoft-centric</strong> (Entra ID, Microsoft 365, Defender across endpoint, identity, email, and cloud apps), the Microsoft stack has a structural advantage. The telemetry is native, the entity relationships are already modeled, and AI assistance in Sentinel and Defender works on data that's already connected and normalized.</p>
      <p><strong>If your environment is heterogeneous</strong>, with lots of non-Microsoft sources, high-volume network and cloud telemetry, and long retention requirements, Google Security Operations is built around ingesting and searching large volumes of security data at scale. Gemini working on top of that, alongside Mandiant threat intelligence, is a compelling combination for teams whose problem is breadth.</p>
      <blockquote>The AI assistant is only as good as the data it can reach. Pick the platform where your most important telemetry already lives, or can move cheaply.</blockquote>

      <h2>What both platforms actually change for analysts</h2>
      <p>Look past the branding and the two platforms are going after the same analyst pain points.</p>
      <p><strong>Query language stops being a gate.</strong> Natural-language pivots mean a junior analyst can ask a useful question without being fluent in KQL or the Google platform's query language. That's a real productivity gain. It also means you need validation, because a confidently wrong query looks just like a right one.</p>
      <p><strong>Investigation summarization.</strong> Both platforms can turn a sprawling incident into a readable narrative. That saves time on handoffs, shift changes, and executive updates.</p>
      <p><strong>Detection authoring assistance.</strong> Both can help draft detection logic. Treat the output as a first draft from a capable junior engineer: useful, fast, and in need of review and testing before it reaches production.</p>
      <p><strong>Threat intelligence in context.</strong> Microsoft brings its own threat intelligence into the Defender and Sentinel experience. Google brings Mandiant. Both are strong. The question is which one is better integrated into the workflow your analysts actually use.</p>

      <h2>Securing the AI itself</h2>
      <p>The SOC isn't only using AI. More and more, it's defending AI that the rest of the business is deploying. That's a separate question, and it matters just as much.</p>
      <p>On the Microsoft side, Purview's data security capabilities for AI and the Defender family's growing coverage of AI workloads address what AI applications can access and how they're used. On the Google side, Model Armor sits at the LLM boundary to filter prompts and responses, and Vertex AI's security controls govern agent behavior and the data behind models.</p>
      <p>If your business builds its own AI applications, look closely at how each platform protects the prompt and response layer, and how that telemetry flows back into your SOC. Defending AI you can't see isn't defending it.</p>

      <h2>The questions that actually decide it</h2>
      <p>Skip the demo. Ask these instead.</p>
      <p><strong>Where does our highest-value telemetry live today, and what does it cost to move?</strong> Data gravity usually decides this before anything else does.</p>
      <p><strong>What does our licensing already include?</strong> Many organizations already own significant Microsoft security entitlements they aren't fully using. Getting value from what you've paid for often beats a new platform.</p>
      <p><strong>Can we evaluate on our data?</strong> Insist on a proof of value against your own telemetry and your own historical incidents. Measure triage time, accuracy, and how often analysts have to correct the assistant.</p>
      <p><strong>How do we validate the AI's work?</strong> Whichever platform you choose, you need sampling, adversarial testing, and drift monitoring on AI-assisted decisions. Ask each vendor how their platform supports that, not just how accurate their model is.</p>
      <p><strong>What's available in our cloud environment?</strong> Government and sovereign cloud availability often trails commercial. If you operate in GCC High or another regulated environment, confirm what's actually available to you, not just what's on the roadmap.</p>

      <h2>You don't have to pick a religion</h2>
      <p>Plenty of mature SOCs run both. Microsoft for identity, endpoint, and productivity telemetry where it's native. Google for large-scale log analytics or specific workloads. The integration cost is real, but so is the cost of forcing every data source onto one platform for the sake of purity.</p>
      <p>What matters is a clear architecture: which platform is the system of record for investigations, where AI-assisted decisions get logged and validated, and how analysts move between the two without losing context.</p>

      <h2>The decision that matters</h2>
      <p>The AI-assisted SOC isn't won by picking the smartest model. Both vendors will keep leapfrogging each other on model quality. Whatever lead one has today won't last.</p>
      <p>It's won by the team that has its data where the AI can reach it, validates what the AI produces, and knows how to measure whether the AI is actually making analysts faster and more accurate. Build that discipline, and either platform will serve you well. Skip it, and neither will.</p>

      <hr />
      <p><em>I write weekly on AI-assisted security operations across the Microsoft and Google stacks, from an operator who works in both. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'prompt-injection-detection': () => (
    <>
      <p>Most conversations about prompt injection end at the model. Better system prompts. Better guardrails. Better input filtering. Wait for the vendor to make the model more resistant.</p>
      <p>All of that helps. None of it is enough. You don't treat SQL injection as purely a database problem, and you shouldn't treat prompt injection as purely a model problem. Once your organization deploys AI agents that read untrusted content and take actions, prompt injection becomes a security operations problem. Your SOC needs to be able to detect it.</p>

      <h2>Why prevention alone won't hold</h2>
      <p>Prompt injection exploits something fundamental about how language models work. Instructions and data travel through the same channel. When an agent reads an email, a web page, a document, or a support ticket, any text in that content can try to act as an instruction.</p>
      <p>Direct injection, where a user types something malicious into a chat box, is the version everyone demos. Indirect injection is the one that matters for enterprises. The malicious instruction is planted in content the agent processes on someone else's behalf. A hidden line in a shared document. A crafted email in an inbox an assistant summarizes. A poisoned web page an agent retrieves for research.</p>
      <blockquote>You can't fully sanitize natural language. When prevention is probabilistic, detection is required.</blockquote>
      <p>Prompt and response filtering at the LLM boundary, the job tools like Google's Model Armor and comparable gateway controls are built for, catches a meaningful share of known patterns. It's a necessary layer. But attackers iterate on phrasing faster than signatures can, and a filter tuned aggressively enough to catch everything will break legitimate use.</p>

      <h2>Detect the behavior, not just the words</h2>
      <p>Once you accept that some injections will get through, the question changes. Instead of "did a malicious prompt get in," you ask "did the agent do something it shouldn't have." That's a question your SOC already knows how to answer, because it's the same question you ask about compromised accounts.</p>
      <p><strong>Treat agents as identities.</strong> Every agent should have its own identity, its own permissions, and its own audit trail. If an agent's actions are indistinguishable from its user's actions, you can't detect when the agent goes off-script.</p>
      <p><strong>Baseline agent behavior.</strong> An email-summarizing assistant has a predictable pattern: read messages, produce summaries. An agent that suddenly forwards mail externally, touches files outside its normal scope, or calls tools it rarely uses is showing the same anomaly pattern you'd flag on a compromised user.</p>
      <p><strong>Watch the tool calls.</strong> In agentic systems, the dangerous moment isn't the text the model generates. It's the action it takes. Log every tool invocation with its parameters and the context that triggered it. Outbound data movement, permission changes, and external communication initiated by an agent should be high-signal detection targets.</p>
      <p><strong>Correlate input with action.</strong> The strongest detections link what the agent read to what it did next. An agent that processes an external document and then immediately takes an unusual action is the shape of a successful indirect injection. Your detection logic can look for that sequence.</p>

      <h2>Build the telemetry before you need it</h2>
      <p>None of this works without data, and most AI deployments don't produce security-grade telemetry by default.</p>
      <p><strong>Log prompts and responses</strong>, with appropriate handling for sensitive content, into the same platform your SOC investigates from. A separate AI dashboard nobody watches doesn't count.</p>
      <p><strong>Log gateway verdicts.</strong> When your prompt filter blocks or flags something, that's a signal. A spike in blocked injections against one application, or from one content source, tells you someone is probing.</p>
      <p><strong>Log tool calls and outcomes</strong> with enough context to reconstruct the chain: which input, which reasoning step, which action, and what result.</p>
      <p><strong>Keep the agent's identity attached</strong> to every action in downstream systems, so a file access or a sent message can be traced back to the agent that did it.</p>

      <h2>Limit the blast radius</h2>
      <p>Detection buys you response time. Architecture decides how much damage happens before you respond.</p>
      <p>Agents should have the minimum permissions their task requires and nothing more. High-impact actions like sending external communications, moving data out of the tenant, changing permissions, or deleting anything belong behind a human approval gate. Agents that process untrusted content should be separated from agents that hold powerful tools wherever you can manage it.</p>
      <p>A successful injection against a read-only summarizer is an annoyance. A successful injection against an agent with broad write access and no approval gates is an incident.</p>

      <h2>Test it like any other detection</h2>
      <p>Your detections for agent misuse need the same discipline as the rest of your detection content. Build a corpus of injection attempts, both direct and indirect, across the content types your agents process. Run them against your deployed agents on a schedule. Measure what the filters catch, what the behavioral detections catch, and what gets through both.</p>
      <p>When the model changes, the system prompt is tuned, or a new tool is added, run the corpus again. Coverage that held last month may not hold today.</p>

      <h2>The shift that matters</h2>
      <p>Prompt injection isn't going away. It comes from how language models process text, and every agent you deploy that reads untrusted content will be exposed to it.</p>
      <p>The organizations that handle it well won't be the ones that found the perfect filter. They'll be the ones that treated agents as identities, logged what agents do, built detections for agents misbehaving, and kept humans in the loop for actions that matter. That's not a new discipline. It's the SOC you already run, extended to a new kind of actor.</p>

      <hr />
      <p><em>I write weekly on securing agentic AI, from prompt-layer defenses to the SOC detections that catch what the filters miss. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'first-72-hours-after-breach': () => (
    <>
      <p>Nobody plans to have the worst week of their career. But if you're reading this, there's a decent chance you'll eventually get the call. Something is wrong. An alert you can't explain. A ransom note. A partner telling you your credentials are for sale. A regulator asking a question you can't answer.</p>
      <p>What happens in the next 72 hours shapes almost everything that follows: how much damage the attacker does, how fast you recover, what you can prove later, and how your customers, regulators, and board judge your response.</p>
      <p>This isn't legal advice. Breach response has real legal and regulatory dimensions, and you should have counsel involved early. This is the operational view: the decisions that separate a contained incident from a catastrophe.</p>

      <h2>Hour zero: stop, then move deliberately</h2>
      <p>The first instinct in a breach is to act. Wipe the machine. Reset every password. Pull the network cable. Some of those actions may be right. Done in a panic, all of them can destroy the evidence you need and tip off an attacker who is still inside.</p>
      <p><strong>Declare the incident.</strong> Formally. Someone needs to be in charge, and everyone needs to know who. Ambiguous ownership in the first hour costs you more than almost any technical mistake.</p>
      <p><strong>Pull in the right people early.</strong> Your incident response lead, legal counsel, executive leadership, and, if you have one, your cyber insurance carrier. Many insurance policies have requirements about notification timing and which response firms you can use. Finding out later can be expensive.</p>
      <p><strong>Move communications out of band.</strong> If there's any chance email or chat is compromised, don't coordinate the response over the systems the attacker may be reading.</p>
      <blockquote>The goal of hour zero isn't to fix the problem. It's to make sure the next 71 hours are run deliberately, not reactively.</blockquote>

      <h2>Preserve before you remediate</h2>
      <p>Evidence is perishable. Memory contents vanish when a machine reboots. Logs roll over on their retention schedule. Cloud audit data may only be kept for a limited window depending on your licensing and configuration.</p>
      <p>Before you wipe or rebuild anything, capture what you can: memory and disk images of key systems where practical, exports of relevant identity, email, endpoint, and cloud audit logs, and a record of what you observed and when. Extend log retention right away where you can.</p>
      <p>This matters for more than the technical investigation. If the incident turns into litigation, regulatory inquiry, or an insurance claim, the evidence you preserved in the first day may decide what you can prove. Your counsel will have views on how evidence should be handled. Ask early.</p>

      <h2>Scope before you contain, but not for long</h2>
      <p>Containing too early, before you know how far the attacker got, often means kicking them out of one door while they stay in through three others. Then they know you've seen them, and they change tactics.</p>
      <p>Containing too late means more damage. The balance is a short, focused scoping effort.</p>
      <p><strong>Identify the entry point if you can.</strong> A phished credential, an exposed service, a vulnerable edge device, a compromised vendor.</p>
      <p><strong>Map the identities involved.</strong> In modern environments, the attacker's real foothold is usually identity: compromised accounts, persistent sessions and tokens, malicious app registrations or consents, new MFA methods registered by the attacker. Endpoint cleanup without identity cleanup leaves the door open.</p>
      <p><strong>Look for persistence.</strong> Scheduled tasks, new accounts, mailbox forwarding rules, remote access tools, and changes to privileged groups.</p>
      <p>Then contain decisively and in a coordinated way. Reset compromised credentials, revoke sessions and tokens, remove persistence, and isolate affected systems, ideally all in one planned move instead of a trickle that warns the attacker.</p>

      <h2>Communicate with discipline</h2>
      <p>The incident story gets written in the first 72 hours whether you write it or not.</p>
      <p>Keep an internal timeline of facts: what you know, when you learned it, and what you did about it. Separate confirmed facts from working hypotheses in every update. Leadership needs regular, honest briefings, including what you don't know yet.</p>
      <p>External communication to customers, partners, regulators, and the public should be coordinated through leadership and counsel. Notification obligations can come with strict deadlines that depend on your industry, jurisdiction, and contracts, and some start running at discovery. That's exactly why counsel belongs in hour zero, not day three.</p>

      <h2>What you can do today, before the call</h2>
      <p>Everything above goes faster and better if you prepared for it. A few things are worth doing now.</p>
      <p><strong>Know your logs.</strong> Confirm what you're collecting across identity, email, endpoint, and cloud, and how long you keep it. Find the gaps now, while fixing them is cheap.</p>
      <p><strong>Write down who gets called.</strong> Incident lead, counsel, leadership, insurer, outside response firm. Phone numbers, not just email addresses.</p>
      <p><strong>Know your insurance terms.</strong> Notification requirements, approved response vendors, and what's covered.</p>
      <p><strong>Run a tabletop.</strong> Walk leadership through a realistic scenario. The first time your executives make breach decisions shouldn't be during a real breach.</p>

      <h2>How the story ends</h2>
      <p>Breaches are survivable. Organizations recover from them every day. The ones that recover well aren't the ones that never got hit. They're the ones that ran the first 72 hours with a clear owner, preserved the evidence, scoped before they contained, and communicated with discipline.</p>
      <p>You can't choose whether you get the call. You can choose how ready you are when it comes.</p>

      <hr />
      <p><em>I write weekly on incident response, detection, and the Microsoft security stack, plus the preparation that makes a bad week survivable. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'detection-as-code-kql': () => (
    <>
      <p>Somewhere in your Sentinel workspace there's an analytic rule nobody understands. It fires a few times a week. Nobody remembers who wrote it, why the threshold is what it is, or whether the exclusion buried in the middle of the query was a temporary fix or a permanent decision. Everyone is afraid to touch it.</p>
      <p>Multiply that by a few hundred rules and you've described the detection library in most SOCs. It isn't a lack of talent. It's that detections were built in a portal, edited in place, and never treated like the production code they are.</p>
      <p>Detection-as-code fixes that. And it isn't only for large teams with dedicated engineering staff. Small teams arguably benefit the most.</p>

      <h2>Why portal-built detections decay</h2>
      <p>When detections live only in the SIEM portal, a few predictable things happen.</p>
      <p><strong>No history.</strong> A rule gets edited and the previous version is gone. When a detection stops firing, nobody can tell whether the threat went away or someone broke the query.</p>
      <p><strong>No review.</strong> One analyst's change goes straight to production. A typo in a filter can silently blind you to an entire attack class, and nobody notices because silence looks like success.</p>
      <p><strong>No context.</strong> The reasoning behind a detection, including what it catches, what it deliberately ignores, and which technique it maps to, lives in someone's head. When that person leaves, the context leaves with them.</p>
      <p><strong>No portability.</strong> Rebuilding your content in a new workspace, a new tenant, or a customer environment means manual copy and paste with all the drift that comes with it.</p>
      <blockquote>A detection you can't explain, review, or roll back isn't an asset. It's a liability that occasionally produces alerts.</blockquote>

      <h2>What detection-as-code actually means</h2>
      <p>The idea is simple. Your detections live in a version-controlled repository as the source of truth. The SIEM gets deployed from the repository, not edited by hand.</p>
      <p>Each detection is a file containing the query logic plus the metadata that gives it meaning: a description, severity, the MITRE ATT&amp;CK techniques it addresses, the data sources it depends on, known false-positive conditions, and an owner. Changes go through pull requests. Deployment happens through a pipeline. Microsoft Sentinel supports this pattern through its repositories integration and its API, and the same approach works for any SIEM with a programmatic interface.</p>
      <p>You don't need a sophisticated platform to start. A repository, a consistent file format, and a deployment path get you most of the value.</p>

      <h2>The small-team version</h2>
      <p>Large detection engineering teams build elaborate CI/CD with automated testing frameworks. You don't need that on day one. Here's what matters for a team of two to five.</p>
      <p><strong>Get everything into the repository.</strong> Export your existing analytic rules and commit them as your baseline. Even before you change your workflow, you now have history and a backup.</p>
      <p><strong>Require one reviewer.</strong> Every change gets a second set of eyes before it deploys. On a small team, that review is also how knowledge spreads. Nobody is the only person who understands a detection.</p>
      <p><strong>Write down the why.</strong> Every detection gets a short description of what it catches and why the logic is shaped the way it is. Every exclusion gets a reason and, ideally, an expiration. Future you will be grateful.</p>
      <p><strong>Automate deployment.</strong> Once changes merge, a pipeline pushes them to the SIEM. Hand edits in the portal are discouraged, and drift between the repository and production gets flagged. That's what makes the repository the real source of truth.</p>

      <h2>Add testing as you mature</h2>
      <p>Once the basics are in place, testing is where detection-as-code really pays off.</p>
      <p><strong>Syntax validation</strong> catches broken queries before they reach production. It's the cheapest check, and it prevents the most embarrassing failures.</p>
      <p><strong>Known-bad test data</strong> lets you prove a detection fires on the behavior it's meant to catch. Keep sample events or attack simulation output that should trigger each rule, and verify it does.</p>
      <p><strong>Known-good test data</strong> checks that a change didn't create a flood of false positives.</p>
      <p><strong>Coverage mapping</strong> generated from detection metadata shows which ATT&amp;CK techniques you cover and where the gaps are. Now you can talk about detection coverage with leadership and auditors in concrete terms.</p>

      <h2>The benefits compound</h2>
      <p>The immediate payoff is fewer broken detections and less fear of change. The longer-term payoff is bigger.</p>
      <p>Detection content becomes reusable across environments. That's huge for MSSPs and for organizations running both commercial and government tenants. Onboarding a new analyst means pointing them at a documented repository, not a portal full of mysteries. AI-assisted detection drafting fits safely into the workflow, because every AI-suggested rule goes through the same review and testing gates as a human-written one.</p>
      <p>And when an auditor asks how detection content is managed, approved, and changed, you have a complete answer: the repository history.</p>

      <h2>Start smaller than you think</h2>
      <p>You don't need to migrate your whole library this quarter. Export what you have, commit it, and make the next change through a pull request. Then the one after that. Within a few months, the repository is how your team works.</p>
      <p>Your detections are the most important code your SOC owns. Treat them that way, and they'll start getting better instead of quietly decaying.</p>

      <hr />
      <p><em>I write weekly on detection engineering, Sentinel, and the practices that keep small SOCs effective. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),
  'mcp-server-least-privilege': () => (
    <>
      <p>The demo always goes the same way. Someone wires an AI agent to a handful of MCP servers, asks it a question about an incident, and watches it pivot across identity logs, endpoint telemetry, and the ticketing system in thirty seconds. The room gets quiet. Somebody says "ship it."</p>
      <p>Nobody in that room asks the question that matters: what else can that agent do with the access we just gave it?</p>
      <p>If you're building agentic workflows on Model Context Protocol, you are handing a non-deterministic system a set of credentials. The access model you design in the first month is the access model you'll be defending to an auditor, or explaining in an incident review, a year from now. Get it right before the agent gets popular.</p>

      <h2>Why MCP changes the access conversation</h2>
      <p>Traditional automation is predictable. A Logic App or a Python script does exactly what its code says. You can read it, review it, and know the full blast radius of its service principal before it ever runs.</p>
      <p>An agent is different. It decides which tools to call, in what order, with what arguments, based on a prompt and whatever data it has read along the way. The code doesn't define the behavior. The model does — and the model can be steered.</p>
      <p>That last part is the one teams underestimate. Every log line, email body, ticket comment, and file the agent reads is input. If an attacker can put text in front of your agent, they can try to tell it what to do next. That's prompt injection, and it means the effective permissions of your agent are not "what we intended it to do." They're <em>everything its tools allow.</em></p>
      <blockquote>Design the MCP layer as if the agent will eventually be convinced to do the worst thing its tools permit. Because someday, someone will try.</blockquote>

      <h2>Four rules for scoping MCP servers</h2>
      <p><strong>One server, one job.</strong> The fastest way to build an MCP server is to wrap an entire API — every Graph endpoint, every Sentinel operation — and expose it as a generic "call anything" tool. It's also the fastest way to give an agent tenant-admin reach. Build narrow servers with narrow, typed tools: "look up sign-in history for a user," not "run an arbitrary Graph request." Narrow tools are easier to reason about, easier to log, and much harder to abuse.</p>
      <p><strong>Separate read from write.</strong> Investigation and response are different risk classes. Put read-only enrichment tools in one server with one identity. Put anything that changes state — disabling an account, isolating a device, closing an incident — in a separate server with a separate identity and an approval gate in front of it. If a read path gets compromised, it shouldn't be able to reach a write path.</p>
      <p><strong>Give every server its own identity.</strong> Don't let five MCP servers share one service principal because it was convenient during the pilot. Each server gets its own managed identity or app registration, scoped to the minimum roles and data it needs. When something goes wrong, you want to revoke one server's access without taking down the whole agent stack — and you want the audit logs to tell you exactly which server did what.</p>
      <p><strong>Scope by data, not just by action.</strong> Read-only isn't automatically safe. An agent with read access to every mailbox, every SharePoint site, and every HR record is a data exfiltration path waiting for the right prompt. Limit what each tool can return: specific tables, specific workspaces, specific fields. Redact or summarize sensitive values at the server before they ever reach the model.</p>

      <h2>The identity behind the agent</h2>
      <p>There's a design choice most teams skip past: whose authority is the agent acting with?</p>
      <p>Option one is the agent's own identity — a service principal with a fixed role set. Simple, predictable, and dangerous if those roles are broad, because every user of the agent inherits them.</p>
      <p>Option two is delegated authority — the agent acts on behalf of the signed-in analyst, with that analyst's permissions. Better alignment with existing access controls, and a tier-one analyst can't use the agent to do tier-three work. It's more work to build, and you need to be careful with token handling, but for anything touching sensitive data it's usually the right answer.</p>
      <p>Most mature designs end up with a mix: delegated access for queries that touch user and business data, a tightly scoped service identity for low-risk enrichment like threat intelligence lookups. The point is to make the choice deliberately, per tool, and write it down.</p>

      <h2>Guardrails that live outside the model</h2>
      <p>You can't prompt your way to security. System prompts telling the agent "never disable executive accounts" are suggestions, not controls. Real guardrails live in the MCP server and the infrastructure around it, where the model can't talk its way past them.</p>
      <ul>
        <li><strong>Input validation at the server.</strong> Every tool argument gets validated against an allowlist or schema. If a tool takes a username, it rejects anything that isn't a username.</li>
        <li><strong>Rate and volume limits.</strong> An investigation might need fifty lookups. It does not need fifty thousand. Cap it, and alert when the cap is hit.</li>
        <li><strong>Policy checks on every write.</strong> State-changing tools check the target against protected lists — break-glass accounts, domain controllers, executive devices — before acting, regardless of what the agent requested.</li>
        <li><strong>Human approval for consequential actions.</strong> The agent proposes; a person approves. More on designing those gates in a later post — the short version is that the approval must be enforced by the server, not requested politely by the prompt.</li>
      </ul>

      <h2>Log it like an auditor is reading</h2>
      <p>Every tool call should produce a record: which agent, which server, which identity, which arguments, what came back, and which human session triggered it. Ship those records to your SIEM like any other privileged activity log.</p>
      <p>This isn't just for compliance. It's your detection surface for the agent itself. An agent suddenly querying mailboxes it's never touched, calling write tools at 3 a.m., or hitting rate limits on a lookup tool is exactly the kind of anomaly you'd alert on for a human admin. Treat the agent with the same suspicion.</p>
      <p>In federal environments, this gets sharper. Assessors are going to ask how AI-driven actions are attributed, reviewed, and retained. Teams that designed tool-call logging from day one will hand over a report. Teams that didn't will be reconstructing it from memory.</p>

      <h2>Where to start this month</h2>
      <p>If you already have an agent pilot running, you don't need to tear it down. Do an access review on it, the same way you'd review a new privileged account.</p>
      <p><strong>Inventory the tools.</strong> List every MCP server and every tool the agent can call. Most teams are surprised by the length of that list.</p>
      <p><strong>Map each tool to an identity and a permission set.</strong> Anywhere you find a shared identity or a broad role, that's your first fix.</p>
      <p><strong>Split read from write.</strong> Move every state-changing tool behind a separate server and an approval gate.</p>
      <p><strong>Turn on the logging.</strong> If tool calls aren't landing in your SIEM today, that's the gap to close before the agent's next expansion.</p>

      <h2>What gets you to yes</h2>
      <p>Least privilege for MCP isn't about slowing the agent down. It's about making it safe to say yes to the next use case.</p>
      <p>The teams that scope their tools tightly, separate identities, and log every call are the teams whose security leadership keeps approving expansion. The teams that ship the "call anything" server end up with one bad prompt, one uncomfortable incident review, and a pilot that gets shut down along with the productivity it was delivering.</p>
      <p>Give the agent the keys it needs. Not the whole ring.</p>

      <hr />
      <p><em>I'm writing weekly on agentic SOC architecture, MCP security, and the Cloud security surface most consultants skip. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'purview-dlp-false-positives': () => (
    <>
      <p>Most Purview DLP rollouts fail the same way. Not with a breach — with a help desk queue.</p>
      <p>The policy goes live on a Monday. By Wednesday, finance can't send invoices, HR can't email offer letters, and someone in legal has escalated to the CIO because a contract got blocked mid-negotiation. By Friday the policy is in "audit only," and it stays that way for two years.</p>
      <p>The organization paid for data loss prevention. What it actually has is a data loss <em>observation</em> program that nobody reads. If that sounds familiar, the problem isn't the product. It's the rollout.</p>

      <h2>Why DLP drowns in noise</h2>
      <p>Out-of-the-box sensitive information types are designed to be broad. A nine-digit number near the word "social" might be a Social Security number. A sixteen-digit number might be a credit card. Broad detection is the right default for a vendor that doesn't know your business. It's the wrong default for enforcement.</p>
      <p>Three patterns cause most of the noise I see:</p>
      <ul>
        <li><strong>Low-confidence matches enforced like high-confidence ones.</strong> Sensitive information types support confidence levels for a reason. Blocking on a low-confidence match treats every order number and part ID as a potential breach.</li>
        <li><strong>Single-instance thresholds.</strong> A policy that fires on one match catches the employee emailing their own tax form to their spouse. It doesn't distinguish that from someone exporting a customer database.</li>
        <li><strong>No business context.</strong> The same content is fine when HR sends it to the benefits provider and a problem when it goes to a personal Gmail. A policy that ignores sender, recipient, and destination can't tell the difference.</li>
      </ul>

      <h2>Start with what you're actually protecting</h2>
      <p>Before touching a policy, answer one question with your data owners: what data, leaving which way, would actually hurt us?</p>
      <p>That conversation usually produces a short list. Customer PII going to personal accounts. Regulated data — CUI, PHI, cardholder data — leaving the tenant. Source code and design files going to unmanaged cloud storage. Bulk exports by departing employees.</p>
      <p>That list is your policy roadmap. Not every sensitive information type Microsoft ships — the handful of scenarios that would show up in a breach notification or a contract dispute. Build for those first.</p>

      <h2>A rollout plan that survives contact with users</h2>
      <p><strong>Phase 1: Simulate.</strong> Every new policy starts in simulation mode. Let it run long enough to see a real business cycle — month-end close, payroll, a quarterly report. Review the matches in Activity explorer with the data owner, not just the security team. You're looking for the legitimate workflows that would have been blocked.</p>
      <p><strong>Phase 2: Tune.</strong> Raise confidence levels where low-confidence matches dominate. Set instance-count thresholds so a single match generates a tip and a bulk match generates enforcement. Add exceptions for known-good flows — specific partner domains, specific service accounts, specific SharePoint sites. Where built-in types keep misfiring on your data, consider exact data match or trainable classifiers so the policy is looking for <em>your</em> sensitive data, not data that merely looks sensitive.</p>
      <p><strong>Phase 3: Coach before you block.</strong> Turn on policy tips. Let users see that what they're sending is sensitive and give them an override with a business justification. This does two things: it teaches users without stopping their work, and the justifications become a free tuning dataset. A pile of "sending to our auditor" overrides tells you exactly which exception you forgot.</p>
      <p><strong>Phase 4: Enforce, narrowly.</strong> Block only the high-confidence, high-volume, clearly-wrong-destination scenarios. Bulk customer data to a personal email. Regulated data shared externally from an unmanaged device. Keep the coaching tier for everything else.</p>
      <blockquote>The goal isn't to catch every sensitive byte. It's to stop the exfiltration scenarios that matter while keeping users on your side.</blockquote>

      <h2>Make the alerts worth reading</h2>
      <p>Even a well-tuned policy generates alerts, and DLP alerts tend to land in a queue nobody owns. Fix the ownership before you fix the volume.</p>
      <p>Route DLP alerts to the team that can actually act on them, with severity tied to the scenario: a single override is informational, a bulk export to a personal account is an incident. Where you run Sentinel or Defender XDR, correlate DLP events with identity and endpoint signals. A DLP hit on its own is a data question. A DLP hit from an account with a risky sign-in and a resignation date next week is a security incident.</p>
      <p>If your organization uses insider risk management, this is where it earns its license — turning scattered DLP events into a risk story about a person, with appropriate privacy controls, instead of a thousand disconnected alerts.</p>

      <h2>Measure the right things</h2>
      <p>Most teams measure DLP by policy count. That tells you nothing. Track these instead:</p>
      <ul>
        <li><strong>Override rate by policy.</strong> High overrides with legitimate justifications mean the policy needs tuning.</li>
        <li><strong>Help desk tickets tied to DLP.</strong> If this number rises after an enforcement change, you over-rotated.</li>
        <li><strong>Time from alert to triage.</strong> If alerts age for weeks, you don't have a DLP program — you have a log.</li>
        <li><strong>Scenario coverage.</strong> For each item on that "what would hurt us" list, is there an enforcing policy? That's the number leadership should see.</li>
      </ul>

      <h2>Why this is worth getting right</h2>
      <p>DLP is one of the most visible security controls your users will ever touch. Get it wrong and you teach the whole organization that security is the department that breaks things. Every future control gets harder to deploy.</p>
      <p>Get it right and the opposite happens. Users see a helpful tip instead of a wall. Data owners see that security understood their workflows. Leadership sees enforcement on the scenarios that actually matter, with a help desk queue that didn't move. And when an assessor asks how you protect sensitive data in transit, you show them a program that's actually on — not a policy that's been in audit mode since the day it launched.</p>
      <p>You already own the license. The difference is the rollout.</p>

      <hr />
      <p><em>I'm writing weekly on Microsoft Purview, data security, and getting real value out of the Cloud security stack you already pay for. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'board-questions-ai-soc': () => (
    <>
      <p>Somewhere in the next few quarterly reviews, your security leader is going to tell the board that the SOC is "using AI." The board will nod. Someone will say it sounds like a cost savings. The meeting will move on.</p>
      <p>That's a missed opportunity — and a governance gap. AI in security operations can be a genuine force multiplier. It can also quietly close alerts that should have been incidents, take actions nobody approved, and create risk that never shows up on a dashboard.</p>
      <p>Board members don't need to understand model architectures to govern this well. They need to ask the right questions and know which answers should worry them. Here are seven.</p>

      <h2>1. What decisions is AI making on its own?</h2>
      <p>This is the most important question, and the one most often answered vaguely. "AI assists our analysts" can mean anything from summarizing incidents to automatically closing alerts and disabling accounts.</p>
      <p><strong>A good answer</strong> is specific: which alert types the AI triages, which actions it can take without a human, and which require approval.</p>
      <p><strong>An answer that should worry you:</strong> "It depends on the situation," or "the vendor handles that." If leadership can't list what the AI decides on its own, nobody is governing it.</p>

      <h2>2. How do we know it's right?</h2>
      <p>When an AI triage agent closes an alert as benign, nobody reviews that decision by default. The alerts it dismissed never become tickets. That's the whole point — and the whole risk.</p>
      <p><strong>A good answer</strong> describes a validation discipline: a senior analyst regularly samples the AI's dismissals, the team tests the AI against known-malicious scenarios, and accuracy is tracked over time. I've written about this before as <em>checking the checker.</em></p>
      <p><strong>An answer that should worry you:</strong> "The vendor's accuracy numbers are very high." Vendor evaluations were run on the vendor's data, not yours.</p>

      <h2>3. What happens when the model changes?</h2>
      <p>AI models get updated — by vendors, sometimes without much notice, and by your own team when they tune prompts or configurations. Each change can shift behavior in ways nobody predicted.</p>
      <p><strong>A good answer</strong> includes change control: model and prompt changes are tracked, tested against a standard set of scenarios before going live, and monitored afterward.</p>
      <p><strong>An answer that should worry you:</strong> Surprise that models change at all.</p>

      <h2>4. What can it access?</h2>
      <p>An AI agent that investigates incidents needs access to data — identity logs, email, endpoint telemetry, sometimes far more. That access is a new privileged identity in your environment, and it can be manipulated by attackers who plant instructions in the data it reads.</p>
      <p><strong>A good answer</strong> treats the AI like any other privileged account: least privilege, separate identities for reading versus acting, and every action logged.</p>
      <p><strong>An answer that should worry you:</strong> "It has admin access so it can be effective."</p>

      <h2>5. Who is accountable when it's wrong?</h2>
      <p>Eventually, the AI will miss something or take a wrong action. When that happens, the organization needs a clear owner — not a finger pointed at a vendor.</p>
      <p><strong>A good answer</strong> names an owner for AI-driven security decisions and describes how a wrong decision would be detected, investigated, and corrected.</p>
      <p><strong>An answer that should worry you:</strong> Silence, or "we'd contact the vendor."</p>
      <blockquote>"The model decided" is not an acceptable answer in an incident review, a regulator's inquiry, or a courtroom. Someone in your organization owns that decision.</blockquote>

      <h2>6. Could we explain a decision to a regulator?</h2>
      <p>If a customer, regulator, or assessor asks why a specific alert was closed or a specific account was disabled, can the team reconstruct what the AI saw, what it concluded, and why?</p>
      <p><strong>A good answer</strong> describes logging of the AI's inputs, tool calls, and outputs, retained alongside other security records.</p>
      <p><strong>An answer that should worry you:</strong> "We'd have to ask the vendor," or "the AI doesn't really keep that."</p>

      <h2>7. What did we do with the time it saved?</h2>
      <p>This one is about value, not risk. AI should free analysts from repetitive triage. That time should go somewhere: threat hunting, detection engineering, closing gaps in coverage.</p>
      <p><strong>A good answer</strong> shows where reclaimed capacity went and what it produced.</p>
      <p><strong>An answer that should worry you:</strong> The only outcome reported is headcount reduction. Cutting the humans who validate the AI, while trusting the AI more, is how quiet failures become loud ones.</p>

      <h2>What good governance looks like</h2>
      <p>None of these questions are meant to slow AI adoption. The SOCs that use AI well are going to outperform the ones that don't — in speed, in coverage, and in cost.</p>
      <p>But the boards that get the most from that advantage are the ones that treat AI in security like any other material capability: clear scope, clear ownership, measured performance, and evidence on request. A security leader who can answer all seven questions crisply is running an AI program. One who can't is running an experiment with your organization's risk.</p>
      <p>Ask the questions now, while the answers are still easy to fix.</p>

      <hr />
      <p><em>I'm writing weekly on agentic SOC governance, AI security validation, and the decisions security leaders face in commercial and federal environments. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'logic-app-soar-architecture': () => (
    <>
      <p>Every Sentinel environment I've been asked to rescue has the same folder. Sometimes it's a resource group. Sometimes it's just a naming convention that stopped being followed. Inside are forty, eighty, a hundred and twenty Logic Apps — each one built by whoever needed it, each one doing enrichment, decision-making, and response all in one sprawling canvas.</p>
      <p>Nobody knows which ones are still running. Nobody wants to touch the ones that are. The SOC is drowning in alerts, the automation that was supposed to help has become its own maintenance burden, and the person who built half of it left last year.</p>
      <p>If that's your environment, this post is the way out. It's the three-tier SOAR architecture I ship when a SOC needs automation that scales, survives turnover, and holds up in an audit.</p>

      <h2>Why Logic App SOAR turns into spaghetti</h2>
      <p>Logic Apps are a genuinely good SOAR engine. Native Sentinel integration, hundreds of connectors, managed identity support, and a visual designer that lets an analyst build a working playbook in an afternoon.</p>
      <p>That last strength is also the problem. Because it's easy to build a playbook, every new requirement becomes a new playbook. And because each playbook is built in isolation, each one reimplements the same things:</p>
      <ul>
        <li>The same threat intelligence lookups, with the same API keys, in slightly different ways.</li>
        <li>The same "is this a VIP?" and "is this a service account?" logic, inconsistently.</li>
        <li>The same response actions — disable user, isolate device, block indicator — each with its own error handling, or none.</li>
      </ul>
      <p>The result is duplication everywhere. Change a threat intel vendor and you edit thirty playbooks. Change the definition of a protected account and you hope you found every copy of the logic. An auditor asks which automated actions can disable a user, and nobody can answer without opening every canvas.</p>
      <blockquote>The problem isn't Logic Apps. It's that every playbook is trying to be the whole SOAR platform.</blockquote>

      <h2>The three tiers</h2>
      <p>The fix is separation of concerns. Split SOAR into three tiers, each with one job, each talking to the others through clean, consistent interfaces.</p>
      <p><strong>Tier 1 — Orchestrators.</strong> One per incident type or detection family. The orchestrator receives the incident from Sentinel, calls enrichment, asks the decision engine what to do, and routes the result to execution. It contains workflow, not business logic.</p>
      <p><strong>Tier 2 — Decision engine.</strong> The brain. It takes the enriched incident and returns a verdict and a recommended action: close as benign, escalate to an analyst, or respond automatically — and whether that response needs human approval. All the "is this a VIP," "is this asset critical," and "how confident are we" logic lives here, once.</p>
      <p><strong>Tier 3 — Execution.</strong> Small, single-purpose playbooks that do one thing well: disable a user, revoke sessions, isolate a device, block an indicator, post to a channel, update a ticket. Each one validates its input, checks protected-asset lists, logs what it did, and reports success or failure back.</p>
      <p>Enrichment sits alongside these tiers as a shared service layer — reusable lookups the orchestrator calls rather than reimplements.</p>

      <h2>The enrichment layer</h2>
      <p>Enrichment is where most of the duplication lives, so it's where centralization pays off fastest.</p>
      <p>Build one enrichment playbook per source: one for domain reputation, one for DNS and network security context, one for firewall and network analytics, one for endpoint context from Defender. In the environments I build, that typically means sources like DomainTools, BloxOne, FortiAnalyzer, and Defender for Endpoint — but the pattern holds for whatever your stack includes.</p>
      <p>Each enrichment playbook takes a standard input — an entity like an IP, domain, host, or account — and returns a standard output: a normalized verdict, a confidence, and the raw details for the analyst. Credentials live in Key Vault, accessed by managed identity, in exactly one place per source.</p>
      <p><strong>What this gets you.</strong> Swap a threat intel vendor and you change one playbook. Add a new enrichment source and every orchestrator can use it immediately. Rotate an API key once, not thirty times.</p>

      <h2>The orchestrator tier</h2>
      <p>Orchestrators are triggered by Sentinel automation rules, which give you clean control over which incidents get which workflow — by analytic rule, by severity, by tactic, by tag.</p>
      <p>A good orchestrator reads like a short checklist:</p>
      <ul>
        <li>Pull the incident and its entities.</li>
        <li>Call the relevant enrichment playbooks, in parallel where possible.</li>
        <li>Send the enriched package to the decision engine.</li>
        <li>Route the decision: close with a comment, assign to an analyst with context attached, or hand off to execution.</li>
        <li>Write everything that happened back to the incident.</li>
      </ul>
      <p>That last step matters more than it looks. Every enrichment result, every decision, and every action gets written to the incident as comments or tags. When an analyst opens the incident, the automation's work is already there. When an auditor asks what happened, the incident is the record.</p>
      <p>Keep orchestrators thin. If you find yourself writing "if VIP then" logic inside an orchestrator, it belongs in the decision engine.</p>

      <h2>The decision engine</h2>
      <p>The decision engine is the tier most SOCs don't have — and the one that makes the whole architecture work.</p>
      <p>It takes the enriched incident and applies your organization's response policy in one consistent place. Inputs include the enrichment verdicts, the entity's context (privileged account? critical server? executive?), the detection's historical accuracy, and the time of day if that matters to your response model.</p>
      <p>Outputs are simple and structured:</p>
      <ul>
        <li><strong>Verdict</strong> — benign, suspicious, or malicious.</li>
        <li><strong>Recommended action</strong> — close, escalate, or respond, and which response.</li>
        <li><strong>Approval requirement</strong> — can execution proceed automatically, or does a human need to approve first?</li>
        <li><strong>Rationale</strong> — a plain-language explanation of why, written to the incident.</li>
      </ul>
      <p>Because the response policy lives in one place, it can be reviewed, versioned, and changed deliberately. Want to stop auto-isolating developer workstations? Change one rule. Want to require approval for any action against an account in a privileged role? One rule. Leadership can actually read the policy, because it isn't scattered across a hundred canvases.</p>
      <p>The decision engine is also the natural place to introduce AI-assisted triage over time. A model can contribute a verdict and a rationale as one input — but the policy, the protected lists, and the approval requirements stay deterministic and reviewable.</p>

      <h2>The execution tier</h2>
      <p>Execution playbooks are where actual changes happen in your environment, so they get the strictest design rules.</p>
      <p><strong>Single purpose.</strong> One action per playbook. "Disable user and revoke sessions and reset MFA" is three playbooks, composed by the orchestrator.</p>
      <p><strong>Defensive by default.</strong> Every execution playbook validates its input and checks it against protected lists — break-glass accounts, domain controllers, critical infrastructure — regardless of what the decision engine said. Defense in depth applies to your automation too.</p>
      <p><strong>Least-privilege identity.</strong> Each execution playbook gets its own managed identity with only the permissions its one action needs. The playbook that posts to Teams can't disable users. The playbook that isolates devices can't touch mailboxes.</p>
      <p><strong>Idempotent and logged.</strong> Running the same action twice should be safe. Every run records what was requested, what was done, and the result.</p>
      <p><strong>What this gets you.</strong> When the auditor asks "what automation can disable a user in this environment," the answer is one playbook, one identity, one log.</p>

      <h2>Human-in-the-loop approval gates</h2>
      <p>Not every response should be automatic. Isolating a CEO's laptop or disabling a production service account needs a human decision. But the human shouldn't have to do the investigation from scratch to make it.</p>
      <p>When the decision engine flags an action as requiring approval, the orchestrator sends an approval request — an adaptive card in Teams or an email to the on-call analyst — containing the incident summary, the enrichment results, the recommended action, and the rationale. The analyst approves or rejects with one click. The approver's identity and decision are written back to the incident.</p>
      <p>Two design rules make these gates hold up:</p>
      <ul>
        <li><strong>Timeouts have a defined outcome.</strong> If nobody responds within the window, the workflow escalates — it never silently proceeds.</li>
        <li><strong>The gate is enforced by the workflow, not by convention.</strong> Execution only runs after a recorded approval. There's no path around it.</li>
      </ul>
      <p>I'll go deeper on approval gate design in a follow-up post, because getting them right is what makes leadership comfortable expanding automation.</p>

      <h2>Operating the architecture</h2>
      <p>Architecture is only half the job. The other half is making it maintainable after the people who built it move on.</p>
      <p><strong>Infrastructure as code.</strong> Every playbook is deployed from source control through templates, not built by hand in the portal. Changes go through review. Environments — dev, test, production — stay in sync.</p>
      <p><strong>Naming and tagging standards.</strong> Tier, function, and owner are visible in the resource name and tags. Anyone can look at the resource group and understand the system.</p>
      <p><strong>Health monitoring.</strong> Logic App run failures feed back into Sentinel as their own signal. A silently failing enrichment playbook degrades every orchestrator that depends on it; you want to know the same day.</p>
      <p><strong>Cost awareness.</strong> Logic Apps bill on execution, and chatty orchestrators on high-volume detections add up. Centralized enrichment helps — you can add caching and deduplication in one place instead of thirty.</p>

      <h2>Migrating from spaghetti</h2>
      <p>You don't have to rebuild everything at once. The migration path I recommend:</p>
      <p><strong>Start with enrichment.</strong> Build the shared enrichment playbooks first. They're low risk, and existing playbooks can start calling them immediately, which eliminates duplication without changing behavior.</p>
      <p><strong>Then pick one high-volume detection.</strong> Build its orchestrator and a first version of the decision engine. Run it alongside the legacy playbook, compare outcomes, then cut over.</p>
      <p><strong>Then extract execution.</strong> Pull response actions out of legacy playbooks into single-purpose execution playbooks with their own identities.</p>
      <p><strong>Then retire.</strong> Every migrated detection lets you delete legacy playbooks. Track the count. Watching it fall is the most satisfying metric in the project.</p>

      <h2>What changes for the SOC</h2>
      <p>The payoff isn't elegance. It's what the SOC can do once automation stops being a liability.</p>
      <p>Analysts open incidents with the enrichment already done and a recommended action already written. High-confidence, low-risk incidents close themselves with a documented rationale. Consequential actions arrive as one-click approvals instead of thirty-minute investigations. New detections get automation in hours, because the building blocks already exist.</p>
      <p>And when someone asks how your automation decides, acts, and gets approved, you have an answer that fits on one slide — instead of a folder nobody wants to open.</p>

      <hr />
      <p><em>I'm writing weekly on Sentinel SOAR architecture, Logic Apps at scale, and agentic SOC design across commercial and federal Cloud environments. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'human-in-the-loop-approval-gates': () => (
    <>
      <p>"Don't worry, there's a human in the loop."</p>
      <p>It's the sentence that gets automation approved. It's on every architecture slide for every SOAR and agentic SOC project. And in most environments, it's doing a lot less work than anyone thinks.</p>
      <p>The human is there. They get a notification. They click approve — quickly, every time, because the last two hundred requests were fine and there are forty more in the queue. The loop exists. The judgment doesn't.</p>
      <p>If you're relying on approval gates to make automated response safe, they have to be designed as controls, not as courtesies. Here's what that looks like.</p>

      <h2>How approval gates fail</h2>
      <p>Approval gates rarely fail because the technology breaks. They fail because of how people interact with them.</p>
      <p><strong>Rubber-stamping.</strong> When almost every request is legitimate and the approver has no time, approval becomes reflex. The gate catches nothing because nobody is actually evaluating.</p>
      <p><strong>Context starvation.</strong> The request says "Approve: disable account jsmith?" and nothing else. To decide properly, the approver would need to open the incident, check the logs, and look up the user. They won't. They'll approve.</p>
      <p><strong>Silent defaults.</strong> The request times out, and the workflow proceeds anyway — or quietly gives up. Either way, nobody decided.</p>
      <p><strong>Bypass paths.</strong> The gate exists in the main playbook, but a second playbook, or the agent's direct tool access, can perform the same action without it. The control is only as strong as its weakest path.</p>
      <blockquote>A gate that approves everything isn't a control. It's a delay with a signature on it.</blockquote>

      <h2>Gate the right actions</h2>
      <p>The first design decision is which actions need approval at all. Gate too few and you've automated risk. Gate too many and you've built a rubber-stamp machine.</p>
      <p>A useful way to decide is to score each automated action on two dimensions: how much damage it does if wrong, and how hard it is to reverse.</p>
      <ul>
        <li><strong>Low impact, easily reversed</strong> — adding a tag, posting a notification, revoking a session that the user can re-establish. Automate fully.</li>
        <li><strong>Moderate impact, reversible</strong> — isolating a standard workstation, disabling a standard user account. Automate when confidence is high; gate when it isn't.</li>
        <li><strong>High impact or hard to reverse</strong> — disabling privileged or service accounts, isolating servers, deleting messages tenant-wide, blocking a business partner's domain. Always gate.</li>
      </ul>
      <p>The rest of the context — who the target is, how critical the asset is — modulates the decision. Isolating a kiosk and isolating a domain controller are the same action with very different stakes.</p>

      <h2>Give the approver what they need to decide</h2>
      <p>An approval request should let a competent analyst make a sound decision in under a minute without opening another tool. That means every request includes:</p>
      <ul>
        <li><strong>What happened</strong> — a short, plain-language incident summary.</li>
        <li><strong>The evidence</strong> — key enrichment results and the indicators that drove the verdict.</li>
        <li><strong>The proposed action and its blast radius</strong> — what will change, for whom, and what it will break.</li>
        <li><strong>The rationale</strong> — why the automation, or the agent, recommends this.</li>
        <li><strong>How to undo it</strong> — so the approver knows the cost of being wrong.</li>
      </ul>
      <p>When AI agents are generating the recommendation, the rationale matters even more. The approver should see what the agent looked at and why it concluded what it did — not just its conclusion.</p>

      <h2>Make the gate enforceable</h2>
      <p>The gate has to be enforced by the system, not requested by the workflow.</p>
      <p><strong>Execution requires a recorded approval.</strong> The action itself checks for a valid, unexpired approval tied to that specific incident and action before running. No approval record, no action.</p>
      <p><strong>No alternate paths.</strong> Inventory every playbook, script, and agent tool that can perform each gated action. If any of them can perform it without passing through the gate, the gate doesn't exist yet.</p>
      <p><strong>Approvers are authorized.</strong> Not everyone who can see a Teams channel should be able to approve disabling an executive's account. Tie approval rights to role, and record the approver's identity.</p>
      <p><strong>Timeouts escalate.</strong> An unanswered request goes to the next tier — never to silent execution, and never to silent abandonment.</p>
      <p><strong>Separation where it matters.</strong> For the highest-impact actions, the person who triggered or tuned the automation shouldn't be the only approver.</p>

      <h2>Fight approval fatigue</h2>
      <p>Even a well-designed gate degrades if the approver sees too many requests. Fatigue is the enemy; volume is the cause.</p>
      <p><strong>Shrink the queue.</strong> If an action gets approved essentially every time under specific conditions, that's evidence you can automate it under those conditions. Move it out of the gate and let the approver focus on the cases that are actually ambiguous.</p>
      <p><strong>Batch related requests.</strong> Ten isolation requests from the same incident should be one decision, not ten.</p>
      <p><strong>Measure the approvers.</strong> Track approval rates, rejection rates, and time-to-decision. An approver who has never rejected anything, or who approves in two seconds every time, is telling you the gate isn't working.</p>
      <p><strong>Test the gate.</strong> Periodically send a request that should be rejected — a clearly wrong target, an action against a protected asset — and see what happens. This is the approval-gate equivalent of a phishing simulation, and it's the only way to know whether the human is really in the loop.</p>

      <h2>Log it as evidence</h2>
      <p>Every gated action should leave a complete record: the request, the context presented, who approved or rejected it, when, and what happened next. Write it to the incident and to your SIEM.</p>
      <p>That record is what turns "we have a human in the loop" from a slide claim into audit evidence. In federal and regulated environments, it's increasingly what assessors will ask for when automated or AI-driven response is in scope.</p>

      <h2>Why this is the control that unlocks automation</h2>
      <p>Approval gates aren't friction on your automation program. They're what makes leadership comfortable letting it grow.</p>
      <p>When gates are well designed — the right actions, real context, enforced paths, measured approvers — the SOC gets to automate aggressively where it's safe and keep human judgment exactly where it's needed. Every month, the approval data shows which actions have earned full automation. The program expands on evidence, not optimism.</p>
      <p>When gates are a courtesy, the opposite happens. One bad auto-approved action, one incident review, and every automation project gets frozen.</p>
      <p>Put a human in the loop. Then make sure the loop actually needs them.</p>

      <hr />
      <p><em>I'm writing weekly on SOAR design, agentic SOC guardrails, and the Cloud security surface most consultants skip. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),
  'unused-microsoft-licenses': () => (
    <>
      <p>Most federal programs I walk into have already paid for a better security posture than the one they're running.</p>
      <p>The licenses are on the invoice. E5 or G5 seats. Defender for Endpoint, Defender for Identity, Defender for Office 365. Purview information protection. Entra ID P2. Sentinel workspaces stood up during the last modernization push. The money left the building a long time ago.</p>
      <p>And then you open the tenant. Defender for Identity sensors installed on half the domain controllers. Purview sensitivity labels defined but never published. Conditional Access policies still in report-only from the pilot. Attack surface reduction rules sitting in audit mode for two years. Privileged Identity Management turned on for three accounts.</p>
      <p>That's the thesis behind this practice, and the reason for the number in the title. It isn't a statistic from a study. It's what I see in tenant after tenant: the large majority of the security capability a federal program pays for is never configured to do its job. Call it 80%. In some environments it's worse.</p>

      <h2>Accumulation versus extraction</h2>
      <p>Federal IT runs on an accumulation model. A capability gap shows up in an assessment, a POA&amp;M item gets written, and the fix is procurement. Buy the license tier that includes the feature. Check the box. Move on to the next finding.</p>
      <p>Procurement is the part the organization knows how to do. It has a process, a budget line, a contracting officer, and a clear finish line. Configuration doesn't. Configuration is open-ended engineering work that competes with every other operational fire, and it rarely has an owner whose performance review depends on it.</p>
      <p>So the capability accumulates. The value never gets extracted.</p>
      <blockquote>Buying a security license is a decision. Getting value from it is a project. Most programs fund the decision and never staff the project.</blockquote>

      <h2>Why the gap persists</h2>
      <p><strong>Nobody owns the seams.</strong> The identity team owns Entra. The endpoint team owns Intune. The SOC owns Sentinel. The records team owns Purview. The highest-value configurations live between those teams — device compliance feeding Conditional Access, identity signals feeding SOC detections, sensitivity labels feeding DLP. When a control spans three teams, it usually belongs to none of them.</p>
      <p><strong>The defaults are conservative on purpose.</strong> Microsoft ships most protective features off, or in audit mode, because turning them on blindly breaks things. That's the right call for a vendor. It also means "licensed" and "protecting you" are two very different states, and the gap between them is entirely your engineering work.</p>
      <p><strong>Sovereign cloud adds friction.</strong> In GCC High and Azure Government, feature parity lags commercial, documentation is written for commercial first, and the community guidance most engineers learn from doesn't always apply. Teams get burned once on a feature that doesn't behave the way the commercial blog post said, and they stop trying.</p>
      <p><strong>Pilots never graduate.</strong> Report-only, audit mode, a test group of twelve users. Every one of those is a reasonable first step. The problem is that they become the permanent state. There's no forcing function that moves a pilot to enforcement.</p>

      <h2>What it costs you</h2>
      <p>The obvious cost is money — seats paid for and not used. That's real, but it isn't the cost that should keep a program manager up at night.</p>
      <p>The real cost is exposure you think you've closed. Your SSP says multifactor authentication is enforced. Your Conditional Access policy says report-only. Your assessment narrative says sensitive data is labeled and protected. Your label policies say nobody has published a single label. Those are the gaps an assessor finds, and the gaps an adversary uses.</p>
      <p>The second cost is opportunity. Every renewal cycle, someone proposes buying a third-party tool to close a gap that the existing license already covers. Now the program is paying twice for the same capability and still not using either one.</p>

      <h2>The extraction plan</h2>
      <p>The fix isn't another tool. It's a disciplined pass through what you already own, in order of risk reduced per hour of engineering.</p>
      <p><strong>Inventory what you're entitled to.</strong> Map every licensed security capability to its current state: off, audit, partial, enforced. Most teams have never seen this on one page. It's usually the most uncomfortable and most useful artifact in the whole engagement.</p>
      <p><strong>Prioritize by attack path, not by product.</strong> Identity first, because that's where most intrusions start. Then endpoint, then email, then data. Configure the controls that break the most common attack chains before the ones that make the best dashboard.</p>
      <p><strong>Give every pilot an exit date.</strong> Report-only and audit mode get a defined window, a review of what would have been blocked, and a scheduled move to enforcement. No open-ended pilots.</p>
      <p><strong>Assign the seams.</strong> Name an owner for every cross-team control. Device compliance plus Conditional Access gets one accountable engineer, not two teams pointing at each other.</p>
      <p><strong>Prove it with evidence.</strong> Every capability you move to enforcement should produce something an assessor can see — a policy export, a sign-in log, a coverage report. Extraction you can't evidence doesn't count at assessment time.</p>
      <p>I've laid out what that looks like in a concrete quarter in <em>You Bought E5. Here's the 90-Day Plan to Actually Use It.</em></p>

      <h2>What changes when you get it right</h2>
      <p>The security posture you described in your SSP becomes the security posture you actually run. The next assessment is a review, not a scramble. Renewal conversations shift from "what else should we buy" to "what are we getting for what we have."</p>
      <p>And the program stops being the one that discovers, during an incident, that the control that would have stopped it was licensed, paid for, and switched off.</p>
      <p>The spend is already booked. The only open question is whether you collect on it.</p>

      <hr />
      <p><em>I write weekly on getting real security value out of the Microsoft stack in commercial and federal environments. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'e5-90-day-plan': () => (
    <>
      <p>You signed the E5 renewal. Or G5, if you're in government. Somewhere in that contract is a long list of security capabilities, and somewhere in your tenant most of them are still sitting in their default state.</p>
      <p>You don't need a two-year transformation program to fix that. You need one focused quarter, a clear order of operations, and the discipline to move each capability from licensed to enforced.</p>
      <p>Here's the 90-day plan I'd run if I were sitting in your seat.</p>

      <h2>Before day one: know what you own</h2>
      <p>Spend the first week building a single entitlement map. Every security capability in your license, its current state, and who owns it. Off, audit, partial, or enforced.</p>
      <p>This isn't busywork. It's the baseline every later decision depends on, and it's the artifact that tells leadership why the next ninety days matter. Most teams are surprised by how long the "off" column is.</p>
      <p>Then pick success metrics you can measure on day 90. Percentage of users covered by phishing-resistant MFA. Percentage of endpoints onboarded to Defender for Endpoint. Number of sensitivity labels published. Number of ASR rules in block mode. Keep it to a handful.</p>

      <h2>Days 1–30: identity</h2>
      <p>Identity first, because it's where most intrusions begin and because every other control depends on it.</p>
      <p><strong>Close legacy authentication.</strong> Protocols that can't do modern authentication can't do MFA. Find what's still using them, migrate or retire it, then block it with Conditional Access.</p>
      <p><strong>Move MFA from "required" to "strong."</strong> Use authentication strengths to require phishing-resistant methods for administrators first, then expand. Federal programs already have a head start here with PIV and CAC-based certificate authentication.</p>
      <p><strong>Turn on risk-based policies.</strong> Entra ID Protection's user and sign-in risk signals are included with P2. Wire them into Conditional Access so high-risk sign-ins are challenged or blocked automatically.</p>
      <p><strong>Get admins out of standing access.</strong> Privileged Identity Management makes privileged roles eligible instead of permanent, with approval and justification for activation. Start with Global Administrator and the other tier-zero roles.</p>
      <p>By day 30, every user has strong MFA, legacy authentication is closed, and your most dangerous roles require activation. That alone breaks a large share of the attack chains you'll actually face.</p>

      <h2>Days 31–60: endpoint and email</h2>
      <p><strong>Finish Defender for Endpoint onboarding.</strong> Partial coverage is the most common gap I see. A device that isn't onboarded is a device the SOC can't see and can't isolate. Get to full coverage, then turn on tamper protection.</p>
      <p><strong>Move attack surface reduction rules to block.</strong> Most environments leave ASR in audit indefinitely. Review the audit data, carve out the legitimate exceptions, and move rules to block in waves.</p>
      <p><strong>Make device compliance mean something.</strong> Intune compliance policies only protect you when Conditional Access requires a compliant device for access. Connect the two.</p>
      <p><strong>Tune Defender for Office 365.</strong> Apply the preset security policies as a starting point, confirm Safe Links and Safe Attachments are covering the users who actually get targeted, and make sure user-reported phishing flows somewhere a human reviews it.</p>
      <p>By day 60, the SOC can see and act on every managed endpoint, and email — still the most common initial access vector — is defended with the controls you're already paying for.</p>

      <h2>Days 61–90: data and detection</h2>
      <p><strong>Publish a small set of sensitivity labels.</strong> Not forty. Three to five labels people can understand. Publish them, enable default labeling where it makes sense, and let users get used to them before you build enforcement on top.</p>
      <p><strong>Start DLP in simulation.</strong> Build Purview DLP policies for your highest-value data types, run them in simulation mode, and tune before you block. A DLP policy that floods the help desk gets turned off.</p>
      <p><strong>Connect the signals to the SOC.</strong> Make sure Defender XDR incidents, Entra ID Protection risk events, and Purview alerts land where your analysts actually work, whether that's the Defender portal, Sentinel, or both.</p>
      <p><strong>Write it down.</strong> Every capability you moved to enforcement gets an owner, a configuration export, and a short note on how it's evidenced. That's what turns a project into an operating state.</p>

      <h2>What usually goes wrong</h2>
      <p><strong>Trying to do everything at once.</strong> Ninety days is enough for a focused sequence. It isn't enough for every feature in the license. Sequence ruthlessly.</p>
      <p><strong>Skipping the communication.</strong> Users notice when MFA changes and when labels appear in Office. A short heads-up email prevents most of the help desk surge.</p>
      <p><strong>Treating report-only as done.</strong> Every audit-mode control needs a date when it moves to enforcement. Put it on the calendar.</p>

      <h2>Where you are on day 90</h2>
      <p>The license you already paid for is now doing most of the job it was bought to do. Your identity layer resists the most common attacks. Your SOC can see every endpoint. Your sensitive data has labels on it. And when someone proposes buying another tool, you can answer with evidence of what the current stack already covers.</p>
      <p>It's not a transformation. It's a quarter of focused work. The payoff is collecting on a decision your organization already made.</p>

      <hr />
      <p><em>I write weekly on extracting real value from Microsoft security in commercial and federal tenants. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'cmmc-level-2-assessor-evidence': () => (
    <>
      <p>If you're a defense contractor preparing for a CMMC Level 2 assessment, the anxiety usually isn't about the controls. You've read NIST SP 800-171. You know there are 110 requirements. The anxiety is about the unknown: what will the assessor actually ask to see, and will what you have be enough?</p>
      <p>That uncertainty is fixable. A C3PAO assessment is a structured process, and the structure tells you exactly how to prepare.</p>

      <h2>The assessor isn't grading your intentions</h2>
      <p>The single biggest mindset shift is this: an assessor evaluates evidence, not effort. Your policy saying you do something is a starting point. The assessor wants to see that the practice is implemented, that it's consistent, and that it's in place across the scope you defined.</p>
      <p>Each of the 110 requirements breaks down into assessment objectives in NIST SP 800-171A — 320 of them in total. A requirement is met only when every one of its objectives is met. That's where most organizations get surprised. They implemented the headline of the control and missed an objective underneath it.</p>
      <blockquote>Read 800-171A, not just 800-171. The assessment objectives are the actual test. The requirement is just the title.</blockquote>

      <h2>Examine, interview, test</h2>
      <p>Assessors use three methods, and good preparation covers all three.</p>
      <p><strong>Examine.</strong> Documents, configurations, logs, and records. Your System Security Plan, policies, procedures, configuration exports, access lists, training records, audit logs. This is the evidence most teams prepare for.</p>
      <p><strong>Interview.</strong> Conversations with the people who actually do the work. The assessor will ask your system administrator how accounts get disabled when someone leaves. If the answer doesn't match the procedure in your SSP, that's a finding — even if the procedure document is perfect.</p>
      <p><strong>Test.</strong> Observing the control in operation. Watching an MFA prompt fire. Seeing a session lock after inactivity. Confirming a non-privileged account can't change a security setting. This is where policies that were never enforced get exposed.</p>

      <h2>Your SSP is the map the assessor follows</h2>
      <p>The System Security Plan isn't a formality. It's the document the assessor uses to navigate your environment. It defines your scope, describes how each requirement is implemented, and identifies who's responsible.</p>
      <p>A strong SSP is specific. It names the systems, the tools, and the configurations. "We enforce multifactor authentication" is weak. "Multifactor authentication is enforced for all users accessing the CUI enclave through Conditional Access policies requiring phishing-resistant methods; exceptions are limited to documented emergency access accounts" gives the assessor a precise thing to verify — and tells them you know your own environment.</p>
      <p>A vague SSP invites the assessor to dig. A precise one lets them confirm and move on.</p>

      <h2>Scope is your biggest lever</h2>
      <p>Every asset that processes, stores, or transmits CUI is in scope, along with the assets that protect them. The wider your scope, the more evidence you need to produce.</p>
      <p>Organizations that drew a tight boundary — a dedicated enclave, often in a sovereign cloud like GCC High — walk into assessment with a smaller, cleaner evidence set. Organizations that let CUI spread across the whole enterprise have to prove controls everywhere. Get your asset inventory and data flow diagrams right before you get anything else right.</p>

      <h2>What evidence looks like in practice</h2>
      <p>For a Microsoft-based environment, the strongest evidence usually comes straight from the platform.</p>
      <ul>
        <li><strong>Access control and identification.</strong> Conditional Access policy exports, sign-in logs showing MFA enforcement, PIM role assignments and activation history.</li>
        <li><strong>Configuration management.</strong> Intune compliance and configuration profile exports, security baselines, and reports showing device compliance across the in-scope fleet.</li>
        <li><strong>Audit and accountability.</strong> Log retention settings, Sentinel or equivalent log collection coverage, and evidence that someone actually reviews the logs.</li>
        <li><strong>System and information integrity.</strong> Defender for Endpoint coverage reports, vulnerability management findings and remediation records.</li>
        <li><strong>Media protection and data handling.</strong> Purview sensitivity labels and DLP policies scoped to CUI.</li>
      </ul>
      <p>The pattern: platform-generated evidence beats screenshots. A configuration export is reproducible and timestamped. A screenshot is a picture of a moment.</p>

      <h2>Know the POA&amp;M rules before you lean on them</h2>
      <p>Level 2 allows a Plan of Action and Milestones for some unmet requirements, but with limits. There's a minimum score you must reach, certain requirements can't be deferred to a POA&amp;M at all, and open items must be closed within a fixed window to move from conditional to final status. Check the current program rules for the exact thresholds before you build your strategy around them.</p>
      <p>The practical takeaway: a POA&amp;M is a safety net, not a plan. Treat every requirement as one you need to meet on assessment day.</p>

      <h2>How to prepare without the panic</h2>
      <p><strong>Run a mock assessment.</strong> Walk every assessment objective with someone who will be honest. Examine, interview, and test — not just a document review.</p>
      <p><strong>Build an evidence index.</strong> For each requirement, list the evidence, where it lives, and who can speak to it. When the assessor asks, you answer in minutes, not days.</p>
      <p><strong>Prep the people.</strong> The administrators who'll be interviewed should know what the SSP says about their work. No scripts — just alignment between what you wrote and what they do.</p>
      <p><strong>Make evidence continuous.</strong> If producing evidence is a scramble, it'll be a scramble at every reassessment too. Evidence that the platform generates on a schedule turns compliance into an operating state.</p>

      <h2>What success looks like</h2>
      <p>The best assessments feel boring. The assessor asks for something, your team pulls it up, it matches the SSP, and the conversation moves on. No surprises, no late nights, no frantic screenshots.</p>
      <p>That's not luck. It's the result of treating the assessment objectives as the real test and building evidence before anyone asks for it. Do that, and Level 2 becomes a checkpoint you're ready for, not a cliff you're hoping to clear.</p>

      <hr />
      <p><em>I write weekly on CMMC readiness, federal cloud security, and turning Microsoft controls into assessor-ready evidence. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'conditional-access-gap-review': () => (
    <>
      <p>Conditional Access is the front door of your Microsoft tenant. Every sign-in passes through it. And in most tenants I review, the policy set was built over years by different people, for different projects, with no one ever stepping back to ask whether it still covers everything.</p>
      <p>The good news: you can find the biggest gaps in an afternoon. You don't need a new tool. You need a structured look at what you already have.</p>

      <h2>Why gaps accumulate</h2>
      <p>Conditional Access policies are additive. Every new requirement — a new app, a new user population, a new compliance ask — produces another policy. Exclusions get added to fix a broken workflow and never get removed. Pilots stay in report-only. Nobody owns the whole picture.</p>
      <p>The result is a policy set that looks comprehensive in the portal and has holes an attacker only needs to find once.</p>
      <blockquote>Attackers don't need to beat your strongest policy. They need to find the sign-in path none of your policies apply to.</blockquote>

      <h2>The afternoon review</h2>
      <p>Work through these questions in order. Each one targets a gap I see regularly.</p>
      <p><strong>1. Is legacy authentication blocked for everyone?</strong> Protocols that don't support modern authentication bypass MFA entirely. If you don't have a policy blocking legacy authentication across all users, that's the first fix. Check the sign-in logs for any remaining legacy authentication traffic before you enforce.</p>
      <p><strong>2. Does every user hit an MFA requirement?</strong> Not "most users." Every user, on every cloud app. Look for policies scoped to specific groups or specific apps that leave everyone else uncovered.</p>
      <p><strong>3. What's excluded, and why?</strong> Exclusions are where gaps hide. List every excluded user, group, app, and location across all policies. Emergency access accounts should be excluded — and closely monitored. A service account excluded three years ago to fix a broken integration probably shouldn't be.</p>
      <p><strong>4. Are administrators held to a higher bar?</strong> Privileged roles should require phishing-resistant authentication through authentication strengths, ideally with shorter sign-in frequency and a compliant device. Admins with the same requirements as everyone else are the most valuable target in the tenant with the least protection.</p>
      <p><strong>5. Are guests and external users covered?</strong> Many policy sets were written with employees in mind. Check whether guest and external users are in scope for MFA and what they can reach.</p>
      <p><strong>6. Is anything stuck in report-only?</strong> Report-only is meant to be temporary. Any policy that has been in report-only for months is a decision nobody made. Review its impact and either enforce it or retire it.</p>
      <p><strong>7. Do you trust a location you shouldn't?</strong> Named locations marked as trusted often skip MFA. Make sure those ranges are still yours, still small, and still justified.</p>
      <p><strong>8. Are risky sign-ins acted on?</strong> If you have Entra ID P2, sign-in risk and user risk policies let you challenge or block risky activity automatically. Many tenants have the license and no policy using it.</p>
      <p><strong>9. What about device code flow and other edge flows?</strong> Authentication flows like device code are abused in phishing campaigns. If your users don't need them, restrict them.</p>
      <p><strong>10. Are workload identities considered?</strong> Service principals and managed identities sign in too. Know which ones have broad permissions, and where your licensing supports it, apply Conditional Access to them.</p>

      <h2>Use the tools you already have</h2>
      <p><strong>The What If tool.</strong> Simulate a sign-in for a specific user, app, location, and device state, and see exactly which policies apply. Run it for your edge cases: a guest, an admin, a service account, a user on an unmanaged device.</p>
      <p><strong>The sign-in logs.</strong> Each sign-in shows which Conditional Access policies applied and their result. Filter for sign-ins where no policy applied. That list is your gap list.</p>
      <p><strong>The insights and reporting workbook.</strong> It shows report-only policy impact across your users, so you can see what would break before you enforce.</p>

      <h2>Fix in the right order</h2>
      <p>Don't try to rebuild the whole policy set in one change window. Fix in order of exposure: legacy authentication, universal MFA, admin protection, then exclusions and edge flows. Move each change through report-only with a defined end date, review the impact, and enforce.</p>
      <p>Then write down the intended design — a short persona-based model of who gets what — so the next new policy fits into a framework instead of piling onto the stack.</p>

      <h2>What you walk away with</h2>
      <p>At the end of the afternoon you have a clear, prioritized list of the sign-in paths your policies don't cover. That's the difference between believing your front door is locked and knowing it is.</p>
      <p>And the next time an assessor or an executive asks whether MFA is enforced everywhere, you can answer with evidence instead of hope.</p>

      <hr />
      <p><em>I write weekly on identity, Conditional Access, and getting the Microsoft security stack to actually enforce what it promises. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'gcchigh-sentinel-deployment-playbook': () => (
    <>
      <p>Deploying Microsoft Sentinel in commercial Azure is a well-worn path. There are blog posts for every connector, community content for every detection, and a forum thread for every error message.</p>
      <p>Deploying Sentinel for a GCC High tenant is a different job. The product name is the same. The portal looks familiar. And then the connector you planned around isn't available, the documentation you're following assumes commercial endpoints, and the Logic App you copied from a community repo can't find the API it depends on.</p>
      <p>If you're the engineer or program lead responsible for standing up Sentinel in a sovereign cloud, this playbook is for you. It's the sequence I follow, the decisions that matter most, and the mistakes I've watched teams make — so you don't have to make them yourself.</p>

      <h2>Start with the right mental model</h2>
      <p>GCC High is not commercial Microsoft 365 with extra paperwork. It's a separate sovereign environment. Your Microsoft 365 tenant lives in GCC High, and your Azure resources — including the Log Analytics workspace Sentinel runs on — live in Azure Government. They have different endpoints, different feature release timelines, and different integration boundaries.</p>
      <p>Three implications shape everything that follows.</p>
      <p><strong>Feature parity is a moving target.</strong> Capabilities usually land in commercial first and arrive in government clouds later, sometimes much later, sometimes with differences. Anything you read about Sentinel needs a parity check before you design around it. Check the current Azure Government and GCC High service descriptions at the start of the project — and again before go-live, because it shifts.</p>
      <p><strong>Endpoints are different.</strong> Government clouds use their own sign-in, portal, and API endpoints. Every script, connector, and automation that hardcodes a commercial endpoint will fail. Some fail loudly. Some fail silently.</p>
      <p><strong>Cloud boundaries are real.</strong> Cross-tenant and cross-cloud patterns that are routine in commercial — managing many workspaces from a single tenant, pulling data from another cloud — have constraints across the commercial/government boundary. Design within the sovereign boundary from the start.</p>

      <h2>Phase 1: Architecture decisions that are expensive to change</h2>
      <p>A few early decisions are hard to undo. Make them deliberately.</p>
      <p><strong>Workspace design.</strong> A single workspace is simplest and makes correlation easy. Multiple workspaces make sense when you have hard data segregation requirements, separate authorizing boundaries, or different retention needs. Most programs need fewer workspaces than they think. Every additional workspace multiplies your content management and cross-workspace query complexity.</p>
      <p><strong>Region and residency.</strong> Pick the Azure Government region with your data residency requirements, your other workloads, and your disaster recovery plan in mind. Moving a workspace later is a migration project, not a setting.</p>
      <p><strong>Access model.</strong> Decide who can read what before data starts flowing. Sentinel's built-in roles, plus resource-context and table-level access, let you separate SOC analysts from engineers from auditors. In federal environments, this is also evidence: your access model should map cleanly to your SSP.</p>
      <p><strong>Retention strategy.</strong> Federal retention requirements are long. Keeping everything in the interactive analytics tier for years is expensive. Decide up front which tables need hot, queryable retention and which can move to lower-cost long-term storage — and confirm which tiering options are currently available in Azure Government.</p>

      <h2>Phase 2: Connectors and the M365 pipeline</h2>
      <p>This is where most of the surprises live.</p>
      <p><strong>Inventory before you promise.</strong> Build a list of every data source you need: Microsoft 365, Defender XDR, Entra ID, Azure activity, endpoints, network devices, and line-of-business applications. For each one, confirm the connector exists and works in Azure Government today. Don't assume parity because the connector appears in the content hub.</p>
      <p><strong>The Microsoft-native pipeline comes first.</strong> Entra ID sign-in and audit logs, Azure Activity, Microsoft 365 audit data, and Defender XDR incidents and alerts are the core of a Microsoft-centric SOC. Get these flowing and validated before anything else. They're also where your highest-value detections live.</p>
      <p><strong>Defender XDR integration deserves its own decision.</strong> Defender XDR and Sentinel can be integrated so incidents sync and analysts work in one place. The specifics of the unified experience have been evolving, and government availability tends to trail commercial. Decide where your analysts will work day to day and design the incident flow around that.</p>
      <p><strong>Third-party sources need a collection plan.</strong> Firewalls, proxies, and appliances typically send Syslog or CEF through the Azure Monitor Agent on a forwarder. Size and harden those forwarders like the critical infrastructure they are. When a forwarder goes down, your network visibility goes with it.</p>
      <p><strong>Validate every source.</strong> "The connector shows connected" is not validation. Confirm data is arriving in the expected table, with the expected fields populated, at the expected volume. Build a simple health check that alerts when a critical table stops receiving data. Silent ingestion failures are one of the most common gaps I find.</p>

      <h2>Phase 3: Normalization and ASIM edge cases</h2>
      <p>The Advanced Security Information Model gives you normalized schemas so one detection works across many data sources. In theory, a single authentication detection covers Entra ID, Windows, and your VPN.</p>
      <p>In practice, normalization in a sovereign cloud needs attention.</p>
      <p><strong>Parser coverage varies.</strong> Not every source has a maintained parser, and community parsers are often written against commercial data samples. Test each parser against your actual data.</p>
      <p><strong>Field mapping isn't always complete.</strong> A parser can run without errors and still leave key fields empty for your data source. A detection that depends on an empty field silently never fires.</p>
      <p><strong>Performance matters at scale.</strong> Query-time parsing across large tables can be slow. Know which detections run against normalized views and watch their run times.</p>
      <p>The rule: if a detection depends on ASIM, validate the parser against real data before you trust the detection.</p>

      <h2>Phase 4: Detection content</h2>
      <p>Content hub solutions give you a fast start. Treat them as a starting point, not a finished SOC.</p>
      <p><strong>Enable deliberately.</strong> Turning on every available analytic rule floods your queue with noise and trains analysts to ignore alerts. Start with rules mapped to your highest-priority threats and data sources you've validated.</p>
      <p><strong>Check content availability.</strong> Some solutions and rules depend on connectors or features that behave differently in government clouds. A rule that queries a table you don't have will run cleanly and find nothing.</p>
      <p><strong>Map to your threat model.</strong> Use MITRE ATT&amp;CK coverage as a planning tool, not a score. The goal is coverage of the techniques your adversaries actually use against your environment.</p>
      <p><strong>Put content under version control.</strong> Analytic rules, hunting queries, workbooks, and automation should live in a repository and deploy through a pipeline. In federal environments, that change history is also audit evidence.</p>

      <h2>Phase 5: Automation that works in government</h2>
      <p>Automation is where community content most often breaks in sovereign clouds.</p>
      <p><strong>Logic Apps connectors differ.</strong> Managed connectors available in commercial Azure may not exist in Azure Government, or may behave differently. Check availability before designing a playbook around one.</p>
      <p><strong>Endpoints must be government endpoints.</strong> Any HTTP action calling a Microsoft API needs the government endpoint and the matching authentication audience. A playbook copied from a commercial example will fail here first.</p>
      <p><strong>Use managed identities.</strong> Grant playbooks the permissions they need through managed identities, scoped tightly. Avoid stored secrets wherever possible.</p>
      <p><strong>Keep humans in the loop for destructive actions.</strong> Enrichment can be fully automated. Disabling accounts and isolating hosts should go through an approval step until you've built confidence. I go deeper on this pattern in <em>The Three-Tier Logic App SOAR Architecture</em>.</p>

      <h2>Phase 6: Operating it like it matters</h2>
      <p>Go-live is the beginning, not the end.</p>
      <p><strong>Monitor the monitor.</strong> Track ingestion health, analytic rule failures, and playbook run failures. A SIEM that quietly stopped receiving a critical log source is worse than no SIEM, because everyone believes they're covered.</p>
      <p><strong>Watch cost from day one.</strong> Ingestion volume grows. Review it monthly and adjust. Cost surprises are the fastest way to lose leadership support for the whole program.</p>
      <p><strong>Tune continuously.</strong> Every false positive an analyst closes is a signal. Feed it back into the rule. A detection program that isn't tuned degrades into noise.</p>
      <p><strong>Produce evidence as a byproduct.</strong> Audit logging, log review, and incident response are all assessment requirements. Design workbooks and reports so the evidence an assessor wants is always one query away.</p>

      <h2>The mistakes I see most often</h2>
      <ul>
        <li><strong>Designing from commercial documentation without a parity check.</strong> The plan assumes a connector or feature that isn't there, and the timeline slips by weeks.</li>
        <li><strong>Hardcoded commercial endpoints.</strong> Scripts and playbooks that worked in a lab fail in production.</li>
        <li><strong>"Connected" treated as "working."</strong> Data sources that show green in the portal but deliver incomplete data.</li>
        <li><strong>Enabling everything on day one.</strong> Alert fatigue sets in before the SOC ever builds trust in the platform.</li>
        <li><strong>No retention plan.</strong> Federal retention requirements meet analytics-tier pricing, and the budget conversation gets ugly.</li>
        <li><strong>Treating it as a project instead of a capability.</strong> The deployment team rolls off and nobody owns tuning, health, or content updates.</li>
      </ul>

      <h2>What it looks like when you get it right</h2>
      <p>Done well, a GCC High Sentinel deployment gives your SOC full visibility across identity, endpoint, email, cloud, and network — inside the sovereign boundary your contracts require. Detections fire on validated data. Automation handles the repetitive work. Ingestion costs are predictable. And when the assessor asks how you collect, review, and retain audit logs, the answer is a live workbook, not a slide.</p>
      <p>The difference between a deployment that delivers that and one that stalls in month four isn't talent. It's knowing where the sovereign cloud differs before you design, not after you deploy.</p>

      <hr />
      <p><em>I write weekly on Sentinel, GCC High, and the sovereign-cloud plumbing most consultants skip. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
    </>
  ),

  'sentinel-ingestion-cost-triage': () => (
    <>
      <p>The Sentinel bill went up again. Leadership wants to know why. And when you look at what's driving the cost, a lot of it is data nobody has queried in months.</p>
      <p>You're not alone. Ingestion cost is the most common reason I hear SIEM programs come under pressure. The fix usually isn't collecting less security data. It's being deliberate about where each kind of data lives and what you pay for it.</p>

      <h2>Why the bill grows without anyone deciding it should</h2>
      <p>Log volume grows on its own. New servers, new applications, new connectors, verbose diagnostic settings someone turned on for troubleshooting and never turned off. Every one of those lands in the analytics tier by default, priced as if it's your most valuable detection data.</p>
      <p>Most of it isn't. Some tables power your detections every five minutes. Others exist because a compliance requirement says the data must be retained, and nobody has touched them since the connector was enabled.</p>
      <blockquote>You're paying premium prices for archival storage. The problem isn't how much you collect — it's that you're treating every log like it's your most important log.</blockquote>

      <h2>Step 1: Find out what you're paying for</h2>
      <p>Start with the data. Your workspace tracks billable ingestion by table and by source. Pull the volume per table for the last month and rank it.</p>
      <p>In most workspaces, a small number of tables account for most of the cost. Firewall and network logs, verbose Windows security events, Azure diagnostics, and certain application logs are the usual suspects. That short list is where your triage effort goes.</p>

      <h2>Step 2: Ask what each table actually does</h2>
      <p>For every high-volume table, answer three questions.</p>
      <p><strong>Does a detection depend on it?</strong> Check your analytic rules. If active detections query the table, it needs to stay queryable in the analytics tier — but maybe not every field or event type does.</p>
      <p><strong>Do analysts use it during investigations?</strong> Check query history and talk to your SOC. Some tables are rarely used for detection but critical during incident response.</p>
      <p><strong>Is it retained for compliance only?</strong> If the data exists to satisfy a retention requirement and is only ever touched during an audit or a forensic investigation, it's a candidate for a cheaper tier.</p>
      <p>Most tables sort cleanly into one of those three buckets. The ones that don't usually get answered by a short conversation with the analysts.</p>

      <h2>Step 3: Use the right lever for each bucket</h2>
      <p><strong>Filter at ingestion.</strong> Data collection rule transformations let you drop events and columns you'll never use before they're billed. Verbose informational events, duplicate fields, and noisy health checks are common candidates. Be careful here: filtering is permanent. If you drop it, you can't investigate it later. Only filter what you're confident has no security value.</p>
      <p><strong>Move to a lower-cost tier.</strong> Microsoft offers lower-cost log tiers designed for high-volume, lower-value data that you need to keep and occasionally search, but don't run real-time detections against. The exact tier options and their capabilities have been evolving, especially with the Sentinel data lake, and availability in government clouds can lag. Check what's current in your cloud before planning around a specific tier.</p>
      <p><strong>Tune the source.</strong> Sometimes the cheapest fix is upstream. Adjust Windows event collection to the security events you actually need instead of collecting everything. Reduce diagnostic verbosity on Azure resources. Fix the application that's logging every heartbeat.</p>
      <p><strong>Use long-term retention.</strong> Data that must be kept for years but is rarely queried doesn't need to stay in interactive retention. Configure long-term retention per table to meet requirements at lower cost.</p>
      <p><strong>Know what's free.</strong> Some Microsoft data sources are included at no ingestion cost. Check the current list for your licensing, and make sure you're getting the benefit of any included data grants you're entitled to.</p>

      <h2>Step 4: Revisit your pricing model</h2>
      <p>Once you've reduced and redistributed volume, look at your commitment tier. Commitment tiers discount predictable daily ingestion. If your volume has changed substantially — up or down — you may be on the wrong tier. Re-evaluate after every significant change.</p>

      <h2>What not to cut</h2>
      <p>Cost triage done badly creates blind spots. Before you filter or demote anything, protect the core.</p>
      <ul>
        <li><strong>Identity logs.</strong> Sign-in and audit logs are central to detecting most intrusions.</li>
        <li><strong>Endpoint and XDR signals.</strong> Alerts and incidents from your Defender stack.</li>
        <li><strong>Anything an active detection depends on.</strong> Check before you change it.</li>
        <li><strong>Anything a regulation requires you to retain.</strong> Move it to cheaper storage if you can, but keep it.</li>
      </ul>
      <p>The goal is to pay the right price for each kind of data, not to see less.</p>

      <h2>Make it a habit, not a project</h2>
      <p>Ingestion volume drifts back up unless someone watches it. Set an alert on unexpected daily volume spikes. Review the top tables monthly. Require every new data source to come with an answer to "what tier, what retention, and which detection uses it."</p>

      <h2>Where you end up</h2>
      <p>Your Sentinel bill becomes something you can explain line by line. Detection data stays hot and fast. Compliance data is retained at the right price. And the next time leadership asks why the bill changed, you have the answer before they finish the question.</p>
      <p>That's the difference between a SIEM that gets cut in the next budget cycle and one that earns its place.</p>

      <hr />
      <p><em>I write weekly on Sentinel architecture, data lake strategy, and running a SOC that's both effective and affordable. <a href="#newsletter">Subscribe to the Moore Cyber Memo</a> to get the next one in your inbox.</em></p>
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
              <div className="post-sig-title">Moore Security Group LLC · Houston, TX</div>
            </div>
          </div>
        </section>
      </article>

      <Newsletter />
    </>
  );
}

Object.assign(window, { PostPage });
