'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getChatResponse, type Message } from '@/lib/chatApi';
import ChatWindow from '@/components/chat/ChatWindow';
import MessageInput from '@/components/chat/MessageInput';
import { useToast } from "@/hooks/use-toast";
import { Bot, User } from 'lucide-react';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('chatHistory');
      if (storedHistory) {
        setMessages(JSON.parse(storedHistory));
      } else {
        // Add a default welcome message if there's no history
        setMessages([
          {
            role: 'assistant',
            content: "Hello! I'm a Telerik UI for Blazor expert. How can I help you today?",
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to parse chat history from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      // Only save if there are more than just the initial welcome message
      if (messages.length > 1) {
        localStorage.setItem('chatHistory', JSON.stringify(messages));
      }
    } catch (error) {
      console.error("Failed to save chat history to localStorage", error);
    }
  }, [messages]);

  const handleSendMessage = useCallback(async (inputText: string) => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputText,
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // The API only needs the new message and history for context.
      const assistantResponse = await getChatResponse(newMessages);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date().toISOString(),
      };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response from the server. Please try again.",
      });
      // Optionally remove the user's message on failure or add an error message
       const errorMessage: Message = {
        role: 'assistant',
        content: "Sorry, I couldn't connect to the server. Please check your connection and try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, toast]);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="flex items-center p-4 border-b">
        <Bot className="w-8 h-8 text-primary" />
        <div className='ml-4'>
            <h1 className="text-xl font-bold font-headline">Blazor Assistant</h1>
            <p className="text-sm text-muted-foreground">Your guide to Telerik UI for Blazor</p>
        </div>
      </header>
      <ChatWindow messages={messages} isLoading={isLoading} />
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
