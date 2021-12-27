import React from 'react';
import { Link } from 'gatsby';
import { Icon } from '@iconify/react';

const LeftBar = () => {
  return (
    <div className="admin-left_bar">
      <Link id="link-create" to="/admin">
          <p className="icon"><Icon icon="akar-icons:plus" /></p>
          <p className="desc">Create</p>
      </Link>
      <Link id="link-rounds" to="/admin/rounds">
          <p className="icon"><Icon icon="ant-design:bar-chart-outlined" /></p>
          <p className="desc">Rounds</p>
      </Link>
      <Link id="link-users" to="/admin/users">
          <p className="icon"><Icon icon="feather:users" /></p>
          <p className="desc">Users</p>
      </Link>
      <Link id="link-airdrop" to="/admin/airdrop">
          <p className="icon"><Icon icon="ic:sharp-pin-drop" /></p>
          <p className="desc">Airdrop</p>
      </Link> 
      <Link id="link-setting" to="/admin/setting">
          <p className="icon"><Icon icon="ant-design:setting-outlined" /></p>
          <p className="desc">Setting</p>
      </Link>
  </div>
  )
};

export default LeftBar;