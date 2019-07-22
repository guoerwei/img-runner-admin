import React, { FunctionComponent } from "react";

import Uploader from "@src/components/Uploader";

import "./index.less";

const HomePage: FunctionComponent<{}> = () => {
  return (
    <div className="home-page">
      <div className="home-page__uploader">
        <Uploader />
      </div>
    </div>
  );
};

export default HomePage;
