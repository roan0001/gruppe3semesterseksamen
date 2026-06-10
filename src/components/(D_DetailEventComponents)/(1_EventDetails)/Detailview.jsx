import Image from "next/image";
import Button from "@/components/(H_GlobalComponents)/Btn";
import CommentList from "@/components/(D_DetailEventComponents)/(2_Comments)/CommentList";
import LeaveComment from "@/components/(D_DetailEventComponents)/(2_Comments)/LeaveComment";

const Detailview = async ({ slug }) => {
  const eventRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${slug}`, { cache: "no-store" });
  let event = await eventRes.json().catch(() => null);

  if (!event || !event.id) {
    return <p className="text-white">Event ikke fundet</p>;
  }

  const commentsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments?eventId=${event.id}`, { cache: "no-store" });
  let comments = await commentsRes.json().catch(() => null);
  if (!Array.isArray(comments)) comments = [];

  return (
    <article className="text-white" style={{ backgroundImage: "url('/backgrounds/pattern_bg.jpg')" }}>
      <div className="relative w-full h-64 lg:h-[500px]">{event.heroAsset?.url && <Image src={`${process.env.NEXT_PUBLIC_API_URL}${event.heroAsset.url}`} alt={event.heroAsset?.alt || "Event image"} fill className="object-cover brightness-75" />}</div>

      <div className="container-base py-12 px-6">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-widest mb-2">{event.title}</h1>
        <p className="text-nightclub-pink text-sm tracking-widest mb-8">
          {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {new Date(event.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          <span className="text-white ml-2">| {event.location}</span>
        </p>

        <div className="max-w-[700px] justify-between flex flex-col md:flex-row  mb-12 gap-12">
          <div>
            <p className="text-nightclub-pink text-lg tracking-widest uppercase mb-2">Lineup</p>
            {event.lineup.map((artist, index) => (
              <p key={index} className="text-gray-300 text-sm">
                {artist}
              </p>
            ))}
          </div>

          <div>
            <p className="text-nightclub-pink text-lg tracking-widest uppercase mb-2">Schedule</p>
            {event.schedule.map((item, index) => (
              <p key={index} className="text-gray-300 text-sm">
                {new Date(`1970-01-01T${item.time}`).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })} — {item.label}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-2/3">
            {event.content.split("\n").map(
              (paragraph, index) =>
                paragraph.trim() && (
                  <p key={index} className="text-gray-300 text-sm leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ),
            )}

            <div className="flex flex-row justify-between gap-4 mt-6">
              <div className="px-10">
                <Button href="/Event" label="BACK TO EVENTS" />
              </div>
              <div className="px-5">
                <Button href={`/BookTable?eventId=${event.id}`} label="BOOK NOW" />
              </div>
            </div>
          </div>

          <div className="md:w-1/3 flex flex-col gap-6">
            <div>
              <p className="text-nightclub-pink text-xs tracking-widest uppercase mb-2">Location</p>
              <p className="text-gray-300 text-sm">{event.location}</p>
            </div>
            <div>
              <p className="text-nightclub-pink text-xs tracking-widest uppercase mb-2">Opening Hours</p>
              <p className="text-gray-300 text-sm">Doors: {new Date(event.doorsOpen).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</p>
              <p className="text-gray-300 text-sm">Event start: {new Date(event.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</p>
            </div>
            <div>
              <p className="text-nightclub-pink text-xs tracking-widest uppercase mb-2">Price</p>
              <p className="text-gray-300 text-sm">{event.price}</p>
            </div>
            <div>
              <p className="text-nightclub-pink text-xs tracking-widest uppercase mb-2">Category</p>
              <p className="text-gray-300 text-sm">{event.category}</p>
            </div>
            <div>
              <p className="text-nightclub-pink text-xs tracking-widest uppercase mb-1">Age limit</p>
              <p className="text-gray-300 text-sm">To enter: {event.ageLimit}</p>
            </div>
          </div>
        </div>

        <div className="py-12">
          <CommentList initialComments={comments} apiUrl={process.env.NEXT_PUBLIC_API_URL} />

          <div className="mt-10">
            <h3 className="text-lg font-bold tracking-widest mb-6">LEAVE A COMMENT</h3>
            <LeaveComment eventId={event.id} apiUrl={process.env.NEXT_PUBLIC_API_URL} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Detailview;
