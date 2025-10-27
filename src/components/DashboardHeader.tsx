"use client";

import MuiAppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  borderWidth: 0,
  borderBottomWidth: 1,
  borderStyle: "solid",
  borderColor: (theme.vars ?? theme).palette.divider,
  boxShadow: "none",
  zIndex: theme.zIndex.drawer + 1,
}));

const LogoContainer = styled("div")({
  position: "relative",
  height: 40,
  display: "flex",
  alignItems: "center",
  "& img": {
    maxHeight: 40,
  },
});

export interface HeaderProps {
  logo?: React.ReactNode;
  title?: string;
  menuOpen?: boolean;
  onToggleMenu?: (open: boolean) => void;
}

export function Header({ logo, title, menuOpen, onToggleMenu }: HeaderProps) {
  return (
    <AppBar color="inherit" position="fixed" sx={{ displayPrint: "none" }}>
      <Toolbar sx={{ backgroundColor: "inherit", boxShadow: 0 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Stack direction="row" alignItems="center">
            {/* <Box sx={{ mr: 1 }}>{getMenuIcon(menuOpen)}</Box> */}
            <Link href="/" style={{ textDecoration: "none" }}>
              <Stack direction="row" alignItems="center">
                {logo ? <LogoContainer>{logo}</LogoContainer> : null}
                {title ? (
                  <Typography
                    variant="h6"
                    color="secondary"
                    sx={{
                      fontWeight: "700",
                      ml: 1,
                      whiteSpace: "nowrap",
                      lineHeight: 1,
                    }}
                  >
                    {title}
                  </Typography>
                ) : null}
              </Stack>
            </Link>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
