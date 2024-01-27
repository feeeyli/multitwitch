import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SettingsSchema } from "@/types/settings.schema";
import { ReactNode } from "react";
import { FieldPath, UseFormReturn } from "react-hook-form";

type FormToggleGroupProps = {
  form: UseFormReturn<SettingsSchema>;
  name: FieldPath<SettingsSchema>;
  label: string;
  items: {
    label: string;
    value: string;
    icon: ReactNode;
  }[];
};

export function FormToggleGroup(props: FormToggleGroupProps) {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <ToggleGroup
          type="multiple"
          value={field.value as string[]}
          onValueChange={field.onChange}
          className="flex-col gap-2 items-start"
        >
          {props.items.map((item) => (
            <FormItem key={item.value}>
              <FormControl>
                <ToggleGroupItem
                  value={item.value}
                  className="gap-2 hover:bg-muted/60"
                >
                  {item.icon}{" "}
                  <FormLabel className="cursor-pointer">{item.label}</FormLabel>
                </ToggleGroupItem>
              </FormControl>
              <FormMessage />
            </FormItem>
          ))}
        </ToggleGroup>
      )}
    />
  );
}
