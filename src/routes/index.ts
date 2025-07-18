import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";

export const router = Router();

const routesConfig = [
    {
        path: "/user",
        router: UserRoutes,
    },
    {
        path: "/auth",
        router: authRoutes
    }
];

routesConfig.forEach((routeConfig) => {
    router.use(routeConfig.path, routeConfig.router);
});
