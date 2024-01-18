import { observer } from 'mobx-react'
import weatherStore from '../stores/weatherStore'
import { IForecast } from '../types/definitions'
import Card from '../components/Card'
import PageTitle from '../components/PageTitle'

const Forecasts = observer(() => {

    return (
        <div>
            <PageTitle title={"My Forecasts"} />
            <ul>
                {weatherStore.forecasts.map((forecast: IForecast) => <Card key={forecast.id} forecast={forecast} />)}
            </ul>
        </div>
    )
})

export default Forecasts