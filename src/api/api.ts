import { IForecast, IForecastRaw, IMessageFeedback } from "../types/definitions";

const URL: string = `https://api.open-meteo.com/v1/forecast?`;
const DEFAULT_PARAMS: string = `current=is_day,weather_code,temperature_2m,precipitation_probability,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,`;
const CONFIG_PARAMS: string = '&timezone=America%2FSao_Paulo&forecast_days=4';

const generateUrl = (lat: string, lon: string, options: string[]): string => {
    const optionsUrl: string = options.join(',');

    return `${URL}latitude=${lat}&longitude=${lon}&${DEFAULT_PARAMS}${optionsUrl}${CONFIG_PARAMS}`;
};

const handleFetchDataError = (toastFn: (toast: IMessageFeedback) => void) => {
    toastFn({
        msg: 'Failed to retrieve data. Try again later.',
        status: 'error'
    });
};

const fetchData = async (
    lat: string,
    lon: string,
    customDailyOptions: string[],
    toastFn: (toast: IMessageFeedback) => void
): Promise<void> => {
    const url: string = generateUrl(lat, lon, customDailyOptions);
    try {
        const response: Response = await fetch(url),
            data: IForecastRaw = await response.json(),
            forecastData: IForecast = { ...data, id: `${lat},${lon}`, customOptions: customDailyOptions };

        prepareDataToSave(forecastData, toastFn);
    } catch (_) {
        handleFetchDataError(toastFn);
    }
};

const prepareDataToSave = (
    forecastData: IForecast,
    toastFn: (toast: IMessageFeedback) => void
): void => {
    const storedForecasts: string | null = localStorage.getItem('forecasts');

    let newForecasts: IForecast[] | [] = [],
        parsedForecasts: IForecast[],
        alreadyExistsIdx: number,
        messageFeedback: IMessageFeedback = {
            msg: 'Card successfully created',
            status: 'success'
        };

    if (storedForecasts) {
        parsedForecasts = JSON.parse(storedForecasts);
        alreadyExistsIdx = parsedForecasts.findIndex(pf => pf.id === forecastData.id);

        if (alreadyExistsIdx !== -1) {
            parsedForecasts[alreadyExistsIdx] = forecastData;
            newForecasts = parsedForecasts;
            messageFeedback = {
                msg: 'Card successfully updated',
                status: 'info'
            };
        } else {
            newForecasts = [...parsedForecasts, forecastData];
        }

    } else {
        newForecasts = [forecastData];
    }

    toastFn(messageFeedback);
    saveForecasts(newForecasts);
};

const saveForecasts = async (forecasts: IForecast[]) => {
    localStorage.setItem('forecasts', JSON.stringify(forecasts));
};

export { fetchData, saveForecasts };