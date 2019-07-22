import fetchAPI from "../utils/api-helper";

// 字段列表，因为有可能是在新增的时候用，所以id不一定存在
export interface ITinypngAccountItemFields {
  id?: number;
  name: string;
  key: string;
  monthlyLimit: number;
}

// id必须存在
export interface ITinypngAccountItem extends ITinypngAccountItemFields {
  id: number;
}

export interface ITinypngAccountItemWithRemain extends ITinypngAccountItem {
  remain: number;
}

interface ITinypngAccountList {
  list: ITinypngAccountItemWithRemain[];
}

/**
 * 获取tinypng账号列表
 */
export const fetchTinypngAccountList = () => {
  const res = fetchAPI("/api/tinypng-account") as Promise<ITinypngAccountList>;
  return res;
};

/**
 * 同步次数
 */
export const syncTinypngAccount = () => {
  const res = fetchAPI("/api/tinypng-account/sync", { method: "POST" });
  return res;
};

/**
 * 删除一个账号
 * @param {number} id
 */
export const removeTinypngAccount = (id: number) => {
  const res = fetchAPI(`/api/tinypng-account/${id}`, { method: "DELETE" });
  return res;
};

/**
 * 添加一个账号
 * @param {ITinypngAccountItemFields} data
 */
export const createTinypngAccount = (data: ITinypngAccountItemFields) => {
  const res = fetchAPI("/api/tinypng-account", { method: "POST", data });
  return res;
};

/**
 * 修改一个账号
 * @param {ITinypngAccountItem} data
 */
export const updateTinypngAccount = (data: ITinypngAccountItem) => {
  const res = fetchAPI(`/api/tinypng-account/${data.id}`, {
    method: "PUT",
    data,
  });
  return res;
};
