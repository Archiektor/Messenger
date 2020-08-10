import {addNewMessageAC, DialogsPage} from '../../redux/dialogs-reducer';
import Dialogs from './dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';
import {withRedirect} from '../hoc/withRedirect'

type MapStateToPropsType = {
    dialogsPage: DialogsPage,
    isAuth: boolean,
}

type MapDispatchToPropsType = {
    addMessage: (text: string) => void,
}

let mapStateToProps = (state: AppStateType) : MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth,
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addMessage: (text: string) => {
            dispatch(addNewMessageAC(text))
        },
    }
}

const DialogsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(withRedirect(Dialogs))

export default DialogsContainer;