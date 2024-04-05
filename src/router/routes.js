import authMiddleware from "@/middleware/authMiddleware";
import AuthView from "@/views/AuthView";
import ListView from "@/views/ListView";
import ItemView from "@/views/ItemView";
import Page404 from "@/views/codePages/Page404";
import Register from "@/views/Register";

const routes = [
    {
        path: '',
        name: 'list',
        component: ListView,
        meta: {
            middleware: authMiddleware
        }
    },
    {
        path: "/login",
        name: "login",
        component: AuthView,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/*",
        component: Page404,
    },
];

export default routes;
