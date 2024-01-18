import { IWeatherCodeInfo } from "../types/definitions";
import { weatherCodeInfo } from "./constants"

const defaultWeatherCodeErr: IWeatherCodeInfo = {
    code: 999,
    text: 'Error on retrieve weather info',
    iconD: weatherCodeInfo[0].iconD,
    iconN: weatherCodeInfo[0].iconN
}

export function getWeatherCodeInfo(code: number): IWeatherCodeInfo {
    const info = weatherCodeInfo.find(wc => wc.code === code);

    if (!info)
        return defaultWeatherCodeErr

    return info;
}