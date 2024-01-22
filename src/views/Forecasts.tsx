import { observer } from 'mobx-react';
import weatherStore from '../stores/weatherStore';
import { IForecast } from '../types/definitions';
import Card from '../components/card/Card';
import { PageTitle } from '../components/misc/Misc';
import { Link } from 'react-router-dom';

const EmptyState: React.FC = () => {
  return (
    <div className='flex flex-col items-center text-gray-400 font-bold text-4xl text-center'>
      <p>No forecasts available <span className='text-gray-300'>{":("}</span></p>
      <p className='mt-4 lg:mt-1'>
        Start by <Link className='underline text-gray-500' to='/add-forecast'>creating</Link> a new forecast!
      </p>
    </div>
  );
};

const Forecasts: React.FC = observer(() => {
  const forecasts = weatherStore.getForecastsList();

  return (
    <div>
      <PageTitle title="My Forecasts" />
      <div className='flex flex-col lg:items-center'>
        {
          !forecasts.length ? <EmptyState /> :
            <ul className='w-full'>
              {forecasts.map((forecast: IForecast) =>
                <Card key={forecast.id} forecast={forecast} isLoading={weatherStore.isLoading} />
              )}
            </ul>
        }
      </div>
    </div>
  );
});

export default Forecasts;