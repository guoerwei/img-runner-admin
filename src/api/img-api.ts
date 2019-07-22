import fetchAPI from "../utils/api-helper";

export interface IImgItem {
  id: number;
  name: string;
  originSize: number;
  width: number;
  height: number;
  thumb: string;
  cover: string;
  size: number;
  status: number;
  compressMsg: string;
  uploadMsg: string;
  path: string;
}

/**
 * 获取图片列表
 * @param limit
 * @param last
 */
export const fetchImageList = (limit: number, last: number = 0) => {
  const res = fetchAPI("/api/img", {
    params: {
      limit,
      last,
    },
  });
  return res as Promise<IImgItem[]>;
};

/**
 * 查询图片的状态
 * @param ids
 */
export const queryImageStatus = (ids: number[]) => {
  const res = fetchAPI("/api/img/status", {
    params: {
      imageIds: ids,
    },
    // paramsSerializer(params) {
    //   // node的并不需要进行处理
    //   return params.imageIds.map((v: number) => `imageIds=${v}`).join("&");
    // },
  });
  return res as Promise<IImgItem[]>;
};
