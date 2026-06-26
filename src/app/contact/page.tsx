import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Astrobyte",
  description: "Get in touch with the Astrobyte team.",
};

export default function ContactPage() {
  return (
    <article className="max-w-2xl mx-auto w-full py-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-6 tracking-tight">
        Contact Us
      </h1>
      <p className="text-lg text-[var(--muted)] mb-10">
        Have a question about the cosmos, feedback on an article, or want to collaborate? Transmit a message to the Astrobyte team and we'll respond at lightspeed.
      </p>

      <ContactForm />
    </article>
  );
}
