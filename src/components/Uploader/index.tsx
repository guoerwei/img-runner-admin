import React, { FunctionComponent, useState } from "react";

import { CompressConfig } from "@src/api/upload-api";

import UploadingItem from "./UpoadingItem";

const optimizationLevelGroup = [
  { value: 0, text: "不压缩" },
  { value: 1, text: "轻度压缩" },
  { value: 2, text: "中度压缩" },
  { value: 3, text: "默认" },
  { value: 4, text: "重度压缩" },
];

// eslint-disable-next-line
const style = require("./index.less?module");

interface UploadItem {
  file: File;
  key: number;
}

interface Props {
  album?: number;
}

const Uploader: FunctionComponent<Props> = ({ album }: Props) => {
  const [isDragOver, updateDragOver] = useState(false);
  const [optimizationLevel, setOptimizationLevel] = useState(
    3 as CompressConfig["optimizationLevel"],
  );
  const [uploadList, setUploadList] = useState([] as UploadItem[]);
  const onChangeHandler = async (
    e: React.DragEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    e.preventDefault();
    const target = e.currentTarget;
    target.value = "";
    setUploadList([
      ...uploadList,
      ...Array.from(target.files || []).map(v => ({
        key: Math.random(),
        file: v,
      })),
    ]);
  };
  const onDropHandler = async (
    e: React.DragEvent<HTMLLabelElement>,
  ): Promise<void> => {
    e.preventDefault();
    const target = e.dataTransfer;
    setUploadList([
      ...Array.from(target.files || []).map(v => ({
        key: Math.random(),
        file: v,
      })),
      ...uploadList,
    ]);
  };
  const onDragOverHandler = (e: React.DragEvent<HTMLLabelElement>): void => {
    e.preventDefault();
    updateDragOver(true);
  };
  const onDragLeaveHandler = (e: React.DragEvent<HTMLLabelElement>): void => {
    e.preventDefault();
    updateDragOver(false);
  };
  const onOptimizationLevelChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setOptimizationLevel(parseInt(
      e.currentTarget.value,
      10,
    ) as CompressConfig["optimizationLevel"]);
  };

  const onUploaded = (name: string): void => {
    console.log("on uploaded", name);
  };

  return (
    <div className={style.uploader}>
      <div className={style.container}>
        <label
          className={`${style.label} ${isDragOver ? style.labelDragOver : ""}`}
          onDragEnter={onDragOverHandler}
          onDragOver={onDragOverHandler}
          onDragLeave={onDragLeaveHandler}
          onDrop={onDropHandler}
        >
          <div className={style.labelHint}>
            点此选择图片上传，或将图片拖至此处
          </div>
          <div className={style.labelHint}>
            支持5M以内的 png, jpg, gif, svg, webp
          </div>
          <input
            className={style.fileInput}
            type="file"
            multiple={true}
            accept="image/png,image/jpeg,image/gif,image/webp,image/svg+xml"
            onChange={onChangeHandler}
          />
        </label>
        <div className={style.config}>
          {optimizationLevelGroup.map((v, k) => (
            <div key={k}>
              <label>
                <input
                  type="radio"
                  name="optimizationLevel"
                  value={v.value}
                  checked={v.value === optimizationLevel}
                  onChange={onOptimizationLevelChangeHandler}
                />
                {v.text}
              </label>
            </div>
          ))}
        </div>
      </div>
      {!!uploadList.length && (
        <div className={style.uploading}>
          <div className={style.uploadingContent}>
            {uploadList.map(v => (
              <UploadingItem
                key={v.key}
                file={v.file}
                config={{ optimizationLevel }}
                album={album}
                afterUpladHandler={onUploaded}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Uploader;
