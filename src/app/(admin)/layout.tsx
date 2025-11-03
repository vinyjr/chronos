"use client";

import { DashboardHeader } from "@/components/DashboardHeader";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCallback, useRef, useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();

  const [isDesktopNavigationExpanded, setIsDesktopNavigationExpanded] =
    useState(true);
  const [isMobileNavigationExpanded, setIsMobileNavigationExpanded] =
    useState(false);

  const isOverMdViewport = useMediaQuery(theme.breakpoints.up("md"));

  const isNavigationExpanded = isOverMdViewport
    ? isDesktopNavigationExpanded
    : isMobileNavigationExpanded;

  const setIsNavigationExpanded = useCallback(
    (newExpanded: boolean) => {
      if (isOverMdViewport) {
        setIsDesktopNavigationExpanded(newExpanded);
      } else {
        setIsMobileNavigationExpanded(newExpanded);
      }
    },
    [
      isOverMdViewport,
      setIsDesktopNavigationExpanded,
      setIsMobileNavigationExpanded,
    ]
  );

  const handleToggleHeaderMenu = useCallback(
    (isExpanded: boolean) => {
      setIsNavigationExpanded(isExpanded);
    },
    [setIsNavigationExpanded]
  );

  const layoutRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Box
        ref={layoutRef}
        sx={{
          position: "relative",
          display: "flex",
          overflow: "hidden",
          height: "100%",
          width: "100%",
        }}
      >
        <DashboardHeader
          logo=""
          title=""
          menuOpen={isNavigationExpanded}
          onToggleMenu={handleToggleHeaderMenu}
        />
        {/* <DashboardSidebar
          expanded={isNavigationExpanded}
          setExpanded={setIsNavigationExpanded}
          container={layoutRef?.current ?? undefined}
        /> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minWidth: 0,
          }}
        >
          <Toolbar sx={{ displayPrint: "none" }} />
        </Box>
      </Box>
    </div>
  );
}
