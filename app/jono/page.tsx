'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Thread } from "@assistant-ui/react";

const Welcome = () => {
    return (
      <div className="flex flex-col items-center">
        <Avatar className="h-10 w-10 m-4">
            <AvatarImage src="/placeholder.svg" alt="profile" />
            <AvatarFallback>
                J
            </AvatarFallback>
                </Avatar>
        <p className="text-m">Halo, isa tak bantu opo?</p>
      </div>
    );
  };

export default function JonoPage() {
    const threadConfig = {
      assistantAvatar: {
        fallback: "J"
      },
        components: {
          ThreadWelcome: Welcome,
        }
      };
  return (
    <div className="h-full w-full align-bottom">
      <Thread {...threadConfig} />
    </div>
  );
};