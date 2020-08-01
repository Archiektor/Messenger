import React from 'react';

import css from './dialogs.module.css';
import DialogItem from './dialogitem/dialogitem';
import Message from './message/message';
import {DialogsPage} from '../../redux/dialogs-reducer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {CustomTextArea} from '../common/FormsControl/FormsControl';
import {maxLengthCreator, required} from '../utils/validators/validators';

type PropsType = {
    dialogsPage: DialogsPage,
    addMessage: (text: string) => void,
    isAuth: boolean,
}
const Dialogs: React.FC<PropsType> = ({dialogsPage, addMessage, isAuth}) => {
    let dialogsElements = dialogsPage.dialogs.map((dialog) => {
        const {key, name, id} = dialog;
        return (<DialogItem name={name} id={id} key={key}/>)
    })
    let messageElements = dialogsPage.messages.map((message) => {
        const {text, id: key} = message;
        return (
            <Message text={text} key={key}/>
        )
    })

    const onSubmitHandler = (formData: FormDataType) => {
        addMessage(formData.newMessageBody);
    }

    return (
        <div className={css.dialogs}>
            <div className={css.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={css.messages}>
                {messageElements}
                <AddMessageReduxForm onSubmit={onSubmitHandler}/>
            </div>
        </div>
    )
}

type FormDataType = {
    newMessageBody: string,
}
type AddMessageFormType = {
    onSubmit: (formData: FormDataType) => void,
}
const maxLength50 = maxLengthCreator(50);

const AddMessageForm: React.FC<InjectedFormProps<FormDataType, AddMessageFormType> & AddMessageFormType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={css.addMsg}>
            <Field name={"newMessageBody"} placeholder={`Enter your message`} component={CustomTextArea}
                   validate={[required, maxLength50]}/>
            <button>Add Message</button>
        </form>
    )
}

const AddMessageReduxForm = reduxForm<FormDataType, AddMessageFormType>({
    form: 'dialogAddMessageForm'
})(AddMessageForm)

export default Dialogs;

