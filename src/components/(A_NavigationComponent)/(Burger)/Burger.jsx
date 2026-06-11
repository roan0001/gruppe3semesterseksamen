"use client";
import BurgerNavListe from "@/components/(A_NavigationComponent)/(Burger)/BurgerNavListe";

export default function Burger() {
  return (
    <>
      <button popoverTarget="mypopover" aria-label="Open navigation menu" aria-expanded="false" className="flex flex-col justify-center items-center gap-1.5 z-50">
        <span className="bg-white block h-0.5 w-6 rounded"></span>
        <span className="bg-white block h-0.5 w-6 rounded"></span>
        <span className="bg-white block h-0.5 w-6 rounded"></span>
      </button>

      <nav popover="auto" id="mypopover" className="fixed inset-0 bg-black/90 w-full h-full border-none p-0 m-0 z-100">
        <button popoverTarget="mypopover" popoverTargetAction="hide" aria-label="Close navigation menu" className="absolute top-10 right-10 text-white text-6xl hover:text-nightclub-pink transition">
          &times;
        </button>

        <div className="flex flex-col items-center justify-center w-full h-full">
          <BurgerNavListe />
        </div>
      </nav>
    </>
  );
}
