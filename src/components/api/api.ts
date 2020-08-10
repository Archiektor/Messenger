import axios from 'axios';
import {UserType} from '../../redux/users-reducer';
import {UserDataType} from '../../redux/auth-reducer';
import {UserProfileType} from '../../redux/profile-reducer';
import {ProfileDataForm} from '../profile/ProfileDataForm/ProfileDataForm';

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired  = 10,
}

type GetUsersPromiseType = {
    items: Array<UserType>,
    totalCount: 5199,
    error: null
}

type CommonResponseType = {
    data: Object,
    messages: Array<string>,
    resultCode: ResultCodesEnum,
}

export type AuthMeType = {
    data: UserDataType,
    messages: Array<string>,
    resultCode: ResultCodesEnum,
}

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'API-KEY': '89761af2-b44e-410b-ac46-74e0e2e39976',
    }
})

export const UserApi = {
    getUsers: async (currentPage: number, pageSize: number): Promise<GetUsersPromiseType> => {
        try {
            const {data} = await instance.get(`users?page=${currentPage}&count=${pageSize}`)
            // debugger;
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    unfollowUser: async (userId: string): Promise<CommonResponseType> => {
        try {
            const {data} = await instance.delete(`follow/${userId}`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    followUser: async (userId: string): Promise<CommonResponseType> => {
        try {
            const {data} = await instance.post(`follow/${userId}`, {});
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    showProfile: async (userId: string): Promise<UserProfileType> => {
        try {
            const {data} = await instance.get(`profile/${userId ? userId : '9187'}`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }
}

type LoginResponseType = {
    data: {userId: number},
    resultCode: ResultCodesEnum,
    messages: Array<string>,
}

export const AuthAPI = {
    authMe: async (): Promise<AuthMeType> => {
        try {
            const {data} = await instance.get(`auth/me`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    loginMe: async (email: string, password: string, rememberMe: boolean = false, captcha?: boolean) : Promise<LoginResponseType> => {
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

type SavePhotoResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>,
    data: {
        photos: {
            small: string,
            large: string,
        }
    }
}

export const ProfileApi = {
    showProfile: async (userId: number): Promise<UserProfileType> => {
        try {
            const {data} = await instance.get(`profile/${userId ? userId : 9187}`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    getStatus: async (userId: number): Promise<string> => {
        try {
            const {data} = await instance.get(`profile/status/${userId}`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    updateStatus: async (status: string): Promise<CommonResponseType> => {
        try {
            const {data} = await instance.put(`profile/status`, {status: status});
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    savePhoto: async (photoFile: File): Promise<SavePhotoResponseType>  => {
        try {
            const formData = new FormData();
            formData.append('image', photoFile);
            const {data} = await instance.put(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    saveProfile: async (formData: ProfileDataForm) => {
        try {
            const {data} = await instance.put(`profile`, {...formData});
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }
}

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







