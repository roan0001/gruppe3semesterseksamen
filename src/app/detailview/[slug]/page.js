import { Suspense } from "react";
import Navigation from "@/components/(A_NavigationComponent)/(Nav)/Navigation";
import PageTitle from "@/components/(A_NavigationComponent)/(Titles)/PageTitle";
import Detailview from "@/components/(D_DetailEventComponents)/(1_EventDetails)/Detailview";
import NewsSubsriberContainer from "@/components/(B_ForsideComponents)/(8_Subsrcibe)/NewsSubscribeContainer";
import Footer from "@/components/(G_FooterComponents)/Footer";

export default async function EventDetailPage({ params }) {
  const { slug } = await params;

  console.log("slug:", slug);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${slug}`);
  const event = await res.json();

  return (
    <main className="bg-black min-h-screen">
      <Navigation />
      <PageTitle> {event?.title} </PageTitle>
      <Suspense fallback={<div className="text-white p-8">Indlæser event...</div>}>
        <Detailview slug={slug} />
      </Suspense>
      <NewsSubsriberContainer>dont miss an event!</NewsSubsriberContainer>
      <Footer />
    </main>
  );
}
