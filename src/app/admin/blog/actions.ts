'use server';

import { z } from 'zod';
import { blogPosts } from '@/lib/data'; // Using mock data
import { revalidatePath } from 'next/cache';

// This would interact with Firestore in a real app
// import { db } from '@/lib/firebase';
// import { doc, setDoc, updateDoc, collection } from 'firebase/firestore';

const blogPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5),
  content: z.string().min(50),
  slug: z.string().min(5).regex(/^[a-z0-9-]+$/),
  imageId: z.string().optional(),
});

export async function createOrUpdatePost(
  data: z.infer<typeof blogPostSchema>
) {
    // Here you would check if the user is an admin
    // const { user, isAdmin } = useAuth();
    // if (!isAdmin) { return { success: false, message: 'Unauthorized' }; }

    const validation = blogPostSchema.safeParse(data);
    if (!validation.success) {
        return { success: false, message: 'Invalid data.' };
    }
    
    const { id, title, content, slug, imageId } = validation.data;
    
    // In a real app, you'd do this with Firestore:
    try {
        if (id) {
            // Update existing post
            console.log("Updating post:", { id, ...validation.data });
            const postIndex = blogPosts.findIndex(p => p.id === id);
            if (postIndex > -1) {
                blogPosts[postIndex] = { ...blogPosts[postIndex], title, content, slug, imageId: imageId || blogPosts[postIndex].imageId };
            }
        } else {
            // Create new post
            const newId = (blogPosts.length + 1).toString();
            console.log("Creating new post:", { id: newId, ...validation.data });
            blogPosts.push({
                id: newId,
                title,
                content,
                slug,
                imageId: imageId || 'blog-community-gardens',
                author: "Admin User", // Should come from session
                authorId: "admin001", // Should come from session
                createdAt: new Date().toISOString(),
            });
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
