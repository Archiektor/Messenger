import {UserType} from '../../redux/users-reducer';

type ObjPropsType = {
    followed: boolean,
}

export const updateObjectInArray = (items : Array<UserType>, itemId: string, objPropName: keyof UserType, newObjProps: ObjPropsType) => {
    return items.map(item => {
        if (item[objPropName] === itemId) {
            return {...item, ...newObjProps}
        }
        return item;
    })
}