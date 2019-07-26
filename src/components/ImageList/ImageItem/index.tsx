import React, { FunctionComponent } from "react";

import { ImgItem } from "@src/api/img-api";

import ItemComplete from "./ItemComplete";
import ItemImcomplete from "./ItemImcomplete";

interface Props {
  item: ImgItem;
}

const ImageItem: FunctionComponent<Props> = ({ item }: Props) => {
  if (item.status === 7) {
    return <ItemComplete item={item} />;
  } else {
    return <ItemImcomplete item={item} />;
  }
};

export default ImageItem;
