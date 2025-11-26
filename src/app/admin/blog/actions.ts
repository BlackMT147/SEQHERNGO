'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, updateDoc, collection, serverTimestamp, getDoc } from 'firebase/firestore';
import { headers } from 'next/headers';
import type { AppUser } from '@/lib/types';
import { onAuthStateChanged } from 'firebase/auth';


const blogPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5),
  content: z.string().min(50),
  slug: z.string().min(5).regex(/^[a-z0-9-]+$/),
  imageId: z.string().optional(),
});

async function getCurrentUser(): Promise<AppUser | null> {
    // This is a workaround for getting the current user in a server action.
    // In a real app, you would have a more robust session management solution.
    // For now, we assume this action is only called by an authenticated user.
    // A proper solution would involve session cookies or tokens.
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    resolve({ ...user, ...userDoc.data() } as AppUser);
                } else {
                    resolve(null);
                }
            } else {
                resolve(null);
            }
            unsubscribe();
        });
    });
}


export async function createOrUpdatePost(
  data: z.infer<typeof blogPostSchema>
) {
    const user = await getCurrentUser();

    // In a real app, we would get the user from the session
    // For now, we will simulate an admin user check
    if (!user || user.role !== 'admin') { 
        return { success: false, message: 'Unauthorized' }; 
    }

    const validation = blogPostSchema.safeParse(data);
    if (!validation.success) {
        return { success: false, message: 'Invalid data.' };
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
            console.log("Updating post:", { id, ...validation.data });
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
            console.log("Creating new post:", { id: newPostRef.id, ...validation.data });
        }
        
        // Revalidate paths to show updated content
        revalidatePath('/blog');
        revalidatePath(`/blog/${slug}`);
        revalidatePath('/admin/blog');
        
        return { success: true, message: 'Post saved successfully' };

    } catch (error: any) {
        return { success: false, message: error.message || 'Failed to save post.' };
    }
}
