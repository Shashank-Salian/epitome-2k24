import Header from "@/components/CustomUI/Header";
import Container from "@/containers/Container/Container";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full h-screen">
      <Container className="flex_center flex-col h-dvh">
        <Header />
        {children}
      </Container>
    </main>
  );
}
