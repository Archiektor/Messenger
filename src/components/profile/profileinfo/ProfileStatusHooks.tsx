import React, {ChangeEvent, useEffect, useState} from "react";

type PropsType = {
    status: string,
    updateStatus: (status: string) => void,
}

const ProfileStatusHooks: React.FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(props.status);

    useEffect(() => {
        console.log(`#2 componentDidUpdate`);
        // setStatus(prev => props.status)
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {
                !editMode &&
                <div>
            <span
                onDoubleClick={activateEditMode}>{props.status || "No status"}</span>
                </div>
            }
            {
                editMode &&
                <div>
                    <input onChange={onStatusChange}
                           autoFocus={true}
                           onBlur={deactivateEditMode}
                           value={status}/>
                </div>
            }
        </div>
    )
}

export default ProfileStatusHooks;