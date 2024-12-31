"use client";
import { setCookie } from "cookies-next";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import verifyToken from "@/utils/verifyToken";
import { TUser } from "@/types/userType";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import SuccessAlert from "@/components/message/SuccessAlert";
import ErrorAlert from "@/components/message/ErrorAlert";
import { ErrorResponse } from "@/types/ErrorResponse";

// ------------- login page  --------------------
const LoginPage = () => {
  // ----------- redux --------------------
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  // ---------- react   --------------------
  const [formData, setFormData] = useState({
    email: "masud@gmail.com",
    password: "masud",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  // ----------- handle change input ----------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ----------------- validation form
  const validateForm = () => {
    if (!formData.email.trim())
      setError((prev) => [...prev, "Email is required"]);
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      setError((prev) => [...prev, "Email is invalid"]);
    if (!formData.password)
      setError((prev) => [...prev, "Password is required"]);

    return error.length > 0 ? false : true;
  };

  // handle submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const result: any = await login(formData).unwrap();

      const user = verifyToken(result?.data?.data?.accessToken) as TUser;
      dispatch(setUser({ user, token: result?.data?.data?.accessToken }));

      // Set a persistent cookie for user role, expires in 1 year
      setCookie("role", user.role, { maxAge: 60 * 60 * 24 * 365, path: "/" });

      setSuccessMessage("Login successful! Redirecting to home page...");
      setIsLoading(false);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      (err as ErrorResponse).data?.errorSources?.forEach((err) => {
        setError((prevErrors) => [...prevErrors, err.message]);
      });
    }
  };

  return (
    <div className="container max-w-md mx-auto my-8">
      <Card>
        <CardHeader>
          <CardTitle>
            Login to{" "}
            <span className="text-2xl font-bold text-blue-600">EasyShop</span>
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {/* error show  */}
            {error.length > 0 && <ErrorAlert error={error} />}
            {/* success message  */}
            {successMessage && <SuccessAlert message={successMessage} />}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-sm  ">
            Do not have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot your password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
