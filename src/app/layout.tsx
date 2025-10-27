import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Fira_Sans_Condensed } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles/theme";

const fire_sans = Fira_Sans_Condensed({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fire-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={fire_sans.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
