import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const metadata = {
  title: 'Blog | SEQHER',
  description: 'Insights, stories, and updates from the SEQHER team and community.',
};

const blogHeroImage = PlaceHolderImages.find(p => p.id === 'blog-hero');

export default function BlogPage() {
  return (
    <div>
      <section className="relative h-[40vh] min-h-[300px] w-full bg-primary/20 flex items-center justify-center">
        {blogHeroImage && (
          <Image
            src={blogHeroImage.imageUrl}
            alt={blogHeroImage.description}
            fill
            className="object-cover"
            data-ai-hint={blogHeroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">SEQHER Blog</h1>
          <p className="mt-2 max-w-2xl text-lg text-primary-foreground">
            Stories of impact, community voices, and organizational updates.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => {
              const postImage = PlaceHolderImages.find((p) => p.id === post.imageId);
              const authorAvatar = PlaceHolderImages.find(p => p.id.startsWith('avatar-'));

              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="p-0">
                      {postImage && (
                        <Image
                          src={postImage.imageUrl}
                          alt={post.title}
                          width={400}
                          height={225}
                          className="w-full h-48 object-cover"
                          data-ai-hint={postImage.imageHint}
                        />
                      )}
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <h2 className="font-headline text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                      <p className="text-muted-foreground line-clamp-3 flex-grow">{post.content}</p>
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                        <Avatar>
                          {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} />}
                          <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{post.author}</p>
                          <p className="text-xs text-muted-foreground">{format(new Date(post.createdAt), 'MMMM d, yyyy')}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
