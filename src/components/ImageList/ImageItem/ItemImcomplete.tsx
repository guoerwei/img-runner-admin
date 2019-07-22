import React, { FunctionComponent } from "react";

import { IImgItem } from "@src/api/img-api";

interface IProps {
  item: IImgItem;
}

const getStatusText = (item: IImgItem) => {
  const map: { [key: number]: string } = {
    1: "待处理",
    2: "压缩中",
    3: "压缩失败",
    4: "待上传",
    5: "发布中",
    6: "发布失败",
    7: "已完成",
    8: "已删除",
  };
  return map[item.status];
};

// tslint:disable-next-line
const style = require("./index.less?module");

const ItemImcomplete: FunctionComponent<IProps> = ({ item }: IProps) => {
  return (
    <div className={style.itemImcomplete}>
      <div>无预览</div>
      <div>{item.name}</div>
      <div />
      <div>{getStatusText(item)}</div>
    </div>
  );
};

export default ItemImcomplete;
