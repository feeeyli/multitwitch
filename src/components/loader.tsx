import { Loader2 } from "lucide-react";

type LoaderProps = {
  children?: string;
};

export function Loader(props: LoaderProps) {
  return (
    <div className="text-muted-foreground flex gap-2 items-center justify-center w-full h-full p-3 text-sm">
      {props.children}
      <Loader2 size="1rem" className="animate-spin" />
    </div>
  );
}
