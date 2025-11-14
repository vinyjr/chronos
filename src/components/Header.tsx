import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
}

export const Header = ({ title = "", onMenuClick }: HeaderProps) => {
  return (
    <AppBar
      variant="outlined"
      color="default"
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Box
          sx={{
            padding: 0,
            textAlign: "center",
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
            }}
          >
            C
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
