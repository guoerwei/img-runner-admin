export const readImg = async (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener(
      "load",
      () => {
        resolve(img);
      },
      false,
    );
    img.addEventListener(
      "error",
      e => {
        reject(e);
      },
      false,
    );
    img.src = src;
  });
};

export const readFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        resolve(reader.result as string);
      },
      false,
    );
    reader.addEventListener(
      "error",
      e => {
        reject(e);
      },
      false,
    );
    reader.readAsDataURL(file);
  });
};

export const readImgFromFile = (file: File): Promise<HTMLImageElement> => {
  return readFile(file).then(str => readImg(str));
};

// export const readBase64FromURL = async (src: string): Promise<string> => {
//   const img = await readImg(src);
//   img.setAttribute("crossOrigin", "Anonymous");
//   const canvas = document.createElement("canvas");
//   const context = canvas.getContext("2d");
//   canvas.width = img.width;
//   canvas.height = img.height;
//   (context as CanvasRenderingContext2D).drawImage(
//     img,
//     0,
//     0,
//     img.width,
//     img.height,
//   );
//   return canvas.toDataURL();
// };

export const readBase64FromURL = async (src: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", src, true);
    xhr.responseType = "blob";
    xhr.addEventListener(
      "load",
      () => {
        if (xhr.status === 200) {
          const reader = new FileReader();
          reader.addEventListener(
            "loadend",
            () => {
              resolve(reader.result as string);
            },
            false,
          );
          reader.readAsDataURL(xhr.response);
        }
      },
      false,
    );
    xhr.addEventListener(
      "error",
      e => {
        reject(e);
      },
      false,
    );
    xhr.send();
  });
};

interface FileSize {
  bytes: number;
  unit: "MB" | "KB" | "B";
  format: string;
}
export const formatFileSize = (bytes: number): FileSize => {
  if (bytes > 1000000) {
    return {
      bytes,
      unit: "MB",
      format: (bytes / (1024 * 1024)).toFixed(2),
    };
  } else if (bytes > 1000) {
    return {
      bytes,
      unit: "KB",
      format: (bytes / 1024).toFixed(2),
    };
  } else {
    return {
      bytes,
      unit: "B",
      format: "" + bytes,
    };
  }
};
