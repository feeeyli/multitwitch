"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { STREAMERS } from "@/data/streamers";
import useStore from "@/hooks/use-store";
import { useCustomDataStore } from "@/stores/custom-data-store";
import { GroupSchema } from "@/types/groups.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { DeleteGroupDialog } from "./delete-group-dialog";

const createGroupFormSchema = z.object({
  display_name: z.string().min(1),
  simple_name: z.string().optional(),
  members: z
    .array(
      z.object({
        display_name: z.string(),
        twitch_name: z.string(),
      })
    )
    .min(1),
});

type EditGroupDialogProps = {
  editing_group: GroupSchema;
};

export function EditGroupDialog(props: EditGroupDialogProps) {
  const customData = useStore(useCustomDataStore, (state) => state);
  const [open, setOpen] = useState(false);
  const t = useTranslations("custom-group-dialogs.edit");

  const Streamers = [customData?.pinnedStreamers ?? [], STREAMERS].flat();

  const form = useForm<z.infer<typeof createGroupFormSchema>>({
    resolver: zodResolver(createGroupFormSchema),
    defaultValues: props.editing_group,
  });

  const formatName = (name: string) =>
    name
      .toLocaleLowerCase()
      .replace(/[^(A-Z\s-)]/i, "")
      .replaceAll(" ", "-");

  function onSubmit(values: z.infer<typeof createGroupFormSchema>) {
    const simple_name =
      values.simple_name && values.simple_name.length > 0
        ? values.simple_name
        : formatName(values.display_name);

    customData?.replaceCustomGroup(
      {
        ...values,
        simple_name,
        default_group: false,
      },
      props.editing_group
    );

    setOpen(false);
  }

  return (
    <Dialog
      onOpenChange={(o) => {
        form.reset(props.editing_group);
        setOpen(o);
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button className="h-auto p-1.5 absolute z-10 -top-1 -right-1">
          <Pencil size="1rem" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="display_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.display-name.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.display-name.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{t("form.display-name.error")}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="simple_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.simple-name.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.simple-name.placeholder")}
                      defaultValue={formatName(form.watch("display_name"))}
                      {...field}
                      onChange={(e) => {
                        field.onChange(formatName(e.target.value));
                      }}
                      value={undefined}
                    />
                  </FormControl>
                  <FormMessage>{t("form.simple-name.error")}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="members"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={undefined}>
                    {t("form.members.label")}
                  </FormLabel>
                  <ScrollArea className="h-[40dvh]" type="always">
                    <FormControl>
                      <ToggleGroup
                        type="multiple"
                        value={field.value.map((str) => str.twitch_name)}
                        onValueChange={(value) => {
                          const mapped = value.map(
                            (str) =>
                              Streamers.find((s) => s.twitch_name === str)!
                          );

                          field.onChange(mapped);
                        }}
                        ref={field.ref}
                        className="grid grid-cols-2 p-2 pr-4"
                      >
                        {Streamers.map((streamer) => (
                          <ToggleGroupItem
                            key={streamer.twitch_name}
                            value={streamer.twitch_name}
                            className="h-auto py-3 gap-4 justify-start select-none data-[state=on]:text-primary hover:bg-muted/40"
                          >
                            {/*eslint-disable-next-line @next/next/no-img-element*/}
                            <img
                              src={streamer.avatar_url}
                              alt={t("form.members.avatar-alt", {
                                name: streamer.display_name,
                              })}
                              className="size-14 rounded-md pointer-events-none"
                            />
                            <span className="overflow-x-hidden text-ellipsis">
                              {streamer.display_name}
                            </span>
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                  </ScrollArea>
                  <FormMessage>{t("form.members.error")}</FormMessage>
                </FormItem>
              )}
            />
            <DialogFooter>
              <DeleteGroupDialog deleting_group={props.editing_group} />
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  {t("cancel")}
                </Button>
              </DialogClose>
              <Button type="submit">{t("save")}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
