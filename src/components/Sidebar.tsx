import Link from "next/link";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { DRAWER_WIDTH } from "../constants/drawer";
import { usePathname } from "next/navigation";
import { menuItems } from "@/constants/menuItems";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ mobileOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)",
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          px: 2,
          py: 3,
          textAlign: "center",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            margin: "0 auto",
            background: "linear-gradient(135deg, #303633 0%, #8be8cb 100%)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: 700,
            color: "white",
            boxShadow: "0 4px 12px rgba(48, 54, 51, 0.2)",
            fontFamily: "serif",
          }}
        >
          C
        </Box>
      </Box>

      {/* Menu Items */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          px: 1.5,
          py: 3,
        }}
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          const handleItemClick = () => {
            if (mobileOpen) {
              onClose();
            }
          };

          return (
            <Link
              key={item.text}
              href={item.href}
              style={{ textDecoration: "none" }}
              onClick={handleItemClick}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2,
                  py: 1.5,
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  background: active
                    ? "linear-gradient(135deg, #303633 0%, #465b52 100%)"
                    : "transparent",
                  color: active ? "#fff" : "#303633",
                  position: "relative",
                  overflow: "hidden",

                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "4px",
                    background: active ? "#8be8cb" : "transparent",
                    borderRadius: "0 4px 4px 0",
                  },

                  "&:hover": {
                    background: active
                      ? "linear-gradient(135deg, #303633 0%, #465b52 100%)"
                      : "rgba(48, 54, 51, 0.08)",
                    transform: "translateX(4px)",
                    boxShadow: active
                      ? "0 8px 20px rgba(48, 54, 51, 0.15)"
                      : "0 4px 12px rgba(48, 54, 51, 0.08)",
                  },
                }}
              >
                <Icon
                  sx={{
                    fontSize: 22,
                    transition: "all 0.3s ease",
                  }}
                />

                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.text}
                  </Box>
                  <Box
                    sx={{
                      fontSize: "11px",
                      opacity: active ? 0.85 : 0.6,
                      transition: "opacity 0.3s ease",
                      marginTop: "2px",
                    }}
                  >
                    {item.description}
                  </Box>
                </Box>

                {active && (
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#8be8cb",
                      animation:
                        "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                      "@keyframes pulse": {
                        "0%, 100%": { opacity: 1 },
                        "50%": { opacity: 0.5 },
                      },
                    }}
                  />
                )}
              </Box>
            </Link>
          );
        })}
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          px: 2,
          py: 2,
          borderTop: "1px solid #e0e0e0",
          textAlign: "center",
          fontSize: "12px",
          color: "#999",
          background: "#fff",
        }}
      >
        <span>© Chronos 2025</span>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            background: "linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          },
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            background: "linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)",
            borderRight: "1px solid #e0e0e0",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
