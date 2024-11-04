"use client";
 
import { useAssistant } from "ai/react";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useVercelUseAssistantRuntime } from "@assistant-ui/react-ai-sdk";
 
export function ChatRuntimeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const assistant = useAssistant({
    api: "/api/chat",
  });
 
  const runtime = useVercelUseAssistantRuntime(assistant);
 
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}