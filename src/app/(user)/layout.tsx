import Header from "@/components/CustomUI/Header";
import Container from "@/containers/Container/Container";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full h-full">
      <Container className="h-full">
        <Header />
        {children}
      </Container>
    </main>
  );
}
