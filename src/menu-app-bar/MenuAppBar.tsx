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

function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { t } = useTranslation();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t('library')}
        </Typography>
        <Button
          variant="contained"
          sx={{ m: 1 }}
          onClick={() => i18n.changeLanguage('en')}
        >
          English (en)
        </Button>
        <Button
          variant="contained"
          sx={{ m: 1 }}
          onClick={() => i18n.changeLanguage('pl')}
        >
          Polski (pl)
        </Button>
        <Box>
          <IconButton
            size="large"
            color="inherit"
            aria-label="account"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ mr: 2 }}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>{t('profile')}</MenuItem>
            <MenuItem onClick={handleClose}>{t('account')}</MenuItem>
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
