import PostCard from "@/components/post-card";
import { createClient } from "@/lib/supabase/server";

interface Profile {
	id: string;
	username: string;
}

interface PostData {
	id: string;
	title: string;
	content: string;
	created_at: string;
	views: number;
	profiles: Profile;
}

export const fetchCache = 'force-no-store';
export const revalidate = 60

export default async function PostsPage() {
	const supabase = await createClient();
	let { data: posts, error } = await supabase
		.from("posts")
		.select(
			`
      id, title, created_at, content, views,
      profiles (
        id,
        username
      )
    `
		)
		.returns<PostData[]>();
	// .gte('created_at', new Date().toISOString());

	if (error) {
		throw error;
	}

	if (!posts) {
		return <div>No posts found</div>;
		// Or alternatively: notFound();
	}

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
					}}
				/>
			))}
		</div>
	);
}
