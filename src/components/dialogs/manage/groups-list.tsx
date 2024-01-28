/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { SKIN_HEAD } from "@/data/skin-heads";
import { includes } from "@/lib/includes";
import {
  ManageGroupSchema,
  ManageMemberGroupSchema,
  useManageStore,
} from "@/stores/manage-store";
import {
  Eye,
  EyeOff,
  MessageSquare,
  MessageSquareDashed,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function GroupsList() {
  const manage = useManageStore((state) => state);
  const t = useTranslations("manage-dialog");

  return (
    <section>
      <h3 className="text-center">{t("groups-title")}</h3>
      <div className="divide-y">
        {manage.groups.length === 0 && (
          <p className="text-sm text-muted-foreground text-center p-3">
            {t("no-groups")}
          </p>
        )}
        {manage.groups.map((group) => (
          <Group key={group.simple_name} group={group} />
        ))}
      </div>
    </section>
  );
}

type GroupProps = {
  group: ManageGroupSchema;
};

function Group(props: GroupProps) {
  const manage = useManageStore((state) => state);

  return (
    <section className="flex flex-col">
      <header className="flex-grow flex gap-3 items-center hover:bg-secondary/30 rounded-md py-3 px-1.5 cursor-default">
        <Button
          size="icon"
          className="h-7 w-7"
          variant="ghost"
          onClick={() => {
            manage.actions.removeGroup(props.group);
          }}
        >
          <X size="1rem" />
        </Button>
        <span className="overflow-x-hidden text-ellipsis flex-grow">
          {props.group.display_name}
        </span>
      </header>
      <div className="grid grid-cols-[2.5rem_1fr]">
        <Separator
          orientation="vertical"
          className="justify-self-center bg-primary"
        />
        <ul>
          {props.group.members.map((member) => (
            <GroupMember
              member={member}
              key={member.twitch_name}
              group={props.group}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

type GroupMemberProps = {
  member: ManageMemberGroupSchema;
  group: ManageGroupSchema;
};

function GroupMember(props: GroupMemberProps) {
  const t = useTranslations("manage-dialog");
  const manage = useManageStore((state) => state);

  return (
    <li
      data-hided={props.member.hided}
      className="py-2 px-1.5 flex gap-3 items-center hover:bg-secondary/30 rounded-md group cursor-default"
    >
      <Toggle
        size="icon"
        className="group data-[state=on]:text-muted-foreground"
        pressed={props.member.hided}
        onPressedChange={(pressed) => {
          const old = { ...props.group };
          const index = old.members.findIndex(
            (g) => g.twitch_name === props.member.twitch_name
          );

          old.members[index].hided = pressed;

          manage.actions.setGroupItem(old);
        }}
      >
        <EyeOff className="group-data-[state=off]:hidden" size="1rem" />
        <Eye className="group-data-[state=on]:hidden" size="1rem" />
      </Toggle>
      <img
        src={SKIN_HEAD(props.member.twitch_name, props.member.avatar_url || "")}
        alt={t("avatar-alt", { name: props.member.display_name })}
        className="size-7 pointer-events-none select-none group-data-[hided=true]:grayscale"
      />
      <span className="overflow-x-hidden text-ellipsis flex-grow group-data-[hided=true]:text-muted-foreground group-data-[hided=true]:line-through">
        {props.member.display_name}
      </span>
      {!includes(manage.streamers, "twitch_name", props.member.twitch_name) && (
        <Toggle
          size="icon"
          className="group"
          pressed={props.member.chat_opened}
          onPressedChange={(pressed) => {
            const old = { ...props.group };
            const index = old.members.findIndex(
              (g) => g.twitch_name === props.member.twitch_name
            );

            old.members[index].chat_opened = pressed;

            manage.actions.setGroupItem(old);
          }}
        >
          <MessageSquare
            className="group-data-[state=off]:hidden"
            size="1rem"
          />
          <MessageSquareDashed
            className="group-data-[state=on]:hidden"
            size="1rem"
          />
        </Toggle>
      )}
    </li>
  );
}
