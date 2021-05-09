import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../pages/Home.vue';
import Dashboard from '../pages/Dashboard.vue';
import Login from '../pages/Login.vue';

Vue.use(VueRouter);

const routes = [
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
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    linkExactActiveClass: 'active',
    routes
});

function isLoggedIn() {
    return localStorage.getItem("auth");
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authOnly)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if(!isLoggedIn()) {
            next({
                path: '/login',
                query: { redirect : to.fullPath }
            });
        }
        else { 
            next(); 
        }
    }

    // if route is only for guest (un-connected user) redirect to dashboard
    else if (to.matched.some(record => record.meta.guestOnly)) {
        if(isLoggedIn()) {
            next({
                path : '/dashboard',
                query: { redirect : to.fullPath }
            });
        }
        else {
            next();
        }
    }

    else {
        next(); // make sure to always call next()!
    }
});

export default router;