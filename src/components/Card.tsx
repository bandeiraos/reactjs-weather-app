import { useState } from 'react'
import { observer } from 'mobx-react'
import moment from 'moment'
import clsx from 'clsx'
import weatherStore from '../stores/weatherStore'
import { getWeatherCodeInfo } from '../utils/utils'
import { IForecast } from '../types/definitions'


type Props = {
    forecast: IForecast
}

const Card = observer(({ forecast }: Props) => {
    const { current, current_units, daily, daily_units } = forecast;

    const time = moment(current.time)
    const currentWeatherCode = getWeatherCodeInfo(current.weather_code);
    const currentWeatherIcon = current.is_day ? currentWeatherCode.iconD : currentWeatherCode.iconN;

    const [selectedDay, setSelectedDay] = useState(0)

    return (
        <li className='mb-10'>
            <div>
                <div className='flex flex-wrap w-full lg:w-auto'>

                    <div className='w-full lg:w-1/2 flex'>
                        <div className={clsx('rounded-t-lg lg:rounded-b-lg sm:rounded-t-lg py-4 px-6 lg:py-6 lg:px-8 w-full bg-blue-500 opacity-90 text-white',
                            !current.is_day && 'bg-gray-900'
                        )}>
                            <div className='flex justify-between'>
                                <div className='font-bold text-3xl leading-none pb-2'>
                                    <div>
                                        <span className='opacity-50 mr-1'>Lat</span>
                                        {forecast.latitude}º
                                    </div>
                                    <div>
                                        <span className='opacity-50 mr-1'>Lon</span>
                                        {forecast.longitude}º
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

                    <div className='w-full lg:w-1/2 flex ml-0'>
                        <div className='lg:my-3 bg-gray-800 text-white p-8 rounded-b-lg lg:rounded-bl-none lg:rounded-r-lg  w-full relative'>
                            <div className='flex mb-4'>
                                {daily.time.map((date: string, i: number) => {
                                    const weatherCodeInfo = getWeatherCodeInfo(daily.weather_code[i]);
                                    const abbrevDayName = moment(date).format('ddd');
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
                                                <img src={weatherCodeInfo.iconD} alt={weatherCodeInfo.text} width={50} />
                                            </div>
                                            <div className='text-center'>
                                                <b className='font-normal'>{abbrevDayName}</b><br />
                                                <strong className='text-xl'>{daily.temperature_2m_max[i]}{daily_units.temperature_2m_max}</strong>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className='bg-gray-700 py-2 px-5 rounded-lg'>
                                {
                                    selectedDay === 0 ?
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


                            <div className='absolute z-10 rounded bg-slate-400 p-2 -top-9 lg:top-2 -right-5 flex flex-col'>
                                {weatherStore.isLoading === forecast.id ? (
                                    <div className='animate-spin'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                    </div>
                                ) : (
                                    <>
                                        <button title='Refresh' onClick={() => weatherStore.refreshForecast(forecast.id, forecast.customOptions)} className='hover:opacity-80 mb-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                            </svg>
                                        </button>
                                        <button title='Delete' onClick={() => weatherStore.removeForecast(forecast.id)} className='hover:opacity-80'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>

                                        </button>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
})

const DailyInfoItem = ({ title, value }: { title: string, value: string }) => {
    return (
        <div className='flex justify-between w-full'>
            <div className='w-auto font-bold uppercase text-90'>{title}</div><div className='w-auto text-right'>{value}</div>
        </div>
    )
}

export default Card;