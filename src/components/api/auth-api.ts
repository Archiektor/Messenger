import {UserDataType} from '../../redux/auth-reducer';
import {CommonResponseType, instance, ResultCodeForCaptcha, ResultCodesEnum} from './api';

type LoginDataType = {
    userId: number
}

export const AuthAPI = {
    authMe: async (): Promise<CommonResponseType<UserDataType>> => {
        try {
            const {data} = await instance.get(`auth/me`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    loginMe: async (email: string, password: string, rememberMe: boolean = false, captcha?: boolean): Promise<CommonResponseType<LoginDataType, ResultCodesEnum | ResultCodeForCaptcha>> => {
        try {
            const {data} = await instance.post(`auth/login`, {
                email: email,
                password: password,
                rememberMe: rememberMe ? rememberMe : false,
                captcha: captcha ? captcha : false,
            });
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    logoutMe: async (): Promise<CommonResponseType> => {
        try {
            const {data} = await instance.delete(`auth/login`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
}