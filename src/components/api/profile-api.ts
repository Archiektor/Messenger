import {UserProfileType} from '../../redux/profile-reducer';
import {ProfileDataForm} from '../profile/ProfileDataForm/ProfileDataForm';
import {CommonResponseType, instance} from './api';

type SavePhotoResponseType = {
    photos: {
        small: string,
        large: string,
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
            //            const {data} = await instance.get(`profile/${userId ? userId : '9187'}`);
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
    savePhoto: async (photoFile: File): Promise<CommonResponseType<SavePhotoResponseType>> => {
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
    },
}