import React, { ReactNode } from 'react'
import { observer } from 'mobx-react'
import weatherStore from '../stores/weatherStore'
import PageTitle from '../components/PageTitle'

const ForecastCreate = observer(() => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        weatherStore.createForecast()
    }

    const isWindMaxChecked = !!weatherStore.customDailyOptions.find(o => o === 'wind_speed_10m_max')
    const isPrecMaxChecked = !!weatherStore.customDailyOptions.find(o => o === 'precipitation_probability_max')

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

                        <Label title='windmax' className='mb-0'>
                            <input checked={isWindMaxChecked} type='checkbox' id='windmax' onChange={(e) => weatherStore.setCustomOption(e.target.checked, 'wind_speed_10m_max')} />
                            <span className='ml-1'>Wind Max</span>
                        </Label>

                        <Label title='precmax'>
                            <input checked={isPrecMaxChecked} type='checkbox' id='precmax' onChange={(e) => weatherStore.setCustomOption(e.target.checked, 'precipitation_probability_max')} />
                            <span className='ml-1'>Precipitation Max</span>
                        </Label>
                    </div>
                </div>


                <button className='py-2 px-8 bg-blue-500 rounded text-white shadow-lg hover:shadow-none hover:opacity-90' >Create</button>
            </form>

            {weatherStore.isLoading && <div>Loading</div>}

        </div>
    )
})

const Label = ({ title, children, className }: { title: string, children?: ReactNode, className?: string }) => (
    <label htmlFor={title} className={`block mb-2 text-sm font-medium text-gray-900 capitalize ${className}`}>{children || title}</label>
)

const Input = ({ id, min, max, value, onChange, ...rest }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
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
)

export default ForecastCreate