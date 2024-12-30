"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useRegisterUserMutation,
  useRegisterVendorMutation,
} from "@/redux/features/auth/authApi";
import { ErrorResponse } from "@/types/ErrorResponse";
import ErrorAlert from "@/components/message/ErrorAlert";
import SuccessAlert from "@/components/message/SuccessAlert";
import { TUser } from "@/types/userType";

const RegisterPage = () => {
  // --------------- redux ---------------
  const [registerVendor] = useRegisterVendorMutation();
  const [registerUser] = useRegisterUserMutation();

  // --------------- react ---------------
  const [user, setUser] = useState<Partial<TUser>>({
    name: "",
    email: "",
    age: "",
    gender: "male",
    contact: "",
    address: "",
    password: "",
  });
  const [vendor, setVendor] = useState({
    shopName: "Arifa",
    description: "Arifa shop provides modern clothing",
    address: "Kanchan",
    contact: "0723423982",
  });
  const [confirmPassword, setConfirmPassword] = useState("masud");
  const [role, setRole] = useState("user");
  const [step, setStep] = useState(1);

  const [file, setFile] = useState<File | any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  // ------------ handle file upload -----------------------
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    } else {
      setError(["no file section"]);
    }
  };

  // ------------- handle register -------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError([]);

    if (user.password !== confirmPassword) {
      setError(["Passwords do not match"]);
      return;
    }

    if (role === "vendor" && step === 1) {
      setStep(2);
      return;
    }

    try {
      const vendorData = {
        userData: {
          ...user,
        },
        ...vendor,
      };
      const data = new FormData();

      // if register as user
      if (role === "user" && step === 1) {
        const { userData } = vendorData;
        data.append("file", file);
        data.append("data", JSON.stringify(userData));

        setIsLoading(true);
        await registerUser(data).unwrap();
        setIsLoading(false);

        // if register as vendor
      } else {
        data.append("file", file);
        data.append("data", JSON.stringify(vendorData));

        setIsLoading(true);
        await registerVendor(data).unwrap();
        setIsLoading(false);
      }
      setSuccessMessage("Register successful! Redirecting to login page...");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      (err as ErrorResponse).data.errorSources.forEach((err) => {
        setError((prevErrors) => [...prevErrors, err.message]);
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            Register for <span className="text-blue-600 ">EasyShop</span>{" "}
          </CardTitle>
          <CardDescription>
            Create your account to start shopping or selling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {step === 1 && (
                <>
                  {/* full name */}
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  {/* email  */}
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  {/* age  */}
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      min={0}
                      max={150}
                      placeholder="Enter your age"
                      value={user.age}
                      onChange={(e) =>
                        setUser({ ...user, age: Number(e.target.value) })
                      }
                      required
                    />
                  </div>
                  {/* gender  */}
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={user.gender}
                      onValueChange={(value) =>
                        setUser({
                          ...user,
                          gender: value as "male" | "female" | "others",
                        })
                      }
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* contact  */}
                  <div>
                    <Label htmlFor="contact">Contact</Label>
                    <Input
                      id="contact"
                      type="number"
                      placeholder="Enter your contact"
                      value={user.contact}
                      onChange={(e) =>
                        setUser({ ...user, contact: e.target.value })
                      }
                      required
                    />
                  </div>
                  {/* address  */}
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Enter your address"
                      value={user.address}
                      onChange={(e) =>
                        setUser({ ...user, address: e.target.value })
                      }
                      required
                    />
                  </div>
                  {/* password  */}
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      required
                    />
                  </div>
                  {/* confirm password  */}
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  {/* register mode  */}
                  <div>
                    <Label>Register as</Label>
                    <RadioGroup
                      value={role}
                      onValueChange={setRole}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="user" id="user" />
                        <Label htmlFor="user">User</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vendor" id="vendor" />
                        <Label htmlFor="vendor">Vendor</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </>
              )}
              {/* shop details  */}
              {step === 2 && role === "vendor" && (
                <>
                  {/* shop name  */}
                  <div>
                    <Label htmlFor="shopName">Shop Name</Label>
                    <Input
                      id="shopName"
                      type="text"
                      placeholder="Enter your shop name"
                      value={vendor.shopName}
                      onChange={(e) =>
                        setVendor({
                          ...vendor,
                          shopName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {/* shop description  */}
                  <div>
                    <Label htmlFor="description">Shop Description</Label>
                    <Input
                      id="description"
                      type="text"
                      placeholder="Describe your shop"
                      value={vendor.description}
                      onChange={(e) =>
                        setVendor({
                          ...vendor,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {/* shop address  */}
                  <div>
                    <Label htmlFor="address">Shop Address</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Enter your shop address"
                      value={vendor.address}
                      onChange={(e) =>
                        setVendor({
                          ...vendor,
                          address: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {/* contact number  */}
                  <div>
                    <Label htmlFor="contact">Contact Number</Label>
                    <Input
                      id="contact"
                      type="tel"
                      placeholder="Enter your contact number"
                      value={vendor.contact}
                      onChange={(e) =>
                        setVendor({
                          ...vendor,
                          contact: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {/* shop logo  */}
                  <div>
                    <Label htmlFor="contact">Upload shop logo</Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </>
              )}
              {/* error show  */}
              {error.length > 0 && <ErrorAlert error={error} />}
              {/* success message  */}
              {successMessage && <SuccessAlert message={successMessage} />}
              {/* submit button  */}
              <Button type="submit" className="w-full">
                {role === "vendor" && step === 1
                  ? "Next"
                  : isLoading
                  ? "Registering..."
                  : "Register"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/login" className="text-sm ">
            Already have an account?{" "}
            <span className="text-blue-600 hover:underline">Login</span>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
