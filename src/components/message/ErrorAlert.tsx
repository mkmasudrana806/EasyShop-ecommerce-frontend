import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

/**
 *
 * @param error error array
 * @returns error alert styled component
 */
const ErrorAlert = ({ error }: { error: string[] }) => {
  return (
    <div>
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        {error.map((err, index) => (
          <AlertDescription key={index}>{err}</AlertDescription>
        ))}
      </Alert>
    </div>
  );
};

export default ErrorAlert;
