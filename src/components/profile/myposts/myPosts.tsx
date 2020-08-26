import React from 'react';

import css from './myposts.module.css';
import Post from '../post';
import {PostType} from '../../../redux/profile-reducer';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {required} from '../../utils/validators/validators';
import {createField, CustomTextArea} from '../../common/FormsControl/FormsControl';

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

const MyPostsForm: React.FC<InjectedFormProps<FormDataType, MyPostsFormType> & MyPostsFormType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {
                    createField('newPostMessage', `type here:`, 'textarea', CustomTextArea, [required])
                }
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