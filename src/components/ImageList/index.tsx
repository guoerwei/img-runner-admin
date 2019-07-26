import React, { FunctionComponent, useState, useEffect, useRef } from "react";

import { fetchImageList, queryImageStatus, ImgItem } from "@src/api/img-api";

import ImageItem from "./ImageItem";

interface Props {
  album?: number;
  perPage?: number; // 每页多少
  tickList?: number[]; // 需要轮询的文件列表
}

// eslint-disable-next-line
const style = require("./index.less?module");

interface TickData {
  tickRes: ImgItem[];
}
// 定时查询处理中的图片状态
const useTickData = (
  initList: number[],
): [TickData, React.Dispatch<React.SetStateAction<number[]>>] => {
  const runningList = useRef<number[]>(initList);
  const [tickRes, setTickRes] = useState([] as ImgItem[]);
  const [list, appendToList] = useState([] as number[]);
  const updateRunningList = (list: number[]): void => {
    runningList.current = list;
  };
  useEffect(() => {
    updateRunningList([...runningList.current, ...list]);
  }, [list]);
  useEffect(() => {
    const timer = window.setInterval(async () => {
      if (runningList.current.length) {
        const res = await queryImageStatus(runningList.current);
        const remainIds = res.filter(v => ![7, 8].includes(v.status));
        updateRunningList(remainIds.map(v => v.id));
        setTickRes(res);
      }
    }, 3000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);
  return [{ tickRes }, appendToList];
};

const ImageList: FunctionComponent<Props> = ({
  perPage = 30,
  tickList = [],
}: Props) => {
  const loadMoreEl = useRef<HTMLDivElement>(null);
  const [imageList, setImageList] = useState([] as ImgItem[]);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [{ tickRes }, appendToTickList] = useTickData(tickList);

  const getListData = async (): Promise<void> => {
    const last = imageList.length ? imageList[imageList.length - 1].id : 0;
    const res = await fetchImageList(perPage, last);
    setImageList([...imageList, ...res]);
    setIsLoading(false);
    if (res.length < perPage) {
      setIsEnd(true);
    }
    const toTick = res.filter(v => ![7, 8].includes(v.status)).map(v => v.id);
    appendToTickList(toTick);
  };

  useEffect(() => {
    // tickRes
    console.log("tick");
    if (tickRes.length) {
      setImageList(
        imageList.map(v => {
          const find = tickRes.find(d => d.id === v.id);
          if (find) {
            return find;
          } else {
            return v;
          }
        }),
      );
    }
  }, [tickRes]);

  // 触发加载数据
  useEffect(() => {
    if (isLoading && !isEnd) {
      getListData();
    }
  }, [isLoading, isEnd]);

  // 触发加载更多
  useEffect(() => {
    const scrollHandler = (): void => {
      // 根据滚动条，判断现在是否需要进行加载新数据
      if (isLoading || isEnd || !loadMoreEl.current) {
        return;
      }
      const offsetTop = loadMoreEl.current.offsetTop;
      const containerScrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const containerClientHeight =
        document.body.clientHeight || document.documentElement.clientHeight;
      if (offsetTop < containerClientHeight + containerScrollTop) {
        // 去加载
        setIsLoading(true);
      }
    };
    getListData();
    window.addEventListener("scroll", scrollHandler, false);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.imgList}>
        {imageList.map(v => (
          <ImageItem key={v.id} item={v} />
        ))}
      </div>
      <div className={style.loadMore} ref={loadMoreEl}>
        {isEnd ? "end" : "loading"}
      </div>
    </div>
  );
};

ImageList.prototype.xxx = "zzzzzzzz";

export default ImageList;
