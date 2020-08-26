import {instance} from './api';

type GetCaptchaUrlResponseType = { url: string }
export const securityApi = {
    getCaptchaUrl: async (): Promise<GetCaptchaUrlResponseType> => {
        try {
            const {data} = await instance.get(`security/get-captcha-url`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
}