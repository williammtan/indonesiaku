import { BookmarkIcon, MoreHorizontal, MessageCircle, Eye } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { truncateString, getRelativeTime } from "@/lib/utils";
import Link from "next/link";

interface PostCardProps {
  id: string,
  title: string;
  content: string;
  createdAt: Date;
  views: number;
  user: {
    name: string;
    avatarUrl: string;
  };
}

export default function PostCard({
  id,
  title,
  content,
  createdAt,
  views,
  user,
}: PostCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/avatar-default.png" />
        </Avatar>
        <div className="flex items-center h-full">
            <p>
                {user.name}
            </p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-2">
        <div className="flex-1 space-y-4">
          <div className="flex-1">
            <Link href={"/posts/"+id}>
                <h2 className="text-2xl font-semibold">{title}</h2>
            </Link>
          </div>
          {/* <h3 className="text-2xl font-bold leading-tight">
            {truncateString(content, 30)}
            </h3> */}
          <p className="text-muted-foreground">
            {truncateString(content, 100)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-sm text-muted-foreground">{getRelativeTime(createdAt)}</span>
          <div className="flex items-center gap-2 text-sm">
            <Eye className="h-4 w-4" />
            <span>{views}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* <Button variant="ghost" size="icon">
            <BookmarkIcon className="h-4 w-4" />
          </Button> */}
          {/* <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button> */}
        </div>
      </CardFooter>
    </Card>
  );
}
