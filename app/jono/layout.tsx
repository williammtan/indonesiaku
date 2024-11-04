import { ChatRuntimeProvider } from '@/app/ChatProvider';
 
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatRuntimeProvider>
          {children}
    </ChatRuntimeProvider>
  )
}