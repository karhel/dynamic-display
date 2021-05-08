import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../pages/Home.vue';
import Dashboard from '../pages/Dashboard.vue';
import Login from '../pages/Login.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: { authOnly: true }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: { guestOnly: true }
        },
    ]
});

export default router;