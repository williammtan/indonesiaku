import PostCard from "@/components/post-card";
import { createClient } from '@/lib/supabase/server';

interface Post {
	id: string;
	title: string;
	content: string;
	images?: string[];
	createdAt: Date;
	updatedAt: Date;
	views: number;

	user: {
		id: string;
		name: string;
	};
	userId: string;
}

export default async function PostsPage() {
    const supabase = await createClient();
	const { data: posts, error } = await supabase
        .from("posts")
        .select(`
            id, title, created_at, content, views,
            profiles (
                id,
                username
            )
        `)
        // .gte('created_at', new Date().toISOString());

	return (
		<div className="w-full max-w-3xl mx-auto space-y-4 p-4">
			{posts.map((post) => (
				<PostCard
					key={post.id}
					id={post.id}
					title={post.title}
					content={post.content}
					createdAt={new Date(post.created_at)}
					views={post.views}
					user={{
						name: post.profiles.username,
						avatarUrl: "/placeholder.svg",
					}} // Temporary avatar
				/>
			))}
		</div>
	);
}
