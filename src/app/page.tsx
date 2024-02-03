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
      <main className="grid grid-cols-2 gap-2 mt-6">
        <Button
          variant="ghost"
          className="h-auto flex-col gap-2 sm:p-4 sm:pb-3 p-3 pb-2"
          asChild
        >
          <Link href="/pt">
            <img
              src="/br.svg"
              alt="Bandeira do Brasil"
              width={96}
              height={72}
              className="aspect-[4/3] rounded-md w-28"
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
                src="/mx.svg"
                alt="Bandeira do Mexico"
                width={96}
                height={72}
                className="aspect-[4/3] rounded-md w-28"
              />
              <img
                src="/es.svg"
                alt="Bandeira da Espanha"
                width={96}
                height={72}
                className="[clip-path:polygon(0%_0%,0%_100%,100%_0%)] absolute inset-0 aspect-[4/3] rounded-md w-28"
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
              src="/us.svg"
              alt="United States flag"
              width={96}
              height={72}
              className="aspect-[4/3] rounded-md w-28"
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
              src="/fr.svg"
              alt="Drapeau de la France"
              width={96}
              height={72}
              className="aspect-[4/3] rounded-md w-28"
            />
            <span>Français</span>
          </Link>
        </Button>
      </main>
      <footer className="flex flex-col items-center mt-auto">
        <section className="flex flex-wrap gap-4">
          <Button variant="secondary" className="gap-2 twitch hidden" asChild>
            <Link href="https://multwitch.vercel.app">
              <img
                src="/favicon-twitch.ico"
                alt="MultiTwitch"
                className="size-6"
              />
              <span>MultiTwitch</span>
            </Link>
          </Button>
          {env.APP_VARIANT !== "qsmp" && (
            <Button variant="secondary" className="gap-2 qsmp" asChild>
              <Link href="https://multiqsmp.vercel.app">
                <img
                  src="/favicon-qsmp.ico"
                  alt="MultiQSMP"
                  className="size-6"
                />
                <span>MultiQSMP</span>
              </Link>
            </Button>
          )}
          {env.APP_VARIANT !== "frogg" && (
            <Button variant="secondary" className="gap-2 frogg" asChild>
              <Link href="https://multifrogg.vercel.app">
                <img
                  src="/favicon-frogg.ico"
                  alt="MultiFrogg"
                  className="size-6"
                />
                <span>MultiFrogg</span>
              </Link>
            </Button>
          )}
        </section>
        <p className="text-sm max-w-[28rem] text-balance w-[80vw] text-center mt-8">
          Feito com 💜 por{" "}
          <Link
            href="https://twitter.com/feeeyli"
            className="text-[#FFA4CF] underline-offset-4 hover:underline"
          >
            feyli
          </Link>
          , para toda comunidade do QSMP e da Frogg!
        </p>
      </footer>
    </div>
  );
}
