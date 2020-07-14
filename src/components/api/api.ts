import axios from "axios";
import {UserType} from "../../redux/users-reducer";
import {UserDataType} from "../../redux/auth-reducer";
import {UserProfileType} from "../../redux/profile-reducer";

type GetUsersPromiseType = {
    items: Array<UserType>,
    totalCount: 5199,
    error: null
}

type FollowUserType = {
    data: Object,
    messages: Array<string>,
    resultCode: 0,
}

type AuthMeType = {
    data: UserDataType,
    messages: Array<string>,
    resultCode: 0,
}

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "89761af2-b44e-410b-ac46-74e0e2e39976",
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
    unfollowUser: async (userId: string): Promise<FollowUserType> => {
        try {
            // debugger;
            const {data} = await instance.delete(`follow/${userId}`);
            // debugger;
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    followUser: async (userId: string): Promise<FollowUserType> => {
        debugger;
        try {
            const {data} = await instance.post(`follow/${userId}`, {});
            // debugger;
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    showProfile: async (userId: string): Promise<UserProfileType> => {
        try {
            const {data} = await instance.get(`profile/${userId ? userId : "9187"}`);
            // debugger;
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }
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
    loginMe: async (email: string, password: string, rememberMe: boolean = false, captcha?: boolean) => {
        try {
            const {data} = await instance.post(`auth/login`, {
                email: email,
                password: password,
                remeberMe: rememberMe ? rememberMe : false,
                captcha: captcha ? captcha : false,
            });
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    logoutMe: async () => {
        try {
            const {data} = await instance.delete(`auth/login`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
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
        debugger;
        try {
            const {data} = await instance.get(`profile/status/${userId}`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    updateStatus: async (status: string) => {
        try {
            const {data} = await instance.put(`profile/status`, {status: status});
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }
}







