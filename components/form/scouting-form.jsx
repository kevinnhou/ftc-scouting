"use client";

import { useState, useEffect } from "react";

import { formSchema } from "@/lib/schema";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

import MetadataFields from "./metadata-fields";
import AutonomousFields from "./autonomous-fields";
import TeleopFields from "./teleop-fields";
import EndgameFields from "./endgame-fields";

const FORM_SECTIONS = ["Meta", "Auto", "Teleop", "Endgame"];

const requiredFields = Object.entries(formSchema.shape)
  .filter(([_, fieldSchema]) => fieldSchema._def.typeName !== "ZodOptional")
  .map(([fieldName]) => fieldName);

export default function ScoutingForm({ form, onSubmit }) {
  const [activeTab, setActiveTab] = useState("meta");
  const [progress, setProgress] = useState(0);
  const { control, setValue, trigger, formState, handleSubmit, watch } = form;

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        updateProgress(value);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      if (activeTab === "auto") {
        switch (e.key) {
          case "1":
            const autoBasketHighValue = (watch("autoBasketHigh") || 0) + 1;
            setValue("autoBasketHigh", autoBasketHighValue);
            toast.success(`Auto Basket High: ${autoBasketHighValue}`, {
              duration: 1000,
              position: "bottom-right",
            });
            break;
          case "2":
            const autoBasketLowValue = (watch("autoBasketLow") || 0) + 1;
            setValue("autoBasketLow", autoBasketLowValue);
            toast.success(`Auto Basket Low: ${autoBasketLowValue}`, {
              duration: 1000,
              position: "bottom-right",
            });
            break;
          case "3":
            const autoChamberHighValue = (watch("autoChamberHigh") || 0) + 1;
            setValue("autoChamberHigh", autoChamberHighValue);
            toast.success(`Auto Chamber High: ${autoChamberHighValue}`, {
              duration: 1000,
              position: "bottom-right",
            });
            break;
          case "4":
            const autoChamberLowValue = (watch("autoChamberLow") || 0) + 1;
            setValue("autoChamberLow", autoChamberLowValue);
            toast.success(`Auto Chamber Low: ${autoChamberLowValue}`, {
              duration: 1000,
              position: "bottom-right",
            });
            break;
        }
      } else if (activeTab === "teleop") {
        switch (e.key) {
          case "1":
            const teleopBasketHighValue = (watch("teleopBasketHigh") || 0) + 1;
            setValue("teleopBasketHigh", teleopBasketHighValue);
            toast.success(`Teleop Basket High: ${teleopBasketHighValue}`, {
              duration: 1000,
              position: "bottom-right",
            });
            break;
          case "2":
            const teleopBasketLowValue = (watch("teleopBasketLow") || 0) + 1;
            setValue("teleopBasketLow", teleopBasketLowValue);
            toast.success(`Teleop Basket Low: ${teleopBasketLowValue}`, {
              duration: 1000,
              position: "bottom-right",
            });
            break;
          case "3":
            const teleopChamberHighValue =
              (watch("teleopChamberHigh") || 0) + 1;
            setValue("teleopChamberHigh", teleopChamberHighValue);
            toast.success(`Teleop Chamber High: ${teleopChamberHighValue}`, {
              duration: 1000,
              position: "bottom-right",
            });
            break;
          case "4":
            const teleopChamberLowValue = (watch("teleopChamberLow") || 0) + 1;
            setValue("teleopChamberLow", teleopChamberLowValue);
            toast.success(`Teleop Chamber Low: ${teleopChamberLowValue}`, {
              duration: 1000,
              position: "bottom-right",
            });
            break;
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, setValue, watch]);

  function updateProgress(formValues) {
    const totalRequiredFields = requiredFields.length;
    const completedRequiredFields = requiredFields.filter((fieldName) => {
      const value = formValues[fieldName];
      return value !== undefined && value !== "" && value !== null;
    }).length;
    const newProgress = Math.round(
      (completedRequiredFields / totalRequiredFields) * 100
    );
    setProgress(newProgress);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    trigger().then((result) => {
      if (result) {
        handleSubmit(onSubmit)();
      } else {
        const errorFields = Object.keys(formState.errors)
          .map((field) => field.replace(/([A-Z])/g, " $1").toLowerCase())
          .map((field) =>
            field
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          )
          .join(", ");

        toast.error("Validation Error", {
          description: `Please complete the following fields: ${errorFields}`,
        });
      }
    });
  }

  function getTab(section) {
    switch (section) {
      case "Meta":
        return (
          <MetadataFields control={control} setValue={setValue} watch={watch} />
        );
      case "Auto":
        return <AutonomousFields control={control} setValue={setValue} />;
      case "Teleop":
        return <TeleopFields control={control} setValue={setValue} />;
      case "Endgame":
        return <EndgameFields control={control} />;
      default:
        return null;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <Progress value={progress} className="w-full" />
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            {FORM_SECTIONS.map((tab) => (
              <TabsTrigger
                key={tab.toLowerCase()}
                value={tab.toLowerCase()}
                className="flex items-center justify-center"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          {FORM_SECTIONS.map((section) => (
            <TabsContent
              key={section.toLowerCase()}
              value={section.toLowerCase()}
            >
              {getTab(section)}
            </TabsContent>
          ))}
        </Tabs>
        <Button
          type="submit"
          className="w-full"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? "Submitting..." : "Submit Form"}
        </Button>
      </form>
    </Form>
  );
}
