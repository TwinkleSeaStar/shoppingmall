// Vue3.x 插件方式封装toast

import { reactive, createApp, h } from "vue";

const state = reactive({
  show: false, // toast元素是否显示
  text: ""
});

const toastVM = createApp({
  setup() {
    return () =>
      h(
        "div",
        {
          // 这里是根据配置显示一样不同的样式
          class: ["lx-toast"],
          style: {
            display: state.show ? "block" : "none",
            backgroundColor: "rgba(0, 0, 0, .75)",
            color: "#fff",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "8px 10px",
            zIndex: "999"
          }
        },
        state.text
      );
  }
});

const toastWrapper = document.createElement("div");
toastWrapper.id = "lx-toast";
document.body.appendChild(toastWrapper);
toastVM.mount("#lx-toast");

export function useToast() {
  return function Toast(msg = '默认文字', duration = 2000) {
    // console.log(msg);
    // 拿到传来的数据
    state.show = true;
    state.text = msg;
    setTimeout(() => {
      state.show = false;
      state.message = '';
    }, duration);
  };
}
