import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';

import { Box, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { stringAvatar } from '../utils/CustomAvatar';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Navigation = ({children}) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const routeNavigate = useNavigate();
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontWeight: '700',
                            border: '1px solid white',
                            p: 0.5,
                            borderRadius: 1,
                            cursor: 'pointer'
                        }}
                        onClick={() => routeNavigate('/admin')}
                    >
                        Generate Letter
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* side bar */}
            <Drawer
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                </DrawerHeader>
                <Divider />
               
                <List>
                    <ListItem>
                        <Box sx={{display: "flex", alignItems: "center", mt: 3}}>
                            <Avatar {...stringAvatar('Julie Marcos')} />
                            <Box sx={{display: "flex", flexDirection: "column", mx: 1}}>
                                <Typography>Julie Marcos</Typography>
                                <Typography variant="caption">Managing Director</Typography>
                            </Box>
                        </Box>
                    </ListItem>
                
                </List>
                {/* <Divider /> */}
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => routeNavigate('/admin/users')}>
                            <ListItemIcon>
                                <PeopleOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Users"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => routeNavigate('/admin/disputes')}>
                            <ListItemIcon>
                                <ErrorOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Disputes"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>

            {/* main */}
            <Main open={open}>
                <DrawerHeader />
                {children}
            </Main>
        </Box>
    );
};

export default Navigation;
