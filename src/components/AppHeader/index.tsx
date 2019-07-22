import React, { FunctionComponent } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

import "./index.less";

const navConfig = [
  {
    label: "上传",
    link: "/",
  },
  {
    label: "图片",
    link: "/image",
  },
  {
    label: "tinypng账号",
    link: "/tinypng",
  },
];

const AppHeader: FunctionComponent<RouteComponentProps> = props => {
  return (
    <div className="app-header">
      <div className="app-logo">测试用的后台</div>
      <div className="app-nav">
        {navConfig.map((v, k) => (
          <Link
            className={
              "app-nav__item " +
              (v.link === props.location.pathname
                ? "app-nav__item--current"
                : "")
            }
            to={v.link}
            key={k}
          >
            {v.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default withRouter(AppHeader);
