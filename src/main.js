/* css libraries */
import "bootstrap/dist/css/bootstrap.css";
import "tippy.js/dist/tippy.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";
// import "sweetalert2/dist/sweetalert2.css";

/* js libraries */
import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import App from "./App";
import tippy from "tippy.js";
// import swal from "sweetalert2";
// import BootstrapVue from "bootstrap-vue";
import { wait } from "./js/utils";
import { info } from "./js/info";
import { language_pack } from "./js/lang";
import draw from "./js/draw";
import { dev_edura } from "./js/dev";
import { service_register } from "./js/service";

// inject to window
window.wait = wait;
window.language_pack = language_pack;
window.info = info;
Vue.prototype.DRAW = draw;

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

Vue.use(Vuex);

/* setup Vuex Store */
const store = new Vuex.Store({
  state: {
    lang: (navigator.language || navigator.userLanguage).substr(0, 2),
    language_pack: language_pack
  }
});

/* setup Vue app */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
  router: router,
  store: store,
  watch: {},
  metaInfo: {
    title: "Clubhouse Avatar Pro"
  }
});

dev_edura();

service_register();
