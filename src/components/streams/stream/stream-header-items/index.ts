import { Chat } from "./chat";
import { FullScreen } from "./full-screen";
import { Reload } from "./reload";
import { Remove } from "./remove";
import { Sound } from "./sound";
import { SwapPoints } from "./swap-points/swap-points";

export const headerItemsComponents = {
  sound: Sound,
  fullscreen: FullScreen,
  chat: Chat,
  reload: Reload,
  "remove-stream": Remove,
  "swap-points": SwapPoints,
};
