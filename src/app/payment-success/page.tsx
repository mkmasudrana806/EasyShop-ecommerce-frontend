import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const PaymentSuccess = () => {
  return (
    <Card className="max-w-md mx-auto my-4">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Payment Successful!
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <CheckCircle className="mx-auto h-24 w-24 text-green-500 mb-4" />
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your order has been successfully
          processed.
        </p>
        <p className="text-gray-600 mb-4">
          An email confirmation has been sent to your registered email address.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentSuccess;
