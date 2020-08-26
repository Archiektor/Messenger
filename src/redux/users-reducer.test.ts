import usersReducer, {actions, UsersPage} from './users-reducer';

let state: UsersPage;

beforeEach(() => {
    state = {
        users: [
            {
                id: '123', name: 'Nikki', followed: false,
                photos: {small: 'empty', large: 'empty'}, status: 'status 0',
                location: {country: 'Szczecin', city: 'Poland'}
            },
            {
                id: '456', name: 'Dimych', followed: false,
                photos: {small: 'empty', large: 'empty'}, status: 'status 1',
                location: {country: 'Minsk', city: 'Belarus'}
            },
            {
                id: '789', name: 'Anna', followed: true,
                photos: {small: 'empty', large: 'empty'}, status: 'status 2',
                location: {country: 'Szczecin', city: 'Poland'}
            },
            {
                id: '147', name: 'Ignat', followed: true,
                photos: {small: 'empty', large: 'empty'}, status: 'status 3',
                location: {country: 'Moscow', city: 'Russia'}
            }
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        isLoading: false,
        disabledUsers: [],
    }
})

describe('usersReducer work properly ', () => {
    test('follow Success', () => {
        const newState = usersReducer(state, actions.followSuccess('456'))
        expect(newState.users[0].followed).toBeFalsy()
        expect(newState.users[1].followed).toBeTruthy()
    })

    test('unfollow Success', () => {
        const newState = usersReducer(state, actions.unfollowSuccess('147'))
        expect(newState.users[2].followed).toBeTruthy()
        expect(newState.users[3].followed).toBeFalsy()
    })

})