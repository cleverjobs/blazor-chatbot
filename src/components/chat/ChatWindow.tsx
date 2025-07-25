'use client';

import React, { useEffect, useRef } from 'react';
import { type Message } from '@/lib/chatApi';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatWindow = ({ messages, isLoading }: ChatWindowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <main
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 md:p-6"
      aria-live="polite"
      role="log"
      data-testid="chat-window"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-start gap-4" data-testid="loading-skeleton">
            <Avatar className="w-8 h-8 border">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ChatWindow;
