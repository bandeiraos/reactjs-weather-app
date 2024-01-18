import { IForecast, IForecastRaw, IMessageFeedback } from "../types/definitions";

const URL = `https://api.open-meteo.com/v1/forecast?`;
const DEFAULT_PARAMS = `current=is_day,weather_code,temperature_2m,precipitation_probability,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,`;
const CONFIG_PARAMS = '&timezone=America%2FSao_Paulo&forecast_days=4'

function generateUrl(lat: string, lon: string, options: string[]): string {
    const optionsUrl = options.join(',');

    return `${URL}latitude=${lat}&longitude=${lon}&${DEFAULT_PARAMS}${optionsUrl}${CONFIG_PARAMS}`
}

export async function fetchData(lat: string, lon: string, customDailyOptions: string[]): Promise<void> {
    const url: string = generateUrl(lat, lon, customDailyOptions),
        response: Response = await fetch(url),
        data: IForecastRaw = await response.json(),
        forecastData: IForecast = { ...data, id: `${lat},${lon}`, customOptions: customDailyOptions }

    prepareDataToSave(forecastData);
}

function prepareDataToSave(forecastData: IForecast) {
    const storedForecasts: string | null = localStorage.getItem('forecasts');

    let newForecasts: IForecast[] | [] = [],
        parsedForecasts: IForecast[],
        alreadyExistsIdx: number,
        messageFeedback: IMessageFeedback = {
            msg: 'Card successfully created',
            status: 'success'
        }

    if (storedForecasts) {
        parsedForecasts = JSON.parse(storedForecasts);
        alreadyExistsIdx = parsedForecasts.findIndex(pf => pf.id === forecastData.id)

        if (alreadyExistsIdx !== -1) {
            parsedForecasts[alreadyExistsIdx] = forecastData
            newForecasts = parsedForecasts;
            messageFeedback = {
                msg: 'Card successfully updated',
                status: 'info'
            }
        } else {
            newForecasts = [...parsedForecasts, forecastData]
        }

    } else {
        newForecasts = [forecastData]
    }

    console.log('messageFeedback', messageFeedback)
    saveForecasts(newForecasts);
}

export async function saveForecasts(forecasts: IForecast[]) {
    localStorage.setItem('forecasts', JSON.stringify(forecasts))
}