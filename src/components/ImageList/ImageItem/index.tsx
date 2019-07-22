import React, { FunctionComponent } from "react";

import { IImgItem } from "@src/api/img-api";

import ItemComplete from "./ItemComplete";
import ItemImcomplete from "./ItemImcomplete";

interface IProps {
  item: IImgItem;
}

const ImageItem: FunctionComponent<IProps> = ({ item }: IProps) => {
  if (item.status === 7) {
    return <ItemComplete item={item} />;
  } else {
    return <ItemImcomplete item={item} />;
  }
};

export default ImageItem;
