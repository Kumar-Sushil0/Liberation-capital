export default function Home() {
  return (
    <>
      <div className="mx-auto w-full max-w-3xl px-6 py-12 text-center">
        <h3 className="text-3xl sm:text-4xl font-serif font-semibold tracking-tight">
          We fund people, not businesses.
        </h3>
        <p className="mt-6 text-lg leading-relaxed text-foreground/70">
          Because evolution is the only ROI that outlives money.
        </p>
        <div className="mt-8 flex items-center justify-center gap-6">
          <a href="#investors" className="inline-flex h-10 px-5 items-center rounded-md border border-foreground/30 text-foreground text-sm font-semibold hover:bg-foreground/10 transition">
            For Investors
          </a>
          <a href="#applicants" className="inline-flex h-10 px-5 items-center rounded-md border border-foreground/30 text-foreground text-sm font-semibold hover:bg-foreground/10 transition">
            For Applicants
          </a>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8 text-center">
          <p className="text-xs uppercase tracking-[0.15em] text-foreground/60">Institution Statement</p>
          <h4 className="mt-2 text-3xl sm:text-4xl font-serif font-semibold" style={{ fontFamily: '"built", "Satoshi", sans-serif' }}>
            Liberation Capital exists to answer a single question:
          </h4>
          <p className="mt-4 text-lg font-semibold">What are we trying to liberate humans from?</p>
          <ul className="mt-4 text-foreground/80 space-y-2 list-disc list-inside inline-block text-left">
            <li><span className="font-bold">EPiCENTRE</span> frees them from environmental mediocrity.</li>
            <li><span className="font-bold">LIFEiDESIGN</span> frees them from unconscious existence.</li>
            <li><span className="font-bold">D.D</span> frees them from inherited identities.</li>
          </ul>
          <div className="mt-6 space-y-1 text-foreground/80 leading-tight">
            <p>So Liberation Capital does not chase returns.</p>
            <p>
              It chases <span className="font-bold text-foreground">Return on Awakening.</span>
            </p>
            <p>We don’t deploy capital to scale companies.</p>
            <p>
              We deploy it to <span className="font-bold text-foreground">unchain human potential</span> — to arm people redesigning the architecture of their lives.
            </p>
            <p>This is not venture capital.</p>
            <p>
              This is <span className="font-bold text-foreground">philosophical midwifery with a balance sheet.</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="mb-4 text-center">
          <h4 className="text-3xl sm:text-4xl font-serif font-semibold">The Two Paths</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8 text-center">
            <h5 className="text-xl font-serif font-bold">▾ For Investors</h5>
            <p className="mt-3 text-foreground/80">A path for those who’ve already won the conventional game</p>
            <p className="text-foreground/80">and now seek returns measured in courage, coherence, and culture.</p>
            <p className="mt-3 text-foreground/80">Here you fund:</p>
            <ul className="mt-3 text-foreground/80 space-y-2 list-disc list-inside inline-block text-left">
              <li>transitions</li>
              <li>identity upgrades</li>
              <li>life redesigns</li>
              <li>human experiments</li>
              <li>cultural rewrites</li>
            </ul>
            <p className="mt-3 text-foreground/80">Not for control.</p>
            <p className="text-foreground/80">For contribution.</p>
            <a
              href="#"
              className="mt-4 inline-flex h-10 px-5 items-center rounded-md border border-foreground/30 text-foreground text-sm font-semibold hover:bg-foreground/10 transition"
            >
              Explore Investor Path →
            </a>
          </div>

          <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8 text-center">
            <h5 className="text-xl font-serif font-bold">▾ For Applicants</h5>
            <p className="mt-3 text-foreground/80">If you’re designing your <span className="font-bold">LIFEiDESIGN</span> game —</p>
            <p className="text-foreground/80">if your current life feels like a polite cage —</p>
            <p className="text-foreground/80">if you can no longer unsee your potential...</p>
            <p className="mt-3 text-foreground/80">This is where the funding of your becoming begins.</p>
            <p className="text-foreground/80">But you don’t enter by pitching.</p>
            <p className="text-foreground/80">You enter by <span className="font-bold">proving your devotion to your own evolution.</span></p>
            <a
              href="#"
              className="mt-4 inline-flex h-10 px-5 items-center rounded-md border border-foreground/30 text-foreground text-sm font-semibold hover:bg-foreground/10 transition"
            >
              Apply for Funding →
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
          <h4 className="text-3xl sm:text-4xl font-serif font-semibold text-center">The Funding Architecture</h4>
          <p className="mt-3 text-foreground/80 text-center">There is no “application.”</p>
          <p className="text-foreground font-semibold text-center">There is only a rite of passage.</p>
          <ol className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-foreground/90 list-decimal list-inside">
            <li>
              <span className="font-bold">GAME i DESIGN — The Mirror</span>
              <p className="mt-1 text-foreground/80">Who are you without the performance?</p>
            </li>
            <li>
              <span className="font-bold">CORE i DESIGN — The Descent</span>
              <p className="mt-1 text-foreground/80">Silence, structure, emotional archaeology.</p>
            </li>
            <li>
              <span className="font-bold">PLAY i DESIGN — The Daily Proof</span>
              <p className="mt-1 text-foreground/80">Effort, alignment, discipline. No vibes. Just receipts.</p>
            </li>
            <li>
              <span className="font-bold">Eligibility — Coherence Threshold</span>
              <p className="mt-1 text-foreground/80">80%+ alignment. No shortcuts.</p>
            </li>
            <li>
              <span className="font-bold">Liberation Day — The Public Rite</span>
              <p className="mt-1 text-foreground/80">Investors listen like surgeons, not sharks.</p>
            </li>
            <li>
              <span className="font-bold">Capital — Scaffolding, Not Shackles</span>
              <p className="mt-1 text-foreground/80">Terms clean. Ownership zero. Gratitude optional.</p>
            </li>
          </ol>
          <p className="mt-6 text-foreground/80 text-center">A simple architecture for a difficult truth:</p>
          <p className="mt-2 text-foreground font-semibold text-center">Liberation is not granted. It is survived into.</p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="mb-4 text-center">
          <h4 className="text-3xl sm:text-4xl font-serif font-semibold">Philosophical Framework</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
            <h5 className="text-xl font-serif font-bold">1. The Human Is The Asset</h5>
            <ul className="mt-3 text-foreground/80 space-y-2 list-disc list-inside">
              <li>Not the pitch.</li>
              <li>Not the project.</li>
              <li>The person.</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
            <h5 className="text-xl font-serif font-bold">2. Alignment Over Extraction</h5>
            <ul className="mt-3 text-foreground/80 space-y-2 list-disc list-inside">
              <li>No invisible chains.</li>
              <li>No exploitative clauses.</li>
              <li>We fund coherence, not compliance.</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
            <h5 className="text-xl font-serif font-bold">3. Capital As a Liberation Engine</h5>
            <ul className="mt-3 text-foreground/80 space-y-2 list-disc list-inside">
              <li>Money is not the master.</li>
              <li>Money is the crowbar.</li>
              <li>The human pulls the lever.</li>
            </ul>
          </div>
        </div>
        <p className="mt-6 text-center text-foreground/80">Identity upgrades outperform market trends.</p>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="mb-4 text-center">
          <h4 className="text-3xl sm:text-4xl font-serif font-semibold">Investor Journey</h4>
        </div>
        <div className="text-center">
          <p className="text-foreground/80">Most funds want predictable ROI.</p>
          <p className="text-foreground/80">Liberation Capital wants <span className="font-bold">brave money</span> —</p>
          <p className="text-foreground/80">capital that can tolerate volatility, honesty, and evolution.</p>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
            <h5 className="text-xl font-serif font-bold">Observer</h5>
            <ul className="mt-3 text-foreground/80 space-y-2 list-disc list-inside">
              <li>Learn the doctrine.</li>
              <li>Understand the philosophy.</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
            <h5 className="text-xl font-serif font-bold">Patron</h5>
            <ul className="mt-3 text-foreground/80 space-y-2 list-disc list-inside">
              <li>Back human metamorphosis.</li>
              <li>Participate in Liberation Day.</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
            <h5 className="text-xl font-serif font-bold">Architect</h5>
            <ul className="mt-3 text-foreground/80 space-y-2 list-disc list-inside">
              <li>Co-create the next era of human-first funding.</li>
              <li>Shape the cultural shift.</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center text-foreground/80">
          <p>If your ego needs to be the hero, this will wound you.</p>
          <p>If your curiosity enjoys chaos with purpose, welcome.</p>
        </div>
        <div className="mt-6 flex justify-center">
          <a
            href="#"
            className="inline-flex h-10 px-5 items-center rounded-md border border-foreground/30 text-foreground text-sm font-semibold hover:bg-foreground/10 transition"
          >
            Enter Investor Path →
          </a>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
          <h4 className="text-3xl sm:text-4xl font-serif font-semibold text-center">Applicant Journey</h4>
          <p className="mt-3 text-foreground/80 text-center">You don’t convince us with charm.</p>
          <p className="text-foreground font-semibold text-center">You convince us with <span className="font-bold">coherence</span>.</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h6 className="text-lg font-serif font-bold">Step 1 — Begin LIFEiDESIGN</h6>
              <p className="text-foreground/80">Your transformation becomes the due diligence.</p>
            </div>
            <div>
              <h6 className="text-lg font-serif font-bold">Step 2 — Play Daily</h6>
              <p className="text-foreground/80">Alignment, discipline, evidence.</p>
            </div>
            <div>
              <h6 className="text-lg font-serif font-bold">Step 3 — Cross the Threshold</h6>
              <p className="text-foreground/80">80%+ coherence opens the door.</p>
            </div>
            <div>
              <h6 className="text-lg font-serif font-bold">Step 4 — Present Your Design</h6>
              <p className="text-foreground/80">Your life becomes your pitch.</p>
              <p className="text-foreground/80">Your liberation number becomes the mathematics.</p>
            </div>
            <div>
              <h6 className="text-lg font-serif font-bold">Step 5 — Receive Capital</h6>
              <p className="text-foreground/80">A temporary alliance against stagnation.</p>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <a
              href="#"
              className="inline-flex h-10 px-5 items-center rounded-md border border-foreground/30 text-foreground text-sm font-semibold hover:bg-foreground/10 transition"
            >
              Apply for Funding →
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
          <h4 className="text-3xl sm:text-4xl font-serif font-semibold text-center">THE EPiCENTRE BRIDGE</h4>
          <p className="mt-3 text-foreground/80 text-center">Funding accelerates you.</p>
          <p className="text-foreground font-semibold text-center">EPiCENTRE <span className="font-bold">refines</span> you.</p>
          <p className="mt-4 text-foreground/80 text-center">A sanctuary built for:</p>
          <div className="mt-3 text-center">
            <ul className="text-foreground/80 grid grid-cols-1 md:grid-cols-2 gap-2 list-disc list-inside inline-block text-left">
              <li>psychological reconstruction</li>
              <li>monastic clarity</li>
              <li>creative rebellion</li>
              <li>disciplined becoming</li>
            </ul>
          </div>
          <p className="mt-6 text-foreground/80 text-center">The retreat where your future self learns to breathe.</p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="rounded-2xl bg-background shadow-lg ring-1 ring-black/5 p-8">
          <p className="text-xs uppercase tracking-[0.15em] text-foreground/60">Section 9 — Final Threshold</p>
          <p className="mt-3 text-foreground/80">There are only two ways to step into this philosophy:</p>
          <p className="mt-3 text-foreground font-semibold">Become an Investor</p>
          <p className="text-foreground/80">or</p>
          <p className="text-foreground font-semibold">Apply for Funding</p>
          <div className="mt-4 space-y-1">
            <p className="text-foreground/80">Choose with intention.</p>
            <p className="text-foreground/80">Choose with honesty.</p>
            <p className="text-foreground/80">Choose with consequence.</p>
          </div>
        </div>
      </div>
    </>
  );
}
