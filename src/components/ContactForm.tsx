"use client";

import { useState } from "react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-[var(--card-bg)] p-12 rounded-2xl border border-[var(--border)] text-center shadow-lg">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-400 mb-6">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">Transmission Sent!</h3>
        <p className="text-[var(--muted)] mb-8">Thank you for reaching out. We will get back to you at lightspeed.</p>
        <button
          onClick={() => setSuccess(false)}
          className="text-[var(--accent)] hover:text-[var(--accent-hover)] font-semibold transition-colors"
        >
          Send another transmission
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-[var(--card-bg)] p-8 md:p-12 rounded-2xl border border-[var(--border)] shadow-xl">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[var(--muted)] mb-2">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
          placeholder="Commander Shepard"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--muted)] mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
          placeholder="shepard@normandy.space"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--muted)] mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] resize-none transition-all"
          placeholder="What's on your mind?"
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-8 bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-50 text-white font-bold rounded-xl transition-colors duration-200 shadow-lg shadow-[var(--accent)]/20"
      >
        {isSubmitting ? "Transmitting..." : "Send Transmission"}
      </button>
    </form>
  );
}
