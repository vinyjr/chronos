import { Header } from "@/components/DashboardHeader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* <Sidebar /> */}
      <main style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header title="Chronos" />
        <div style={{ flexGrow: 1, overflowY: "auto" }}>{children}</div>
      </main>
    </div>
  );
}
