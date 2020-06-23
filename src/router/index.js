import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        props: true,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        props: true,
        meta: { requiresAuth: ['user'] },
    },
    {
        path: '/strategies/createMACDStrategy',
        name: 'CreateMACDStrategy',
        component: () => import('../views/CreateMACDStrategy.vue'),
        meta: { requiresAuth: ['user'] },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

// TODO: need to make it such that the next api call resulting in 401
// kicks user to login page if in a page that requires auth
router.beforeEach(async (to, from, next) => {
    const roles = to.meta.requiresAuth;

    // does not require login
    if (roles == undefined) {
        next();
        return;
    }

    const userInfo = store.state.userInfo;

    // check if logged in
    if (userInfo.id === null) {
        try {
            await store.dispatch('updateUserInfoAsync');
        } catch (err) {
            next({ name: 'Login', params: { errorMessage: 'Need to login' } });
            return;
        }
    }

    // check if have permission
    let isAuthorised = true;
    for (const role of roles) {
        isAuthorised = isAuthorised && userInfo.roles.includes(role);
    }

    if (!isAuthorised) {
        next({ name: 'Dashboard', params: { errorMessage: 'No permission' } });
        return;
    }

    next();
});

export default router;
