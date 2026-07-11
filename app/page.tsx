import Image from "next/image";
import Footer from "./components/Footer";
import Header from "./components/Header";
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
        <section className="relative min-h-[85vh] overflow-hidden bg-black text-white">
          <div className="hero-grid absolute inset-0 opacity-60" />

          <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-6 pt-24 pb-20 lg:px-10 lg:pt-28 lg:pb-24">
            <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <Image
                  src="/logo/bespoke-everything-logo-dark.png"
                  alt="Bespoke Everything"
                  width={1536}
                  height={1024}
                  priority
                  className="h-auto w-full max-w-[20rem] object-contain sm:max-w-[24rem] lg:max-w-[26rem] xl:max-w-[28rem]"
                />
              </div>

              <h1 className="mt-10 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                Twenty years solving business problems.
              </h1>
              <p className="mt-3 text-xl leading-snug text-white/80 sm:text-2xl lg:text-[1.75rem]">
                Now building software differently.
              </p>

              <div className="mx-auto mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-white/60 sm:text-lg lg:mx-0">
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

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center bg-gold px-8 py-3.5 text-sm font-medium tracking-wide text-black transition-colors hover:bg-gold/90 sm:w-auto"
                >
                  Start a Conversation
                </a>
                <a
                  href="#software"
                  className="inline-flex w-full items-center justify-center border border-white/20 px-8 py-3.5 text-sm tracking-wide text-white/80 transition-colors hover:border-gold/50 hover:text-gold sm:w-auto"
                >
                  Explore Our Software
                </a>
              </div>

              <p className="mt-8 text-sm tracking-wide text-white/40">
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
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <Reveal>
              <p className="text-xs tracking-[0.3em] text-gold uppercase">
                How we work with you
              </p>
              <h2
                id="capabilities-heading"
                className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl"
              >
                Three ways we help organisations build better software.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {capabilities.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 100}
                  className={`h-full min-w-0 ${
                    index === 2 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <article
                    id={item.id}
                    className={`panel-hover flex h-full min-w-0 w-full flex-col justify-between border border-black/8 bg-white p-8 lg:p-10${item.id ? " section-anchor" : ""}`}
                  >
                    <div>
                      <span className="text-xs tracking-[0.25em] text-gold uppercase">
                        {item.number}
                      </span>
                      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-black sm:text-3xl">
                        {item.title}
                      </h3>
                      <div
                        className="mt-4 h-px w-12 bg-gold"
                        aria-hidden="true"
                      />
                      <p className="mt-6 text-base leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                    <ul className="mt-8 space-y-2">
                      {item.examples.map((example) => (
                        <li
                          key={example}
                          className="flex items-center gap-2 text-sm text-muted"
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
          className="relative overflow-hidden bg-black text-white"
          aria-labelledby="philosophy-heading"
        >
          <div className="hero-grid absolute inset-0 opacity-25" />
          <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
            <Reveal>
              <p className="text-xs tracking-[0.3em] text-gold uppercase">
                What we believe
              </p>
              <h2
                id="philosophy-heading"
                className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl xl:leading-[1.1]"
              >
                Software should adapt to businesses.
              </h2>
              <p className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight text-gold sm:text-4xl lg:text-5xl">
                Not the other way around.
              </p>
              <div className="mt-8 h-px w-16 bg-gold" aria-hidden="true" />

              <div className="mt-12 max-w-2xl space-y-6 text-base leading-relaxed text-white/60 sm:text-lg">
                <p>
                  For decades, organisations have adapted their processes to fit
                  the limitations of off-the-shelf software.
                </p>
                <p>
                  That made sense when bespoke software was expensive, slow and
                  difficult to maintain.
                </p>
                <p className="text-white/80">We believe that has fundamentally changed.</p>
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

              <div className="mt-16 border-t border-white/10 pt-12 lg:mt-20 lg:pt-16">
                <p className="max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl lg:leading-[1.2]">
                  The future isn&rsquo;t replacing SaaS.
                </p>
                <p className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-gold sm:text-3xl lg:text-4xl lg:leading-[1.2]">
                  It&rsquo;s making software adapt to every business.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Why Bespoke Everything */}
        <section
          id="why"
          className="border-t border-black/5 bg-off-white"
          aria-labelledby="why-heading"
        >
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
            <Reveal>
              <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
                <div>
                  <p className="text-xs tracking-[0.3em] text-gold uppercase">
                    Why Bespoke Everything
                  </p>
                  <h2
                    id="why-heading"
                    className="mt-4 text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl lg:leading-[1.1]"
                  >
                    Twenty years of experience.
                  </h2>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl">
                    A new way to deliver it.
                  </p>
                  <div className="mt-8 h-px w-16 bg-gold" aria-hidden="true" />
                  <p className="mt-8 text-base leading-relaxed text-muted sm:text-lg">
                    We&rsquo;ve spent more than two decades working with
                    organisations to solve complex business problems.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                    That experience is our biggest asset.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                    AI doesn&rsquo;t replace it.
                  </p>
                  <p className="mt-1 text-base font-medium leading-relaxed text-black sm:text-lg">
                    It amplifies it.
                  </p>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-sm tracking-[0.15em] text-muted uppercase">
                      That has included
                    </p>
                    <ul className="mt-6 space-y-3">
                      {experienceAreas.map((area) => (
                        <li
                          key={area}
                          className="flex items-start gap-3 text-base text-black"
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
                  <p className="mt-10 text-base leading-relaxed text-muted sm:text-lg lg:mt-0">
                    The value we bring isn&rsquo;t simply writing software.
                    It&rsquo;s understanding what should be built, why it matters
                    and how technology can improve the way an organisation
                    operates.
                  </p>
                </div>
              </div>

              <div className="mt-16 border-t border-black/8 pt-12 lg:mt-20">
                <p className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
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
          className="section-anchor border-t border-black/5 bg-off-white"
          aria-labelledby="software-heading"
        >
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <Reveal>
              <p className="text-xs tracking-[0.3em] text-gold uppercase">
                Featured software
              </p>
              <h2
                id="software-heading"
                className="mt-4 text-3xl font-semibold tracking-tight text-black sm:text-4xl"
              >
                Software we build and operate.
              </h2>
            </Reveal>

            <div className="mt-12 space-y-6">
              {/* jalipi */}
              <Reveal>
                <article className="panel-hover overflow-hidden border border-black/8 bg-white">
                  <div className="grid lg:grid-cols-2">
                    <div className="flex flex-col justify-between p-8 lg:p-12">
                      <div>
                        <span className="inline-block border border-[#7B5EA7]/30 bg-[#7B5EA7]/5 px-3 py-1 text-xs tracking-[0.15em] text-[#7B5EA7] uppercase">
                          Currently in Development
                        </span>
                        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-black sm:text-3xl">
                          jalipi
                        </h3>
                        <p className="mt-6 max-w-lg leading-relaxed text-muted">
                          A modern workforce operations platform that combines
                          forecasting, scheduling, payroll preparation and
                          operational insight into a single intelligent platform
                          designed for modern organisations.
                        </p>
                      </div>
                      <span
                        className="mt-8 inline-flex w-fit cursor-not-allowed items-center border border-black/15 px-6 py-3 text-sm tracking-wide text-muted"
                        aria-disabled="true"
                      >
                        Currently in Development
                      </span>
                    </div>
                    <div className="flex items-center justify-center border-t border-black/5 bg-off-white p-8 lg:border-t-0 lg:border-l lg:p-12">
                      <Image
                        src="/logo/jalipi-logo.png"
                        alt="jalipi"
                        width={1774}
                        height={887}
                        className="h-auto w-full max-w-xs object-contain sm:max-w-sm lg:max-w-md"
                      />
                    </div>
                  </div>
                </article>
              </Reveal>

              {/* Interesting Journeys */}
              <Reveal delay={100}>
                <article className="panel-hover overflow-hidden border border-black/8 bg-white">
                  <div className="grid lg:grid-cols-2">
                    <div className="order-2 flex items-center justify-center border-t border-black/5 bg-off-white p-8 lg:order-1 lg:border-t-0 lg:border-r lg:p-12">
                      <Image
                        src="/logo/interesting-journeys-logo.png"
                        alt="Interesting Journeys"
                        width={1024}
                        height={1024}
                        className="h-auto w-full max-w-[12rem] object-contain sm:max-w-[14rem] lg:max-w-[16rem]"
                      />
                    </div>
                    <div className="order-1 flex flex-col justify-between p-8 lg:order-2 lg:p-12">
                      <div>
                        <span className="inline-block border border-gold/40 bg-gold/10 px-3 py-1 text-xs tracking-[0.15em] text-gold uppercase">
                          Live
                        </span>
                        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-black sm:text-3xl">
                          Interesting Journeys
                        </h3>
                        <p className="mt-6 max-w-lg leading-relaxed text-muted">
                          Interesting Journeys helps people discover distinctive
                          places and transform inspiration into personalised
                          journeys.
                        </p>
                        <p className="mt-4 max-w-lg leading-relaxed text-muted">
                          Rather than presenting another list of destinations, it
                          helps travellers explore places, experiences and stories
                          that genuinely match their interests and build memorable
                          journeys around them.
                        </p>
                      </div>
                      <a
                        href="https://interestingjourneys.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex w-fit items-center gap-2 bg-black px-6 py-3 text-sm tracking-wide text-white transition-colors hover:bg-black/85"
                      >
                        Visit Interesting Journeys
                        <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section
          id="process"
          className="border-t border-black/5 bg-white"
          aria-labelledby="process-heading"
        >
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <Reveal>
              <p className="text-xs tracking-[0.3em] text-gold uppercase">
                How we work
              </p>
              <h2
                id="process-heading"
                className="mt-4 text-3xl font-semibold tracking-tight text-black sm:text-4xl"
              >
                From problem to product.
              </h2>
            </Reveal>

            <div className="relative mt-12">
              <div
                className="timeline-line absolute top-8 right-0 left-0 hidden h-px lg:block"
                aria-hidden="true"
              />
              <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {process.map((step, index) => (
                  <Reveal key={step.number} delay={index * 80}>
                    <li className="relative">
                      <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                        <span className="flex h-16 w-16 shrink-0 items-center justify-center border border-gold/30 bg-off-white text-sm tracking-[0.15em] text-gold">
                          {step.number}
                        </span>
                        <div className="lg:mt-6">
                          <h3 className="text-lg font-semibold tracking-tight text-black">
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
          className="section-anchor relative overflow-hidden bg-black text-white"
          aria-labelledby="contact-heading"
        >
          <div className="hero-grid absolute inset-0 opacity-40" />
          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <Reveal>
              <div className="max-w-3xl">
                <p className="text-xs tracking-[0.3em] text-gold uppercase">
                  Get in touch
                </p>
                <h2
                  id="contact-heading"
                  className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1]"
                >
                  Let&rsquo;s build something exceptional.
                </h2>
                <p className="mt-8 text-lg leading-relaxed text-white/60">
                  Whether you need a product, specialist expertise or a completely
                  bespoke solution, start with a conversation.
                </p>
                <a
                  href="mailto:hello@bespoke-everything.com"
                  className="mt-10 inline-flex items-center justify-center bg-gold px-10 py-4 text-sm font-medium tracking-wide text-black transition-colors hover:bg-gold/90"
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
