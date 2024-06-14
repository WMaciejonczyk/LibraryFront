import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Gb, Pl } from 'react-flags-select';

function MenuAppBar() {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );
  const [accountAnchorEl, setAccountAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const { t } = useTranslation();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleAccountOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleAccountClose = () => {
    setAccountAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls="menu-buttons-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-buttons-appbar"
            anchorEl={menuAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                navigate('/homepage/booklist');
                handleMenuClose();
              }}
            >
              {t('bookList')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/homepage/bookdetailslist');
                handleMenuClose();
              }}
            >
              {t('bookDetailsList')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/homepage/rentallist');
                handleMenuClose();
              }}
            >
              {t('rentalList')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/homepage/reviewlist');
                handleMenuClose();
              }}
            >
              {t('reviewList')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/homepage/bookadd');
                handleMenuClose();
              }}
            >
              {t('addBook')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/homepage/bookdetailsadd');
                handleMenuClose();
              }}
            >
              {t('addBookDetails')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/homepage/bookupdate');
                handleMenuClose();
              }}
            >
              {t('updateBook')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/homepage/bookdelete');
                handleMenuClose();
              }}
            >
              {t('deleteBook')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/homepage/rentaladd');
                handleMenuClose();
              }}
            >
              {t('addRental')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/homepage/rentalend');
                handleMenuClose();
              }}
            >
              {t('endRental')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/homepage/reviewadd');
                handleMenuClose();
              }}
            >
              {t('addReview')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/homepage/useradd');
                handleMenuClose();
              }}
            >
              {t('addUser')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/homepage/userupdate');
                handleMenuClose();
              }}
            >
              {t('updateUser')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/homepage/userdelete');
                handleMenuClose();
              }}
            >
              {t('deleteUser')}
            </MenuItem>
          </Menu>
        </Box>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t('library')}
        </Typography>
        <Button
          variant="contained"
          sx={{ m: 1 }}
          onClick={() => i18n.changeLanguage('en')}
        >
          English{' '}
          <Box sx={{ ml: 1 }}>
            <Gb />
          </Box>
        </Button>
        <Button
          variant="contained"
          sx={{ m: 1 }}
          onClick={() => i18n.changeLanguage('pl')}
        >
          Polski{' '}
          <Box sx={{ ml: 1 }}>
            <Pl />
          </Box>
        </Button>
        <Box>
          <IconButton
            size="large"
            color="inherit"
            aria-label="account"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAccountOpen}
            sx={{ mr: 2 }}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={accountAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(accountAnchorEl)}
            onClose={handleAccountClose}
          >
            <MenuItem onClick={handleAccountClose}>{t('profile')}</MenuItem>
            <MenuItem onClick={handleAccountClose}>{t('account')}</MenuItem>
            <MenuItem onClick={() => navigate('/login')}>
              {t('logOut')}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MenuAppBar;
