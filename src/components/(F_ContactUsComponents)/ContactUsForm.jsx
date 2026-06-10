"use client";
import { useActionState } from "react";
import action from "@/app/actions/actionContactUs";
import Btn from "@/components/(H_GlobalComponents)/Btn";
import { IoCheckmarkCircle } from "react-icons/io5";

const inputBase = "w-full bg-transparent border border-white rounded-sm text-white text-sm tracking-wider px-4 py-4 outline-none transition-colors duration-200 placeholder-white/30 focus:border-nightclub-pink";
const inputErr = "w-full bg-transparent border border-nightclub-pink rounded-sm text-white text-sm tracking-wider px-4 py-4 outline-none transition-colors duration-200 placeholder-white/30";

const ContactUsForm = () => {
  const [state, resAction, isPending] = useActionState(action, {
    message: "",
  });

  return (
    <div className="flex justify-center items-center">
      {state?.success && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="bg-black border border-gray-500 rounded-lg p-10 max-w-sm w-full flex flex-col items-center text-center shadow-2xl">
            <IoCheckmarkCircle className="text-nightclub-pink text-6xl mb-5" />
            <h3 className="text-white font-bold text-xl tracking-widest mb-3 uppercase">Message Sent</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">{state.message}</p>
            <button onClick={() => window.location.reload()} className="border border-gray-500 text-gray-300 text-[11px] tracking-[0.25em] px-8 py-3 uppercase hover:border-nightclub-pink hover:text-nightclub-pink transition-colors">
              OK
            </button>
          </div>
        </div>
      )}

      <form action={resAction} className="flex flex-col gap-3 mb-6 w-full max-w-lg px-4 sm:px-6">
        <div className="flex flex-col gap-1">
          <input name="name" className={state?.errors?.name ? inputErr : inputBase} type="text" placeholder="Your Name" />
          {state?.errors?.name && (
            <span className="text-nightclub-pink text-[11px]" role="alert">
              {state.errors.name}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input name="email" className={state?.errors?.email ? inputErr : inputBase} type="email" placeholder="Your Email" />
          {state?.errors?.email && (
            <span className="text-nightclub-pink text-[11px]" role="alert">
              {state.errors.email}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <textarea name="message" className={`${state?.errors?.message ? inputErr : inputBase} resize-y min-h-80`} placeholder="Your Message" />
          {state?.errors?.message && (
            <span className="text-nightclub-pink text-[11px]" role="alert">
              {state.errors.message}
            </span>
          )}
        </div>
        <div className="self-end [&_.relative.flex.h-px]:w-[300%]">
          <Btn type="submit" label={isPending ? "SENDING..." : "SEND"} disabled={isPending} className="px-10" />
        </div>
      </form>
    </div>
  );
};

export default ContactUsForm;
