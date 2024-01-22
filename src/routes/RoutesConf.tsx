import React from "react";
import {
    Navigate,
    Routes,
    Route
} from "react-router-dom";
import Forecasts from "../views/Forecasts";
import ForecastCreate from '../views/ForecastCreate';
import Layout from '../views/Layout';

const RoutesConf: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Navigate to='/forecasts' />} />
                <Route index path='/forecasts' element={<Forecasts />} />
                <Route path='/add-forecast' element={<ForecastCreate />} />
                <Route path="*" element={"Not Found"} />
            </Route>
        </Routes>
    );
};

export default RoutesConf;