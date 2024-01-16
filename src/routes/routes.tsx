import {
    Navigate
} from "react-router-dom";
import Forecasts from "../views/Forecasts.tsx";
import ForecastCreate from '../views/ForecastCreate.tsx';

export default [
    {
        path: "/",
        element: <Navigate to='/forecasts' />,
        errorElement: "Page not found",
    },
    {
        path: '/forecasts',
        element: <Forecasts />
    },
    {
        path: '/add-forecast',
        element: <ForecastCreate />
    },
]