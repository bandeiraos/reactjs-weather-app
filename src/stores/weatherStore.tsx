import { makeObservable, observable, action } from "mobx";

interface IWeatherStore {
    latitude: string,
    longitude: string,
    changeField: (field: 'latitude' | 'longitude', value: string) => void,
    createForecast: () => void
}

class WeatherStore implements IWeatherStore {
    latitude = ''
    longitude = '';

    constructor() {
        makeObservable(this, {
            latitude: observable,
            longitude: observable,
            changeField: action,
            createForecast: action
        });
    }

    changeField = (field: 'latitude' | 'longitude', value: string) => {
        this[field] = value
    }

    createForecast = () => {
        console.log(`Created: ${this.latitude} _ ${this.longitude}`)
    }
}

const weatherStore = new WeatherStore();
export default weatherStore;