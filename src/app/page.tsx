import { ClosingBanner, Footer, Registry, RsvpInvite } from "@/components/Closing";
import { Envelope } from "@/components/Envelope";
import { PalmShadow } from "@/components/PalmShadow";
import { PapelPicado } from "@/components/PapelPicado";
import { SeaInterlude } from "@/components/SeaInterlude";
import { Faq } from "@/components/Faq";
import { Gallery } from "@/components/Gallery";
import { GuestInfo } from "@/components/GuestInfo";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Schedule } from "@/components/Schedule";
import { Story } from "@/components/Story";
import { Venue } from "@/components/Venue";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />

        <section aria-labelledby="welcome-title" className="relative overflow-hidden pb-24 sm:pb-32">
          <PalmShadow className="top-[10px] -right-24 h-[420px] w-[480px] sm:h-[600px] sm:w-[680px]" />
          <PapelPicado className="-mt-1" />
          <div className="mx-auto flex max-w-[760px] flex-col items-center px-4 pt-12 text-center sm:pt-16">
            <p data-reveal className="eyebrow">
              Save the date
            </p>
            <h2
              id="welcome-title"
              data-reveal
              className="mt-5 font-display text-[clamp(1.75rem,1.15rem+2.4vw,2.625rem)] leading-[1.22] tracking-[-0.015em] text-ink"
            >
              We’re so excited to celebrate our big day with you in Mexico!
            </h2>
            <div data-reveal className="mt-14 w-full">
              <Envelope />
            </div>
            <dl
              data-reveal
              className="mt-14 grid w-full max-w-[560px] grid-cols-1 overflow-hidden rounded-[14px] bg-card text-left shadow-[0_10px_30px_-18px_rgba(60,40,25,0.35)] ring-1 ring-black/5 sm:grid-cols-2"
            >
              <div className="border-b border-black/5 px-6 py-5 sm:border-r sm:border-b-0">
                <dt className="eyebrow !text-[11px]">RSVP by</dt>
                <dd className="mt-1 text-[17px] font-medium tracking-[-0.015em] text-ink">{site.rsvp.deadline}</dd>
              </div>
              <div className="px-6 py-5">
                <dt className="eyebrow !text-[11px]">Rooms</dt>
                <dd className="mt-1 text-[17px] font-medium tracking-[-0.015em] text-ink">
                  <a href="#stay" className="underline decoration-gold underline-offset-4 hover:text-clay">
                    Book with {site.booking.coordinator}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <Story />
        <Schedule />
        <Venue />
        <GuestInfo />
        <SeaInterlude />
        <Gallery />
        <Registry />
        <RsvpInvite />
        <Faq />
        <ClosingBanner />
      </main>
      <Footer />
    </>
  );
}
