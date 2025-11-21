import { ReactElement } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCardIcon from '@mui/icons-material/AddCard';

interface menuItemsProps {
  text: string;
  icon: (props: any) => ReactElement;
  href: string;
  description: string;
}
[];

export const menuItems = [
  {
    text: "Dashboard",
    icon: DashboardIcon,
    href: "/dashboard",
    description: "Visão geral",
  },
  {
    text: "Funcionários",
    icon: PeopleAltIcon,
    href: "/employees",
    description: "Gerenciar equipe",
  },
  {
    text: "Cartões de ponto",
    icon: AddCardIcon,
    href: "/cards",
    description: "Gerenciar cartões",
  },
  {
    text: "Configurações",
    icon: SettingsIcon,
    href: "/dashboard/settings",
    description: "Preferências",
  },
] as menuItemsProps[];