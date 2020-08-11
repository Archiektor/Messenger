import React from 'react';
import s from './FormsControl.module.scss';
import {WrappedFieldInputProps, WrappedFieldMetaProps} from 'redux-form/lib/Field';
import {Field} from 'redux-form';
import {FieldValidatorType} from '../../utils/validators/validators';

type FormControlPropsType = {
    input: WrappedFieldInputProps;
    meta: WrappedFieldMetaProps;
}

const FormControl: React.FC<FormControlPropsType> = ({input, meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={hasError ? `${s.textarea} ${s.textarea_error}` : `${s.textarea}`}>
            {children}
            {hasError && <span className={s.textarea__span}>{error}</span>}
        </div>
    )
}

export const CustomTextArea: React.FC<FormControlPropsType> = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
    )
}

export const CustomInput: React.FC<FormControlPropsType> = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}><input {...input} {...restProps}/></FormControl>
    )
}

export function createField<FormsKeyType extends string>(name: FormsKeyType,
                            placeholder: string, type: string,
                            component: string | React.FC<FormControlPropsType>,
                            validators: Array<FieldValidatorType>) {
    return <div>
        <Field name={name} type={type} placeholder={placeholder} component={component}
               validate={[...validators]}/>
    </div>
}

