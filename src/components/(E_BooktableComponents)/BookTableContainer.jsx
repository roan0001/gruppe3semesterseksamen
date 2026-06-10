import ReserveTable from "./ReserveTable";
import LilleHero from "@/components/(A_NavigationComponent)/(Titles)/PageTitle";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getEvent(eventId) {
  try {
    const res = await fetch(`${API_URL}/events/${eventId}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
// henter nu alle events med ind i dropdown
async function getAllEvents() {
  try {
    const res = await fetch(`${API_URL}/events`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function BookTableContainer({ searchParams }) {
  const params = await searchParams;
  const eventId = params?.eventId ? parseInt(params.eventId) : null;
  const event = eventId ? await getEvent(eventId) : null;

  const allEvents = await getAllEvents();

  let occupiedTables = [];
  if (eventId) {
    try {
      const res = await fetch(`${API_URL}/reservations?eventId=${eventId}`, { cache: "no-store" });
      const reservations = await res.json();
      occupiedTables = Array.isArray(reservations) ? reservations.map((r) => parseInt(r.table)) : [];
    } catch {}
  }

  return (
    <div className="max-w-[2200px] mx-auto">
      <LilleHero className="text-3xl md:text-5xl">BOOK A TABLE</LilleHero>
      <ReserveTable event={event} eventId={eventId} apiUrl={process.env.NEXT_PUBLIC_API_URL} initialOccupiedTables={occupiedTables} allEvents={allEvents} />
    </div>
  );
}
