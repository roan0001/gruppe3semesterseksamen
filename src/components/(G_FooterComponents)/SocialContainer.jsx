import { FaTwitter } from "react-icons/fa";

const tweets = [
  { id: 1, text: "It is a long established fact that a reader will be distracted by the readable...", time: "5 hours ago" },
  { id: 2, text: "Experience the electrifying beats of DJ Kai at Club Nova. Doors open at 10 PM, and the rythm never stops. Get ready for a night of unforgettable music!", time: "5 hours ago" },
];

export default function SocialContainer() {
  return (
    <div>
      <p className="mb-14 3xl:text-base font-bold uppercase tracking-[0.3em] text-nightclub-pink">Recent Tweets</p>
      {tweets.map((tweet) => (
        <div key={tweet.id} className="flex gap-3 mb-4">
          <FaTwitter className="mt-1 shrink-0 text-nightclub-pink" size={16} />
          <div>
            <p className="text-white text-sm font-normal leading-snug">{tweet.text}</p>
            <span className="text-nightclub-pink text-xs">{tweet.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
