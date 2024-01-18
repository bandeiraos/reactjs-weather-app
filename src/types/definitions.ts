interface ICurrentUnits {
    time: string,
    interval: string,
    temperature_2m: string,
    precipitation_probability: string,
    wind_speed_10m: string,
    wind_direction_10m: string,
    weather_code: string,
    is_day: string,
}

interface ICurrent {
    time: string,
    interval: number,
    temperature_2m: number,
    precipitation_probability: number,
    wind_speed_10m: number,
    wind_direction_10m: number,
    weather_code: number,
    is_day: string,
}

interface IDailyUnits {
    time: string,
    temperature_2m_max: string,
    temperature_2m_min: string,
    precipitation_probability_max: string,
    weather_code: string,
    wind_speed_10m_max: string
}

interface IDaily {
    time: string[],
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    precipitation_probability_max?: number[],
    weather_code: number[],
    wind_speed_10m_max?: number[]
}

export interface IForecastRaw {
    latitude: number,
    longitude: number,
    generationtime_ms: number,
    utc_offset_seconds: number,
    timezone: string,
    timezone_abbreviation: string,
    elevation: number,
    current_units: ICurrentUnits,
    current: ICurrent,
    daily_units: IDailyUnits,
    daily: IDaily,
}

export interface IForecast extends IForecastRaw {
    id: string,
    customOptions: string[]
}

export interface IMessageFeedback {
    msg: string,
    status: 'success' | 'info' | 'error'
}

export interface IWeatherCodeInfo {
    code: number,
    text: string,
    iconD: string,
    iconN: string
}

export interface IWeatherStore {
    forecasts: IForecast[],
    latitude: string,
    longitude: string,
    isLoading: boolean | string,
    customDailyOptions: string[],
    setLatitude: (value: string) => void,
    setLongitude: (value: string) => void,
    createForecast: () => void,
    removeForecast: (id: string) => void
}