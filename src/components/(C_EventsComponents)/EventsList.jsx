import EventCard from "./EventCard";
import Link from "next/link";

const EventsList = ({ events, currentPage, totalPages }) => {
  const safeEvents = Array.isArray(events) ? events : [];

  return (
    <section className="bg-black">
      {safeEvents.map((event) => (
        <EventCard key={event.id} id={event.id} slug={event.slug} title={event.title} date={event.date} location={event.location} excerpt={event.excerpt} image={event.asset?.url ? `${process.env.NEXT_PUBLIC_API_URL}${event.asset.url}` : "/fallback.jpg"} content={event.content} lineup={event.lineup} schedule={event.schedule} />
      ))}

      <div style={{ backgroundImage: "url('/backgrounds/pattern_bg.jpg')" }} className="py-12">
        <div className="flex items-center justify-center gap-3 py-12 text-white text-sm tracking-widest">
          {currentPage === totalPages && (
            <Link href={`/Event?page=${currentPage - 1}`} className="hover:text-pink-500">
              &lt; tilbage
            </Link>
          )}

          {/* AI har assisteret efter flere forsøg med at implementere en simpel pagination-komponent, der viser links til tidligere og næste sider baseret på den aktuelle side (currentPage) og det samlede antal sider (totalPages). Paginationen inkluderer betingelser for at skjule "næste" linket på den sidste side og "tilbage" linket på den første side, hvilket forbedrer navigationen for brugeren. */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Link key={pageNum} href={`/Event?page=${pageNum}`} className={`hover:text-pink-500 ${currentPage === pageNum ? "text-pink-500" : ""}`}>
              {pageNum}
            </Link>
          ))}

          {currentPage < totalPages && (
            <Link href={`/Event?page=${currentPage + 1}`} className="hover:text-pink-500">
              næste &gt;
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsList;
