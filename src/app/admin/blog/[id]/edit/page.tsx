import { notFound } from 'next/navigation';
import BlogForm from "../../BlogForm";
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { BlogPost } from '@/lib/types';
import { firestore as adminDb } from '@/lib/firebaseAdmin';





async function getPost(id: string): Promise<BlogPost | null> {
    if (adminDb) {
        const d = await adminDb.collection('blogPosts').doc(id).get();
        if (!d.exists) return null;
        const data = d.data();
        return {
            id: d.id,
            ...data,
            createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
        } as BlogPost;
    }
    if (!db) return null;
    const docRef = doc(db!, 'blogPosts', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        return {
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt.toDate().toISOString(),
        } as BlogPost;
    }
    return null;
}

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
    const post = await getPost(params.id);
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
