import React, {ChangeEvent, Component} from "react";

export type PropsType = {
    status: string,
    updateStatus: (status: string) => void,
}

export type StateType = {
    editMode: boolean,
    status: string,
}

class ProfileStatus extends Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status,
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if(this.props.status !== prevProps.status){
            this.setState({
                status: this.props.status
            })
        }
    }

    activateEditMode = () => {
        this.setState({...this.state, editMode: true});
    }

    deactivateEditMode = () => {
        this.setState({...this.state, editMode: false});
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        return (
            <div>
                {
                    !this.state.editMode &&
                    <div>
                        <span
                            onDoubleClick={this.activateEditMode}>{this.props.status || "No status"}</span>
                    </div>
                }
                {
                    this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange}
                               autoFocus={true}
                               onBlur={this.deactivateEditMode}
                               value={this.state.status}/>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;