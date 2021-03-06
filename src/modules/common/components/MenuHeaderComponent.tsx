import * as React from 'react';
import {memo} from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Collapse, ListItemButton } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import '../Styles/styles.css'
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

//code library material UI sidebar
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor :'#323259',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  backgroundColor :'#323259',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% )`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    backgroundColor :'#323259',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const MenuHeaderComponent = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [openItem, setOpenItem] = React.useState(false);

  const handleClickItem = () => {
    setOpenItem(!openItem);
    setOpen(true);
  };

  const [openItem2, setOpenItem2] = React.useState(false);

  const handleClickItem2 = () => {
    setOpenItem2(!openItem2);
    setOpen(true);
  };

  return (
    <Box style={{maxWidth : '100%',display:'flex'}}> 
      {/* appbar header web*/}
      <AppBar position="fixed" open={open} sx={{backgroundColor :'#323259',height:'80px'}} className="appbar" >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() =>{
                setOpen(!open)
                setOpenItem(false)
                setOpenItem2(false)
            }}
            edge="start"
            sx={{
              marginRight: '36px',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Gear Focus Admin
          </Typography>
        </Toolbar>
      </AppBar>
  
       {/*sidebar and list icon item, : products,users*/}
      <Drawer variant="permanent" open={open}>
        <List sx ={{ marginTop : '80px' }}  >
          <Divider />
            <ListItemButton onClick={handleClickItem}>
              <ListItemIcon>
                  <ProductionQuantityLimitsIcon sx={{color : 'white'}} />
              </ListItemIcon>
              <ListItemText sx={{color : 'white'}} primary="Orders" />
              {openItem ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openItem} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <Link to="/pages/products/manage-product" style={{color :'white'}}>Products</Link>
                </ListItemButton>
              </List>
            </Collapse>
          <Divider />
            <ListItemButton onClick={handleClickItem2}>
              <ListItemIcon>
                  <AssignmentIndIcon sx={{color : 'white'}} />
              </ListItemIcon>
              <ListItemText sx={{color : 'white'}} primary="User" />
              {openItem2 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openItem2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>       
                  <Link to="/pages/users/manage-user" style={{color :'white'}}>User list</Link>
                </ListItemButton>
              </List>
            </Collapse>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3,margin : '10px' }}>
      </Box>
    </Box>
  );
}



export default React.memo(MenuHeaderComponent);