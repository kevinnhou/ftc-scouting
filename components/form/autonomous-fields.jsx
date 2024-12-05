import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PlusIcon } from "lucide-react";

export default function AutonomousFields({ control, setValue }) {
  function incrementField(fieldName, currentValue) {
    setValue(fieldName, (currentValue || 0) + 1);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: "Baskets", fields: ["autoBasketHigh", "autoBasketLow"] },
          { title: "Chambers", fields: ["autoChamberHigh", "autoChamberLow"] },
        ].map((section) => (
          <div key={section.title} className="space-y-2">
            <h3 className="font-semibold">{section.title}</h3>
            {section.fields.map((fieldName) => (
              <FormField
                key={fieldName}
                control={control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {fieldName.includes("High") ? "High" : "Low"}
                    </FormLabel>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : +e.target.value
                            )
                          }
                          autoComplete="off"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => incrementField(fieldName, field.value)}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        ))}
      </div>
      <FormField
        control={control}
        name="autoPreload"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preload</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Preload" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Specimen">Specimen</SelectItem>
                <SelectItem value="Sample">Sample</SelectItem>
                <SelectItem value="Nothing">Nothing</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="autoAscentLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ascent Level</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Ascent Level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Level 1">Level 1</SelectItem>
                <SelectItem value="N/A">N/A</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
