import React from 'react';
import moment, { Moment } from 'moment';
import clsx from 'clsx';
import { getWeatherCodeInfo } from '../../utils/utils';
import { IForecast, IWeatherCodeInfo } from '../../types/definitions';

type Props = {
    forecast: IForecast;
};

const CurrentDayData: React.FC<Props> = ({ forecast }) => {
    const { latitude, longitude, current, current_units, daily, daily_units } = forecast;
    const time: Moment = moment(current.time);
    const currentWeatherCode: IWeatherCodeInfo = getWeatherCodeInfo(current.weather_code);
    const currentWeatherIcon: string = current.is_day ? currentWeatherCode.iconD : currentWeatherCode.iconN;

    return (
        <div className='w-full md:w-1/2 flex'>
            <div className={clsx('rounded-t-lg md:rounded-b-lg sm:rounded-t-lg py-4 px-6 md:py-6 md:px-8 w-full bg-blue-500 opacity-90 text-white',
                !current.is_day && 'bg-gray-900'
            )}>
                <div className='flex justify-between'>
                    <div className='font-bold text-3xl leading-none pb-2'>
                        <div>
                            <span className='opacity-50 mr-1'>Lat</span>
                            {latitude}º
                        </div>
                        <div>
                            <span className='opacity-50 mr-1'>Lon</span>
                            {longitude}º
                        </div>

                    </div>

                    <div className='flex flex-col text-sm items-center'>
                        <span>Last update:</span>
                        <span>{time.format('DD/MM - HH:mm')}</span>
                    </div>
                </div>

                <div className='mt-4 flex'>
                    <div className='flex flex-col w-1/2 items-center justify-center'>
                        <div className='flex justify-center'>
                            <img src={currentWeatherIcon} alt={currentWeatherCode.text} className='w-11/12 lg:w-full' />
                        </div>
                        <strong className='text-3xl lg:text-5xl block font-weight-bolder'>{current.temperature_2m}{current_units.temperature_2m}</strong>
                        <b className='text-2xl block font-bold'>{currentWeatherCode.text}</b>
                    </div>

                    <div className='flex flex-col w-1/2 items-center justify-center'>
                        <span className='text-2xl lg:text-3xl font-bold opacity-50'>max:</span>
                        <span className='text-3xl lg:text-4xl font-bold'>{daily.temperature_2m_max[0]}{daily_units.temperature_2m_max}</span>
                        <span className='text-2xl lg:text-3xl font-bold opacity-50'>min:</span>
                        <span className='text-3xl lg:text-4xl font-bold'>{daily.temperature_2m_min[0]}{daily_units.temperature_2m_min}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentDayData;