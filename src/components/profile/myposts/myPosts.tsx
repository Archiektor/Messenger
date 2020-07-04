import React, {ChangeEvent} from "react";

import css from "./myposts.module.css";
import Post from "../post";
import {PostType} from "../../../redux/profile-reducer";

type MyPostsType = {
    // profilePage: ProfilePage,
    posts: Array<PostType>,
    newPostText: string,
    addPost: () => void,
    updateNewPostText: (str: string) => void,
}


const MyPosts: React.FC<MyPostsType> = ({posts, addPost, updateNewPostText, newPostText}) => {
    let postElements = posts.map((post) => {
        return (
            <Post message={post.message} likesCount={post.likesCount} key={post.id}/>
        )
    })

    let newTextAreaElement = React.createRef<HTMLTextAreaElement>();

    const addNewPost = () => {
        const node = newTextAreaElement.current;
        if (node) {
            addPost();
        }
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let modifiedText = e.currentTarget.value;
        updateNewPostText(modifiedText);

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

export default MyPosts;