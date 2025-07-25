'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const formSchema = z.object({
  message: z.string().min(1),
});

const MessageInput = ({ onSendMessage, isLoading }: MessageInputProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSendMessage(values.message);
    form.reset();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      if (!isLoading && form.getValues('message').trim()) {
        form.handleSubmit(onSubmit)();
      }
    }
  };

  return (
    <footer className="p-4 border-t bg-background">
      <div className="max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Ask about Telerik Grid virtualization..."
                      className="min-h-[48px] max-h-48 resize-y"
                      onKeyDown={handleKeyDown}
                      aria-label="Chat message input"
                      data-testid="message-input"
                      autoFocus
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !form.formState.isValid}
              aria-label="Send message"
              data-testid="send-button"
            >
              <SendHorizonal className="w-5 h-5" />
            </Button>
          </form>
        </Form>
      </div>
    </footer>
  );
};

export default MessageInput;
