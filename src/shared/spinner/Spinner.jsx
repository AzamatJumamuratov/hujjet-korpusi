import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // если используешь shadcn утилиту classnames (необязательно)

const Spinner = ({ className }) => {
  return (
    <Loader2
      className={cn("w-5 h-5 animate-spin text-muted-foreground", className)}
    />
  );
};

export default Spinner;
