export const SPECIAL_STREAMERS = {
  mii_reis: {
    stream_url:
      "https://www.youtube.com/embed/live_stream?channel=UC4gwEpsyFnrjkMNOoevY8Rg",
    hided_header_items: ["sound", "chat"],
  },
  yuiboboca: {
    stream_url:
      "https://www.youtube.com/embed/live_stream?channel=UC2DXysAjX1a15qmUf4lOhwg",
    hided_header_items: ["sound", "chat"],
  },
};

export function getSpecialStreamer<T extends keyof typeof SPECIAL_STREAMERS>(
  twitch_name: string
) {
  if (SPECIAL_STREAMERS[twitch_name as T]) {
    return SPECIAL_STREAMERS[twitch_name as T];
  }
}
