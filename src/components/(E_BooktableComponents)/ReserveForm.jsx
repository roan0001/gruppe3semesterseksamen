"use client";
import { useState, useEffect } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import Btn from "@/components/(H_GlobalComponents)/Btn";

const inputBase = "bg-transparent border border-white text-white placeholder:text-gray-500 text-[13px] font-sans px-4 py-3 outline-none w-full transition-colors focus:border-white/60";
const inputErr = "bg-transparent border border-nightclub-pink text-white placeholder:text-gray-500 text-[13px] font-sans px-4 py-3 outline-none w-full";

export default function ReserveForm({ selectedTable, eventId, eventDate, onTableConflict, onDatePick, apiUrl }) {
  const [fields, setFields] = useState({ name: "", email: "", table: "", guests: "", date: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reservedTable, setReservedTable] = useState(null);
  const [rootError, setRootError] = useState(null);

  useEffect(() => {
    if (selectedTable !== null && selectedTable !== undefined) {
      setFields((prev) => ({ ...prev, table: String(selectedTable) }));
    }
  }, [selectedTable]);

  const set = (field) => (e) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
    if (field === "date") onDatePick?.(e.target.value);
  };

  const validate = () => {
    const e = {};
    if (!fields.name.trim()) e.name = "Name is required";
    else if (fields.name.trim().length < 2) e.name = "Name must be at least 2 characters";
    else if (!/^[a-zA-ZæøåÆØÅ\s'-]+$/.test(fields.name)) e.name = "Name can only contain letters";

    if (!fields.email.trim()) e.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(fields.email)) e.email = "Please enter a valid email";

    if (!fields.table) e.table = "Table number is required";
    else if (Number(fields.table) < 1 || Number(fields.table) > 15) e.table = "Table must be between 1 and 15";

    if (!fields.guests) e.guests = "Number of guests is required";
    else if (Number(fields.guests) < 1) e.guests = "There must be at least 1 guest";
    else if (Number(fields.guests) > 20) e.guests = "Maximum 20 guests allowed";

    if (!eventDate) {
      if (!fields.date) e.date = "Date is required";
      else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(fields.date) < today) e.date = "Date cannot be in the past";
      }
    }

    if (!fields.phone.trim()) e.phone = "Phone number is required";
    else if (fields.phone.length < 8) e.phone = "Must be at least 8 digits";
    else if (fields.phone.length > 15) e.phone = "Cannot exceed 15 digits";
    else if (!/^\+?\d+$/.test(fields.phone)) e.phone = "Only digits allowed (and optional +)";

    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setRootError(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const query = eventId ? `eventId=${eventId}` : `date=${fields.date}`;
      const checkRes = await fetch(`${apiUrl}/reservations?${query}`);
      const allReservations = await checkRes.json();

      const isTableTaken = Array.isArray(allReservations) && allReservations.some((r) => parseInt(r.table) === Number(fields.table));

      if (isTableTaken) {
        setErrors({ table: "This table is already reserved. Please select another." });
        onTableConflict?.(Number(fields.table));
        setIsSubmitting(false);
        return;
      }
    } catch {}

    const apiData = {
      name: fields.name,
      email: fields.email,
      table: Number(fields.table),
      guests: Number(fields.guests),
      date: eventDate ?? fields.date,
      phone: fields.phone,
      ...(eventId && { eventId }),
    };

    const res = await fetch(`${apiUrl}/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiData),
    });

    if (res.ok) {
      setReservedTable(fields.table);
      setShowModal(true);
    } else {
      setRootError("Something went wrong. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="bg-black border border-white rounded-lg p-10 max-w-sm w-full flex flex-col items-center text-center shadow-2xl">
            <IoCheckmarkCircle className="text-nightclub-pink text-6xl mb-5" />
            <h3 className="text-white font-bold text-xl tracking-widest mb-3 uppercase">Reservation Confirmed</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Table {reservedTable} has been reserved.
              <br />
              We look forward to seeing you!
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                window.location.reload();
              }}
              className="border border-white text-gray-300 text-[11px] tracking-[0.25em] px-8 py-3 uppercase hover:border-nightclub-pink hover:text-nightclub-pink transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      {rootError && <div className="mb-5 px-4 py-3 border border-nightclub-pink bg-nightclub-pink/20 rounded text-nightclub-pink text-[12px]">✗ {rootError}</div>}

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" noValidate>
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="reserve-name" className="sr-only">
            Your Name
          </label>
          <input id="reserve-name" type="text" placeholder="Your Name" value={fields.name} onChange={set("name")} className={errors.name ? inputErr : inputBase} />
          {errors.name && (
            <span className="text-nightclub-pink text-[11px]" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="reserve-email" className="sr-only">
            Your Email
          </label>
          <input id="reserve-email" type="email" placeholder="Your Email" value={fields.email} onChange={set("email")} className={errors.email ? inputErr : inputBase} />
          {errors.email && (
            <span className="text-nightclub-pink text-[11px]" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        {/* Table */}
        <div className="flex flex-col gap-1">
          <label htmlFor="reserve-table" className="sr-only">
            Table Number
          </label>
          <input id="reserve-table" type="number" placeholder="Table Number" value={fields.table} readOnly={!!selectedTable} onChange={set("table")} className={`${errors.table ? inputErr : inputBase} ${selectedTable ? "text-nightclub-pink cursor-default" : ""}`} />
          {errors.table && (
            <span className="text-nightclub-pink text-[11px]" role="alert">
              {errors.table}
            </span>
          )}
        </div>

        {/* Guests */}
        <div className="flex flex-col gap-1">
          <label htmlFor="reserve-guests" className="sr-only">
            Number of Guests
          </label>
          <input id="reserve-guests" type="number" placeholder="Number of Guests" value={fields.guests} onChange={set("guests")} min={1} max={20} className={errors.guests ? inputErr : inputBase} />
          {errors.guests && (
            <span className="text-nightclub-pink text-[11px]" role="alert">
              {errors.guests}
            </span>
          )}
        </div>

        {/* Date */}
        {!eventDate ? (
          <div className="flex flex-col gap-1">
            <label htmlFor="reserve-date" className="sr-only">
              Date
            </label>
            <input id="reserve-date" type="date" value={fields.date} onChange={set("date")} min={new Date().toISOString().split("T")[0]} className={errors.date ? inputErr : inputBase} style={{ colorScheme: "dark" }} />
            {errors.date && (
              <span className="text-nightclub-pink text-[11px]" role="alert">
                {errors.date}
              </span>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <label htmlFor="reserve-date-readonly" className="sr-only">
              Event Date
            </label>
            <input
              id="reserve-date-readonly"
              type="text"
              readOnly
              value={new Date(eventDate).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              className={`${inputBase} text-nightclub-pink cursor-default`}
            />
          </div>
        )}

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label htmlFor="reserve-phone" className="sr-only">
            Your Phone Number
          </label>
          <input id="reserve-phone" type="tel" placeholder="Your Phone Number" value={fields.phone} onChange={set("phone")} className={errors.phone ? inputErr : inputBase} />
          {errors.phone && (
            <span className="text-nightclub-pink text-[11px]" role="alert">
              {errors.phone}
            </span>
          )}
        </div>

        {/* Submit */}
        <div className="col-span-1 md:col-span-2 flex justify-end mt-2">
          <Btn type="submit" disabled={isSubmitting}>
            {isSubmitting ? "RESERVING..." : "RESERVE"}
          </Btn>
        </div>
      </form>
    </>
  );
}
