"use client";

import { EventSchema } from "@/types/event.schema";
import { useTranslations } from "next-intl";
import { useTimer } from "react-timer-hook";

type NextEventCountdownProps = {
  event: EventSchema;
};

export function NextEventCountdown(props: NextEventCountdownProps) {
  const t = useTranslations("events-dialog");
  const { days, minutes, hours, seconds, isRunning } = useTimer({
    expiryTimestamp: props.event.time,
  });

  return (
    <div className="flex flex-col items-center -mb-6">
      <span>{t("next-event")}</span>
      <time className="mb-2 text-3xl font-bold text-primary">
        {isRunning && (
          <>
            {days > 0 && days + "d"} {hours}h {minutes}m {seconds}s
          </>
        )}
        {!isRunning && (
          <span className="text-[#22c55e]">{t("event-started")}</span>
        )}
      </time>
    </div>
  );
}
