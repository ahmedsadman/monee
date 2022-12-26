import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaidIcon from "@mui/icons-material/Paid";
import AccountBalance from "@mui/icons-material/AccountBalance";

const drawerWidth = 240;

const menuItems = [
  {
    name: "dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "transactions",
    label: "Transactions",
    icon: <PaidIcon />,
  },
  {
    name: "accounts",
    label: "Accounts",
    icon: <AccountBalance />,
  },
];

function SideDrawer() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <MenuItem
            key={item.name}
            name={item.name}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </List>
    </Drawer>
  );
}

function MenuItem(props: MenuItemProps) {
  const { icon, label } = props;
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
}

type MenuItemProps = {
  name: string;
  label: string;
  icon: JSX.Element;
};

export default SideDrawer;
