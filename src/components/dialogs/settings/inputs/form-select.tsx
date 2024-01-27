import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsSchema } from "@/types/settings.schema";
import { FieldPath, UseFormReturn } from "react-hook-form";

type FormSelectProps = {
  form: UseFormReturn<SettingsSchema>;
  name: FieldPath<SettingsSchema>;
  label: string;
  items: {
    value: string;
    label: string;
  }[];
};

export function FormSelect(props: FormSelectProps) {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
            }}
            value={field.value as string}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={props.label} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {props.items.map((item) => (
                <SelectItem value={item.value} key={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
