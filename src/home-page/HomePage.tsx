import { Box } from '@mui/material';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { Outlet } from 'react-router-dom';

function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Outlet />
    </Box>
  );
}

export default HomePage;
