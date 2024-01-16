import React, { ChangeEvent } from 'react'
import { observer } from 'mobx-react'
import weatherStore from '../stores/weatherStore'

const ForecastCreate = observer(() => {

    const handleChangeField = (field: 'latitude' | 'longitude', e: ChangeEvent<HTMLInputElement>) => {
        weatherStore.changeField(field, e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        weatherStore.createForecast()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name='latitude'
                    type='number'
                    min='-90'
                    max='90'
                    step='0.000001'
                    value={weatherStore.latitude}
                    onChange={(e) => handleChangeField('latitude', e)}
                    required
                    autoFocus
                />
                <input
                    name='longitude'
                    type='number'
                    min='-180'
                    max='180'
                    step='0.000001'
                    value={weatherStore.longitude}
                    onChange={(e) => handleChangeField('longitude', e)}
                    required
                />
                <button>create</button>
            </form>
        </div>
    )
})

export default ForecastCreate