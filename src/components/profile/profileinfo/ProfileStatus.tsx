import React, {ChangeEvent, Component} from "react";

type PropsType = {
    status: string,
}

type StateType = {
    editMode: boolean,
    text: string,
}

class ProfileStatus extends Component<PropsType, StateType> {
    state = {
        text: "",
        editMode: false,
    }

    activateEditMode = () => {
        this.setState({...this.state, editMode: true})
    }

    deactivateEditMode = () => {
        this.setState({...this.state, editMode: false})
    }

    onChangeHadler = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, text: e.currentTarget.value})
    }


    render() {
        const {status} = this.props;

        return (
            <div>
                {
                    !this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.state.text ? this.state.text : status}</span>
                    </div>
                }
                {
                    this.state.editMode &&
                    <div>
                        <input autoFocus={true}
                               onChange={this.onChangeHadler}
                               onBlur={this.deactivateEditMode}
                               value={this.state.text ? this.state.text : status}>{}</input>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;