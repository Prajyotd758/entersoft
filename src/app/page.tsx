"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sessionContext } from "./components/HomePage";
import { SmallSpinner } from "./components/Spinner";
import LoginPage from "./components/LoginPage";
export default function Home() {
  const router = useRouter();
  const { session, status } = useContext(sessionContext);

  useEffect(() => {
    if (status === "authenticated") {      
      router.replace(`/user/${session?.user?.name}`);
      return;
    }
  }, [status]);

  if (status === "loading") {
    return <SmallSpinner />;
  }

  return <LoginPage />;
}
