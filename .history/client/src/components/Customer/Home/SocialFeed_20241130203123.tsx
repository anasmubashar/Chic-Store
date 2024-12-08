import { AspectRatio } from "@/components/ui/aspect-ratio";

const socialPosts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=386",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=870",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=870",
  },
];

export function SocialFeed() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-light mb-8">Follow Us @Modimal</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {socialPosts.map((post) => (
            <AspectRatio key={post.id} ratio={1}>
              <img
                src={post.image}
                alt={`Social post ${post.id}`}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              />
            </AspectRatio>
          ))}
        </div>
      </div>
    </section>
  );
}
