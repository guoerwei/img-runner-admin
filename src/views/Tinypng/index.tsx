import React, { FunctionComponent, useEffect, useState } from "react";

import "./index.less";

import {
  createTinypngAccount,
  fetchTinypngAccountList,
  syncTinypngAccount,
  updateTinypngAccount,
  removeTinypngAccount,
  TinypngAccountItem,
  TinypngAccountItemFields,
  TinypngAccountItemWithRemain,
} from "@src/api/tinypng-api";

import { toast, myConfirm, loading } from "@src/utils/wedgets-helper";

import AccountList from "./components/AccountList";
import ItemForm from "./components/ItemForm";

const TinypngPage: FunctionComponent<{}> = () => {
  const [itemFormData, setItemForm] = useState(
    null as null | TinypngAccountItemFields,
  );
  const [accountList, updateAccountList] = useState(
    [] as TinypngAccountItemWithRemain[],
  );

  /**
   * 初始化数据
   */
  const getListDataHandler = async (): Promise<void> => {
    try {
      const res = await fetchTinypngAccountList();
      updateAccountList(res.list);
    } catch (e) {
      toast(
        (e.message || "请求失败") + (e.data ? `: ${e.data.join(",")}` : ""),
      );
    }
  };

  /**
   * init
   */
  useEffect(() => {
    getListDataHandler();
  }, []);

  /**
   * 同步次数
   */
  const syncHandler = async (): Promise<void> => {
    loading.show();
    try {
      await syncTinypngAccount();
      toast("更新完成");
    } catch (e) {
      toast(e.message || "更新失败");
    } finally {
      loading.hide();
    }
  };

  /**
   * 打开修改的弹窗
   * @param id
   */
  const openUpdaterHandler = async (id: number): Promise<void> => {
    const data = accountList.find(v => v.id === id);
    if (data) {
      setItemForm(data);
    }
  };

  /**
   * 关闭修改的弹窗
   */
  const closeItemFormHandler = (): void => {
    setItemForm(null);
  };

  /**
   * 打开新增的弹窗
   */
  const openCreatorHandler = (): void => {
    setItemForm({ name: "", key: "", monthlyLimit: 0 });
  };

  /**
   * 提交
   * @param {TinypngAccountItemFields} data
   */
  const submitItemFormHandler = async (
    data: TinypngAccountItemFields,
  ): Promise<void> => {
    loading.show();
    try {
      if (data.id) {
        await updateTinypngAccount(data as TinypngAccountItem);
      } else {
        await createTinypngAccount(data);
      }
      await getListDataHandler();
      closeItemFormHandler();
    } catch (e) {
      toast(
        (e.message || "请求失败") + (e.data ? `: ${e.data.join(",")}` : ""),
      );
    } finally {
      loading.hide();
    }
  };

  /**
   * 删除一个账号
   * @param {number} id
   */
  const removeHandler = async (id: number): Promise<void> => {
    if (await myConfirm("确认删除")) {
      loading.show();
      try {
        await removeTinypngAccount(id);
        await getListDataHandler();
      } catch (e) {
        toast(
          (e.message || "请求失败") + (e.data ? `: ${e.data.join(",")}` : ""),
        );
      } finally {
        loading.hide();
      }
    }
  };

  return (
    <div className="tinypng-page">
      <div className="tinypng-page__title">tinypng账号管理</div>
      <div className="tinypng-page__tips">
        因为tinypng每个免费账号一个月只能传500张，这边可以多准备几个账号备用
      </div>
      <div className="tinypng-page__btns">
        <button className="tinypng-page__btn" onClick={openCreatorHandler}>
          添加
        </button>
        <button className="tinypng-page__btn" onClick={syncHandler}>
          更新次数
        </button>
      </div>
      <div className="tinypng-page__list">
        <AccountList
          list={accountList}
          updateHandler={openUpdaterHandler}
          removeHandler={removeHandler}
        />
      </div>
      {itemFormData && (
        <ItemForm
          data={itemFormData}
          submitHandler={submitItemFormHandler}
          cancelHandler={closeItemFormHandler}
        />
      )}
    </div>
  );
};

export default TinypngPage;
