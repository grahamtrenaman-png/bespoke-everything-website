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
      "Specialist expertise used to shape, build and improve software and business operations.",
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
      "Bespoke software created around a specific organisation, workflow or operational problem.",
    examples: [
      "Internal business systems",
      "Customer portals",
      "Workflow automation",
      "Mobile and web applications",
    ],
  },
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
          <div className="hero-grid hero-grid-animated absolute inset-0" />
          <div className="hero-radial absolute inset-0" />

          <div className="gold-line-pulse absolute top-1/4 left-0 h-px w-1/3 bg-gold/30" />
          <div
            className="gold-line-pulse absolute right-0 bottom-1/3 h-px w-1/4 bg-gold/20"
            style={{ animationDelay: "2s" }}
          />

          <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-6 pt-24 pb-16 lg:px-10 lg:pt-28">
            <div className="max-w-3xl">
              <Image
                src="/logo/bespoke-everything-logo-dark.png"
                alt="Bespoke Everything"
                width={480}
                height={320}
                priority
                className="h-auto w-full max-w-[14rem] sm:max-w-[16rem] lg:max-w-[18rem]"
              />

              <h1 className="mt-10 text-2xl leading-snug font-medium tracking-tight text-white/90 sm:text-3xl lg:text-4xl">
                Software
                <span className="text-gold">.</span>
                <br />
                Services
                <span className="text-gold">.</span>
                <br />
                Solutions
                <span className="text-gold">.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                Bespoke Everything creates software products, delivers expert
                services and builds bespoke solutions around the way
                organisations actually work.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center bg-gold px-8 py-3.5 text-sm font-medium tracking-wide text-black transition-colors hover:bg-gold/90"
                >
                  Start a Conversation
                </a>
                <a
                  href="#software"
                  className="inline-flex items-center justify-center border border-white/20 px-8 py-3.5 text-sm tracking-wide text-white/80 transition-colors hover:border-gold/50 hover:text-gold"
                >
                  Explore Our Software
                </a>
              </div>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/40">
                Products, platforms and partnerships built for real operational
                problems.
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
                What we do
              </p>
              <h2
                id="capabilities-heading"
                className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl"
              >
                Built for organisations that need more than off-the-shelf.
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
          className="border-t border-black/5 bg-white"
          aria-labelledby="philosophy-heading"
        >
          <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-10 lg:py-20">
            <Reveal>
              <p className="text-xs tracking-[0.3em] text-gold uppercase">
                Our philosophy
              </p>
              <h2
                id="philosophy-heading"
                className="mt-4 text-2xl font-semibold tracking-tight text-black sm:text-3xl lg:text-4xl"
              >
                Software should adapt to businesses.
              </h2>
              <div
                className="mx-auto mt-6 h-px w-16 bg-gold"
                aria-hidden="true"
              />
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
                Traditional software often forces organisations to change the way
                they work. We believe the opposite.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                We combine product thinking, modern software development and deep
                operational expertise to create software around the customer
                rather than forcing the customer around the software.
              </p>
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
                          Workforce operations, brought together.
                        </h3>
                        <p className="mt-6 max-w-lg leading-relaxed text-muted">
                          Jalipi is a modern workforce operations platform that
                          brings forecasting, demand planning, scheduling, time
                          and attendance, leave, exceptions and payroll readiness
                          into one connected system.
                        </p>
                        <p className="mt-4 max-w-lg leading-relaxed text-muted">
                          It is designed to support complex organisations without
                          exposing users to unnecessary complexity, combining
                          powerful configurable engines with a clear, modern
                          operational experience.
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
                          Turn travel ideas into journeys worth taking.
                        </h3>
                        <p className="mt-6 max-w-lg leading-relaxed text-muted">
                          Interesting Journeys helps people discover distinctive
                          places and turn inspiration into personalised travel
                          journeys.
                        </p>
                        <p className="mt-4 max-w-lg leading-relaxed text-muted">
                          Rather than presenting another generic list of
                          destinations, it brings together ideas, places and
                          experiences in a way that helps each traveller explore
                          what genuinely interests them and shape a journey around
                          it.
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
