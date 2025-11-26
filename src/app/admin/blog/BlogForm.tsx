'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { createOrUpdatePost } from './actions';
import type { BlogPost } from '@/lib/types';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const blogPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  content: z.string().min(50, 'Content must be at least 50 characters.'),
  slug: z.string().min(5, 'Slug must be at least 5 characters.').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens.'),
  imageId: z.string().optional(),
});

type BlogFormProps = {
  post?: BlogPost;
};

export default function BlogForm({ post }: BlogFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof blogPostSchema>>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      slug: post?.slug || '',
      imageId: post?.imageId || 'blog-community-gardens', // default placeholder
    },
  });
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const title = e.target.value;
      const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      form.setValue('title', title);
      form.setValue('slug', slug);
  }

  async function onSubmit(values: z.infer<typeof blogPostSchema>) {
    setLoading(true);
    try {
        const result = await createOrUpdatePost({ ...values, id: post?.id });
        if(result.success) {
            toast({
                title: post ? "Post Updated" : "Post Created",
                description: `Your post "${values.title}" has been saved.`,
            });
            router.push('/admin/blog');
            router.refresh();
        } else {
            throw new Error(result.message);
        }
    } catch (error: any) {
        toast({
            title: "Error",
            description: error.message || "Something went wrong.",
            variant: "destructive",
        });
    } finally {
        setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Title</FormLabel>
                  <FormControl>
                    <Input placeholder="A catchy title for your post" {...field} onChange={handleTitleChange}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="a-unique-url-slug" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the unique URL for your post. It's auto-generated from the title but can be customized.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog post here..."
                      className="min-h-[300px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {post ? 'Update Post' : 'Create Post'}
                </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
