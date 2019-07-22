import React, { FunctionComponent, useState } from "react";

import { ITinypngAccountItemFields } from "@src/api/tinypng-api";

import "./index.less";

interface IProps {
  data: ITinypngAccountItemFields;
  submitHandler: (data: ITinypngAccountItemFields) => void;
  cancelHandler: () => void;
}

const TinypngItemForm: FunctionComponent<IProps> = ({
  data,
  submitHandler,
  cancelHandler,
}) => {
  const [formData, updateFormData] = useState(data);

  const onUpdate = () => {
    submitHandler(formData);
  };

  const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const key = e.currentTarget.dataset.key as "name" | "key" | "monthlyLimit";
    const value = e.currentTarget.value;
    updateFormData({
      ...formData,
      [key]: key === "monthlyLimit" ? parseInt(value, 10) || 0 : value,
    });
  };

  return (
    <div className="account-itemForm">
      <div className="account-itemForm__content">
        <table className="account-itemForm__table">
          <tbody>
            <tr>
              <th>名称</th>
              <td>
                <input
                  className="account-itemForm__input"
                  type="text"
                  value={formData.name}
                  data-key="name"
                  onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <th>key</th>
              <td>
                <input
                  className="account-itemForm__input"
                  type="text"
                  value={formData.key}
                  data-key="key"
                  onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <th>每月次数</th>
              <td>
                <input
                  className="account-itemForm__input"
                  type="text"
                  value={formData.monthlyLimit}
                  data-key="monthlyLimit"
                  onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button className="account-itemForm__btn" onClick={onUpdate}>
                  提交
                </button>
                <button
                  className="account-itemForm__btn account-itemForm__btn--cancel"
                  onClick={cancelHandler}
                >
                  取消
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TinypngItemForm;
