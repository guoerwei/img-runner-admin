import fetchAPI from "../utils/api-helper";

export interface ICompressConfig {
  optimizationLevel?: 0 | 1 | 2 | 3 | 4;
}

interface IUploadRes {
  id: number;
  name: string;
}

export const uploadFile = (
  {
    file,
    config,
    album = 0,
  }: { file: File; config: ICompressConfig; album?: number },
  progressHandler: (e: ProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("config", JSON.stringify(config));
  const url = album ? `/api/album/${album}/upload` : "/api/upload";
  const res = fetchAPI(url, {
    method: "POST",
    headers: {
      "my-json-fields": "config",
    },
    data: formData,
    onUploadProgress: progressHandler,
  });
  return res as Promise<IUploadRes>;
};
