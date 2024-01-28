import { Chat, FullScreen, Reload, Remove, Sound } from "./stream-header-items";

export function StreamHeader() {
  return (
    <header className="bg-muted w-full h-7 cursor-move flex">
      <Sound />
      <FullScreen />
      <Chat />
      <Reload />
      <Remove />
      <div className="drag-handle flex-grow"></div>
    </header>
  );
}
