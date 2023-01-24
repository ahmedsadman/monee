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

function SideDrawer(props: SideDrawerProps) {
  const { onItemClick } = props;
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
            handleClick={onItemClick}
          />
        ))}
      </List>
    </Drawer>
  );
}

function MenuItem(props: MenuItemProps) {
  const { icon, label, name, handleClick } = props;
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => handleClick(name)}>
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
  handleClick: (name: string) => void;
};

type SideDrawerProps = {
  onItemClick: (name: string) => void;
};

export default SideDrawer;
