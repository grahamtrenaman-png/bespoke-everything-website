import Image from "next/image";
import BespokeEverythingLogo from "./components/BespokeEverythingLogo";
import BrandGrid from "./components/BrandGrid";
import Footer from "./components/Footer";
import Header from "./components/Header";
import JalipiWordmark from "./components/JalipiWordmark";
import Reveal from "./components/Reveal";

const capabilities = [
  {
    number: "01",
    title: "Software",
    description:
      "Products and platforms that we build, operate and continuously improve.",
    examples: ["jalipi", "Interesting Journeys", "Future software products"],
  },
  {
    id: "services",
    number: "02",
    title: "Services",
    description:
      "Product, technology and operational expertise used to shape and improve software.",
    examples: [
      "Product strategy",
      "Software architecture",
      "AI-enabled development",
      "Enterprise consulting",
    ],
  },
  {
    id: "solutions",
    number: "03",
    title: "Solutions",
    description:
      "Bespoke applications and enhancements designed around a specific organisation, process or business problem.",
    examples: [
      "Entirely bespoke systems",
      "Extensions to existing SaaS platforms",
      "Integrations",
      "Workflow automation",
      "Customer and employee applications",
    ],
  },
];

const experienceAreas = [
  "Enterprise consulting",
  "Software implementation",
  "Product strategy",
  "Technology delivery",
  "Large transformation programmes",
  "Operational improvement",
  "Building software products",
];

