import BlogForm from "../BlogForm";

export default function NewBlogPostPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Create New Blog Post</h1>
                <p className="text-muted-foreground">Fill in the details below to publish a new article.</p>
            </div>
            <BlogForm />
        </div>
    )
}
