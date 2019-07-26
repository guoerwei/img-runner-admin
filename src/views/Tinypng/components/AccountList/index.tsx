import React, { FunctionComponent } from "react";

import { TinypngAccountItemWithRemain } from "@src/api/tinypng-api";

import "./index.less";

interface Props {
  list: TinypngAccountItemWithRemain[];
  updateHandler: (id: number) => void;
  removeHandler: (id: number) => void;
}

const AccountList: FunctionComponent<Props> = ({
  list,
  updateHandler,
  removeHandler,
}) => {
  if (list.length) {
    const onUpdate = (e: React.SyntheticEvent<HTMLAnchorElement>): void => {
      const id = parseInt(e.currentTarget.dataset.id || "", 10);
      if (id) {
        updateHandler(id);
      }
    };
    const onRemove = (e: React.SyntheticEvent<HTMLAnchorElement>): void => {
      const id = parseInt(e.currentTarget.dataset.id || "", 10);
      if (id) {
        removeHandler(id);
      }
    };
    return (
      <table className="account-list">
        <tbody>
          <tr>
            <th>名称</th>
            <th>key</th>
            <th>每月次数</th>
            <th>剩余次数</th>
            <th>操作</th>
          </tr>
          {list.map(v => (
            <tr key={v.id}>
              <td>{v.name}</td>
              <td>{v.key}</td>
              <td>{v.monthlyLimit}</td>
              <td>{v.remain}</td>
              <td>
                <a
                  className="account-list__btn"
                  data-id={v.id}
                  onClick={onUpdate}
                >
                  编辑
                </a>
                <a
                  className="account-list__btn"
                  data-id={v.id}
                  onClick={onRemove}
                >
                  删除
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return <div className="account-list-empty">暂时没有数据</div>;
  }
};

export default AccountList;
