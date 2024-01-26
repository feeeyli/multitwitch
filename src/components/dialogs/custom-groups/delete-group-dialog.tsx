import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useStore from "@/hooks/use-store";
import { useCustomDataStore } from "@/stores/custom-data-store";
import { GroupSchema } from "@/types/groups.schema";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";

type DeleteGroupDialogProps = {
  deleting_group: GroupSchema;
};

export function DeleteGroupDialog(props: DeleteGroupDialogProps) {
  const t = useTranslations("custom-group-dialogs.delete");
  const customData = useStore(useCustomDataStore, (state) => state);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 border-destructive text-destructive hover:bg-destructive/30 hover:text-destructive-foreground mr-auto"
        >
          <Trash size="1rem" />
          {t("title")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("description", { name: props.deleting_group.display_name })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              customData?.removeCustomGroup(props.deleting_group);
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {t("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
