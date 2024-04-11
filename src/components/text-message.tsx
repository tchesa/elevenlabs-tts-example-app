import { PropsWithChildren } from "react";
import { Alert } from "./ui/alert";
import { cn } from "../utils/cn";

type Props = {
  side?: "left" | "right";
};

const TextMessage = ({ children, side = "left" }: PropsWithChildren<Props>) => {
  return (
    <div
      className={cn(
        "flex",
        side === "left" ? "justify-start pr-8" : "justify-end pl-8"
      )}
    >
      <Alert className="max-w-[500px]">{children}</Alert>
    </div>
  );
};

export default TextMessage;
