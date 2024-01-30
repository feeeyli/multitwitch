"use client";

import { GoToSwapPoint } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSettings } from "@/hooks/use-settings";
import {
  SettingsSchema,
  headerItemsNames,
  settingsSchema,
} from "@/types/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Expand,
  MessageSquare,
  RefreshCcw,
  Settings,
  Volume2,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormCheckbox } from "./inputs/form-checkbox";
import { FormSelect } from "./inputs/form-select";
import { FormToggleGroup } from "./inputs/form-toggle-group";

const headerItems: {
  value: z.infer<typeof headerItemsNames>;
  icon: React.ReactNode;
  hidden?: boolean;
}[] = [
  { value: "fullscreen", icon: <Expand size="1rem" /> },
  { value: "sound", icon: <Volume2 size="1rem" /> },
  { value: "chat", icon: <MessageSquare size="1rem" /> },
  { value: "reload", icon: <RefreshCcw size="1rem" /> },
  { value: "remove-stream", icon: <X size="1rem" /> },
  {
    value: "swap-points",
    icon: <GoToSwapPoint size="1rem" variant={0} />,
  },
];

export function SettingsDialog() {
  const t = useTranslations("settings-dialog");
  const [opened, setOpened] = useState(false);
  const settings = useSettings();

  const form = useForm<SettingsSchema>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings.settings,
  });

  function onSubmit(values: SettingsSchema) {
    settings.setSettings(values);

    setOpened(false);
  }

  return (
    <Dialog
      open={opened}
      onOpenChange={(open) => {
        setOpened(open);

        if (open) {
          form.reset(settings.settings);
        } else {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size="dialog">
          <Settings size="1rem" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        {typeof settings !== "undefined" && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ScrollArea className="h-[23rem] sm:h-[30rem] pr-5" type="always">
                <section className="space-y-2 mb-5 px-1">
                  <h3 className="text-lg text-primary font-semibold">
                    {t("form.appearance.title")}
                  </h3>
                  <FormSelect
                    form={form}
                    name="appearance.theme"
                    label={t("form.appearance.theme.label")}
                    items={[
                      { label: t("form.appearance.theme.dark"), value: "dark" },
                      {
                        label: t("form.appearance.theme.light"),
                        value: "light",
                      },
                      {
                        label: t("form.appearance.theme.system"),
                        value: "system",
                      },
                    ]}
                  />
                  <FormSelect
                    form={form}
                    name="appearance.dialogTriggersPosition"
                    label={t("form.appearance.dialog-position.label")}
                    items={[
                      {
                        label: t("form.appearance.dialog-position.right"),
                        value: "right",
                      },
                      {
                        label: t("form.appearance.dialog-position.bottom"),
                        value: "bottom",
                      },
                      {
                        label: t("form.appearance.dialog-position.left"),
                        value: "left",
                      },
                    ]}
                  />
                  <div className="space-y-2">
                    <span className="text-sm font-medium leading-none">
                      {t("form.appearance.outro.label")}
                    </span>
                    <FormCheckbox
                      form={form}
                      label={t("form.appearance.outro.hide-dialog")}
                      name="appearance.hideDialog"
                    />
                  </div>
                </section>
                <section className="space-y-2 mb-5 px-1">
                  <h3 className="text-lg text-primary font-semibold">
                    {t("form.streamers.title")}
                  </h3>
                  <FormSelect
                    form={form}
                    name="streamers.streamersAvatar"
                    label={t("form.streamers.streamers-avatar.label")}
                    items={[
                      {
                        label: t("form.streamers.streamers-avatar.both"),
                        value: "both",
                      },
                      {
                        label: t("form.streamers.streamers-avatar.twitch"),
                        value: "twitch",
                      },
                      {
                        label: t("form.streamers.streamers-avatar.skin"),
                        value: "skin",
                      },
                    ]}
                  />
                  <div className="space-y-2">
                    <span className="text-sm font-medium leading-none">
                      {t("form.streamers.streamers-status.label")}
                    </span>
                    <FormCheckbox
                      form={form}
                      label={t("form.streamers.streamers-status.offline")}
                      name="streamers.streamersStatus.offline"
                    />
                    <FormCheckbox
                      form={form}
                      label={t("form.streamers.streamers-status.noPlaying")}
                      name="streamers.streamersStatus.noPlaying"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium leading-none">
                      {t("form.streamers.outro.label")}
                    </span>
                    <FormCheckbox
                      form={form}
                      label={t("form.streamers.outro.hide-offline")}
                      name="streamers.outro.hideOffline"
                    />
                    <FormCheckbox
                      form={form}
                      label={t("form.streamers.outro.hide-not-playing")}
                      name="streamers.outro.hideNotPlaying"
                    />
                  </div>
                </section>
                <section className="space-y-2 mb-5 px-1">
                  <h3 className="text-lg text-primary font-semibold">
                    {t("form.streams.title")}
                  </h3>
                  <div className="space-y-2">
                    <span className="text-sm font-medium leading-none">
                      {t("form.streams.header-items.label")}
                    </span>
                    <FormToggleGroup
                      form={form}
                      label={t("form.streams.header-items.label")}
                      name="streams.headerItems"
                      items={headerItems.map((item) => ({
                        ...item,
                        label: t(
                          `form.streams.header-items.actions-labels.${
                            item.value as z.infer<typeof headerItemsNames>
                          }`
                        ),
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium leading-none">
                      {t("form.streams.outro.label")}
                    </span>
                    <FormCheckbox
                      form={form}
                      label={t("form.streams.outro.start-muted")}
                      name="streams.startMuted"
                    />
                  </div>
                </section>
              </ScrollArea>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    {t("cancel")}
                  </Button>
                </DialogClose>
                <Button type="submit">{t("save")}</Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
