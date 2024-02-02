import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { env } from "@/env";
import { BadgeHelp } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Markdown from "react-markdown";

const list = [
  "twitch-account",
  "enable-chat",
  "streamers-status",
  "found-bug",
  "suggestion",
  "fork-project",
] as const;

export function FaqDialog() {
  const t = useTranslations("faq-dialog");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="dialog">
          <BadgeHelp size="1rem" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[50rem]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <Accordion type="single">
          {list.map((question) => {
            if (question === "streamers-status" && env.APP_VARIANT === "twitch")
              return null;

            return (
              <AccordionItem key={question} value={question}>
                <AccordionTrigger>
                  {t(`faq-list.${question}.title`)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground px-2">
                  <Markdown
                    key={question}
                    className="whitespace-pre-wrap [&_ul]:whitespace-normal [&_ul]:space-y-2 [&_ul]:list-disc [&_li]:ml-7 [&_strong]:text-primary"
                    components={{
                      a(props) {
                        return (
                          <Link
                            href={props.href || "#"}
                            className="text-primary hover:underline"
                            target="_blank"
                          >
                            {props.children}
                          </Link>
                        );
                      },
                    }}
                  >
                    {t(`faq-list.${question}.content`)}
                  </Markdown>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}
