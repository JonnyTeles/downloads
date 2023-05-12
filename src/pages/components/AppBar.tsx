import * as React from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Face3Icon from '@mui/icons-material/Face3';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';

const pages = ['Início', 'Histórico'];

function ResponsiveAppBar() {
    const router = useRouter();
    const theme = createTheme({
        palette: {
            primary: {
                main: '#6b21a8'
            }
        },
        components: {
          MuiMenuItem: {
            styleOverrides: {
              root: {
               "&:hover": {
                backgroundColor: '#a855f7',
                color: 'white'
               }
              }
            }
          }
        }
    })


  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <ThemeProvider theme={theme}> 
    <AppBar position="static" color='primary'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Face3Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}  />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LULU
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} className="hover:bg-purple-500">
                            <Link href={page === "Início" ? "/" : "/historic"} key={page}>
                  <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Face3Icon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LULU
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                      <Link href={page === "Início" ? "/" : "/historic"} key={page}>
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                className={`hover:bg-purple-500 ${router.pathname === (page === "Início" ? "/" : "/historic") ? "bg-purple-500" : ""}`}
                sx={{ my: 2, color: 'white', display: 'block', m: 1 }}
              >
                {page}
              </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;