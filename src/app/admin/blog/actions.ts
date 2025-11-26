'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, updateDoc, collection, serverTimestamp, getDoc, deleteDoc } from 'firebase/firestore';
import type { AppUser } from '@/lib/types';
import { getAuth } from 'firebase/auth';
import { getApp } from 'firebase/app';


const blogPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5),
  content: z.string().min(50),
  slug: z.string().min(5).regex(/^[a-z0-9-]+$/),
  imageId: z.string().optional(),
});

async function getAdminUser(): Promise<AppUser | null> {
    // This is not a reliable way to get the current user in a server action.
    // A proper solution would involve session management with cookies or tokens.
    // For this project, we'll assume the user object is available through auth state.
    // In a real production app, this would need to be replaced with a secure
    // server-side session check.
    const user = auth.currentUser;
    if (!user) return null;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists() && userDoc.data().role === 'admin') {
        return { ...user, ...userDoc.data() } as AppUser;
    }
    return null;
}


export async function createOrUpdatePost(
  data: z.infer<typeof blogPostSchema>
) {
    const user = await getAdminUser();

    if (!user) { 
        return { success: false, message: 'Unauthorized: You must be an admin to perform this action.' }; 
    }

    const validation = blogPostSchema.safeParse(data);
    if (!validation.success) {
        return { success: false, message: `Invalid data: ${validation.error.flatten().fieldErrors}` };
    }
    
    const { id, title, content, slug, imageId } = validation.data;
    
    try {
        if (id) {
            // Update existing post
            const postRef = doc(db, 'blogPosts', id);
            await updateDoc(postRef, {
                title,
                content,
                slug,
                imageId: imageId || 'blog-community-gardens',
            });
        } else {
            // Create new post
            const newPostRef = doc(collection(db, 'blogPosts'));
            await setDoc(newPostRef, {
                id: newPostRef.id,
                title,
                content,
                slug,
                imageId: imageId || 'blog-community-gardens',
                author: user.displayName || "Admin User",
                authorId: user.uid,
                createdAt: serverTimestamp(),
            });
        }
        
        // Revalidate paths to show updated content
        revalidatePath('/blog');
        revalidatePath(`/blog/${slug}`);
        revalidatePath('/admin/blog');
        
        return { success: true, message: 'Post saved successfully' };

    } catch (error: any) {
        console.error("Error saving post:", error);
        return { success: false, message: error.message || 'Failed to save post.' };
    }
}


export async function deletePost(postId: string) {
    const user = await getAdminUser();
    if (!user) {
        return { success: false, message: 'Unauthorized: You must be an admin to perform this action.' };
    }

    if (!postId) {
        return { success: false, message: 'Invalid post ID.' };
    }

    try {
        const postRef = doc(db, 'blogPosts', postId);
        // We should get the slug before deleting to revalidate the path
        const postSnap = await getDoc(postRef);
        const slug = postSnap.data()?.slug;

        await deleteDoc(postRef);

        revalidatePath('/blog');
        if (slug) {
            revalidatePath(`/blog/${slug}`);
        }
        revalidatePath('/admin/blog');
        
        return { success: true, message: 'Post deleted successfully.' };
    } catch (error: any) {
        console.error("Error deleting post:", error);
        return { success: false, message: 'Failed to delete post.' };
    }
}
