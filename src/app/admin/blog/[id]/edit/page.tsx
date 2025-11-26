import { notFound } from 'next/navigation';
import BlogForm from "../../BlogForm";
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { BlogPost } from '@/lib/types';


async function getPost(id: string): Promise<BlogPost | null> {
    if (!db) return null;
    const docRef = doc(db, 'blogPosts', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        return {
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? null,
        } as BlogPost;
    }
    return null;
}

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getPost(id);
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
