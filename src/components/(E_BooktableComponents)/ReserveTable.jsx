"use client";
import { useState, useEffect } from "react";
import PickTable from "./PickTable";
import ReserveForm from "./ReserveForm";
//events er taget med
export default function ReserveTable({ event, eventId, apiUrl, initialOccupiedTables = [], allEvents = [] }) {
  const [selectedTable, setSelectedTable] = useState(null);
  const [occupiedTables, setOccupiedTables] = useState(initialOccupiedTables);

  // Hvis man har valgt et event via dropdown
  const [selectedEventId, setSelectedEventId] = useState(eventId ?? null);
  const [selectedEvent, setSelectedEvent] = useState(event ?? null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("table");
    if (t) setSelectedTable(parseInt(t));
  }, []);

  // Når brugeren vælger et event fra dropdown
  const handleEventSelect = async (e) => {
    const id = e.target.value ? parseInt(e.target.value) : null;

    if (!id) {
      setSelectedEventId(null);
      setSelectedEvent(null);
      setOccupiedTables([]);
      setSelectedTable(null);
      return;
    }

    setSelectedEventId(id);
    setSelectedTable(null);

    // Find event fra allEvents
    const found = allEvents.find((ev) => ev.id === id) ?? null;
    setSelectedEvent(found);

    // Hent reserverede borde for dette event
    try {
      const res = await fetch(`${apiUrl}/reservations?eventId=${id}`);
      const reservations = await res.json();
      const occupied = Array.isArray(reservations) ? reservations.map((r) => parseInt(r.table)) : [];
      setOccupiedTables(occupied);
    } catch {
      setOccupiedTables([]);
    }
  };

  const handleDatePick = async (dateStr) => {
    if (!dateStr) return;
    try {
      const res = await fetch(`${apiUrl}/reservations?date=${dateStr}`);
      if (!res.ok) return;
      const data = await res.json();
      const occupied = Array.isArray(data) ? data.map((r) => parseInt(r.table)) : [];
      setOccupiedTables(occupied);
      if (selectedTable && occupied.includes(selectedTable)) {
        setSelectedTable(null);
      }
    } catch {}
  };

  const handleSelectTable = (id) => {
    setSelectedTable(id);
    if (window.innerWidth < 768) {
      document.getElementById("reserve-form-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTableConflict = (tableId) => {
    setOccupiedTables((prev) => (prev.includes(tableId) ? prev : [...prev, tableId]));
    setSelectedTable(null);
  };
  // Bestem aktivt event og dets dato
  const activeEvent = selectedEvent;
  const activeEventId = selectedEventId;
  const eventDate = activeEvent?.date ?? null;

  // Sortér events efter dato
  const upcomingEvents = Array.isArray(allEvents) ? [...allEvents].sort((a, b) => new Date(a.date) - new Date(b.date)) : [];

  return (
    <div>
      {/* Event-vælger — vis kun hvis man IKKE er kommet med et eventId fra URL */}
      {!eventId && upcomingEvents.length > 0 && (
        <div className="mx-6 sm:mx-10 lg:mx-20 mb-6">
          <label className="block text-nightclub-pink text-[10px] tracking-[0.2em] uppercase mb-2">Book table for event (pick event)</label>
          <div className="relative">
            <select value={selectedEventId ?? ""} onChange={handleEventSelect} className="w-full bg-transparent border border-white text-white text-sm tracking-wider px-4 py-3 outline-none appearance-none cursor-pointer focus:border-nightclub-pink transition-colors" style={{ colorScheme: "dark" }}>
              <option value="" style={{ background: "#000" }}>
                — No event selected (Choose date) —
              </option>
              {upcomingEvents.map((ev) => (
                <option key={ev.id} value={ev.id} style={{ background: "#000" }}>
                  {ev.title} —{" "}
                  {new Date(ev.date).toLocaleDateString("en-us", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </option>
              ))}
            </select>
            {/* Pil-ikon */}
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white text-xs">▼</span>
          </div>
        </div>
      )}
      {/* Vis valgt event info */}
      // nu kan man vælge imellem aktive events
      {activeEvent && (
        <div className="mx-6 sm:mx-10 lg:mx-20 mb-4 px-4 py-3 border border-nightclub-pink bg-nightclub-pink/5 rounded">
          <span className="text-nightclub-pink text-[10px] tracking-[0.2em] uppercase block mb-0.5">Event</span>
          <span className="text-nightclub-pink font-semibold block">{activeEvent.name || activeEvent.title}</span>
          {activeEvent.date && (
            <span className="text-gray-500 text-[12px] block mt-0.5">
              {new Date(activeEvent.date).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        </div>
      )}
      <PickTable onSelectTable={handleSelectTable} selectedTable={selectedTable} occupiedTables={occupiedTables} />
      <p className="text-center text-[12px] text-gray-500 mb-8 px-4">{selectedTable ? `✓ Table ${selectedTable} selected — fill in your details below` : "Click a table above to select it"}</p>
      <div id="reserve-form-section" className="max-w-2xl mx-auto px-6 sm:px-10 pb-20">
        <h3 className="text-lg font-bold tracking-widest mb-6 text-white">BOOK A TABLE</h3>
        <ReserveForm selectedTable={selectedTable} eventId={activeEventId} eventDate={eventDate} onTableConflict={handleTableConflict} onDatePick={!activeEventId ? handleDatePick : undefined} apiUrl={apiUrl} />
      </div>
    </div>
  );
}
