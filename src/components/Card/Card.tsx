import React from 'react';
import { observer } from 'mobx-react';
import { IForecast } from '../../types/definitions';
import CurrentDayData from './CurrentDayData';
import DailyData from './DailyData';

type Props = {
    forecast: IForecast,
    isLoading: string | boolean;
};

const Card: React.FC<Props> = observer(({ forecast, isLoading }) => {
    return (
        <li className='mb-10 w-full max-w-screen-lg'>
            <div className='flex flex-wrap'>
                <CurrentDayData forecast={forecast} />
                <DailyData forecast={forecast} isLoading={isLoading} />
            </div>
        </li>
    );
});

export default Card;