import React, { FunctionComponent, useState, useEffect } from "react";

import { formatFileSize, readImgFromFile } from "@src/utils/file-helper";
import { ICompressConfig, uploadFile } from "@src/api/upload-api";

interface IProps {
  file: File;
  config: ICompressConfig;
  album?: number;
  afterUpladHandler: (name: string) => void;
}

// tslint:disable-next-line
const style = require("./index.less?module");

const UpoadingItem: FunctionComponent<IProps> = ({
  file,
  album,
  config = {},
  afterUpladHandler,
}: IProps) => {
  const [status, setStatus] = useState(1);
  const [preview, setPreview] = useState(null as HTMLImageElement | null);
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState("准备中");

  const fileSize = formatFileSize(file.size);

  useEffect(() => {
    const checkFile = () => {
      if (
        ![
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
          "image/svg+xml",
        ].includes(file.type)
      ) {
        throw new Error("文件格式不正确");
      }
      if (file.size >= 5 * 1024 * 1024) {
        throw new Error("图片尺寸过大");
      }
    };

    const fileHandler = async () => {
      try {
        checkFile();
        const getPreview = await readImgFromFile(file);
        setPreview(getPreview);
        setStatus(2);
        setStatusText("上传中");
        const res = await uploadFile({ file, config, album }, e => {
          setPercent((e.loaded / e.total) * 100);
        });
        setStatus(3);
        setStatusText("上传成功");
        afterUpladHandler(res.name);
      } catch (e) {
        setStatus(4);
        setStatusText(e.message || "处理图片失败");
      }
    };
    fileHandler();
  }, [file]);

  return (
    <div className={style.item}>
      <div
        style={{
          backgroundImage: preview ? `url(${preview.src})` : "",
        }}
      />
      <div>{file.name}</div>
      <div>
        {fileSize.format} {fileSize.unit}
      </div>
      <div
        className={
          status === 1
            ? style.prepare
            : status === 2
            ? style.progress
            : status === 3
            ? style.success
            : style.error
        }
      >
        <div>
          {status === 2 ? `${statusText}: ${percent.toFixed(2)}%` : statusText}
        </div>
        <div className={style.progressBarBg}>
          {status === 2 && (
            <div
              className={style.progressBar}
              style={{ width: `${percent}%` }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpoadingItem;
