import fetchAPI from "../utils/api-helper";

// 字段列表，因为有可能是在新增的时候用，所以id不一定存在
export interface TinypngAccountItemFields {
  id?: number;
  name: string;
  key: string;
  monthlyLimit: number;
}

// id必须存在
export interface TinypngAccountItem extends TinypngAccountItemFields {
  id: number;
}

export interface TinypngAccountItemWithRemain extends TinypngAccountItem {
  remain: number;
}

interface TinypngAccountList {
  list: TinypngAccountItemWithRemain[];
}

/**
 * 获取tinypng账号列表
 */
export const fetchTinypngAccountList = (): Promise<TinypngAccountList> => {
  const res = fetchAPI("/api/tinypng-account") as Promise<TinypngAccountList>;
  return res;
};

/**
 * 同步次数
 */
export const syncTinypngAccount = (): Promise<null> => {
  const res = fetchAPI("/api/tinypng-account/sync", { method: "POST" });
  return res;
};

/**
 * 删除一个账号
 * @param {number} id
 */
export const removeTinypngAccount = (id: number): Promise<null> => {
  const res = fetchAPI(`/api/tinypng-account/${id}`, { method: "DELETE" });
  return res;
};

/**
 * 添加一个账号
 * @param {TinypngAccountItemFields} data
 */
export const createTinypngAccount = (
  data: TinypngAccountItemFields,
): Promise<null> => {
  const res = fetchAPI("/api/tinypng-account", { method: "POST", data });
  return res;
};

/**
 * 修改一个账号
 * @param {TinypngAccountItem} data
 */
export const updateTinypngAccount = (
  data: TinypngAccountItem,
): Promise<null> => {
  const res = fetchAPI(`/api/tinypng-account/${data.id}`, {
    method: "PUT",
    data,
  });
  return res;
};
