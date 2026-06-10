import Navigation from "@/components/(A_NavigationComponent)/(Nav)/Navigation";
import LilleHero from "@/components/(A_NavigationComponent)/(Titles)/PageTitle";
import EventsList from "@/components/(C_EventsComponents)/EventsList";
import NewsSubsriberContainer from "@/components/(B_ForsideComponents)/(8_Subsrcibe)/NewsSubscribeContainer";
import Footer from "@/components/(G_FooterComponents)/Footer";

export default async function EventsPage({ searchParams }) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events?_page=${page}&_limit=3`, { cache: "no-store" });
  const events = await res.json();

  const totalCount = res.headers.get("X-Total-Count");
  const totalPages = Math.ceil(totalCount / 3);

  return (
    <main style={{ backgroundImage: "url('/backgrounds/pattern_bg.jpg')" }}>
      <Navigation />
      <LilleHero className="text-3xl md:text-5xl">EVENTS</LilleHero>

      {!Array.isArray(events) || events.length === 0 ? <p className="text-white text-center mt-10">No events found.</p> : <EventsList events={events} currentPage={page} totalPages={totalPages} />}
      <NewsSubsriberContainer>dont miss an event!</NewsSubsriberContainer>
      <Footer />
    </main>
  );
}
