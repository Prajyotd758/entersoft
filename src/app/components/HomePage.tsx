"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { createContext } from "react";
import FloatingBackground from "./Background";

export const sessionContext: React.Context<any> = createContext<any>(null);

export default function HomePage({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <InnerHomePage>{children}</InnerHomePage>
    </SessionProvider>
  );
}

function InnerHomePage({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  return (
    <sessionContext.Provider
      value={{
        session,
        status,
      }}
    >
      <FloatingBackground/>
      {children}
    </sessionContext.Provider>
  );
}
