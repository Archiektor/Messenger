import {addNewMessageAC} from "../../redux/dialogs-reducer";
import Dialogs from "./dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {withRedirect} from "../hoc/withRedirect"

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth,
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addMessage: (text: string) => {
            dispatch(addNewMessageAC(text))
        },
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(withRedirect(Dialogs))

export default DialogsContainer;