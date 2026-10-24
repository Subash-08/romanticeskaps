import { BlogEditor } from "@/components/BlogEditor";
import { createEmptyPost, getPackages, getPosts } from "@/lib/content-store";

export default async function NewBlogPage() { return <BlogEditor post={createEmptyPost()} posts={await getPosts(true)} packages={await getPackages(true)} saved={false} />; }
