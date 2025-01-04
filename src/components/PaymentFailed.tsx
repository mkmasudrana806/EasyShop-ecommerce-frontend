import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PaymentFailed = () => (
  <Card className="max-w-md mx-auto">
    <CardHeader>
      <CardTitle className="text-2xl text-center text-red-500">
        Payment Failed!
      </CardTitle>
    </CardHeader>
    <CardContent className="text-center">
      <XCircle className="mx-auto h-24 w-24 text-red-500 mb-4" />
      <p className="text-gray-600 mb-4">
        We re sorry, but your payment could not be processed.
      </p>
      <p className="text-gray-600 mb-4">
        Please check your payment details and try again. If the issue persists,
        contact our support team.
      </p>
    </CardContent>
    <CardFooter className="flex justify-center space-x-4">
      <Button asChild>
        <Link href="/products">Browse more products</Link>
      </Button>
      <Button asChild variant="outline">
        <Link href="/contact-support">Contact Support</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default PaymentFailed;
