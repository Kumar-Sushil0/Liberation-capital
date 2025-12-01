"use client";

import PageLayout from "@/components/PageLayout";
import { VibeCheckButton } from "@/components/VibecheckButton/VibeCheckButton";

export default function Home() {
  return (
    <PageLayout
      title="Want a new life?"
      bannerContent={
        <div className="text-center space-y-6">
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto text-xl sm:text-2xl font-medium">
            <div>Design it.</div>
            <div>Play it.</div>
            <div>Pitch it.</div>
          </div>
          <p className="text-2xl sm:text-3xl font-semibold">Get funded for it.</p>
          <p className="text-xl text-white/90 mt-4">Yes — this is real.</p>
        </div>
      }
    >
      <div className="mx-auto w-full max-w-4xl px-6 py-12">
        <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8 md:p-12 text-center">
          <div className="space-y-6 text-lg">
            <div className="space-y-2 text-foreground/90">
              <p>Up to $100,000 for humans who complete the</p>
              <p><span className="font-bold underline decoration-2">LIFEiDESIGN Accelerator</span>,</p>
              <p>rebuild their identity from the inside out,</p>
              <p>and pitch their future self, not another business plan.</p>
            </div>

            <div className="space-y-2 font-medium">
              <p>We don't fund startups.</p>
              <p>We fund humans redesigning themselves.</p>
            </div>

            <div className="space-y-2 text-foreground/80">
              <p>Capital becomes scaffolding.</p>
              <p>Identity becomes architecture.</p>
              <p>Coherence becomes proof.</p>
              <p>Your evolution becomes the application.</p>
            </div>
          </div>
        </div>
      </div>



      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
          <div className="space-y-8">
            {/* Fund Life - 2 Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fund Life → Become Player */}
              <div className="text-center">
                <h4 className="text-2xl sm:text-3xl font-serif font-semibold mb-3">
                  Fund Life → Become Player
                </h4>
                <p className="text-lg text-foreground/90 mb-4">Your life design is the due diligence.</p>
                <div className="space-y-3 flex flex-col items-center">
                  <a
                    href="/applicants"
                    className="inline-flex items-center px-6 py-3 rounded-md bg-foreground text-background font-semibold hover:bg-foreground/90 transition"
                  >
                    Apply for the LIFEiDESIGN Accelerator →
                  </a>
                  <p className="text-foreground/80">
                    Your coherence is your credit score.
                  </p>
                </div>
              </div>

              {/* Fund Life → Become Patron */}
              <div className="text-center">
                <h4 className="text-2xl sm:text-3xl font-serif font-semibold mb-3">
                  Fund Life → Become Patron
                </h4>
                <p className="text-lg text-foreground/90 mb-4">Invest in human capital, not hype.</p>
                <div className="space-y-3 flex flex-col items-center">
                  <a
                    href="/investor"
                    className="inline-flex items-center px-6 py-3 rounded-md bg-foreground text-background font-semibold hover:bg-foreground/90 transition"
                  >
                    Request Investor Access →
                  </a>
                  <p className="text-foreground/80">
                    Brave money funds brave game.
                  </p>
                </div>
              </div>
            </div>

            {/* Capital at a Glance */}
            <div className="flex justify-center">
              <div>
                <h4 className="text-2xl sm:text-3xl font-serif font-semibold mb-4">
                  Capital at a Glance
                </h4>
                <ul className="space-y-3 text-lg text-foreground/90">
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Up to $100,000 per creator</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>No equity in identity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>No claim over outcomes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Principal + 10% / 3 years</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Optional legacy: 2% net profit (honor-based)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
          <h4 className="text-2xl sm:text-3xl font-serif font-semibold mb-3">
            REVEAL → Origin = Truth Exposed
          </h4>
          <p className="text-lg italic text-foreground/90 mb-6">Before funding begins, illusions end.</p>

          <div className="space-y-6">
            {/* 1. The World Funds Products, Not People */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>1. The World Funds Products, Not People</span>
              </summary>
              <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                <p>A world obsessed with funding products</p>
                <p>forgets the only thing that truly moves a life:</p>
                <p className="font-bold">the human at the center of it.</p>
                <p className="mt-3">Liberation Capital flips the script:</p>
                <p className="font-semibold">You design & gamify → we fund.</p>
              </div>
            </details>

            {/* 2. The Institution Behind the Ascent */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>2. The Institution Behind the Ascent</span>
              </summary>
              <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                <p>In a world where money rewards performance,</p>
                <p>we reward <span className="italic">becoming</span>.</p>
                <p className="mt-3">Not bandaids.</p>
                <p>Blueprints.</p>
                <p className="mt-3">This is capital for people willing to rebuild their identity</p>
                <p>with intent, discipline, and clarity.</p>
              </div>
            </details>

            {/* 3. Why We Exist (Traction ≠ Coherence) */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>3. Why We Exist (Traction ≠ Coherence)</span>
              </summary>
              <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                <p>Anyone can fake traction.</p>
                <p>No one can fake coherence.</p>
                <p className="mt-3">We don't care about pitch decks.</p>
                <p>We care whether your future self is <span className="italic">executable</span>.</p>
              </div>
            </details>

            {/* 4. The Two Tribes */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>4. The Two Tribes</span>
              </summary>
              <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                <p><span className="font-bold">⚡ Investors</span> — wealthy, restless, allergic to hype, craving meaning.</p>
                <p><span className="font-bold">💀 Players</span> — disciplined, devoted, oxygen-starved for capital.</p>
                <p className="mt-3">Same ecosystem.</p>
                <p>Different missions.</p>
                <p className="mt-3 font-semibold">Same game: human evolution.</p>
              </div>
            </details>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
          <h4 className="text-2xl sm:text-3xl font-serif font-semibold mb-3">
            DESIGN → Architecture = Identity Engineered
          </h4>
          <p className="text-lg italic text-foreground/90 mb-6">The accelerator where humans design, decode, and gamify their code.</p>

          <div className="space-y-6">
            {/* 1. The LIFEiDESIGN Accelerator */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>1. The LIFEiDESIGN Accelerator (Identity Engine)</span>
              </summary>
              <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                <p>Part therapy.</p>
                <p>Part design lab.</p>
                <p>Part discipline dojo.</p>
                <p className="mt-3">Here, you don't "know thyself."</p>
                <p className="font-bold">You design thyself.</p>
                <p className="mt-3">Gamify your inner world → master your outer one.</p>
              </div>
            </details>

            {/* 2. GAMEiDESIGN */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>2. GAMEiDESIGN (Awareness Engine)</span>
              </summary>
              <div className="mt-3 ml-6 space-y-3 text-foreground/80">
                <ul className="space-y-2 list-disc list-inside">
                  <li>Pre-Game → Map every timeline your life could become</li>
                  <li>End-Game → Confront the best and worst of your identity</li>
                  <li>Me-Game → Wear the mask you choose, not the one you inherited</li>
                </ul>
              </div>
            </details>

            {/* 3. COREiDESIGN */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>3. COREiDESIGN (Emotional Engine)</span>
              </summary>
              <div className="mt-3 ml-6 space-y-3 text-foreground/80">
                <ul className="space-y-2 list-disc list-inside">
                  <li>Mirror Mode → Speculate possibilities</li>
                  <li>NPC Mode → Evaluate financial delusions</li>
                  <li>Monk Mode → Stimulate your readiness</li>
                </ul>
                <p className="mt-3">Your emotional OS becomes the backbone of your identity design.</p>
              </div>
            </details>

            {/* 4. PLAYiDESIGN */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>4. PLAYiDESIGN (Discipline Engine)</span>
              </summary>
              <div className="mt-3 ml-6 space-y-3 text-foreground/80">
                <ul className="space-y-2 list-disc list-inside">
                  <li>Everyday Mode → Behavior meets dream</li>
                  <li>Ghost Mode → Consistency + coherence logs</li>
                  <li>Underground Mode → Internal metrics dashboard</li>
                </ul>
              </div>
            </details>
          </div>

          <p className="mt-6 text-foreground/80">
            You don't get accepted. You get <span className="font-bold">measured</span>. Only those above <span className="font-bold">80% coherence</span> become <span className="italic">eligible</span>.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
          <details className="group">
            <summary className="cursor-pointer list-none flex items-start gap-2 text-2xl sm:text-3xl font-serif font-semibold">
              <span className="group-open:rotate-90 transition-transform">▼</span>
              <span>VALUE-PROP POSITIONING</span>
            </summary>
            
            <div className="mt-6 ml-8 space-y-6">
              <div>
                <h5 className="text-xl sm:text-2xl font-semibold mb-4">PLAYERS → For Humans Re-designing Themselves</h5>
                <div className="space-y-3 text-foreground/80">
                  <p>If you're redesigning your life,</p>
                  <p>you shouldn't have to beg a broken system for permission.</p>
                  <p className="mt-4 font-semibold">We fund:</p>
                  <ul className="mt-3 space-y-2 list-disc list-inside ml-4">
                    <li>disciplined</li>
                    <li>self-aware</li>
                    <li>committed</li>
                    <li>evolving</li>
                  </ul>
                  <p className="mt-4">...humans who need capital as oxygen.</p>
                </div>
              </div>

              <div>
                <h5 className="text-xl sm:text-2xl font-semibold mb-4">PATRONS → For Investors Done with Hype</h5>
                <div className="space-y-3 text-foreground/80">
                  <p>If you're exhausted by:</p>
                  <ul className="mt-3 space-y-2 list-disc list-inside ml-4">
                    <li>founders acting</li>
                    <li>markets hallucinating</li>
                    <li>startups pretending</li>
                    <li>hype cycles recycling</li>
                  </ul>
                  <p className="mt-4">...welcome home.</p>
                  <p className="mt-4">You're not investing in dreams.</p>
                  <p>You're investing in <span className="font-bold">coherent humans</span></p>
                  <p>with disciplined, measurable evolution.</p>
                  <p className="mt-4 font-semibold">One ecosystem. Two roles.</p>
                  <p className="font-semibold">Both accelerating human potential.</p>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
          <details className="group mb-8">
            <summary className="cursor-pointer list-none flex items-start gap-2 text-2xl sm:text-3xl font-serif font-semibold">
              <span className="group-open:rotate-90 transition-transform">▼</span>
              <span>TEST → Crucible = Self Pressure-Tested</span>
            </summary>
            
            <p className="text-lg italic text-foreground/90 mt-3 ml-8">Where identity meets reality.</p>

            <div className="mt-6 ml-8 space-y-6">
              {/* The Incubator of Identity */}
              <details className="group/sub">
                <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                  <span className="group-open/sub:rotate-90 transition-transform">▼</span>
                  <span>The Incubator of Identity</span>
                </summary>
                <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                  <p>EPiCENTRE is not a retreat.</p>
                  <p>It's a silent, monastic, reality-heavy pressure chamber</p>
                  <p>where your future self is stress-tested.</p>
                  <p className="mt-3">If it can't survive stillness,</p>
                  <p>it won't survive life.</p>
                </div>
              </details>

              {/* The Silence Test */}
              <details className="group/sub">
                <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                  <span className="group-open/sub:rotate-90 transition-transform">▼</span>
                  <span>The Silence Test</span>
                </summary>
                <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                  <p>Can your future self withstand</p>
                  <p>the sound of its own thoughts?</p>
                  <p className="mt-3">If not, we know where the cracks are.</p>
                </div>
              </details>

              {/* The Discipline Test */}
              <details className="group/sub">
                <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                  <span className="group-open/sub:rotate-90 transition-transform">▼</span>
                  <span>The Discipline Test</span>
                </summary>
                <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                  <p>No applause.</p>
                  <p>No audience.</p>
                  <p>No dopamine.</p>
                  <p className="mt-3">Just behavioral truth.</p>
                  <p className="mt-3">Who you are in silence</p>
                  <p>is who you actually are.</p>
                </div>
              </details>

              {/* The Distraction Withdrawal Test */}
              <details className="group/sub">
                <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                  <span className="group-open/sub:rotate-90 transition-transform">▼</span>
                  <span>The Distraction Withdrawal Test</span>
                </summary>
                <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                  <p>Your clarity vs your cravings.</p>
                  <p>Your identity vs your impulses.</p>
                  <p>Your coherence vs your chaos.</p>
                  <p className="mt-3">This is <span className="font-bold">human due diligence</span> —</p>
                  <p>ethical, accurate, unmatched by any VC.</p>
                </div>
              </details>
            </div>
          </details>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
          <h4 className="text-2xl sm:text-3xl font-serif font-semibold mb-3">
            WITNESS → Rite = Becoming Presented
          </h4>
          <p className="text-lg italic text-foreground/90 mb-6">The ritual where evolution is unveiled.</p>

          <div className="space-y-6">
            {/* Liberation Day */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>Liberation Day (Ceremony &gt; Pitch)</span>
              </summary>
              <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                <p>No sharks.</p>
                <p>No theatrics.</p>
                <p>No "So what's your TAM?" nonsense.</p>
                <p className="mt-3">Just a human, a blueprint,</p>
                <p>and a future self stepping forward.</p>
              </div>
            </details>

            {/* Discipline Receipts */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>Discipline Receipts</span>
              </summary>
              <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                <p>Your logs.</p>
                <p>Your consistency.</p>
                <p>Your emotional architecture.</p>
                <p>Your upgrades.</p>
                <p className="mt-3">Data doesn't lie.</p>
                <p>Identity patterns don't either.</p>
              </div>
            </details>

            {/* Life Blueprint Reveal */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>Life Blueprint Reveal</span>
              </summary>
              <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                <p>This is your <span className="font-bold">game architecture</span>,</p>
                <p>not your aspiration.</p>
                <p className="mt-3">A clear, mapped identity</p>
                <p>you intend to build, live, embody.</p>
              </div>
            </details>

            {/* The Liberation Number */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>The Liberation Number</span>
              </summary>
              <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                <p>Your exact capital requirement.</p>
                <p>Not valuation.</p>
                <p>Not fantasy.</p>
                <p className="mt-3 font-bold">Existential budgeting.</p>
                <p className="mt-3">Identity is the product.</p>
                <p>Becoming is the traction.</p>
                <p>Coherence is the collateral.</p>
              </div>
            </details>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
          <h4 className="text-2xl sm:text-3xl font-serif font-semibold mb-3">
            DEPLOY → Activation = Capital Ignited
          </h4>
          <p className="text-lg italic text-foreground/90 mb-6">Money becomes metamorphosis.</p>

          <div className="space-y-6">
            {/* Funding as Scaffolding */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>Funding as Scaffolding</span>
              </summary>
              <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                <p>We don't fund "scale."</p>
                <p>We fund <span className="font-bold">becoming</span>.</p>
                <p className="mt-3">Your transformation → funded.</p>
                <p>Your coherence → investable.</p>
              </div>
            </details>

            {/* Funding-In-Kind (FIK) */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>Funding-In-Kind (FIK)</span>
              </summary>
              <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                <p>Sometimes the right fuel is</p>
                <p>space, tools, mentors, or structure — not cash.</p>
                <p className="mt-3">From clarity to incubation,</p>
                <p>we provide what accelerates your identity.</p>
                <p className="mt-3">This is when philosophy cures more than finances.</p>
              </div>
            </details>

            {/* EPiCENTRE Residency */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>EPiCENTRE Residency</span>
              </summary>
              <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                <p>A sealed environment</p>
                <p>for identities that need controlled conditions to hatch.</p>
                <p className="mt-3">Where your future self becomes</p>
                <p>your actual self.</p>
              </div>
            </details>

            {/* Up to $100,000 Capital Deployment */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>Up to $100,000 Capital Deployment</span>
              </summary>
              <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                <p>Actual money.</p>
                <p>For actual identity transformation.</p>
                <p className="mt-3">No equity in your identity.</p>
                <p>No strings — just responsibility.</p>
                <p className="mt-3">Great players don't become customers.</p>
                <p className="font-bold">They become mythology.</p>
              </div>
            </details>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
          <p className="text-lg italic text-foreground/90 mb-6 text-center">Where capital and consciousness feed each other.</p>

          <div className="space-y-6">
            {/* 1. Investors Become Players */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>1. Investors Become Players</span>
              </summary>
              <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                <p>They come to fund others.</p>
                <p>They leave realizing</p>
                <p>they've never designed themselves.</p>
                <p className="mt-3">Money without meaning</p>
                <p>collapses into spiritual bankruptcy.</p>
              </div>
            </details>

            {/* 2. Players Become Funded Humans */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>2. Players Become Funded Humans</span>
              </summary>
              <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                <p>Identity becomes reality.</p>
                <p>Coherence becomes proof.</p>
                <p>Life becomes evidence.</p>
              </div>
            </details>

            {/* 3. Humans Become Case Studies */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>3. Humans Become Case Studies</span>
              </summary>
              <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                <p>Not testimonials.</p>
                <p>Not success stories.</p>
                <p className="mt-3">Receipts of evolution.</p>
                <p className="mt-3">These case studies</p>
                <p>become cultural artifacts.</p>
              </div>
            </details>

            {/* 4. Case Studies Become Culture */}
            <details className="group">
              <summary className="cursor-pointer list-none flex items-start gap-2 text-lg font-semibold">
                <span className="group-open:rotate-90 transition-transform">▼</span>
                <span>4. Case Studies Become Culture</span>
              </summary>
              <div className="mt-3 ml-6 space-y-2 text-foreground/80">
                <p>Culture attracts investors.</p>
                <p>Investors become players.</p>
                <p>Players become creators.</p>
                <p>Creators evolve the ecosystem.</p>
                <p className="mt-3">A living identity economy</p>
                <p>powered by:</p>
                <p className="mt-3 font-semibold">design → discipline → coherence → capital → culture → awakening → creation.</p>
              </div>
            </details>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
          <h4 className="text-2xl sm:text-3xl font-serif font-semibold mb-6">POSITIONING SUMMARY</h4>
          
          <div className="space-y-4 text-foreground/90">
            <p className="text-lg font-semibold">Liberation Capital funds:</p>
            
            <div className="ml-4 space-y-2">
              <p>the human → not the idea</p>
              <p>the identity → not the business</p>
              <p>the becoming → not the performance</p>
              <p>the coherence → not the theatrics</p>
            </div>
            
            <div className="mt-6 space-y-2">
              <p><span className="font-semibold">Category →</span> Identity Capital</p>
              <p><span className="font-semibold">Promise →</span> Design & gamify your life → get funded to live it</p>
              <p><span className="font-semibold">Audience →</span> Players + Patrons</p>
              <p><span className="font-semibold">Tone →</span> Anti-system, premium, bold</p>
              <p><span className="font-semibold">System →</span> Accelerator → Incubator → Funding → Evolution</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
          <h4 className="text-2xl sm:text-3xl font-serif font-semibold mb-6 text-center">CATEGORY-DEFINING POSITIONING</h4>
          
          <div className="space-y-4 text-foreground/90">
            <p className="text-xl sm:text-2xl font-semibold">
              Liberation Capital is the world's first fund that invests in humans, not startups.
            </p>
            
            <p className="text-lg">We back the only asset that actually drives outcomes:</p>
            
            <p className="text-lg font-semibold">humans who don't want to just live life —</p>
            <p className="text-lg font-semibold">they want to play with it.</p>
            
            <div className="mt-6 space-y-2">
              <p>You don't pitch a business.</p>
              <p>You pitch your <span className="italic">future self</span>.</p>
              <p className="mt-3">Your coherence is your traction.</p>
              <p>Your evolution is your ROI.</p>
            </div>
            
            <div className="mt-6 space-y-2 font-semibold">
              <p>This isn't venture capital.</p>
              <p>This is identity capital.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
          <h4 className="text-3xl sm:text-4xl font-serif font-semibold text-center">Final Threshold</h4>
          <p className="mt-3 text-foreground/80 text-center">There are only two ways to step into this philosophy:</p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href="/investor"
              className="inline-flex h-10 px-5 items-center rounded-md border border-foreground/30 text-foreground text-sm font-semibold hover:bg-foreground/10 transition"
            >
              Become an Investor
            </a>
            <span className="text-foreground/80">or</span>
            <a
              href="/applicants"
              className="inline-flex h-10 px-5 items-center rounded-md border border-foreground/30 text-foreground text-sm font-semibold hover:bg-foreground/10 transition"
            >
              Apply for Funding
            </a>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <p className="text-foreground/80">Choose with intention.</p>
            <p className="text-foreground/80">Choose with honesty.</p>
            <p className="text-foreground/80">Choose with consequence.</p>
          </div>
        </div>
      </div>
      <VibeCheckButton currentSection={1} inline={false} sections={[]} onClick={() => {}} />
    </PageLayout>
  );
}
