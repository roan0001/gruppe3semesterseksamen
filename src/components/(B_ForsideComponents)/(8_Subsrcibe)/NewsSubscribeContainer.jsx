"use client";

import { useState } from "react";
import { z } from "zod";
import Button from "@/components/(H_GlobalComponents)/Btn";

const emailSchema = z.object({
  email: z.string().min(1, "Please enter a email").email("Please enter a valid email"),
});

const NewsSubscriberContainer = ({ children, className = "" }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async () => {
    const result = emailSchema.safeParse({ email });

    if (!result.success) {
      setError(result.error.issues[0]?.message || "Invalid email");
      return;
    }

    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else if (res.status === 409) {
        setStatus("conflict");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={`flex items-center justify-center px-8 py-15 pb-20 bg-black max-w-[2200px]  text-white   ${className}`}>
      <div className="text-lg uppercase font-normal text-white text-center mb-[0.6rem] ">
        <div className="mb-2">{children}</div>
        <p className="text-xs sm:text-sm text-white text-center mb-8 normal-case leading-[1.6]">
          Subscribe to our newsletter and never miss an <span className="text-nightclub-pink">Event</span>
        </p>

        {status === "success" && <p className="text-green-400 text-sm text-center mb-4">Successfully signed up for newsletter!</p>}

        {status === "conflict" && <p className="text-nightclub-pink text-sm text-center mb-4">This email is already signed up for newsletter.</p>}

        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setStatus(null);
              }}
              className="border-b border-white w-full sm:w-72 text-white placeholder:text-white/50 bg-transparent px-4 py-3 hover:border-nightclub-pink focus:outline-none text-sm"
            />
            <Button label="SUBSCRIBE" onClick={handleSubmit} className="inline-flex m-6 " />
          </div>

          {error && (
            <p className="text-red-400 text-xs ml-4" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsSubscriberContainer;
