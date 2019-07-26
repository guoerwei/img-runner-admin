import fetchAPI from "../utils/api-helper";

export interface CompressConfig {
  optimizationLevel?: 0 | 1 | 2 | 3 | 4;
}

interface UploadRes {
  id: number;
  name: string;
}

export const uploadFile = (
  {
    file,
    config,
    album = 0,
  }: { file: File; config: CompressConfig; album?: number },
  progressHandler: (e: ProgressEvent) => void,
): Promise<UploadRes> => {
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
  return res as Promise<UploadRes>;
};
