import axios, { AxiosRequestConfig } from "axios";

// import { ajax } from "rxjs/ajax";
// import { AjaxRequest } from "rxjs/internal/observable/dom/AjaxObservable";
// import { Subject, Subscriber } from "rxjs";
// import { merge } from "rxjs/operators";

class ApiError extends Error {
  public data = [];
}

const fetchAPI = async (
  url: string,
  config: AxiosRequestConfig = {},
  // 目前确实无法判断返回接口具体格式
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const headers = {
    ...(config.headers || {}),
  };
  return new Promise((resolve, reject) => {
    axios({
      ...config,
      ...headers,
      url,
    })
      .then(res => {
        resolve(res.data.data);
      })
      .catch(e => {
        if (e.response && e.response.data) {
          const err = new ApiError(e.response.data.msg);
          err.data = e.response.data.data;
          reject(err);
        } else {
          reject(e);
        }
      });
  });
};

export default fetchAPI;

// interface IAjaxConfig extends AjaxRequest {
//   bodyJsonFields?: string | string[];
// }

// const rxFetch = async (url: string, config: IAjaxConfig = {}) => {
//   const headers = {
//     ...(config.headers || {}),
//     ...(config.bodyJsonFields
//       ? {
//           ["my-json-fields"]:
//             config.bodyJsonFields instanceof Array
//               ? config.bodyJsonFields.join(",")
//               : config.bodyJsonFields,
//         }
//       : {}),
//   };
//   const req$ = ajax({
//     ...config,
//     headers,
//     url,
//   });
//   return new Promise((resolve, reject) => {
//     const subscription = req$.subscribe(
//       res => {
//         resolve(res.response.data);
//       },
//       e => {
//         if (e.response && e.response.data) {
//           const err = new ApiError(e.response.msg);
//           err.data = e.response.data;
//           reject(err);
//         } else {
//           reject(e);
//         }
//       },
//       () => {
//         subscription.unsubscribe();
//       },
//     );
//   });
// };

// export const uploadRequest = (url: string, config: IAjaxConfig = {}) => {
//   const req$ = ajax({
//     ...config,
//     headers: {
//       ...(config.headers || {}),
//       ...(config.bodyJsonFields
//         ? {
//             ["my-json-fields"]:
//               config.bodyJsonFields instanceof Array
//                 ? config.bodyJsonFields.join(",")
//                 : config.bodyJsonFields,
//           }
//         : {}),
//     },
//     url,
//   });
//   return req$;
// };

// export default rxFetch;
