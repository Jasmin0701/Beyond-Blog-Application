import { Metadata } from "next";
import { Telescope, Orbit, Rocket, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Astrobyte",
  description: "Learn more about the mission of Astrobyte.",
};

const features = [
  { name: "Observation", description: "Analyzing the cosmos through the lens of modern astrophysics.", icon: Telescope },
  { name: "Exploration", description: "Charting the paths of new missions and exoplanet discoveries.", icon: Orbit },
  { name: "Innovation", description: "Highlighting the engineering that pushes humanity into the stars.", icon: Rocket },
  { name: "Wonder", description: "Sharing the beauty and mystery of the universe with our community.", icon: Sparkles },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto w-full py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-20 relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--accent)]/20 via-[var(--background)] to-[var(--background)] blur-3xl"></div>
        <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-6 tracking-tighter">
          Astrobyte
        </h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          Where curiosity meets the cosmos. We are dedicated to sharing the incredible stories of space exploration, astronomy, and the universe.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {features.map((feature) => (
          <div key={feature.name} className="group relative p-8 bg-[var(--card-bg)] rounded-3xl border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <feature.icon className="w-10 h-10 text-[var(--accent)] mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3 tracking-tight">{feature.name}</h3>
            <p className="text-[var(--muted)] leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Story Section */}
      <article className="max-w-3xl mx-auto prose dark:prose-invert prose-lg prose-p:text-[var(--muted)] prose-p:leading-loose prose-headings:text-[var(--foreground)] prose-a:text-[var(--accent)]">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p>
          We believe that understanding the universe is humanity's greatest endeavor. By sharing the latest discoveries from the James Webb Space Telescope, tracking the progress of Mars colonization, and exploring theoretical physics, we aim to inspire a new generation of explorers.
        </p>
        <p>
          Astrobyte was created as a platform to distill complex astronomical concepts into beautiful, accessible stories. Join us as we look up at the stars and wonder what lies beyond.
        </p>
      </article>
    </div>
  );
}
