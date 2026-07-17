import BespokeEverythingLogo from "./BespokeEverythingLogo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-ink text-white">
      <div className="section-inner section-pad !pt-16 !pb-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <BespokeEverythingLogo
              variant="dark"
              layout="stacked"
              className="text-[11px] sm:text-xs"
            />
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:gap-20">
            <div>
              <p className="eyebrow !text-white/40">Software</p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#jalipi"
                    className="text-sm text-white/65 transition-colors hover:text-gold"
                  >
                    jalipi
                  </a>
                </li>
                <li>
                  <a
                    href="https://interestingjourneys.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/65 transition-colors hover:text-gold"
                  >
                    Interesting Journeys
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow !text-white/40">Contact</p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="mailto:hello@bespoke-everything.com"
                    className="text-sm text-white/65 transition-colors hover:text-gold"
                  >
                    hello@bespoke-everything.com
                  </a>
                </li>
                <li>
                  <span className="text-sm text-white/45">
                    Bespoke Everything Ltd
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/8 pt-6">
          <p className="text-xs text-white/40">
            &copy; {year} Bespoke Everything Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
