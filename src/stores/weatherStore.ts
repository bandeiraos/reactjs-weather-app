import { runInAction, makeAutoObservable } from "mobx";
import { fetchData, saveForecasts } from "../api/api";
import { IWeatherStore, IForecast } from "../types/definitions";

class WeatherStore implements IWeatherStore {
    latitude: string = '-23.5558';
    longitude: string = '-46.6396';
    isLoading: boolean | string = false;
    forecasts: IForecast[] = [];
    customDailyOptions: string[] = [];

    constructor() {
        makeAutoObservable(this)

        this.getForecasts();
    }

    setLatitude(value: string): void {
        this.latitude = value;
    }

    setLongitude(value: string): void {
        this.longitude = value;
    }

    setCustomOption(checked: boolean, field: string): void {
        console.log('args', { checked, field })

        if (checked) {
            this.customDailyOptions.push(field)
        } else {
            this.customDailyOptions = this.customDailyOptions.filter(o => o !== field);
        }
    }

    getForecasts(): void {
        const localStorageForecasts: string | null = localStorage.getItem('forecasts');

        if (localStorageForecasts)
            this.forecasts = JSON.parse(localStorageForecasts);
    }

    async createForecast(): Promise<void> {
        runInAction(() => this.isLoading = true)

        await fetchData(this.latitude, this.longitude, this.customDailyOptions)

        runInAction(() => {
            this.getForecasts();
            this.isLoading = false
        })
    }

    async refreshForecast(id: string, customOptions: string[]): Promise<void> {
        const lat: string = id?.split(',')[0],
            lon: string = id?.split(',')[1];

        runInAction(() => this.isLoading = id)

        await fetchData(lat, lon, customOptions)

        runInAction(() => {
            this.getForecasts();
            this.isLoading = false
        })
    }

    removeForecast(id: string) {
        const newForecasts: IForecast[] = this.forecasts.filter((fs: IForecast) => fs.id !== id);

        saveForecasts(newForecasts);
        this.forecasts = newForecasts
    }
}

const weatherStore = new WeatherStore();
export default weatherStore;