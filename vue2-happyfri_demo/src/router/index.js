import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/'
import Topic from '../components/Topic/'
import Scope from '../components/Scope/'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/home',
        name: 'Home',
        component: Home
    }, {
        path: '/topic',
        name: 'Topic',
        component: Topic
    }, {
        path: '/scope',
        name: 'Scope',
        component: Scope
    }, {
        path: '/',
        redirect: 'home'
    }]
})