import Image from "next/image";
import AtlasFrame from "./components/AtlasFrame";
import Footer from "./components/Footer";
import Header from "./components/Header";
import JourneysFrame from "./components/JourneysFrame";
import ModularBlocks from "./components/ModularBlocks";
import Reveal from "./components/Reveal";

const capabilities = [
  {
    id: "software",
    number: "01",
    title: "Software",
    description: "Products and platforms designed to scale.",
    examples: [
      "Atlas Workforce Operations",
      "Interesting Journeys",
      "Future SaaS products",
    ],
    variant: "dark" as const,
  },
  {
    id: "services",
    number: "02",
    title: "Services",
    description:
      "Specialist expertise used to shape, build and improve software.",
    examples: [
      "Product strategy",
      "Software architecture",
      "AI-enabled development",
      "Enterprise consulting",
    ],
    variant: "light" as const,
  },
  {
    id: "solutions",
    number: "03",
    title: "Solutions",
    description:
      "Bespoke software built around specific operational problems.",
    examples: [
      "Internal business systems",
      "Customer portals",
      "Workflow automation",
      "Mobile and web applications",
    ],
    variant: "accent" as const,
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
      "Use AI-first development to move quickly without compromising quality.",
  },
  {
    number: "04",
    title: "Evolve",
    description:
      "Turn successful bespoke solutions into reusable products where appropriate.",
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
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <p className="text-xs tracking-[0.3em] text-gold uppercase">
                  AI-First Software Company
                </p>

                <h1 className="mt-8 text-[2.75rem] leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
                  Software
                  <span className="text-gold">.</span>
                  <br />
                  Services
                  <span className="text-gold">.</span>
                  <br />
                  Solutions
                  <span className="text-gold">.</span>
                </h1>

                <p className="mt-8 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                  Bespoke Everything creates software products, delivers expert
                  technical services and builds bespoke solutions around the way
                  organisations actually work.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center bg-gold px-8 py-3.5 text-sm font-medium tracking-wide text-black transition-colors hover:bg-gold/90"
                  >
                    Start a Conversation
                  </a>
                  <a
                    href="#products"
                    className="inline-flex items-center justify-center border border-white/20 px-8 py-3.5 text-sm tracking-wide text-white/80 transition-colors hover:border-gold/50 hover:text-gold"
                  >
                    Explore Our Products
                  </a>
                </div>

                <p className="mt-8 max-w-md text-sm leading-relaxed text-white/40">
                  Products, platforms and partnerships built for real operational
                  problems.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div
                    className="absolute -inset-6 border border-gold/10"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -top-3 -right-3 h-12 w-12 border-t border-r border-gold/30"
                    aria-hidden="true"
                  />
                  <Image
                    src="/logo/bespoke-everything-logo-dark.png"
                    alt=""
                    width={480}
                    height={320}
                    priority
                    className="relative h-auto w-full max-w-[18rem] sm:max-w-[23rem] lg:max-w-[26rem]"
                    aria-hidden="true"
                  />
                </div>
              </div>
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
                  key={item.id}
                  delay={index * 100}
                  className={`h-full min-w-0 ${
                    index === 2 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <article
                    id={item.id}
                    className={`panel-hover section-anchor flex h-full min-w-0 w-full flex-col justify-between p-8 lg:p-10 ${
                      item.variant === "dark"
                        ? "bg-black text-white"
                        : item.variant === "light"
                          ? "border border-black/8 bg-white text-black"
                          : "border border-gold/30 bg-white text-black"
                    }`}
                  >
                    <div>
                      <span
                        className={`text-xs tracking-[0.25em] uppercase ${
                          item.variant === "dark"
                            ? "text-gold"
                            : "text-gold"
                        }`}
                      >
                        {item.number}
                      </span>
                      <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                        {item.title}
                      </h3>
                      <div
                        className="mt-4 h-px w-12 bg-gold"
                        aria-hidden="true"
                      />
                      <p
                        className={`mt-6 text-base leading-relaxed ${
                          item.variant === "dark"
                            ? "text-white/60"
                            : "text-muted"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                    <ul className="mt-8 space-y-2">
                      {item.examples.map((example) => (
                        <li
                          key={example}
                          className={`flex items-center gap-2 text-sm ${
                            item.variant === "dark"
                              ? "text-white/50"
                              : "text-muted"
                          }`}
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
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <div>
                  <p className="text-xs tracking-[0.3em] text-gold uppercase">
                    Our philosophy
                  </p>
                  <h2
                    id="philosophy-heading"
                    className="mt-4 text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl lg:leading-[1.1]"
                  >
                    Software should adapt to businesses.
                  </h2>
                  <p className="mt-8 text-lg leading-relaxed text-muted">
                    Traditional software often forces organisations to change the
                    way they work. We believe the opposite.
                  </p>
                  <p className="mt-4 text-lg leading-relaxed text-muted">
                    Bespoke Everything combines AI-first development, product
                    thinking and operational expertise to build software around
                    the customer.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={150}>
                <ModularBlocks />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section
          id="products"
          className="section-anchor border-t border-black/5 bg-off-white"
          aria-labelledby="products-heading"
        >
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <Reveal>
              <p className="text-xs tracking-[0.3em] text-gold uppercase">
                Featured products
              </p>
              <h2
                id="products-heading"
                className="mt-4 text-3xl font-semibold tracking-tight text-black sm:text-4xl"
              >
                Software we build and operate.
              </h2>
            </Reveal>

            <div className="mt-12 space-y-6">
              {/* Atlas */}
              <Reveal>
                <article className="panel-hover grid overflow-hidden border border-black/8 bg-black text-white lg:grid-cols-2">
                  <div className="flex flex-col justify-between p-8 lg:p-12">
                    <div>
                      <span className="inline-block border border-gold/40 px-3 py-1 text-xs tracking-[0.15em] text-gold uppercase">
                        Currently in Development
                      </span>
                      <h3 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                        A modern workforce operations platform.
                      </h3>
                      <p className="mt-2 text-sm tracking-wide text-gold">
                        Atlas
                      </p>
                      <p className="mt-6 max-w-lg leading-relaxed text-white/60">
                        Atlas helps organisations forecast demand, schedule
                        work, manage attendance, resolve exceptions and prepare
                        payroll through a single operational platform.
                      </p>
                    </div>
                    <span
                      className="mt-8 inline-flex w-fit cursor-not-allowed items-center border border-white/20 px-6 py-3 text-sm tracking-wide text-white/40"
                      aria-disabled="true"
                    >
                      Coming soon
                    </span>
                  </div>
                  <div className="flex items-center justify-center bg-black/80 p-8 lg:p-12">
                    <div className="w-full max-w-md">
                      <AtlasFrame />
                    </div>
                  </div>
                </article>
              </Reveal>

              {/* Interesting Journeys */}
              <Reveal delay={100}>
                <article className="panel-hover grid overflow-hidden border border-black/8 bg-white lg:grid-cols-2">
                  <div className="order-2 flex items-center justify-center bg-off-white p-8 lg:order-1 lg:p-12">
                    <div className="w-full max-w-md">
                      <JourneysFrame />
                    </div>
                  </div>
                  <div className="order-1 flex flex-col justify-between p-8 lg:order-2 lg:p-12">
                    <div>
                      <span className="inline-block border border-gold/40 bg-gold/10 px-3 py-1 text-xs tracking-[0.15em] text-gold uppercase">
                        Live
                      </span>
                      <h3 className="mt-6 text-2xl font-semibold tracking-tight text-black sm:text-3xl lg:text-4xl">
                        Discover journeys worth taking.
                      </h3>
                      <p className="mt-2 text-sm tracking-wide text-gold">
                        Interesting Journeys
                      </p>
                      <p className="mt-6 max-w-lg leading-relaxed text-muted">
                        A travel discovery product helping people explore
                        distinctive destinations and personalised experiences.
                      </p>
                    </div>
                    <a
                      href="https://interestingjourneys.co.uk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex w-fit items-center gap-2 bg-black px-6 py-3 text-sm tracking-wide text-white transition-colors hover:bg-black/85"
                    >
                      Visit Interesting Journeys
                      <span aria-hidden="true">&rarr;</span>
                    </a>
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
          <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
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
                  Whether you need a product, specialist expertise or a
                  completely bespoke solution, start with a conversation.
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
