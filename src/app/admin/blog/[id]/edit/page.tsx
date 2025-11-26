import { blogPosts } from "@/lib/data";
import { notFound } from 'next/navigation';
import BlogForm from "../../BlogForm";

type Props = {
    params: { id: string }
}

export default function EditBlogPostPage({ params }: Props) {
    const post = blogPosts.find(p => p.id === params.id);
    if (!post) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Edit Blog Post</h1>
                <p className="text-muted-foreground">Make changes to your blog post below.</p>
            </div>
            <BlogForm post={post} />
        </div>
    )
}
