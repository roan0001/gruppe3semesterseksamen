import Image from "next/image";
import FooterPostCards from "@/components/(G_FooterComponents)/FooterPostCards.jsx";

const FooterPost = () => {
  return (
    <div>
      <p className="mb-14 3xl:text-base font-bold uppercase tracking-[0.3em] text-nightclub-pink">Recent Posts</p>
      <FooterPostCards pic={<Image src="/contentImg/recent_post1.jpg" alt="post1" width={80} height={80} />} text={"Get ready for an epic night with DJ Anya at the The Blue Room. Doors open at 9 PM!"} date={"April 17, 2018"} />
      <FooterPostCards pic={<Image src="/contentImg/recent_post2.jpg" alt="post2" width={80} height={80} />} text={"Join us for a Retro Night with DJ Elroy at The Velvet Room. Doors open at 8 PM!"} date={"April 17, 2018"} />
    </div>
  );
};

export default FooterPost;
