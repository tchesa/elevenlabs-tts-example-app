import { Label } from "@radix-ui/react-label";
import TextMessage from "./text-message";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { CornerDownLeft } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { current: textAreaElement } = textAreaRef;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessages((x) => [...x, input]);
    setInput("");
  };

  useEffect(() => {
    function submitOnEnter(event: any) {
      if (event.which === 13) {
        if (!event.repeat) {
          // const newEvent = new Event("onSubmit", { cancelable: true });
          // event.target.form.dispatchEvent(newEvent);
          setMessages((x) => [...x, event.target.value]);
          setInput("");
        }

        event.preventDefault();
      }
    }

    textAreaElement?.addEventListener("keydown", submitOnEnter);

    return () => {
      textAreaElement?.removeEventListener("keydown", submitOnEnter);
    };
  }, [textAreaElement]);

  return (
    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-0 justify-end">
      {/* <Badge variant="outline" className="absolute right-3 top-3">
              Output
            </Badge> */}
      <div className="-mt-4 -mx-4 p-4 overflow-y-auto flex flex-col space-y-2">
        {messages.map((message, index) => (
          <TextMessage key={index}>{message}</TextMessage>
        ))}
      </div>
      <form
        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        x-chunk="dashboard-03-chunk-1"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          ref={textAreaRef}
          id="message"
          placeholder="Type your message here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex items-center p-3 pt-0">
          {/* <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Paperclip className="size-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Attach File</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Mic className="size-4" />
                      <span className="sr-only">Use Microphone</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Use Microphone</TooltipContent>
                </Tooltip> */}
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