const process = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the real operational problem.",
  },
  {
    number: "02",
    title: "Design",
    description: "Shape the workflow and product experience.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Develop with modern engineering practices to move quickly without compromising quality.",
  },
  {
    number: "04",
    title: "Evolve",
    description:
      "Turn successful bespoke solutions into reusable software where appropriate.",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[88vh] overflow-hidden bg-ink text-white">
          <BrandGrid className="brand-grid-dark" />

          <div className="section-inner relative flex min-h-[88vh] flex-col justify-center pb-20 pt-28 lg:pb-24 lg:pt-32">
            <div className="mx-auto w-full max-w-3xl text-center lg:mx-0 lg:max-w-4xl lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <BespokeEverythingLogo
                  variant="dark"
                  layout="stacked"
                  className="hero-logo"
                />
              </div>

              <h1 className="mt-10 text-[1.875rem] font-semibold leading-[1.12] tracking-tight sm:text-4xl lg:mt-12 lg:text-[2.625rem]">
                Twenty years solving business problems.
              </h1>
              <p className="mt-4 text-xl font-medium leading-snug text-white/75 sm:text-2xl lg:text-[1.625rem]">
                Now building software differently.
              </p>

              <div className="mx-auto mt-8 max-w-2xl space-y-5 text-base leading-[1.7] text-white/55 sm:text-[1.0625rem] lg:mx-0">
                <p>
                  For more than twenty years we&rsquo;ve helped organisations solve
                  operational problems, deliver technology, implement enterprise
                  software and build products that make businesses better.
                </p>
                <p>
                  Today, AI-enabled development allows us to deliver those same
                  outcomes faster, more flexibly and with software designed around
                  the customer instead of the other way around.
                </p>
              </div>

              <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href="mailto:hello@bespoke-everything.com"
                  className="btn-primary w-full sm:w-auto"
                >
                  Start a Conversation
                </a>
                <a href="#software" className="btn-secondary w-full sm:w-auto">
                  Explore Our Software
                </a>
              </div>

              <p className="strapline mx-auto mt-10 lg:mx-0">
                Built on experience. Accelerated by AI.
              </p>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section
          className="bg-off-white section-anchor"
          aria-labelledby="capabilities-heading"
        >
          <div className="section-inner section-pad">
            <Reveal>
              <p className="eyebrow">How we work with you</p>
              <h2
                id="capabilities-heading"
                className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]"
              >
                Three ways we help organisations build better software.
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {capabilities.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 80}
                  className={`h-full min-w-0 ${
                    index === 2 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <article
                    id={item.id}
                    className={`card flex h-full min-w-0 flex-col justify-between p-8 lg:p-9${item.id ? " section-anchor" : ""}`}
                  >
                    <div>
                      <span className="card-number">{item.number}</span>
                      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink">
                        {item.title}
                      </h3>
                      <div className="gold-rule mt-5" aria-hidden="true" />
                      <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                    <ul className="mt-8 space-y-2.5 border-t border-ink/6 pt-6">
                      {item.examples.map((example) => (
                        <li
                          key={example}
                          className="flex items-center gap-2.5 text-sm text-muted"
                        >
                          <span
                            className="h-1 w-1 shrink-0 rounded-full bg-gold"
                            aria-hidden="true"
                          />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section
          id="philosophy"
          className="relative overflow-hidden bg-ink text-white"
          aria-labelledby="philosophy-heading"
        >
          <BrandGrid className="brand-grid-dark" />
          <div className="section-inner section-pad relative">
            <Reveal>
              <p className="eyebrow">What we believe</p>
              <h2
                id="philosophy-heading"
                className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1]"
              >
                Software should adapt to businesses.
              </h2>
              <p className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight text-gold sm:text-4xl lg:text-5xl">
                Not the other way around.
              </p>
              <div className="gold-rule-wide mt-8" aria-hidden="true" />

              <div className="prose-width mt-12 space-y-5 text-base leading-[1.7] text-white/55 sm:text-[1.0625rem]">
                <p>
                  For decades, organisations have adapted their processes to fit
                  the limitations of off-the-shelf software.
                </p>
                <p>
                  That made sense when bespoke software was expensive, slow and
                  difficult to maintain.
                </p>
                <p className="text-white/80">
                  We believe that has fundamentally changed.
                </p>
                <p>
                  Modern AI-assisted development dramatically reduces the cost and
                  time required to create, improve and maintain software.
                </p>
                <p>
                  Businesses no longer have to choose between rigid software and
                  expensive custom development.
                </p>
                <p>They can build software around the way they actually operate.</p>
                <p>They can enhance the SaaS platforms they already use.</p>
                <p>
                  They can evolve software continuously as their organisation
                  changes.
                </p>
              </div>

              <div className="mt-16 border-t border-white/10 pt-12 lg:mt-20 lg:pt-14">
                <p className="max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl lg:leading-[1.15]">
                  The future isn&rsquo;t replacing SaaS.
                </p>
                <p className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-gold sm:text-3xl lg:text-4xl lg:leading-[1.15]">
                  It&rsquo;s making software adapt to every business.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Why Bespoke Everything */}
        <section
          id="why"
          className="border-t border-ink/5 bg-white"
          aria-labelledby="why-heading"
        >
          <div className="section-inner section-pad">
            <Reveal>
              <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
                <div>
                  <p className="eyebrow">Why Bespoke Everything</p>
                  <h2
                    id="why-heading"
                    className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl lg:leading-[1.1]"
                  >
                    Twenty years of experience.
                  </h2>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
                    A new way to deliver it.
                  </p>
                  <div className="gold-rule-wide mt-8" aria-hidden="true" />
                  <p className="mt-8 text-base leading-[1.7] text-muted sm:text-[1.0625rem]">
                    We&rsquo;ve spent more than two decades working with
                    organisations to solve complex business problems.
                  </p>
                  <p className="mt-4 text-base leading-[1.7] text-muted sm:text-[1.0625rem]">
                    That experience is our biggest asset.
                  </p>
                  <p className="mt-4 text-base leading-[1.7] text-muted sm:text-[1.0625rem]">
                    AI doesn&rsquo;t replace it.
                  </p>
                  <p className="mt-1 text-base font-medium leading-[1.7] text-ink sm:text-[1.0625rem]">
                    It amplifies it.
                  </p>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
                      That has included
                    </p>
                    <ul className="mt-6 space-y-3">
                      {experienceAreas.map((area) => (
                        <li
                          key={area}
                          className="flex items-start gap-3 text-[0.9375rem] text-ink"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                            aria-hidden="true"
                          />
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-10 text-base leading-[1.7] text-muted sm:text-[1.0625rem] lg:mt-0">
                    The value we bring isn&rsquo;t simply writing software.
                    It&rsquo;s understanding what should be built, why it matters
                    and how technology can improve the way an organisation
                    operates.
                  </p>
                </div>
              </div>

              <div className="mt-16 border-t border-ink/8 pt-12 lg:mt-20">
                <p className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  Business expertise.
                </p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-gold sm:text-3xl">
                  Modern software delivery.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Featured Software */}
        <section
          id="software"
          className="section-anchor border-t border-ink/5 bg-off-white"
          aria-labelledby="software-heading"
        >
          <div className="section-inner section-pad">
            <Reveal>
              <p className="eyebrow">Featured software</p>
              <h2
                id="software-heading"
                className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
              >
                Software we build and operate.
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-5 lg:grid-cols-2 lg:gap-6">
              {/* jalipi */}
              <Reveal>
                <article id="jalipi" className="card flex h-full flex-col overflow-hidden">
                  <div className="flex flex-1 flex-col p-8 lg:p-9">
                    <span className="status-badge status-badge-dev w-fit">
                      Currently in Development
                    </span>
                    <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl">
                      Enterprise workforce management, without compromise.
                    </h3>
                    <div className="gold-rule mt-5" aria-hidden="true" />
                    <p className="mt-6 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                      A new kind of workforce management platform: enterprise-grade
                      capability shaped around how each business actually operates,
                      and delivered in a fraction of the usual time. Forecasting,
                      scheduling, time &amp; attendance and pay preparation come
                      together in one modern, AI-native platform that adapts to the
                      customer — instead of forcing the customer to adapt to it.
                    </p>
                    <a
                      href="https://jalipi.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary-light mt-8 w-fit"
                    >
                      Find out more
                    </a>
                  </div>
                  <div className="flex items-center justify-center border-t border-ink/6 bg-off-white px-8 py-12 lg:px-9">
                    <JalipiWordmark
                      className="jalipi-wordmark"
                      style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
                    />
                  </div>
                </article>
              </Reveal>

              {/* Interesting Journeys */}
              <Reveal delay={80}>
                <article className="card flex h-full flex-col overflow-hidden">
                  <div className="flex flex-1 flex-col p-8 lg:p-9">
                    <span className="status-badge status-badge-live w-fit">
                      Live
                    </span>
                    <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink">
                      Interesting Journeys
                    </h3>
                    <div className="gold-rule mt-5" aria-hidden="true" />
                    <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted">
                      Interesting Journeys helps people discover distinctive
                      places and transform inspiration into personalised journeys.
                    </p>
                    <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                      Rather than presenting another list of destinations, it
                      helps travellers explore places, experiences and stories that
                      genuinely match their interests and build memorable journeys
                      around them.
                    </p>
                    <a
                      href="https://interestingjourneys.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-dark mt-8 w-fit"
                    >
                      Visit Interesting Journeys
                    </a>
                  </div>
                  <div className="flex items-center justify-center border-t border-ink/6 bg-off-white px-8 py-10 lg:px-9">
                    <Image
                      src="/logo/interesting-journeys-logo.png"
                      alt="Interesting Journeys logo"
                      width={1024}
                      height={1024}
                      className="h-auto w-full max-w-[10rem] object-contain sm:max-w-[12rem]"
                    />
                  </div>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section
          id="process"
          className="border-t border-ink/5 bg-white"
          aria-labelledby="process-heading"
        >
          <div className="section-inner section-pad">
            <Reveal>
              <p className="eyebrow">How we work</p>
              <h2
                id="process-heading"
                className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
              >
                From problem to product.
              </h2>
            </Reveal>

            <div className="process-stepper relative mt-14">
              <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {process.map((step, index) => (
                  <Reveal key={step.number} delay={index * 70}>
                    <li className="relative">
                      <div className="flex items-start gap-4 lg:flex-col lg:items-start">
                        <span className="process-step-num">{step.number}</span>
                        <div className="lg:mt-5">
                          <h3 className="text-lg font-semibold tracking-tight text-ink">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="section-anchor relative overflow-hidden bg-ink text-white"
          aria-labelledby="contact-heading"
        >
          <BrandGrid className="brand-grid-dark" />
          <div className="section-inner section-pad relative">
            <Reveal>
              <div className="max-w-3xl">
                <p className="eyebrow">Get in touch</p>
                <h2
                  id="contact-heading"
                  className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1]"
                >
                  Let&rsquo;s build something exceptional.
                </h2>
                <p className="mt-8 text-lg leading-[1.7] text-white/55">
                  Whether you need a product, specialist expertise or a completely
                  bespoke solution, start with a conversation.
                </p>
                <a
                  href="mailto:hello@bespoke-everything.com"
                  className="btn-primary mt-10"
                >
                  hello@bespoke-everything.com
                </a>
                <p className="mt-8 text-sm text-white/40">
                  Bespoke Everything Ltd
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
