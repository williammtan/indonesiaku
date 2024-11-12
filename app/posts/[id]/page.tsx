import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation"; // Import for handling missing posts

interface Profile {
	id: string;
	username: string;
}

interface Post {
	id: string;
	title: string;
	created_at: string;
	content: string;
	views: number;
	profiles: Profile;
}

export default async function PostView({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const supabase = await createClient();
	const { data: posts, error } = await supabase
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
		.eq("id", (await params).id)
		.returns<Post[]>();

	// Handle errors and missing posts
	if (error) {
		throw error;
	}

	if (!posts || posts.length === 0) {
		notFound();
	}

	const post = posts[0];
	const date = new Date(post.created_at);
	const formattedDate = date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<article className="space-y-8">
				<div className="space-y-4">
					<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
						{post.title}
					</h1>
					<div className="flex items-center space-x-4">
						<Avatar>
							<AvatarImage
								src="/placeholder.svg?height=40&width=40"
								alt="Author"
							/>
							<AvatarFallback>
								{post.profiles.username.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div>
							<p className="text-sm font-medium">
								{post.profiles.username}
							</p>
							<p className="text-sm text-muted-foreground">
								Published on {formattedDate}
							</p>
						</div>
					</div>
					<p dangerouslySetInnerHTML={{ __html: post.content }}></p>
				</div>
			</article>
		</div>
	);
}
