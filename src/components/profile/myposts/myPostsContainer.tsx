import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";
import MyPosts from './myPosts';
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

/*const MyPostsContainer: React.FC<MyPostsContainerType> = (props) => {
    const store = React.useContext(StoreContext)

    let {posts, newPostText} = store.getState().profilePage;

    const addPost = () => {
        store.dispatch(addPostAC())
    }

    const updateNewPostText = (modifiedText: string) => {
        updateNewPostTextAC(modifiedText);
        store.dispatch(updateNewPostTextAC(modifiedText));
    }

    return (<MyPosts addPost={addPost} updateNewPostText={updateNewPostText} posts={posts} newPostText={newPostText}/>)
}*/

let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: () => dispatch(addPostAC()),
        updateNewPostText: (modifiedText: string) => {
            let action = updateNewPostTextAC(modifiedText);
            dispatch(action);
        },
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;