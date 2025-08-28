'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { CornerDownLeft, Loader, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  const handleInitialMessage = (question: string) => {
    setIsLoading(true);
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: question };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getCannedResponse(question),
      };
      setMessages((prev) => [...prev, assistantResponse]);
      setIsLoading(false);
    }, 1500);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getCannedResponse(input),
      };
      setMessages((prev) => [...prev, assistantResponse]);
      setIsLoading(false);
    }, 1500);
  };
  
  const getCannedResponse = (question: string) => {
    const q = question.toLowerCase();
    if (q.includes('price') || q.includes('plan')) {
      return "We have several plans! The Free plan is great for testing. Our 'Pro' plan at ₹499/month offers 10,000 requests per month and 4K video downloads. You can see all options on our pricing section.";
    }
    if (q.includes('api key')) {
      return "You can get your API key by registering for an account and choosing a plan. Once you sign up, you'll find your key in your account dashboard.";
    }
    if (q.includes('rate limit')) {
      return "Yes, each plan has a specific rate limit to ensure fair usage. For example, the Pro plan has a rate limit of 10,000 requests per month. You can find details for each plan on our pricing page.";
    }
    if (q.includes('support')) {
        return "We offer 24/7 expert support via email for our Pro and Enterprise customers. Free plan users can find help in our community forums and documentation.";
    }
     if (q.includes('video quality') || q.includes('4k')) {
        return "Our Pro and Enterprise plans support video downloads up to 4K quality! The Free plan is limited to 480p.";
    }
    return "Thanks for your question! I can help with topics like plans, pricing, API features, and rate limits. How can I assist you today?";
  };
  
  const quickQuestions = [
    "What are the pricing plans?",
    "How do I get an API key?",
    "What video quality do you support?",
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="primary"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          aria-label="Open chat assistant"
        >
          <MessageSquare className="h-7 w-7" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-lg bg-background p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Zyro AI Assistant</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="p-4 space-y-6">
            {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                    <Avatar className="h-16 w-16 mb-4">
                        <AvatarImage src="https://placehold.co/100x100/0B0F13/00E08F" alt="AI Assistant" />
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold text-foreground">Welcome to Zyro API!</h3>
                    <p className="text-sm">I can help with questions about our plans, features, and more. What are you looking for?</p>
                    <div className="mt-6 space-y-2 w-full">
                        {quickQuestions.map((q, i) => (
                            <Button key={i} variant="outline" className="w-full justify-start text-left h-auto py-2" onClick={() => handleInitialMessage(q)}>
                                {q}
                            </Button>
                        ))}
                    </div>
                </div>
            ) : (
                messages.map((m) => (
                    <div
                        key={m.id}
                        className={cn(
                            'flex items-start gap-3',
                            m.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                    >
                        {m.role === 'assistant' && (
                            <Avatar className="h-8 w-8">
                            <AvatarImage src="https://placehold.co/100x100/0B0F13/00E08F" alt="AI Assistant" />
                            <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                        )}
                        <div
                            className={cn(
                            'max-w-xs md:max-w-md rounded-lg p-3 text-sm',
                            m.role === 'user'
                                ? 'bg-accent text-accent-foreground'
                                : 'bg-secondary'
                            )}
                        >
                            <p className="whitespace-pre-wrap">{m.content}</p>
                        </div>
                        {m.role === 'user' && (
                            <Avatar className="h-8 w-8">
                            <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))
            )}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/100x100/0B0F13/00E08F" alt="AI Assistant" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-secondary rounded-lg p-3 flex items-center space-x-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <SheetFooter className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
            <Input
              id="message"
              placeholder="Ask about plans, features, or support..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send Message</span>
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
