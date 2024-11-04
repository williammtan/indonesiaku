import { createClient } from "@/lib/supabase/server";
import LoginButton from "./login-button";
import ProfileMenu from "./profile-menu";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function AuthMenu() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
    let metadata = user?.user_metadata
	return (
		<nav className="flex items-center">
			{user ? (
				<ProfileMenu username={metadata?.username} email={user.email} />
			) : (
				<div className="flex gap-2 mx-6">
					<Button asChild size="sm" variant={"outline"}>
						<Link href="/sign-in">Sign in</Link>
					</Button>
					<Button asChild size="sm" variant={"default"}>
						<Link href="/sign-up">Sign up</Link>
					</Button>
				</div>
			)}
		</nav>
	);
}
