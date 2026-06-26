import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Beyond Blog",
  description: "Get in touch with the Beyond Blog team.",
};

export default function ContactPage() {
  return (
    <article className="max-w-2xl mx-auto w-full py-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
        Contact Us
      </h1>
      <p className="text-lg text-slate-300 mb-10">
        Have a question, feedback, or want to collaborate? Fill out the form below and we'll get back to you as soon as possible.
      </p>

      <ContactForm />
    </article>
  );
}
