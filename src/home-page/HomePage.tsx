import { Box, Button } from '@mui/material';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation();

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
          {t('bookList')}
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="bookdetailslist"
          sx={{ m: 1 }}
        >
          {t('bookDetailsList')}
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="rentallist"
          sx={{ m: 1 }}
        >
          {t('rentalList')}
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="reviewlist"
          sx={{ m: 1 }}
        >
          {t('reviewList')}
        </Button>
        <Button variant="contained" component={Link} to="bookadd" sx={{ m: 1 }}>
          {t('addBook')}
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="bookdetailsadd"
          sx={{ m: 1 }}
        >
          {t('addBookDetails')}
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="bookdelete"
          sx={{ m: 1 }}
        >
          {t('deleteBook')}
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="rentaladd"
          sx={{ m: 1 }}
        >
          {t('addRental')}
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="rentalend"
          sx={{ m: 1 }}
        >
          {t('endRental')}
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="reviewadd"
          sx={{ m: 1 }}
        >
          {t('addReview')}
        </Button>
        <Button variant="contained" component={Link} to="useradd" sx={{ m: 1 }}>
          {t('addUser')}
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="userdelete"
          sx={{ m: 1 }}
        >
          {t('deleteUser')}
        </Button>
      </Box>
      <Outlet />
    </Box>
  );
}

export default HomePage;
