import React from "react";
import {AddMessageActionCreator, UpdatenewMessageTextActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {ActionType} from "../../redux/store";

/*const DialogsContainer: React.FC<PropsType> = (props) => {
    const store = React.useContext(StoreContext);

    const {dispatch, getState} = store;
    const state = getState();
    const data = {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText,
    }

    const addMessage = () => {
        dispatch(AddMessageActionCreator())
    }

    const updateNewMessageText = (message: string) => {
        dispatch(UpdatenewMessageTextActionCreator(message))
    }

    return (
        <Dialogs data={data} addMessage={addMessage} updateNewMessageText={updateNewMessageText}/>
    )
}*/

// data={data} addMessage={addMessage} updateNewMessageText={updateNewMessageText}   => !!! props.attribute
let mapStateToProps = (state: AppStateType) => {
    return {
            dialogsPage: state.dialogsPage,
    }
}

// dispatch => do something with state
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addMessage: () => {
            dispatch(AddMessageActionCreator())
        },
        updateNewMessageText: (message: string) => {
            dispatch(UpdatenewMessageTextActionCreator(message))
        },
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;