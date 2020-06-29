import React, {ChangeEvent} from "react";

import css from "./myposts.module.css";
import Post from "../post";
import {ActionType, PostType} from "../../../redux/state";

type MyPostsType = {
    // updateNewPostText: (newText: string) => void,
    // addPost: () => void,
    dispatch: (action: ActionType) => void,
    newPostText: string,
    posts: Array<PostType>,
}

// const Myposts: React.FC<MyPostsType> = ({posts, addPost, newPostText, updateNewPostText}) => {
const Myposts: React.FC<MyPostsType> = ({posts, dispatch, newPostText}) => {
    let postElements = posts.map((post) => {
        return (
            <Post message={post.message} likesCount={post.likesCount} key={post.id}/>
        )
    })

    let newTextAreaElement = React.createRef<HTMLTextAreaElement>();


    const addNewPost = () => {
        const node = newTextAreaElement.current;
        if (node) {
            // let text = node.value;
            // addPost();
            dispatch({type: "ADD-POST"})
        }
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // console.dir(e.currentTarget.value)
        let modifiedText = e.currentTarget.value;
        // updateNewPostText(modifiedText);
        dispatch({type: "UPDATE-NEW-POST-TEXT", newText: modifiedText})
    }

    return (
        <div className={css.postsBlock}>
            <div className={css.addPostBlock}>
                <h3>{`Create your post :`}</h3>
                <div>
                    <div>
                        <textarea onChange={(e) => onPostChange(e)} ref={newTextAreaElement} value={newPostText}/>
                    </div>
                    <div>
                        <button onClick={addNewPost}>Add post</button>
                    </div>
                </div>
            </div>
            <div className={css.posts}>
                {postElements}
            </div>
        </div>
    )
}

export default Myposts;