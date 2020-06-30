import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from './myPosts';
import StoreContext from "../../../StoreContext";

type MyPostsContainerType = {
}

const MyPostsContainer: React.FC<MyPostsContainerType> = (props) => {
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
}

export default MyPostsContainer;