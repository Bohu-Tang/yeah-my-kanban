// routesConfig.js
import {lazy} from "react";

const Home = lazy(() => import('../components/home/Home.jsx'))
const Kanban = lazy(() => import('../components/kanban/Kanban.jsx'))

const router = [
    { path: '/', element:Home},
    { path: '/kanban', element:Kanban },
];

export default router;
