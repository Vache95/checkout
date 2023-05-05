import { FC } from "react";

import { Outlet, useLocation } from "react-router-dom";

import Header from "components/header";

const Layout: FC = (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <div className="wrapper" style={{ backgroundColor: `${pathname === "/" ? "#EFF6FE" : null}` }}>
      <Header />
      <div className="main">
        <Outlet />
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default Layout;
