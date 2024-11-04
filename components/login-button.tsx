
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function LoginButton() {
	return (
		<a href="/api/auth/login">
			<Button className="flex items-center gap-2 mx-5">
				<LogIn className="w-4 h-4" />
				<span className="hidden sm:inline">Login</span>
			</Button>
		</a>
	);
}
