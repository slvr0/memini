import React, { useState } from 'react';
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  ListItemIcon,
  ListItemText,
  Typography,
  Box
} from '@mui/material';
import {
  Person,
  Settings,
  Logout,
  Dashboard,
  Notifications
} from '@mui/icons-material';
import MaterialUITheme1Profile from '../../../styling/mui_theme_1/theme-profile';

interface User {
  name: string;
  email: string;
  avatar?: string | null;
}

interface UserProfileCircleProps {
  user?: User;
  onMenuItemClick?: (action: string) => void;
}

const UserProfileCircle: React.FC<UserProfileCircleProps> = ({ 
  user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: null
  },
  onMenuItemClick
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  // Get theme values
  const spacing = MaterialUITheme1Profile.spacingProfiles.roomy;
  const palette = MaterialUITheme1Profile.paletteProfiles.main.light;
  const border = MaterialUITheme1Profile.borderProfiles.straight;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action: string) => {
    if (onMenuItemClick) {
      onMenuItemClick(action);
    } else {
      console.log(`${action} clicked`);
    }
    handleClose();
  };

  const getInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
<IconButton
  onClick={handleClick}
  size="small"
  sx={{ 
    
    p: 0,
    '&:hover': {
      backgroundColor: palette.hover,
    }
  }}
  aria-controls={open ? 'profile-menu' : undefined}
  aria-haspopup="true"
  aria-expanded={open ? 'true' : undefined}
>
  <Avatar
    sx={{
      width: 32,      
      height: 32,       
      bgcolor: 'darkcyan',
      fontSize: '0.75rem',
      opacity:0.75,
    }}
    src={user.avatar || undefined}
  >
    {getInitials(user.name)}
  </Avatar>
</IconButton>

      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            backgroundColor: palette.main,
            border: `${border.borderWidth} solid ${palette.border}`,
            borderRadius: border.borderRadius,
            boxShadow: border.shadow,
            mt: 1.5,
            minWidth: 220,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: palette.main,
              border: `${border.borderWidth} solid ${palette.border}`,
              borderBottom: 'none',
              borderRight: 'none',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* User Info Section */}
        <Box sx={{ 
          px: spacing.px, 
          py: spacing.py, 
          borderBottom: `${border.borderWidth} solid ${palette.border}`,
          backgroundColor: palette.main,
        }}>
          <Typography variant="body2" fontWeight={600} noWrap sx={{ color: palette.text }}>
            {user.name}
          </Typography>
          <Typography variant="caption" sx={{ color: palette.text }} noWrap>
            {user.email}
          </Typography>
        </Box>

        {/* Menu Items */}
        <MenuItem 
          onClick={() => handleMenuItemClick('Profile')}
          sx={{ 
            px: spacing.px,
            py: spacing.py,
            '&:hover': {
              backgroundColor: palette.hover,
              borderColor: palette.borderHover,
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
            <Person fontSize="small" sx={{ color: palette.text }} />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="caption" sx={{ color: palette.text }}>
              Profile
            </Typography>
          </ListItemText>
        </MenuItem>

        <MenuItem 
          onClick={() => handleMenuItemClick('Dashboard')}
          sx={{ 
            px: spacing.px,
            py: spacing.py,
            '&:hover': {
              backgroundColor: palette.hover,
              borderColor: palette.borderHover,
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
            <Dashboard fontSize="small" sx={{ color: palette.text }} />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="caption" sx={{ color: palette.text }}>
              Dashboard
            </Typography>
          </ListItemText>
        </MenuItem>

        <MenuItem 
          onClick={() => handleMenuItemClick('Notifications')}
          sx={{ 
            px: spacing.px,
            py: spacing.py,
            '&:hover': {
              backgroundColor: palette.hover,
              borderColor: palette.borderHover,
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
            <Notifications fontSize="small" sx={{ color: palette.text }} />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="caption" sx={{ color: palette.text }}>
              Notifications
            </Typography>
          </ListItemText>
        </MenuItem>

        <Divider sx={{ borderColor: palette.border }} />

        <MenuItem 
          onClick={() => handleMenuItemClick('Settings')}
          sx={{ 
            px: spacing.px,
            py: spacing.py,
            '&:hover': {
              backgroundColor: palette.hover,
              borderColor: palette.borderHover,
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
            <Settings fontSize="small" sx={{ color: palette.text }} />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="caption" sx={{ color: palette.text }}>
              Settings
            </Typography>
          </ListItemText>
        </MenuItem>

        <MenuItem 
          onClick={() => handleMenuItemClick('Logout')}
          sx={{ 
            px: spacing.px,
            py: spacing.py,
            '&:hover': {
              backgroundColor: palette.hover,
              borderColor: palette.borderHover,
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
            <Logout fontSize="small" sx={{ color: 'error.main' }} />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="caption" sx={{ color: 'error.main' }}>
              Logout
            </Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserProfileCircle;