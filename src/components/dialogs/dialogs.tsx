import { useSettings } from "@/hooks/useSettings";
import { cva } from "class-variance-authority";
import { SelectorDialog } from "./selector/selector-dialog";

const dialogsVariants = cva(
  "flex gap-6 absolute [&>section]:flex [&>section]:gap-2",
  {
    variants: {
      "dialogs-position": {
        right: "right-0 [&>section>button]:rounded-l-md",
        bottom:
          "flex-row-reverse bottom-0 right-0 [&>section>button]:rounded-t-md [&>section]:flex-row-reverse px-6",
        left: "left-0 [&>section>button]:rounded-r-md",
      },
      hide: {
        true: "",
      },
    },
    compoundVariants: [
      {
        "dialogs-position": ["right", "left"],
        className: "flex-col top-0 [&>section]:flex-col py-6",
      },
      {
        "dialogs-position": "right",
        hide: true,
        className:
          "[&>section>button]:translate-x-[75%] hover:[&>section>button]:translate-x-0",
      },
      {
        "dialogs-position": "bottom",
        hide: true,
        className:
          "[&>section>button]:translate-y-[75%] hover:[&>section>button]:translate-y-0",
      },
      {
        "dialogs-position": "left",
        hide: true,
        className:
          "[&>section>button]:-translate-x-[75%] hover:[&>section>button]:translate-x-0",
      },
    ],
  }
);

export function Dialogs() {
  const [settings] = useSettings();

  return (
    <div
      className={dialogsVariants({
        "dialogs-position": settings.appearance.dialogTriggersPosition,
        hide: settings.appearance.hideDialog,
      })}
    >
      <section>
        <SelectorDialog />
        <button className="w-10 h-9 bg-primary">2</button>
        <button className="w-10 h-9 bg-primary">3</button>
      </section>
      <section>
        <button className="w-10 h-9 bg-primary">4</button>
        <button className="w-10 h-9 bg-primary">5</button>
      </section>
      <section>
        <button className="w-10 h-9 bg-primary">6</button>
      </section>
    </div>
  );
}
