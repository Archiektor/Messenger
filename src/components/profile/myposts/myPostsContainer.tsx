import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import {Store} from "redux";
import MyPosts from './myPosts';

type MyPostsContainerType = {
    store: Store,
}

const MyPostsContainer: React.FC<MyPostsContainerType> = (props) => {

    let {posts, newPostText} = props.store.getState().profilePage;

    const addPost = () => {
        props.store.dispatch(addPostActionCreator())
    }

    const updateNewPostText = (modifiedText: string) => {
        updateNewPostTextActionCreator(modifiedText);
        props.store.dispatch(updateNewPostTextActionCreator(modifiedText));
    }

    return (<MyPosts addPost={addPost} updateNewPostText={updateNewPostText} posts={posts} newPostText={newPostText}/>)
}

export default MyPostsContainer;