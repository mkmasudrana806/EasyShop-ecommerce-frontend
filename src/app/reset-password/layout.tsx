import Loading from "@/components/message/Loading";
import React, { Suspense } from "react";

// meta data
export const metadata = {
  title: "Travel Tips And Destination Guides | Reset Password",
  description:
    "Travel Tips And Destination Guides, Reset Password. User can reset their Password by using this page",
};

// ------------ reset password password page
const layout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default layout;
