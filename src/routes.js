var routes = [
    {
        path: '/',
        component: resolve => require(['./components/layout.vue'], resolve),
        children: [
            {
                path: 'book',
                component: resolve => require(['./components/book.vue'], resolve),
            },
            // {
            //     path: 'book/:id',
            //     component: resolve => require(['./components/book.vue'], resolve),
            // },
        ],
    },
    {
        path: '/login',
        component: resolve=> require(['./components/login.vue'], resolve),
    },
];

export default routes;
