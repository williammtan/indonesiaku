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
import { ArrowRight, Book, Globe, Users } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";

export default function Home() {
  const words = ["culture", "experiences", "worldview", "reality"];
  return (
    <div className="w-full min-h-screen bg-background text-foreground grow-1">
      {/* Hero Section */}
      <section className="pt-44 pb-50 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Preserving Indonesia's Languages for Future Generations
        </h1>
        <p className="text-xl mb-8">
          Using AI to protect and promote Indonesia's rich linguistic heritage
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/translate">Try Our Translator</Link>
          </Button>
          <Button variant="outline"><a href="#statement">Learn More</a></Button>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="pt-32 pb-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "728", text: "Living Languages in Indonesia" },
              {
                number: "71%",
                text: "of Indonesians Speak Multiple Languages",
              },
              { number: "55M", text: "People Don't Speak Bahasa Indonesia" },
              { number: "90%", text: "Languages at Risk by 2123" },
            ].map((stat, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-red-600">
                    {stat.number}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{stat.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section id="statement" className="py-5 px-4 flex justify-center items-center text-center ">
        <h2 className="mx-auto text-6xl mb-8 pl-24">
          Language is{" "}
          <span className="inline-block min-w-[400px] text-left">
            <FlipWords words={words} />
          </span>
        </h2>
      </section>

      {/* Solution Section */}
      <section className="py-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">Our Solutions</h2>
        <div className="container mx-auto px-4 md:px-6">
          {/* <h2 className="text-3xl font-bold text-center mb-12">Our Solutions</h2> */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="h-12 w-12 text-red-600 mb-4" />,
                title: "AI-Powered Translation",
                description:
                  "Our NusaMT-7B model provides accurate translations across 36 language pairs, connecting communities across Indonesia.",
                features: [
                  "Support for 9 Indonesian Langauges",
                  "State-of-the-art accuracy",
                  "Free public access",
                ],
                button: "Translate now",
                link: "/translate",
              },
              {
                icon: <Users className="h-12 w-12 text-red-600 mb-4" />,
                title: "Language Learning",
                description:
                  "Meet Jono, your AI language learning companion, making it fun and easy to learn Indonesia's regional languages.",
                features: [
                  "Realtime interactivity",
                  "Personalized learning assistant",
                  "Cultural context integration",
                ],
                button: "Try Jono now",
                link: "/jono",
              },
              {
                icon: <Book className="h-12 w-12 text-red-600 mb-4" />,
                title: "Open Resources",
                description:
                  "We're building the foundation for others to contribute and expand language preservation efforts.",
                features: [
                  "98+ translated books",
                  "10,000+ bilingual sentences",
                  "Open-source datasets",
                ],
                button: "Contribute",
                link: "/data",
              },
            ].map((solution, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  {solution.icon}
                  <CardTitle>{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <ArrowRight className="h-4 w-4 text-red-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="my-4 items-center">
                    <Button>
                      <Link href={solution.link}>{solution.button}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 text-center bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="mb-8">
            Help us preserve Indonesia's linguistic heritage for future
            generations. Your support makes our work possible.
          </p>
          <Button size="lg">
            <Link href="/data">Contribute</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
