import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {path: '/login', component: () => import('@/views/login.vue')},
    {
        path: '/', component: () => import('@/views/main.vue'),
        children: [
            {
                path: 'dashboard', component: () => import('@/views/Dashboard.vue'),
            },
            {
                path: 'user/', component: () => import('@/components/user/user.vue')
            },
            {
                path: 'user/role', component: () => import('@/views/user_role.vue'),
            },
            {
                path: 'user/permission', component: () => import('@/views/user1.vue')
            },
            {
                path: 'personal', component: () => import('@/views/personal.vue')
            },
            {
                path: 'setting', component: () => import('@/views/setting.vue')
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
