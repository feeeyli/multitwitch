import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SettingsSchema } from "@/types/settings.schema";
import { FieldPath, UseFormReturn } from "react-hook-form";

type FormCheckboxProps = {
  form: UseFormReturn<SettingsSchema>;
  name: FieldPath<SettingsSchema>;
  label: string;
  description?: string;
};

export function FormCheckbox(props: FormCheckboxProps) {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <Button
          variant="outline"
          className="w-full justify-start cursor-pointer"
          asChild
        >
          <label>
            <FormItem className="flex items-center space-y-0 gap-3">
              <FormControl>
                <Checkbox
                  checked={field.value as boolean}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">{props.label}</FormLabel>
                {props.description && (
                  <FormDescription>{props.description}</FormDescription>
                )}
              </div>
              <FormMessage />
            </FormItem>
          </label>
        </Button>
      )}
    />
  );
}
