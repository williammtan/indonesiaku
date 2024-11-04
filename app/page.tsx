import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
	CardContent,
} from "@/components/ui/card";

export default function Home() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<main className="container mx-auto px-4 py-32">
				<header className="text-center mb-8">
					<h1 className="text-7xl font-bold mb-2">IndonesiaKu</h1>
					<p className="text-xl text-muted-foreground">
						Preserving Indonesia's Languages Together
					</p>
				</header>

				<div className="flex justify-center mb-16">
					<Link href="/data">
						<Button size="lg">Contribute</Button>
					</Link>
				</div>

				<section className="grid gap-8 md:grid-cols-2">
					<Card className="flex flex-col">
						<CardHeader className="pb-4">
							<CardTitle>Translator</CardTitle>
							<CardDescription>
								Translate between Indonesian languages
							</CardDescription>
						</CardHeader>
						<CardFooter className="flex justify-center">
							<Link href="/translate">
								<Button variant="outline">Try it now</Button>
							</Link>
						</CardFooter>
					</Card>

					<Card className="flex flex-col">
						<CardHeader className="pb-4">
							<CardTitle>Jono</CardTitle>
							<CardDescription>
								Chat with our Javanese language AI
							</CardDescription>
						</CardHeader>
						<CardFooter className="flex justify-center">
							<Link href="/jono">
								<Button variant="outline">
									Chat with Jono
								</Button>
							</Link>
						</CardFooter>
					</Card>
				</section>
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
				{/* <a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="https://nextjs.org/icons/file.svg"
						alt="File icon"
						width={16}
						height={16}
					/>
					Learn
				</a>
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="https://nextjs.org/icons/window.svg"
						alt="Window icon"
						width={16}
						height={16}
					/>
					Examples
				</a> */}
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://github.com/williammtan/indonesiaku"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="https://nextjs.org/icons/github.svg"
						alt="Github icon"
						width={24}
						height={24}
					/>
					See our git repo →
				</a>
			</footer>
		</div>
	);
}
