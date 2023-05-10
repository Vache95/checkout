import { FC } from "react";

import { Outlet, useLocation } from "react-router-dom";
import { HOME } from "constant";

import Header from "components/header";

const Layout: FC = (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <div className="wrapper" style={{ backgroundColor: `${pathname === HOME ? "#EFF6FE" : "#fff"}` }}>
      <Header />
      <div className="main">
        <Outlet />
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default Layout;
