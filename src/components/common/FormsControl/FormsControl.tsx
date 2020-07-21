import React from 'react';
import s from './FormsControl.module.scss';
import {WrappedFieldInputProps, WrappedFieldMetaProps} from 'redux-form/lib/Field';
import {Field} from 'redux-form';

type FormControlType = {
    input: WrappedFieldInputProps;
    meta: WrappedFieldMetaProps;
}

const FormControl: React.FC<FormControlType> = ({input, meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={hasError ? `${s.textarea} ${s.textarea_error}` : `${s.textarea}`}>
            {children}
            {hasError && <span className={s.textarea__span}>{error}</span>}
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

export const createField = (name: string, placeholder: string, type: string, component: React.FC<FormControlType>, validators: any) => (
    <div>
        <Field name={placeholder} type={type} placeholder={placeholder} component={component}
               validate={[...validators]}/>
    </div>
)

