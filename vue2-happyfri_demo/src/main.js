// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button } from 'element-ui';
import VueResource from 'vue-resource'
// import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Button);
Vue.use(VueResource)

Vue.config.productionTip = false
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    mounted() {
        this.$http.get('../static/myData,.json')
            .then(
                function(res) {
                    console.log(res.bodyText);
                },
                function() {
                    console.log('检查您的网络')
                });
    }
})