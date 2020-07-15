import React from "react";
import s from "./FormsControl.module.scss";
import {WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form/lib/Field";

type FormControlType = {
    input: WrappedFieldInputProps;
    meta: WrappedFieldMetaProps;
}

const FormControl: React.FC<FormControlType> = ({input, meta, children}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={hasError ? `${s.textarea} ${s.textarea_error}` : `${s.textarea}`}>
            {children}
            {hasError && <span className={s.textarea__span}>{meta.error}</span>}
        </div>
    )
}

export const CustomTextArea: React.FC<FormControlType> = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
    )
}

export const CustomInput: React.FC<FormControlType> = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}><input {...input} {...restProps}/></FormControl>
    )
}
