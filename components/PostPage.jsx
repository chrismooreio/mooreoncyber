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
      <p>DSC's error messages aren't lying on purpose. They're just <em>chronologically confused</em>. The error you see during PowerSTIG MOF compilation is whatever broke last during configuration parsing. The actual root cause already happened — three module loads earlier, in a code path that never reported.</p>
      <p>I burned a couple of days on this last week. Windows Server 2022 STIG MOF compilation in Azure Government, hardened image, restricted execution policies. Five distinct things broke during the session. None of them produced an error message that named the actual problem. Every one of them surfaced as <code>PSDesiredStateConfiguration\Node : The argument is null or empty</code>.</p>
      <p>If you're shipping STIG automation in GCC High and you've hit that error, this is what's actually broken.</p>

      <h2>MOF compilation, briefly</h2>
      <p>For readers landing here cold: PowerSTIG is the DISA STIG automation library. It compiles a Managed Object Format (MOF) file from a <code>Configuration</code> block, and you apply that MOF to a target server using DSC. The MOF is the compiled compliance baseline — every Windows Server 2022 STIG rule, every V-number, every desired state, in a single artifact.</p>
      <p>Compilation should be a one-liner. In commercial Azure on a clean lab VM, it usually is. In GCC High you're running on hardened images, restricted execution policies, and modules pulled from a closed gallery — the moment any one of those gets out of alignment, DSC parsing collapses, and the error tells you nothing useful.</p>
      <p>Every failure mode below was originally surfaced as the same <code>Node : The argument is null or empty</code> message. Each one is a different thing actually breaking.</p>

      <h2>The same error, five different roots</h2>

      <h3>1. The PowerShell ISE scoping bug</h3>
      <p>If you're running your <code>Configuration</code> block from the script pane of PowerShell ISE — stop. ISE has a long-standing scoping bug with the <code>Node</code> keyword inside a DSC <code>Configuration</code>. The <code>Node</code> parameter sometimes loses its argument during parsing, and DSC reports it as null. The same configuration runs cleanly in a regular Administrator PowerShell console.</p>
      <p><strong>Fix.</strong> Save the <code>Configuration</code> as a <code>.ps1</code> file and run it from a regular Administrator console with <code>{`& C:\\Temp\\StigAudit.ps1`}</code>. Don't paste multi-line <code>Configuration</code> blocks into the console either — long lines get truncated and the parser sees gibberish.</p>
      <p><strong>Lesson.</strong> ISE is fine for prototyping cmdlets. It's not fine for DSC. Use a regular console for any work that touches <code>Configuration</code>, <code>Node</code>, or <code>Import-DscResource</code>.</p>

      <h3>2. The duplicate-install trap</h3>
      <p>If you ever installed PowerSTIG with <code>-Scope CurrentUser</code> to test, then re-installed with <code>-Scope AllUsers</code> to ship, you have two copies of the module in two paths. DSC cannot resolve which one to load during <code>Import-DscResource</code>. The <code>Configuration</code> parses partially, then fails — and the error surfaces as a <code>Node</code> problem, not a module-resolution problem.</p>
      <p><strong>Fix.</strong></p>
      <pre><code>{`Remove-Item -Path "$env:USERPROFILE\\Documents\\WindowsPowerShell\\Modules\\PowerSTIG" -Recurse -Force
(Get-Module PowerSTIG -ListAvailable).Count    # Should return 1`}</code></pre>
      <p><strong>Lesson.</strong> Never install DSC modules in both <code>-Scope CurrentUser</code> and <code>-Scope AllUsers</code>. The resolution is silently wrong. For DSC, always use <code>-Scope AllUsers</code> — the <code>{`Program Files\\WindowsPowerShell\\Modules`}</code> path is where DSC compilation looks by default.</p>

      <h3>3. <code>{'OrgSettings = $null'}</code> is not accepted</h3>
      <p>The <code>WindowsServer</code> composite resource in PowerSTIG requires an actual file path for <code>OrgSettings</code>. The XML files ship with the module in <code>{`StigData\\Processed`}</code>, but the resource validates strictly — <code>$null</code> fails. The actual error references the parameter, but what you see is still the misleading <code>Node</code> complaint, because DSC parsing fails before parameter validation completes its report.</p>
      <p><strong>Fix.</strong> Point <code>OrgSettings</code> to the real default file. For Windows Server 2022 v2.7, that's:</p>
      <pre><code>{`C:\\Program Files\\WindowsPowerShell\\Modules\\PowerSTIG\\4.29.0\\StigData\\Processed\\WindowsServer-2022-MS-2.7.org.default.xml`}</code></pre>
      <p>For domain controllers, swap <code>MS</code> for <code>DC</code> in the filename.</p>
      <p><strong>Lesson.</strong> <code>OrgSettings</code> always requires a file path. If you don't have org-specific overrides, point at the default. Find the right one with:</p>
      <pre><code>{`Get-ChildItem "$stigPath\\StigData\\Processed" -Filter "*WindowsServer*2022*org*"`}</code></pre>

      <h3>4. The missing <code>OsRole</code> parameter</h3>
      <p>The <code>OrgSettings</code> files are split by server role. There's an <code>MS</code> (Member Server) variant and a <code>DC</code> (Domain Controller) variant. PowerSTIG cannot infer which schema to validate against from the file path alone — you have to tell it explicitly with <code>OsRole</code>.</p>
      <p><strong>Fix.</strong> Add <code>{"OsRole = 'MS'"}</code> for member servers, <code>{"OsRole = 'DC'"}</code> for domain controllers. The <code>OrgSettings</code> filename, the <code>OsRole</code> value, and the server's actual role all have to align — mismatching any of them produces the same misleading null-argument error.</p>
      <p><strong>Lesson.</strong> <code>OsRole</code> is required, not optional. Two valid values: <code>MS</code> and <code>DC</code>. There is no third option, no auto-detect, no default.</p>

      <h3>5. The empty <code>Exception</code> hashtable</h3>
      <p>This is the one I lost the most time to. Adding <code>{'Exception = @{}'}</code> to your <code>Configuration</code> — meaning, "I have no exceptions to define yet, but I want the parameter present" — fails parameter validation downstream. The error references <code>OrgSettings</code>, not <code>Exception</code>, because the validation chain confuses itself.</p>
      <p><strong>Fix.</strong> Don't pass empty collections. Omit the parameter entirely. Only include <code>Exception</code> when you have actual V-number exceptions to define:</p>
      <pre><code>{`Exception = @{ 'V-12345' = @{ ValueData = '1' } }`}</code></pre>
      <p><strong>Lesson.</strong> PowerSTIG parameter validation is order-dependent and not particularly forgiving. If you have no value for an optional parameter, omit it. Do not pass empty hashtables, do not pass empty arrays, do not pass <code>$null</code>.</p>

      <h2>Exposing the real error</h2>
      <p>DSC hides real errors behind whatever happened last. The trick to getting the actual root cause is to clear <code>$Error</code> before compilation, run the configuration, then dump the entire <code>$Error</code> collection after:</p>
      <pre><code>{`$Error.Clear()

try {
    Import-Module PowerSTIG -Force

    Configuration StigAudit
    {
        Import-DscResource -ModuleName PowerSTIG
        Node 'localhost'
        {
            WindowsServer STIG_Baseline
            {
                OsVersion   = '2022'
                StigVersion = '2.7'
                OsRole      = 'MS'
                OrgSettings = '<path>'
            }
        }
    }

    StigAudit -OutputPath C:\\Temp\\AuditMOF
}
catch {
    Write-Host "CAUGHT: $_" -ForegroundColor Red
}

Write-Host "\`nALL ERRORS:" -ForegroundColor Yellow
$Error | ForEach-Object { Write-Host $_.Exception.Message -ForegroundColor Magenta }`}</code></pre>
      <p>The <code>ALL ERRORS</code> section reveals the validation failures DSC swallows during parsing. Both the <code>{'OrgSettings = $null'}</code> and <code>{'Exception = @{}'}</code> issues only became visible to me through this technique. Without it, I would have spent another day chasing the <code>Node</code> keyword.</p>

      <h2>The working configuration</h2>
      <p>This is the configuration that actually compiled. Save as <code>{`C:\\Temp\\StigAudit.ps1`}</code> and run from an Administrator console:</p>
      <pre><code>{`Import-Module PowerSTIG -Force

Configuration StigAudit
{
    Import-DscResource -ModuleName PowerSTIG

    Node 'localhost'
    {
        WindowsServer STIG_Baseline
        {
            OsVersion   = '2022'
            StigVersion = '2.7'
            OsRole      = 'MS'
            OrgSettings = 'C:\\Program Files\\WindowsPowerShell\\Modules\\PowerSTIG\\4.29.0\\StigData\\Processed\\WindowsServer-2022-MS-2.7.org.default.xml'
        }
    }
}

StigAudit -OutputPath C:\\Temp\\AuditMOF`}</code></pre>
      <p>That's it. Five parameters, exact values, no extras. The MOF lands in <code>{`C:\\Temp\\AuditMOF\\localhost.mof`}</code> — about 306 KB for a full Windows Server 2022 STIG.</p>

      <h2>What to do once the MOF compiles</h2>
      <p>Once you have the MOF, three things matter.</p>
      <p><strong>Audit-mode compliance test.</strong> Run <code>{'Test-DscConfiguration -ReferenceConfiguration <mof> -Detailed -Verbose'}</code> to check the server against every rule without making changes. Takes 10–20 minutes for a full STIG. Output gives you compliant and non-compliant counts per resource.</p>
      <p><strong>Enriched CSV report.</strong> DSC results don't include V-numbers — those are in the STIG XML data PowerSTIG ships. Use <code>Get-StigList</code> to map back, then export with columns: <code>VulnId</code>, <code>Severity</code>, <code>RuleTitle</code>, <code>Status</code>. This is what auditors actually want.</p>
      <p><strong>CKL checklist generation.</strong> Use <code>New-StigCheckList</code> to produce a <code>.ckl</code> file for STIG Viewer. This is the format DISA expects — auditor-ready, V-number-aligned, importable into STIG Viewer for evidence collection.</p>

      <h2>The pattern to internalize</h2>
      <p>If there's one thing to take out of this, it's that DSC error messages in PowerSTIG are <em>chronologically confused</em>. The error you see is whatever broke last during configuration parsing. The actual root cause is usually two or three steps earlier — module resolution, scope conflict, parameter validation — and silent.</p>
      <blockquote>The error message is always the last thing that happened. The cause is never the last thing that happened.</blockquote>
      <p>For federal Windows Server STIG automation, the operating rules:</p>
      <ul>
        <li>Use a regular Administrator console, not ISE</li>
        <li>Single <code>-Scope AllUsers</code> install for PowerSTIG, no duplicates across scopes</li>
        <li>Always specify <code>OsVersion</code>, <code>StigVersion</code>, <code>OsRole</code>, and a real <code>OrgSettings</code> file path</li>
        <li>Never pass empty hashtables to optional parameters</li>
        <li>Use <code>$Error.Clear()</code> / <code>$Error</code> dump to expose hidden validation failures</li>
      </ul>
      <p>The five-parameter working configuration above is small. Getting to it took two days. The two days are the article.</p>

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
