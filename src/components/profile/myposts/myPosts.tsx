import React from "react";

import css from "./myposts.module.css";
import Post from "../post";
import {PostType} from "../../../redux/profile-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {CustomTextArea} from "../../common/FormsControl/FormsControl";

type MyPostsType = {
    posts: Array<PostType>,
    addPost: (postMsg: string) => void,
}


const MyPosts: React.FC<MyPostsType> = React.memo(({posts, addPost}) => {

        let postElements = posts.map((post) => {
            return (
                <Post message={post.message} likesCount={post.likesCount} key={post.id}/>
            )
        })

        const onSubmitHandler = (formData: FormDataType) => {
            addPost(formData.newPostMessage);
        }

        return (
            <div className={css.postsBlock}>
                <div className={css.addPostBlock}>
                    <h3>{`Create your post :`}</h3>
                    <MyPostsReduxForm onSubmit={onSubmitHandler}/>
                </div>
                <div className={css.posts}>
                    {postElements}
                </div>
            </div>
        )
    }
)

type FormDataType = {
    newPostMessage: string,
}
type MyPostsFormType = {
    onSubmit: (formData: FormDataType) => void,
}
const maxLength10 = maxLengthCreator(10);

const MyPostsForm: React.FC<InjectedFormProps<FormDataType, MyPostsFormType> & MyPostsFormType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"newPostMessage"} placeholder={`type here:`} component={CustomTextArea}
                       validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const MyPostsReduxForm = reduxForm<FormDataType, MyPostsFormType>({
    form: 'ProfileAddNewPostForm'
})(MyPostsForm)

export default MyPosts;