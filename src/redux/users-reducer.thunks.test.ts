import {actions, followUserThunkCreator, unfollowUserThunkCreator} from './users-reducer';
import {UserApi} from '../components/api/users-api';
import {CommonResponseType, ResultCodesEnum} from '../components/api/api';

jest.mock('../components/api/users-api');
//UserApi - mock fake object
const userApiMock = UserApi as jest.Mocked<typeof UserApi>;
const dispatchMock = jest.fn();
const getStateMock = jest.fn();
const result: CommonResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userApiMock.followUser.mockClear();
    userApiMock.unfollowUser.mockClear();
})

userApiMock.followUser.mockReturnValue(Promise.resolve(result));
userApiMock.unfollowUser.mockReturnValue(Promise.resolve(result));

describe('Thunk test', () => {
    test ('success follow Thunk', async () => {
        const thunk = followUserThunkCreator('123')

        await thunk(dispatchMock, getStateMock, {})
        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.switchIsLoading(true , '123'));
        expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.switchIsLoading(false , '123'));
        expect(dispatchMock).toHaveBeenNthCalledWith(3,actions.followSuccess('123'));
    })

    test ('success unfollow Thunk', async () => {
        const thunk = unfollowUserThunkCreator('123')

        await thunk(dispatchMock, getStateMock, {})
        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.switchIsLoading(true , '123'));
        expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.switchIsLoading(false , '123'));
        expect(dispatchMock).toHaveBeenNthCalledWith(3,actions.unfollowSuccess('123'));
    })
})