import { Box, Button } from '@mui/material';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { Link, Outlet } from 'react-router-dom';

function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Box>
        <Button
          variant="contained"
          component={Link}
          to="booklist"
          sx={{ m: 1 }}
        >
          Book List
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="rentallist"
          sx={{ m: 1 }}
        >
          Rental list
        </Button>
      </Box>
      <Outlet />
    </Box>
  );
}

export default HomePage;
