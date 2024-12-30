import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CheckCircle2 } from "lucide-react";

/**
 * 
 * @param message message want to be displayed
 * @returns success message alert component
 */
const SuccessAlert = ({ message }: { message: string }) => {
  return (
    <Alert
      variant="default"
      className="bg-green-50 text-green-800 border-green-300"
    >
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default SuccessAlert;
