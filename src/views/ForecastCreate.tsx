import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import weatherStore from '../stores/weatherStore';
import PageTitle from '../components/PageTitle';
import clsx from 'clsx';

const Label: React.FC<{ title: string, children?: ReactNode, className?: string; }> = ({ title, children, className }): React.ReactElement => (
    <label htmlFor={title} className={`mb-2 font-medium capitalize ${className}`}>{children || title}</label>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ id, min, max, value, onChange, ...rest }) => (
    <input
        className='bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5'
        id={id}
        type='number'
        min={min}
        max={max}
        step='0.000001'
        value={value}
        onChange={onChange}
        required
        {...rest}
    />
);

const ForecastCreate: React.FC = observer((): React.ReactElement => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        weatherStore.createForecast();
    };

    const isWindMaxChecked: boolean = weatherStore.customDailyOptions.includes('wind_speed_10m_max');
    const isPrecMaxChecked: boolean = weatherStore.customDailyOptions.includes('precipitation_probability_max');

    return (
        <div>
            <PageTitle title={"Add Forecast"} />

            <form onSubmit={handleSubmit}>
                <div className='grid gap-6 mb-6 md:grid-cols-3'>
                    <div>
                        <Label title='latitude' />
                        <Input
                            id='latitude'
                            min='-90'
                            max='90'
                            value={weatherStore.latitude}
                            onChange={(e) => weatherStore.setLatitude(e.target.value)}
                            placeholder='-23.5558'
                            autoFocus
                        />
                    </div>
                    <div>
                        <Label title='longitude' />
                        <Input
                            id='longitude'
                            min='-180'
                            max='180'
                            value={weatherStore.longitude}
                            onChange={(e) => weatherStore.setLongitude(e.target.value)}
                            placeholder='-46.6396'
                        />
                    </div>

                    <div className='flex flex-col'>
                        <Label title='Custom Daily Options' />

                        <Label title='windmax' className='mb-0 text-sm'>
                            <input checked={isWindMaxChecked} type='checkbox' id='windmax' onChange={(e) => weatherStore.setCustomOption(e.target.checked, 'wind_speed_10m_max')} />
                            <span className='ml-1'>Wind Max</span>
                        </Label>

                        <Label title='precmax' className='text-sm'>
                            <input checked={isPrecMaxChecked} type='checkbox' id='precmax' onChange={(e) => weatherStore.setCustomOption(e.target.checked, 'precipitation_probability_max')} />
                            <span className='ml-1'>Precipitation Max</span>
                        </Label>
                    </div>
                </div>


                <button
                    className={clsx('py-2 px-8 bg-blue-500 bg-opacity-80 rounded text-white shadow-lg',
                        weatherStore.isLoading ? 'bg-blue-300' : 'hover:shadow-none hover:opacity-90'
                    )}
                    disabled={!!weatherStore.isLoading}
                >
                    {weatherStore.isLoading ? 'Loading' : 'Create'}
                </button>
            </form>
        </div>
    );
});

export default ForecastCreate;