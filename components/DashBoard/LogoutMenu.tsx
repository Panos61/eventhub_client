import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useMeQuery, useLogoutMutation } from '../../src/generated/graphql';
import { setAccessToken } from '../../src/utils/accessToken';

const LogoutMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let body: any = null;
  if (loading) {
    body = null;
  } else if (data && data.me?.username) {
    body = (
      <span style={{ textTransform: 'none', color: '#eeeeee' }}>
        {data.me?.username}
      </span>
    );
  } else {
    body = '';
  }

  return (
    <div>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
        style={{ backgroundColor: 'teal' }}
      >
        {body}
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>My Events</MenuItem>
        <MenuItem onClick={handleClose}>Ρυθμίσεις</MenuItem>
        <MenuItem
          onClick={async () => {
            await logout();
            setAccessToken('');
            await client!.resetStore();
          }}
        >
          Αποσύνδεση
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LogoutMenu;
