import { notFound } from "next/navigation";
import { BlogEditor } from "@/components/BlogEditor";
import { getPackageRecord, getPackages, getPostById, getPosts } from "@/lib/content-store";

export default async function EditBlogPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) { const post = await getPostById((await params).id); if (!post) notFound(); return <BlogEditor post={post} posts={await getPosts(true)} packages={await getPackages(true)} saved={(await searchParams).saved === "1"} />; }
