import { Suspense } from "react";
import Image from "next/image";
import Hero from "@/components/(B_ForsideComponents)/(1_Hero)/Hero";
import Navigation from "@/components/(A_NavigationComponent)/(Nav)/Navigation";
import WelcomeClub from "@/components/(B_ForsideComponents)/(2_WelcomeInClubCards)/WelcomeClubContainer";
import FeaturedEvents from "@/components/(B_ForsideComponents)/(3_FeauturedEvents)/FeaturedEventsContainer";
import ClubGallery from "@/components/(B_ForsideComponents)/(4_Galleri)/ClubGallery";
import Audio from "@/components/(B_ForsideComponents)/(5_Musik)/MusikContainer.jsx";
import LatestVideo from "@/components/(B_ForsideComponents)/(6_Video)/LatestVideo.jsx";
import ReviewContainer from "@/components/(B_ForsideComponents)/(7_Review)/ReviewContainer";
import NewsSubsriberContainer from "@/components/(B_ForsideComponents)/(8_Subsrcibe)/NewsSubscribeContainer";
import Footer from "@/components/(G_FooterComponents)/Footer";

export default async function Home() {
  const testimonialsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`, { cache: "no-store" });
  const testimonials = await testimonialsRes.json();

  const eventsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events?isFeatured=true`, { cache: "no-store" });
  const featuredEvents = await eventsRes.json();

  return (
    <main className="flex flex-col relative">
      {/* Baggrundsbillede via Next.js Image i stedet for CSS */}
      <Image src="/backgrounds/pattern_bg.jpg" alt="" aria-hidden="true" fill className="object-cover object-center -z-10" quality={75} priority />

      <Suspense
        fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <img src="./loader/madbars.gif" alt="Loader..." />
          </div>
        }
      >
        <Hero />
      </Suspense>
      <Navigation />
      <WelcomeClub />
      <FeaturedEvents events={featuredEvents} />
      <ClubGallery />
      <Audio />
      <LatestVideo />
      <ReviewContainer testimonials={testimonials} />
      <NewsSubsriberContainer>WANT THE LATES NIGHT CLUB NEWS</NewsSubsriberContainer>
      <Footer />
    </main>
  );
}
