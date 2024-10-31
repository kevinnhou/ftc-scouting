"use client";

import { useState, useEffect, useCallback } from "react";

import { formSchema } from "@/lib/schema";
import { loadData, saveData, clearData } from "@/lib/dataManager";

import { QRCodeSVG } from "qrcode.react";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { Upload, TrashIcon } from "lucide-react";

import ScoutingForm from "@/components/form/ScoutingForm";

export default function PWAForm() {
  const { theme, systemTheme } = useTheme();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");
  const [storedSubmissions, setStoredSubmissions] = useState([]);
  const [qrBgColor, setQrBgColor] = useState("#ffffff");
  const [qrFgColor, setQrFgColor] = useState("#000000");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamNumber: undefined,
      teamName: "",
      qualificationNumber: undefined,
      allianceColour: undefined,
      autoPreload: undefined,
      autoBasketHigh: 0,
      autoBasketLow: 0,
      autoChamberHigh: 0,
      autoChamberLow: 0,
      teleopBasketHigh: 0,
      teleopBasketLow: 0,
      teleopChamberHigh: 0,
      teleopChamberLow: 0,
      teleopCycleTimes: [],
      endgameAscentLevel: undefined,
      endgameAscentTime: undefined,
      extraNotes: "",
    },
  });

  const updateQRColors = useCallback(() => {
    const variable = document.documentElement;
    const bg = getComputedStyle(variable)
      .getPropertyValue("--background")
      .trim();
    const fg = getComputedStyle(variable)
      .getPropertyValue("--foreground")
      .trim();
    setQrBgColor(`hsl(${bg})`);
    setQrFgColor(`hsl(${fg})`);
  }, []);

  useEffect(() => {
    setStoredSubmissions(loadData());
    updateQRColors();
    window.addEventListener("theme-change", updateQRColors);
    return () => window.removeEventListener("theme-change", updateQRColors);
  }, [updateQRColors]);

  useEffect(() => {
    updateQRColors();
  }, [theme, systemTheme, updateQRColors]);

  const onSubmit = useCallback(
    (values) => {
      setShowConfirmDialog(false);
      saveData([values]);
      setStoredSubmissions(loadData());

      toast.success("Form Submitted Successfully", {
        description: "Data Saved Locally",
      });

      form.reset();
    },
    [form]
  );

  const handleSubmit = useCallback(() => {
    setShowConfirmDialog(true);
  }, []);

  const handleExport = useCallback(() => {
    const jsonData = JSON.stringify(storedSubmissions);
    setQrCodeData(jsonData);
    updateQRColors();

    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Generating QR Code...",
      success: () => {
        setShowQRModal(true);
        return "QR Code Generated";
      },
      error: "Failed to Generate QR Code",
    });
  }, [storedSubmissions, updateQRColors]);

  const handleClear = useCallback(() => {
    clearData();
    setStoredSubmissions([]);
    setQrCodeData("");
    toast.success("Local Data Cleared Successfully");
  }, []);

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">
            PWA Scouting Form
          </CardTitle>
          <CardDescription className="text-xl text-center">
            Record and Export Data via QR Code
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ScoutingForm
            form={form}
            onSubmit={handleSubmit}
            submitButtonText="Submit Form"
          />
          <div className="mt-6 flex justify-between items-center">
            <div className="flex space-x-2">
              <Button
                onClick={handleExport}
                disabled={storedSubmissions.length === 0}
                size="icon"
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleClear}
                variant="destructive"
                disabled={storedSubmissions.length === 0}
                size="icon"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Stored submissions: {storedSubmissions.length}
            </p>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit this form?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>QR Code</DialogTitle>
            <DialogDescription>Scan to Access Form Data</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-6">
            <QRCodeSVG
              value={qrCodeData}
              bgColor={qrBgColor}
              fgColor={qrFgColor}
              size={256}
            />
          </div>
          <div className="flex justify-center">
            <Button onClick={() => setShowQRModal(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
