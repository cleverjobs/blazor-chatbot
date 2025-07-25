'use client';

import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Bot, User } from 'lucide-react';

import { type Message } from '@/lib/chatApi';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CodeBlock } from '@/components/chat/CodeBlock';

interface ChatMessageProps {
  message: Message;
}

// Regex to find fenced code blocks
const codeBlockRegex = /(```[\w-]*\n[\s\S]*?\n```)/g;

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAssistant = message.role === 'assistant';

  const renderContent = (content: string) => {
    const parts = content.split(codeBlockRegex);

    return parts.map((part, index) => {
      if (part.match(codeBlockRegex)) {
        const languageMatch = part.match(/```(\w*)\n/);
        const language = languageMatch ? languageMatch[1] : 'plaintext';
        const code = part.replace(/```[\w-]*\n/, '').replace(/\n```/, '');
        return <CodeBlock key={index} language={language} value={code} />;
      }
      // Render text parts with line breaks
      return part.split('\n').map((line, i) => (
        <React.Fragment key={`${index}-${i}`}>
          {line}
          {i < part.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
    });
  };

  return (
    <div
      className={cn('flex items-start gap-4', isAssistant ? '' : 'flex-row-reverse')}
      data-testid={`message-bubble-${message.role}`}
    >
      <Avatar className="w-8 h-8 border">
        <AvatarFallback className={cn(isAssistant ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground')}>
          {isAssistant ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
        </AvatarFallback>
      </Avatar>
      <div className={cn('max-w-[75%] space-y-2')}>
        <div
          className={cn(
            'p-3 rounded-lg',
            isAssistant
              ? 'bg-muted rounded-bl-none'
              : 'bg-primary text-primary-foreground rounded-br-none'
          )}
        >
          <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
            {renderContent(message.content)}
          </div>
        </div>
        <p className={cn('text-xs text-muted-foreground', isAssistant ? 'text-left' : 'text-right')}>
          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};
