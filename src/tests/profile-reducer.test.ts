import profileReducer, {ProfilePage, addPostAC, deletePost} from '../redux/profile-reducer';
import {v1} from 'uuid';


describe("should work correct", () => {
    describe("adding post should work correctly", () => {
        let startState: ProfilePage
        beforeEach(() => {
            startState = {
                posts: [
                    {id: v1(), message: `Hi, how are you ?`, likesCount: 12},
                    {id: v1(), message: `Coffin dance ?`, likesCount: 5},
                    {id: v1(), message: `I'm too bored`, likesCount: 2},
                    {id: v1(), message: `Goint to night fish`, likesCount: 13},
                    {id: v1(), message: `Courage`, likesCount: 0},
                ],
                newPostText: '',
                profile: null,
                status: '',
            }
        })
        test("should successfully adding post", () => {
            let endState = profileReducer(startState, addPostAC(`psyduck`))

            expect(endState.posts.length).toBe(6);
            expect(endState.posts[5].message).toBe(`psyduck`);
        })
    })

    describe("deleting post should work correctly", () => {
        let startState: ProfilePage
        beforeEach(() => {
            startState = {
                posts: [
                    {id: v1(), message: `Hi, how are you ?`, likesCount: 12},
                    {id: v1(), message: `Coffin dance ?`, likesCount: 5},
                    {id: v1(), message: `I'm too bored`, likesCount: 2},
                    {id: `4234-re3v-3131`, message: `Goint to night fish`, likesCount: 13},
                    {id: v1(), message: `Courage`, likesCount: 0},
                ],
                newPostText: '',
                profile: null,
                status: '',
            }
        })
        test("should successfully delete post", () => {

            let endState = profileReducer(startState, deletePost(`4234-re3v-3131`));

            expect(endState.posts.length).toBe(4);
            expect(endState.posts.find(p => p.id === `4234-re3v-3131`)).toBe(undefined);
        })

        test(`shouldn't be change arr.length if passed incorrect id`, () => {

            let endState = profileReducer(startState, deletePost(`123`));

            expect(endState.posts.length).toBe(5);
        })
    })
})