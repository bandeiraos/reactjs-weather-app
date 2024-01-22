import React, { useState } from 'react';
import { IForecast, IWeatherCodeInfo } from '../../types/definitions';
import moment from 'moment';
import clsx from 'clsx';
import weatherStore from '../../stores/weatherStore';
import { getWeatherCodeInfo } from '../../utils/utils';
import { IconDelete, IconRefresh } from '../misc/Misc';

type DailyInfoItemProps = {
    title: string,
    value: string;
};

type DailyDataProps = {
    forecast: IForecast,
    isLoading: string | boolean;
};

const DailyInfoItem: React.FC<DailyInfoItemProps> = ({ title, value }) => {
    return (
        <div className='flex justify-between w-full'>
            <div className='w-auto font-bold uppercase text-90'>{title}</div><div className='w-auto text-right'>{value}</div>
        </div>
    );
};

const DailyData: React.FC<DailyDataProps> = ({ forecast, isLoading }) => {
    const { current, current_units, daily, daily_units } = forecast;

    const [selectedDay, setSelectedDay] = useState<number>(0);

    return (
        <div className='w-full md:w-1/2 flex ml-0'>
            <div className='md:my-3 bg-gray-800 text-white p-8 rounded-b-lg md:rounded-bl-none md:rounded-r-lg  w-full relative'>
                <div className='flex mb-4'>
                    {daily.time.map((date: string, i: number) => {
                        const dayWeatherCodeInfo: IWeatherCodeInfo = getWeatherCodeInfo(daily.weather_code[i]);
                        const abbrevDayName: string = moment(date).format('ddd');
                        return (
                            <div
                                role='button'
                                title={abbrevDayName}
                                tabIndex={0}
                                key={date}
                                onClick={() => setSelectedDay(i)}
                                onKeyDown={(e) => e.key === 'Enter' ? setSelectedDay(i) : undefined}
                                className={clsx(
                                    'flex flex-col w-1/4 rounded-lg pb-2 mr-2 cursor-pointer hover:bg-opacity-70',
                                    i === selectedDay ? 'bg-gray-700' : 'bg-gray-900'
                                )}>
                                <div className='flex justify-center'>
                                    <img src={dayWeatherCodeInfo.iconD} alt={dayWeatherCodeInfo.text} width={50} />
                                </div>
                                <div className='text-center'>
                                    <b className='font-normal'>{abbrevDayName}</b><br />
                                    <strong className='text-xl'>{daily.temperature_2m_max[i]}{daily_units.temperature_2m_max}</strong>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className='bg-gray-700 py-2 px-5 rounded-lg'>
                    {selectedDay === 0 ?
                        <>
                            <DailyInfoItem title='Precipitation' value={`${current.precipitation_probability}${current_units.precipitation_probability}`} />
                            <DailyInfoItem title='Wind' value={`${current.wind_speed_10m} ${current_units.wind_speed_10m}`} />
                        </> :
                        <>
                            <DailyInfoItem title='Temp. Max' value={`${daily.temperature_2m_max[selectedDay]}${daily_units.temperature_2m_max}`} />
                            <DailyInfoItem title='Temp. Min' value={`${daily.temperature_2m_min[selectedDay]}${daily_units.temperature_2m_min}`} />
                        </>
                    }

                    {daily.precipitation_probability_max &&
                        <DailyInfoItem title='Prec. Max' value={`${daily.precipitation_probability_max[selectedDay]}${daily_units.precipitation_probability_max}`} />}

                    {daily.wind_speed_10m_max &&
                        <DailyInfoItem title='Wind. Max' value={`${daily.wind_speed_10m_max[selectedDay]} ${daily_units.wind_speed_10m_max}`} />
                    }
                </div>


                <div className='absolute z-10 rounded bg-slate-400 p-2 -top-9 md:top-2 -right-5 flex flex-col'>
                    {isLoading === forecast.id ? (
                        <div className='animate-spin'> <IconRefresh /></div>
                    ) : (
                        <>
                            <button title='Refresh' onClick={() => weatherStore.refreshForecast(forecast.id, forecast.customOptions)} className='hover:opacity-80 mb-2'>
                                <IconRefresh />
                            </button>
                            <button title='Delete' onClick={() => weatherStore.removeForecast(forecast.id)} className='hover:opacity-80'>
                                <IconDelete />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DailyData;