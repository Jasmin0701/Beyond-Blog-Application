import { Metadata } from "next";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Beyond Blog | Insights & Ideas",
  description: "Discover the latest articles on the universe, exploration, and the future.",
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const searchTopic = typeof resolvedSearchParams.topic === 'string' ? resolvedSearchParams.topic : undefined;
  
  const prisma = (await import("@/lib/prisma")).default;
  
  // Fetch topics directly from tags (for pills)
  const postsForTags = await prisma.post.findMany({ select: { tags: true } });
  const allTags = postsForTags.flatMap(post => post.tags.split(',').map(tag => tag.trim()).filter(Boolean));
  const uniqueTopics = Array.from(new Set(allTags)).slice(0, 15); // Show top 15 tags
  // Fetch initial posts based on the topic to pass to the client
  let whereClause: any = undefined;
  if (searchTopic && searchTopic !== 'All') {
    whereClause = { tags: { contains: searchTopic } };
  }
  const initialPostsData = await prisma.post.findMany({
    orderBy: { date: 'desc' },
    where: whereClause
  });
  
  // Format dates and tags for the client
  const initialPosts = initialPostsData.map(post => ({
    ...post,
    tags: post.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    date: post.date.toISOString(),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }));
  
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 w-full max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--foreground)] tracking-tight mb-6">
          Insights & Ideas
        </h1>
        <p className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Discover the latest articles on space exploration, technology, and the future of our universe.
        </p>
      </section>

      {/* Topic Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-16 px-4">
        <a 
          href="/"
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
            !searchTopic || searchTopic === 'All'
              ? 'bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20' 
              : 'bg-[var(--card-bg)] text-[var(--muted)] border border-[var(--border)] hover:bg-[var(--border)] hover:text-white'
          }`}
        >
          All
        </a>
        {uniqueTopics.map((topic, i) => (
          <a
            key={i}
            href={`/?topic=${encodeURIComponent(topic)}`}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              searchTopic === topic
                ? 'bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20'
                : 'bg-[var(--card-bg)] text-[var(--muted)] border border-[var(--border)] hover:bg-[var(--border)] hover:text-white'
            }`}
          >
            {topic}
          </a>
        ))}
      </div>

      <div className="w-full">
        <BlogList initialPosts={initialPosts} searchTopic={searchTopic} />
      </div>
    </div>
  );
}
