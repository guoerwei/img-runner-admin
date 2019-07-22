import React, { FunctionComponent, useState } from "react";

import ImageList from "@src/components/ImageList";

const ImagePage: FunctionComponent<{}> = () => {
  return (
    <div className="image-page">
      <ImageList />
    </div>
  );
};

export default ImagePage;
