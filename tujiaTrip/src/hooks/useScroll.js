import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "underscore";
export default function useScroll(elRef) {
  // 不传elRef就是监听window滚动，不要把el的height设置为100vh
  let el = window;
  const isReachBottom = ref(false);
  const scrollTop = ref(0);
  const clientHeight = ref(0);
  const scrollHeight = ref(0);
  const scrollListenHandler = throttle(() => {
    // console.log("正在滚动");
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight;
      scrollHeight.value = document.documentElement.scrollHeight;
      scrollTop.value = document.documentElement.scrollTop;
    } else {
      clientHeight.value = el.clientHeight;
      scrollHeight.value = el.scrollHeight;
      scrollTop.value = el.scrollTop;
    }
    console.log(clientHeight.value,scrollTop.value,scrollHeight.value)
    if (scrollTop.value + clientHeight.value >= scrollHeight.value) {
      isReachBottom.value = true;
    }
  });
  onMounted(() => {
    if (elRef) {
      el = elRef.value;
    }
    el.addEventListener("scroll", scrollListenHandler);
  });
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenHandler);
  });

  return { isReachBottom, clientHeight, scrollHeight, scrollTop };
}
