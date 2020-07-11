import {AddMessageAC, UpdatenewMessageTextAC} from "../../redux/dialogs-reducer";
import Dialogs from "./dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {withRedirect} from "../hoc/withRedirect";

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
        dispatch(AddMessageAC())
    }

    const updateNewMessageText = (message: string) => {
        dispatch(UpdatenewMessageTextAC(message))
    }

    return (
        <Dialogs data={data} addMessage={addMessage} updateNewMessageText={updateNewMessageText}/>
    )
}*/

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth,
    }
}

// dispatch => do something with state
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addMessage: () => {
            dispatch(AddMessageAC())
        },
        updateNewMessageText: (message: string) => {
            dispatch(UpdatenewMessageTextAC(message))
        },
    }
}

/*
let mapStateToPropsForRedirect = (state: AppStateType): { isAuth: boolean } => {
    return {
        isAuth: state.auth.isAuth,
    }
}

let RedirectComponent = withRedirect(Dialogs);
RedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);*/

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(withRedirect(Dialogs))

export default DialogsContainer;