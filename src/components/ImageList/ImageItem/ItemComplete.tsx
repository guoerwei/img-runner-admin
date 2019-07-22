import React, { FunctionComponent } from "react";
import copy from "clipboard-copy";

import { formatFileSize, readBase64FromURL } from "@src/utils/file-helper";

import { IImgItem } from "@src/api/img-api";
import { toast, myAlert } from "@src/utils/wedgets-helper";

interface IProps {
  item: IImgItem;
}

// tslint:disable-next-line
const style = require("./index.less?module");

const getPreviewURL = (item: IImgItem) => {
  const name = item.thumb || item.name;
  return `https://${item.path}/${name}`;
};

const ItemComplete: FunctionComponent<IProps> = ({ item }: IProps) => {
  const originSize = formatFileSize(item.originSize);
  const size = formatFileSize(item.size);
  // const showBase64 = item.size < 20 * 1024;
  const showBase64 = true;

  const openImg = () => {
    window.open(`https://${item.path}/${item.name}`);
  };

  const copyImg = async () => {
    try {
      await copy(`https://${item.path}/${item.name}`);
      toast("已经复制至剪贴板");
    } catch (e) {
      await myAlert(`https://${item.path}/${item.name}`);
      toast("复制失败");
    }
  };

  const copyBase64 = async () => {
    const url = `https://${item.path}/${item.name}`;
    const str = await readBase64FromURL(url);
    try {
      await copy(str);
      toast("已经复制至剪贴板");
    } catch (e) {
      await myAlert(str);
      toast("复制失败");
    }
  };

  return (
    <div className={style.itemComplete}>
      <div style={{ backgroundImage: `url(${getPreviewURL(item)})` }} />
      <div>
        <input
          className={style.inputName}
          type="text"
          readOnly={true}
          value={item.name}
        />
      </div>
      <div>
        [{item.width}x{item.height}] ({originSize.format + originSize.unit}-&gt;
        {size.format + size.unit})
      </div>
      <div>
        <a className={style.btn} onClick={openImg}>
          打开
        </a>
        <a className={style.btn} onClick={copyImg}>
          复制
        </a>
        {showBase64 && (
          <a className={style.btn} onClick={copyBase64}>
            BASE64
          </a>
        )}
      </div>
    </div>
  );
};

export default ItemComplete;
