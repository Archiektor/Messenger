import {instance} from './api';

type CaptchaUrl = { url: string }
export const securityApi = {
    getCaptchaUrl: async (): Promise<CaptchaUrl> => {
        try {
            const {data} = await instance.get(`security/get-captcha-url`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
}