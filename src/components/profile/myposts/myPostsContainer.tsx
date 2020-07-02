import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from './myPosts';
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

/*const MyPostsContainer: React.FC<MyPostsContainerType> = (props) => {
    const store = React.useContext(StoreContext)

    let {posts, newPostText} = store.getState().profilePage;

    const addPost = () => {
        store.dispatch(addPostActionCreator())
    }

    const updateNewPostText = (modifiedText: string) => {
        updateNewPostTextActionCreator(modifiedText);
        store.dispatch(updateNewPostTextActionCreator(modifiedText));
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
        addPost: () => dispatch(addPostActionCreator()),
        updateNewPostText: (modifiedText: string) => {
            let action = updateNewPostTextActionCreator(modifiedText);
            dispatch(action);
        },
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;