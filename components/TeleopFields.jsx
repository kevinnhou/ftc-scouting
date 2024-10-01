import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Check, Pause, Play, Plus, RefreshCw, X } from "lucide-react";

export default function TeleopFields({ control, setValue }) {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [lastRecordedTime, setLastRecordedTime] = useState(null);
  const [cycleTimes, setCycleTimes] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  function incrementField(fieldName, currentValue) {
    setValue(fieldName, (currentValue || 0) + 1);
  }

  function handleStartStop() {
    if (isRunning) {
      setIsRunning(false);
      setLastRecordedTime(Number(time.toFixed(1)));
    } else {
      setIsRunning(true);
      setLastRecordedTime(null);
    }
  }

  function handleAddTime() {
    if (lastRecordedTime !== null) {
      const newCycleTimes = [...cycleTimes, lastRecordedTime];
      setCycleTimes(newCycleTimes);
      setValue("teleopCycleTimes", newCycleTimes);
      setLastRecordedTime(null);
      setTime(0);
    }
  }

  function handleDiscardTime() {
    setLastRecordedTime(null);
    setTime(0);
  }

  function handleReset() {
    setTime(0);
    setCycleTimes([]);
    setValue("teleopCycleTimes", []);
    setLastRecordedTime(null);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { title: "Baskets", fields: ["teleopBasketHigh", "teleopBasketLow"] },
        {
          title: "Chambers",
          fields: ["teleopChamberHigh", "teleopChamberLow"],
        },
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
                            e.target.value === "" ? undefined : +e.target.value
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
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      ))}
      <div className="col-span-full space-y-2">
        <h3 className="font-semibold">Cycle Times</h3>
        <FormField
          control={control}
          name="teleopCycleTimes"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col items-center space-y-4">
                <div className="text-5xl tabular-nums">{time.toFixed(1)}</div>
                <div className="flex items-center space-x-3">
                  <Button
                    type="button"
                    variant={isRunning ? "destructive" : "default"}
                    size="lg"
                    onClick={handleStartStop}
                  >
                    {isRunning ? (
                      <Pause className="h-5 w-5 mr-2" />
                    ) : (
                      <Play className="h-5 w-5 mr-2" />
                    )}
                    {isRunning ? "Stop" : "Start"}
                  </Button>
                  {lastRecordedTime !== null && (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleAddTime}
                      >
                        <Check className="h-5 w-5" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleDiscardTime}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              {cycleTimes.length > 0 && (
                <div className="mt-6">
                  <FormLabel>Recorded Cycle Times</FormLabel>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {cycleTimes.map((cycleTime, index) => (
                      <div
                        key={index}
                        className="bg-secondary text-secondary-foreground px-3 py-2 align-middle rounded-lg text-sm"
                      >
                        {cycleTime}s
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleReset}
                    >
                      <RefreshCw className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
