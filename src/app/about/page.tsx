import { Metadata } from "next";
import { Code2, PenTool, Rocket, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Beyond Blog",
  description: "Learn more about the team behind Beyond Blog.",
};

const features = [
  { name: "Engineering", description: "Built with bleeding-edge Next.js 14 and React Server Components.", icon: Code2 },
  { name: "Design", description: "Crafted with Tailwind CSS for pixel-perfect, responsive layouts.", icon: PenTool },
  { name: "Performance", description: "Optimized for speed with advanced caching and local SQLite database.", icon: Rocket },
  { name: "Community", description: "A growing ecosystem of passionate developers sharing knowledge.", icon: Users },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto w-full py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-20 relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-slate-950 to-slate-950 blur-3xl"></div>
        <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-6 tracking-tighter">
          Beyond Blog
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Where modern design meets cutting-edge engineering. We are redefining the way developers share their stories with the world.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {features.map((feature) => (
          <div key={feature.name} className="group relative p-8 bg-slate-900/50 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <feature.icon className="w-10 h-10 text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{feature.name}</h3>
            <p className="text-slate-400 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Story Section */}
      <article className="max-w-3xl mx-auto prose prose-invert prose-lg prose-p:text-slate-300 prose-p:leading-loose prose-headings:text-white prose-a:text-purple-400">
        <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
        <p>
          We believe that the best web experiences are built at the intersection of beautiful design and robust engineering. That's why we focus on modern tools like <strong>Next.js</strong>, <strong>React</strong>, and <strong>Tailwind CSS</strong>, while always keeping an eye on user experience and accessibility.
        </p>
        <p>
          Beyond Blog was created as a playground for evaluating frontend proficiency, but it has evolved into a fully functional platform powered by Prisma and SQLite. It proves that you can build highly performant, server-side rendered applications without sacrificing aesthetics.
        </p>
      </article>
    </div>
  );
}
