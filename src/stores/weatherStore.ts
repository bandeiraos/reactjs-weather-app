import { runInAction, makeAutoObservable } from "mobx";
import { fetchData, saveForecasts } from "../api/api";
import { IWeatherStore, IForecast, IMessageFeedback, IToast } from "../types/definitions";

class WeatherStore implements IWeatherStore {
    latitude: string = '';
    longitude: string = '';
    isLoading: boolean | string = false;
    forecasts: IForecast[] = [];
    customDailyOptions: string[] = [];
    toastsQueue: IToast[] = [];

    constructor() {
        makeAutoObservable(this);

        this.getForecasts();
    }

    setLatitude = (value: string): void => {
        this.latitude = value;
    };

    setLongitude = (value: string): void => {
        this.longitude = value;
    };

    setCustomOption = (checked: boolean, field: string): void => {
        if (checked) {
            this.customDailyOptions.push(field);
        } else {
            this.customDailyOptions = this.customDailyOptions.filter(o => o !== field);
        }
    };

    getForecasts = (): void => {
        const localStorageForecasts: string | null = localStorage.getItem('forecasts');

        if (localStorageForecasts)
            this.forecasts = JSON.parse(localStorageForecasts);
    };

    createForecast = async (): Promise<void> => {
        runInAction(() => this.isLoading = true);

        await fetchData(this.latitude, this.longitude, this.customDailyOptions, this.showToastMsg);

        runInAction(() => {
            this.getForecasts();
            this.isLoading = false;
        });
    };

    refreshForecast = async (id: string, customOptions: string[]): Promise<void> => {
        const lat: string = id?.split(',')[0],
            lon: string = id?.split(',')[1];

        runInAction(() => this.isLoading = id);

        await fetchData(lat, lon, customOptions, this.showToastMsg);

        runInAction(() => {
            this.getForecasts();
            this.isLoading = false;
        });
    };

    removeForecast = (id: string) => {
        const newForecasts: IForecast[] = this.forecasts.filter((fs: IForecast) => fs.id !== id);

        saveForecasts(newForecasts);
        this.forecasts = newForecasts;
    };

    showToastMsg = (toast: IMessageFeedback) => {
        const id = Math.random();
        const t = { ...toast, id };
        runInAction(() => this.toastsQueue.push(t));
        setTimeout(() => {
            runInAction(() => this.toastsQueue = this.toastsQueue.filter(tq => tq.id !== id));
        }, 2000);
    };
}

const weatherStore = new WeatherStore();
export default weatherStore;