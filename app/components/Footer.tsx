import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Image
              src="/logo/bespoke-everything-logo-dark.png"
              alt="Bespoke Everything"
              width={320}
              height={213}
              className="h-16 w-auto sm:h-20"
            />
            <p className="mt-6 text-xs tracking-[0.25em] text-gold uppercase">
              Software • Services • Solutions
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs tracking-[0.2em] text-white/40 uppercase">
                Products
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="https://interestingjourneys.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    Interesting Journeys
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] text-white/40 uppercase">
                Contact
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="mailto:hello@bespoke-everything.com"
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    hello@bespoke-everything.com
                  </a>
                </li>
                <li>
                  <span className="text-sm text-white/50">
                    Bespoke Everything Ltd
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            &copy; {year} Bespoke Everything Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
