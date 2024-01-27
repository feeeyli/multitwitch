import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EVENTS } from "@/data/events";
import { EventSchema } from "@/types/event.schema";
import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { Event } from "./event";
import { NextEventCountdown } from "./next-event-countdown";

function addHours(date: Date, hours: number) {
  const added = new Date(date);

  added.setHours(added.getHours() + hours);

  return added;
}

export function EventsDialog() {
  const t = useTranslations("events-dialog");

  const futureEvents: EventSchema[] = EVENTS.filter((event) => {
    const now = new Date().getTime();
    const eventEnd = addHours(event.time, 2).getTime();

    return now < eventEnd;
  }).sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="dialog">
          <Calendar size="1rem" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        {futureEvents.length === 0 && (
          <p className="py-3 text-muted-foreground text-sm text-center">
            {t("no-events")}
          </p>
        )}
        {futureEvents.length > 0 && (
          <>
            <NextEventCountdown event={futureEvents[0]} />
            <Accordion type="single" defaultValue={futureEvents[0].name}>
              {futureEvents.map((event) => (
                <Event event={event} key={event.name} />
              ))}
            </Accordion>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
