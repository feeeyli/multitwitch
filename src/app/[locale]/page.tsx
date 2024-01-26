import { Dialogs } from "@/components/dialogs/dialogs";
import { Streams } from "@/components/streams/streams";

export default function Watch() {
  return (
    <main className="w-full min-h-screen relative flex">
      <Streams />
      <Dialogs />
    </main>
  );
}
