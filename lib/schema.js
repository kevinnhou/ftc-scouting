import * as z from "zod";

export const formSchema = z.object({
  teamNumber: z.coerce
    .number()
    .int()
    .positive({ message: "Team Number is Required" }),
  teamName: z.string().optional(),
  qualificationNumber: z.coerce
    .number()
    .int()
    .positive({ message: "Qualification Number is Required" }),
  allianceColour: z.enum(["Red", "Blue"], {
    required_error: "Alliance Colour is Required",
  }),
  autoPreload: z.enum(["Specimen", "Sample", "Nothing"], {
    required_error: "Preload Selection is Required",
  }),
  autoBasketHigh: z.coerce.number().int().nonnegative({
    message: "Must be a Non-Negative Integer",
  }),
  autoBasketLow: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Must be a Non-Negative Integer" }),
  autoChamberHigh: z.coerce.number().int().nonnegative({
    message: "Must be a Non-Negative Integer",
  }),
  autoChamberLow: z.coerce.number().int().nonnegative({
    message: "Must be a Non-Negative Integer",
  }),
  autoAscentLevel: z.enum(["Level 1", "N/A"], {
    required_error: "Ascent Level is Required",
  }),
  teleopBasketHigh: z.coerce.number().int().nonnegative({
    message: "Must be a Non-Negative Integer",
  }),
  teleopBasketLow: z.coerce.number().int().nonnegative({
    message: "Must be a Non-Negative Integer",
  }),
  teleopChamberHigh: z.coerce.number().int().nonnegative({
    message: "Must be a Non-Negative Integer",
  }),
  teleopChamberLow: z.coerce.number().int().nonnegative({
    message: "Must be a Non-Negative Integer",
  }),
  teleopCycleTimes: z.array(z.number()),
  endgameAscentLevel: z.enum(["Level 3", "Level 2", "Level 1", "N/A"], {
    required_error: "Ascent Level is Required",
  }),
  endgameAscentTime: z.coerce.number().nonnegative({
    message: "Must be a Non-Negative Integer",
  }),
  extraNotes: z.string().optional(),
});
