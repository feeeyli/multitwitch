import { env } from "@/env";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = {
  qsmp: "MultiQSMP",
  twitch: "MultiTwitch",
  purgatory: "MultiQSMP Purgatory",
  frogg: "MultiFrogg",
}[env.APP_VARIANT];
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font
  const notoSansRegular = fetch(
    new URL("../assets/NotoSans-Regular.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const notoSansBold = fetch(
    new URL("../assets/NotoSans-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const themes = {
    qsmp: {
      background: "#1e1a23",
      foreground: "#f9fafb",
      primary: "#bfa9e5",
    },
    twitch: {
      background: "#1e1a23",
      foreground: "#f9fafb",
      primary: "#bfa9e5",
    },
    purgatory: {
      background: "#1e1a23",
      foreground: "#f9fafb",
      primary: "#bfa9e5",
    },
    frogg: {
      background: "#1a231d",
      foreground: "#fafbf9",
      primary: "#9acba6",
    },
  };

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          fontFamily: '"Noto Sans", sans-serif',
        }}
      >
        <div
          tw="flex w-full flex-1 items-center justify-center"
          style={{ backgroundColor: themes[env.APP_VARIANT].background }}
        >
          <div tw="flex flex-col items-center">
            <h1
              tw="-mb-4 text-[150px]"
              style={{
                fontWeight: 700,
                color: themes[env.APP_VARIANT].foreground,
              }}
            >
              MultiQSMP
            </h1>
            <div tw="flex">
              <div tw="flex flex-col items-center mr-[80px]">
                <h2
                  tw="text-[#bfa9e5] text-[50px]"
                  style={{
                    fontWeight: 400,
                    color: themes[env.APP_VARIANT].primary,
                  }}
                >
                  Bem-vindo
                </h2>
                <h2
                  tw="text-[#bfa9e5] text-[50px] -mt-4"
                  style={{
                    fontWeight: 400,
                    color: themes[env.APP_VARIANT].primary,
                  }}
                >
                  Welcome
                </h2>
              </div>
              <div tw="flex flex-col items-center">
                <h2
                  tw="text-[#bfa9e5] text-[50px]"
                  style={{
                    fontWeight: 400,
                    color: themes[env.APP_VARIANT].primary,
                  }}
                >
                  Bienvenido
                </h2>
                <h2
                  tw="text-[#bfa9e5] text-[50px] -mt-4"
                  style={{
                    fontWeight: 400,
                    color: themes[env.APP_VARIANT].primary,
                  }}
                >
                  Bienvenu
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans",
          data: await notoSansRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Noto Sans",
          data: await notoSansBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
