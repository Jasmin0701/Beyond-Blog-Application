import BlogList from "@/components/BlogList";
import prisma from "@/lib/prisma";

async function getInitialPosts() {
  const posts = await prisma.post.findMany({
    orderBy: { date: 'desc' },
  });
  
  return posts.map(post => ({
    ...post,
    tags: post.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    date: post.date.toISOString(),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }));
}

export default async function Home() {
  const initialPosts = await getInitialPosts();
  const allTags = initialPosts.flatMap(post => post.tags);
  const uniqueTopics = ["All", ...Array.from(new Set(allTags))];

  return (
    <div className="flex flex-col gap-12">
      <section className="text-center py-12 sm:py-20">
        <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight">
          Insights & Ideas
        </h2>
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
          Discover the latest articles on web development, design systems, and the future of the internet.
        </p>
      </section>

      <section>
        <BlogList initialPosts={initialPosts} topics={uniqueTopics} />
      </section>
    </div>
  );
}
