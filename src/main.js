/* css libraries */
import "bootstrap/dist/css/bootstrap.css";
import "tippy.js/dist/tippy.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";
// import "sweetalert2/dist/sweetalert2.css";

/* js libraries */
import Vue from "vue";
import App from "./App";
import tippy from "tippy.js";
// import swal from "sweetalert2";
// import BootstrapVue from "bootstrap-vue";

Vue.prototype.window = window;

/* setup Vue plugins */
// Vue.use(BootstrapVue);
// const swalPlugin = {
//     install: function(Vue) {
//         Vue.prototype.$swal = swal;
//         Vue.prototype.$toast = swal.mixin({
//             toast: true,
//             position: "top-end",
//             showConfirmButton: false,
//             timer: 3000,
//             timerProgressBar: true,
//             didOpen: (toast) => {
//                 toast.addEventListener("mouseenter", swal.stopTimer);
//                 toast.addEventListener("mouseleave", swal.resumeTimer);
//             },
//         });
//     },
// };
// Vue.use(swalPlugin);
/* setup Vue plugins */
// Vue.use(BootstrapVue);

const tippyPlugin = {
  install: function(Vue) {
    Vue.prototype.$tip = tippy;
  }
};
Vue.use(tippyPlugin);

/* set Vue config */
Vue.config.productionTip = false;

/* setup Vue app */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
  watch: {},
  metaInfo: {
    title: "Clubhouse Avatar Pro"
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
