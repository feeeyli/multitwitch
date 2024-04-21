/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import Link from "next/link";

const titleVariants = {
  qsmp: "MultiQSMP",
  twitch: "MultiTwitch",
  purgatory: "MultiQSMP Purgatory",
  frogg: "MultiFrogg",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center py-20">
      <header className="text-center">
        <h1 className="font-bold text-4xl">{titleVariants[env.APP_VARIANT]}</h1>
        <h2 className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-primary">
          <span>Bem-vindo</span>
          <span>Bienvenido</span>
          <span>Welcome</span>
          <span>Bienvenu</span>
        </h2>
      </header>
      <main className="gap-2 grid grid-cols-2 mt-6">
        <Button
          variant="ghost"
          className="h-auto flex-col gap-2 sm:p-4 sm:pb-3 p-3 pb-2"
          asChild
        >
          <Link href="/pt">
            <img
              src="https://api.iconify.design/flagpack:br.svg"
              alt="Bandeira do Brasil"
              width={96}
              height={72}
              className="aspect-[4/3] rounded-md w-24 sm:w-28"
            />
            <span>Português</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="h-auto flex-col gap-2 sm:p-4 sm:pb-3 p-3 pb-2"
          asChild
        >
          <Link href="/es">
            <div className="relative">
              <img
                src="https://api.iconify.design/flagpack:mx.svg"
                alt="Bandeira do Mexico"
                width={96}
                height={72}
                className="aspect-[4/3] rounded-md w-24 sm:w-28"
              />
              <img
                src="https://api.iconify.design/flagpack:es.svg"
                alt="Bandeira da Espanha"
                width={96}
                height={72}
                className="[clip-path:polygon(0%_0%,0%_100%,100%_0%)] absolute inset-0 aspect-[4/3] rounded-md w-24 sm:w-28"
              />
            </div>
            <span>Español</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="h-auto flex-col gap-2 sm:p-4 sm:pb-3 p-3 pb-2"
          asChild
        >
          <Link href="/en">
            <img
              src="https://api.iconify.design/flagpack:us.svg"
              alt="United States flag"
              width={96}
              height={72}
              className="aspect-[4/3] rounded-md w-24 sm:w-28"
            />
            <span>English</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="h-auto flex-col gap-2 sm:p-4 sm:pb-3 p-3 pb-2"
          asChild
        >
          <Link href="/fr">
            <img
              src="https://api.iconify.design/flagpack:fr.svg"
              alt="Drapeau de la France"
              width={96}
              height={72}
              className="aspect-[4/3] rounded-md w-24 sm:w-28"
            />
            <span>Français</span>
          </Link>
        </Button>
      </main>
      <footer className="flex flex-col items-center mt-auto">
        <p className="text-sm max-w-[28rem] text-balance w-[80vw] text-center mt-8">
          Feito com 💜 por{" "}
          <Link
            href="https://twitter.com/feeeyli"
            className="text-[#FFA4CF] underline-offset-4 hover:underline"
          >
            feyli
          </Link>
          , para toda comunidade da Frogg!
        </p>
      </footer>
    </div>
  );
}
