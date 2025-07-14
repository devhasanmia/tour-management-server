import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";

export const router = Router();

const routesConfig = [
    {
        path: "/user",
        router: UserRoutes,
    },
];

routesConfig.forEach((routeConfig) => {
    router.use(routeConfig.path, routeConfig.router);
});
