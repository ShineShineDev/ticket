import { h, resolveComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout";
import AuthService from "@/services/AuthService";

const routes = [
    {
        path: "/",
        redirect: "/pages/login",
    },
    {
        path: "/",
        name: "Home",
        component: DefaultLayout,
        redirect: "/dashboard",
        children: [
            {
                path: "/dashboard",
                name: "Dashboard",
                component: () => import("@/views/Dashboard.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: "/ticket",
                name: "Ticket",
                component: () => import("@/views/pages/ticket/Ticket"),
                meta: { requiresAuth: true },
            },
            {
                path: "/ticket/new",
                name: "NewTicket",
                component: () => import("@/views/pages/ticket/NewTicket"),
                meta: { requiresAuth: true },
            },
            {
                path: "/ticket/show/:id",
                name: "TicketDetail",
                component: () => import("@/views/pages/ticket/TicketDetail"),
                meta: { requiresAuth: true },
            },
            {
                path: "/ticket/update/:id",
                name: "TicketDetail",
                component: () => import("@/views/pages/ticket/Edit"),
                meta: { requiresAuth: true },
            },
            {
                path: "/bus",
                name: "Bus",
                component: () => import("@/views/pages/bus/Bus"),
                meta: { requiresAuth: true },
            },
            {
                path: "/bus/new",
                name: "NewBus",
                component: () => import("@/views/pages/bus/New"),
                meta: { requiresAuth: true },
            },
            {
                path: "/way",
                name: "Way",
                component: () => import("@/views/pages/way/Way"),
                meta: { requiresAuth: true },
            },
            {
                path: "/way/new",
                name: "NewWay",
                component: () => import("@/views/pages/way/New"),
                meta: { requiresAuth: true },
            },
            {
                path: "/passenger",
                name: "Passenger",
                component: () => import("@/views/pages/passenger/Passenger"),
                meta: { requiresAuth: true },
            },
            {
                path: "/passenger/new",
                name: "NewPassenger",
                component: () => import("@/views/pages/passenger/New"),
                meta: { requiresAuth: true },
            },
            {
                path: "/profile",
                name: "Profile",
                component: () => import("@/views/pages/profile/Profile"),
                meta: { requiresAuth: true },
            },
            {
                path: "/IAM",
                name: "IAM",
                component: () => import("@/views/pages/IAM/IAM.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: "/noti-center",
                name: "NotiCenter",
                component: () => import("@/views/pages/noticenter/Noti.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: "/icons",
                name: "Icons",
                component: () => import("@/views/icons/CoreUIIcons.vue"),
                meta: { requiresAuth: true },
            },
        ],
    },
    {
        path: "/pages",
        redirect: "/pages/404",
        name: "Pages",
        component: {
            render() {
                return h(resolveComponent("router-view"));
            },
        },
        children: [
            {
                path: "404",
                name: "Page404",
                component: () => import("@/views/pages/Page404"),
            },
            {
                path: "500",
                name: "Page500",
                component: () => import("@/views/pages/Page500"),
            },
            {
                path: "login",
                name: "Login",
                component: () => import("@/views/pages/Login"),
                meta: { requiresAuth: false },
            },
            {
                path: "register",
                name: "Register",
                component: () => import("@/views/pages/Register"),
                meta: { requiresAuth: false },
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (AuthService.isAuthenticated()) {
            next();
        } else {
            next({ name: "Login" });
        }
    } else {
        if (to.name == "Login" && AuthService.isAuthenticated()) {
            next({ name: "Dashboard" });
        } else if (to.name == "Register" && AuthService.isAuthenticated()) {
            next({ name: "Dashboard" });
        } else {
            next();
        }
    }
});

export default router;
