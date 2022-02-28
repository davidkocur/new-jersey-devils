import { useEffect, useState } from "react";
import { debounce } from "../../Utils/Common";

const useResizeContent = () => {
  const [newSize, setNewSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const onResize = () => {
      console.log("new window width = " + window.innerWidth);
      setNewSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", debounce(onResize));
  }, []);

  return newSize;
};

export default useResizeContent;
