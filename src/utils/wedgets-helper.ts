/**
 * 将字符串转成dom
 * @param str
 */
const str2dom = (str: string): Element | null => {
  if (
    typeof Range === "undefined" ||
    !Range.prototype.createContextualFragment
  ) {
    const container = document.createElement("div");
    const dom = document.createElement("div");
    container.appendChild(dom);
    dom.outerHTML = str;
    return container.firstElementChild;
  } else {
    return document.createRange().createContextualFragment(str)
      .firstElementChild;
  }
};

interface ToastOption {
  // type?: "notice" | "error" | "success";
  duration?: number;
}

/**
 * toast
 * @param msg
 * @param options
 * @param options.duration
 */
export const toast = (
  msg: string,
  { duration = 2000 }: ToastOption = {},
): void => {
  // eslint-disable-next-line
  const style = require("@src/styles/wedgets/toast.less?module");
  const dom = str2dom(`<div class="${style.toast}">
    <div class="${style.msg}">${msg}</div>
  </div>`);
  if (dom) {
    document.body.appendChild(dom);
    setTimeout(() => {
      document.body.removeChild(dom);
    }, duration);
  }
};

interface BaseMsgboxOption {
  showMask?: boolean;
  showClose?: boolean;
}

interface MyAlertOption extends BaseMsgboxOption {
  okText?: string;
}

interface MyConfimOption extends BaseMsgboxOption {
  okText?: string;
  cancelText?: string;
}

interface MsgboxOption extends MyAlertOption, MyConfimOption {
  showOk?: boolean;
  showCancel?: boolean;
}

const getMsgBoxHTML = (
  msg: string,
  {
    showMask = false,
    okText = "确认",
    cancelText = "取消",
    showClose = true,
    showOk = true,
    showCancel = false,
  }: MsgboxOption,
): string => {
  // eslint-disable-next-line
  const style = require("@src/styles/wedgets/msgbox.less?module");
  const closeBtn = showClose ? `<a class="${style.close} J_close">X</a>` : "";
  const content = `<div class="${style.content}">${msg}</div>`;
  const okBtn = showOk
    ? `<button class="${style.okBtn} J_ok">${okText}</button>`
    : "";
  const cancelBtn = showCancel
    ? `<button class="${style.cancelBtn} J_cancel">${cancelText}</button>`
    : "";
  const msgbox = `<div class="${style.msgbox} J_msgbox">
    <div class="${style.title}">${closeBtn}</div>
    ${content}
    <div class="${style.btns}">${okBtn}${cancelBtn}</div>
  </div>`;
  return showMask
    ? `<div class="${style.mask}">${msgbox}</div>`
    : `<div>${msgbox}</div>`;
};

export const myAlert = (
  msg: string,
  { showMask = true, okText = "确认", showClose = false }: MyAlertOption = {},
): Promise<boolean> => {
  return new Promise(resolve => {
    const dom = str2dom(
      getMsgBoxHTML(msg, {
        okText,
        showClose,
        showMask,
        showOk: true,
      }),
    ) as Element;
    const msgEle = dom.querySelector(".J_msgbox");
    const closeEle = dom.querySelector(".J_close");
    const okEle = dom.querySelector(".J_ok");
    const clickHandler = (e: MouseEvent): void => {
      if (e.target) {
        const target = e.target as Element;
        const isOutOfMsg =
          msgEle &&
          msgEle !== target &&
          !(
            msgEle.compareDocumentPosition(target) &
            Node.DOCUMENT_POSITION_CONTAINED_BY
          );
        if (target === okEle || target === closeEle || isOutOfMsg) {
          document.removeEventListener("click", clickHandler);
          document.body.removeChild(dom);
          resolve(true);
        }
      }
    };
    document.addEventListener("click", clickHandler, false);
    document.body.appendChild(dom);
  });
};

export const myConfirm = (
  msg: string,
  {
    showMask = true,
    okText = "确认",
    cancelText = "取消",
    showClose = false,
  }: MyConfimOption = {},
): Promise<boolean> => {
  return new Promise(resolve => {
    const dom = str2dom(
      getMsgBoxHTML(msg, {
        cancelText,
        okText,
        showCancel: true,
        showClose,
        showMask,
        showOk: true,
      }),
    ) as Element;
    const msgEle = dom.querySelector(".J_msgbox");
    const closeEle = dom.querySelector(".J_close");
    const okEle = dom.querySelector(".J_ok");
    const cancelEle = dom.querySelector(".J_cancel");
    const clickHandler = (e: MouseEvent): void => {
      if (e.target) {
        const target = e.target as Element;
        const isOutOfMsg =
          msgEle &&
          msgEle !== target &&
          !(
            msgEle.compareDocumentPosition(target) &
            Node.DOCUMENT_POSITION_CONTAINED_BY
          );
        if (
          target === okEle ||
          target === cancelEle ||
          target === closeEle ||
          isOutOfMsg
        ) {
          if (target === okEle) {
            resolve(true);
          } else if (
            target === cancelEle ||
            target === closeEle ||
            isOutOfMsg
          ) {
            resolve(false);
          }
          document.removeEventListener("click", clickHandler);
          document.body.removeChild(dom);
        }
      }
    };
    document.addEventListener("click", clickHandler, false);
    document.body.appendChild(dom);
  });
};

export const loading = {
  dom: (() => {
    // eslint-disable-next-line
    const style = require("@src/styles/wedgets/loading.less?module");
    return str2dom(`<div class="${style.loading}"></div>`);
  })(),
  show() {
    if (this.dom) {
      document.body.appendChild(this.dom);
    }
  },
  hide() {
    if (this.dom) {
      document.body.removeChild(this.dom);
    }
  },
};
