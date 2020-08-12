import axios from 'axios';

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired  = 10,
}

export type CommonResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D,
    messages: Array<string>
    resultCode: ResultCodesEnum,
}

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'API-KEY': '89761af2-b44e-410b-ac46-74e0e2e39976',
    }
})







