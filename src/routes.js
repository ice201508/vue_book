var routes = [
    {
        path: '/',
        redirect: '/book' 
    },
    {
        path: '/',
        component: resolve => require(['./components/layout.vue'], resolve),
        children: [
            {
                path: 'book',
                component: resolve => require(['./components/book.vue'], resolve),
            },
            {
                path: 'book/:id',
                component: resolve => require(['./components/book_detail.vue'], resolve),
            },
            {
                path: 'carts',
                component: resolve => require(['./components/carts.vue'], resolve),
            },
            {
                path: 'order',
                component: resolve => require(['./components/order.vue'], resolve),
            },
        ],
    },
    {
        path: '/login',
        component: resolve=> require(['./components/login.vue'], resolve),
    },
    {
        path: '*',
        redirect: '/' 
    },
];

export default routes;
