import { CssBaseline, Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import SideDrawer from "./pages/SideDrawer";

function App() {
  const navigate = useNavigate();

  const navigateToRoute = (routerName: string) => {
    navigate(`/${routerName}`);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <SideDrawer onItemClick={navigateToRoute} />
        <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default App;
