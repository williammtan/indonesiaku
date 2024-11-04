'use client'

import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { Content } from "@tiptap/react";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import sanitizeHtml from 'sanitize-html';
import { redirect } from "next/navigation";
import { createPost } from "@/app/actions";
import { useForm } from "react-hook-form";


export default function App() {
    const { register, handleSubmit } = useForm({
        mode: 'onChange'
    });

    // const { user, error, isLoading } = useUser(); // TODO: still broken rn
    const [title, setTitle] = useState("");
	const [value, setValue] = useState<Content>("");

    if (!isLoading && !user) {
        return redirect("/api/auth/login");
    }
    const submit = () => {
        console.log(user);
        console.log(title);
        console.log(value);
        if (!user?.sid || !title || !value) return;
        console.log(user.sid);
        createPost({title: title, content: value, userId: user.sid})
        return redirect("/posts")
    }

	return (
        <TooltipProvider>
            <main className="flex flex-col justify items-center gap-4 my-4">
                <div className="w-6/12">
                    <h1 className="text-4xl font-bold self-start">New Post</h1>
                </div>
                <div className="grid items-center gap-1.5 w-6/12">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="grid items-center gap-1.5 w-6/12">
                    <Label>Post</Label>
                    <MinimalTiptapEditor
                        value={value}
                        onChange={setValue}
                        className=""
                        editorContentClassName="p-5"
                        output="html"
                        placeholder="Type your description here..."
                        autofocus
                        editable
                        editorClassName="focus:outline-none"
                    />
                </div>
                <Button type="submit" onClick={submit}>Create</Button>
            </main>
        </TooltipProvider>
    );
};
