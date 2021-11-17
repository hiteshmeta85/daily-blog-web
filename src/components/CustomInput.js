import {ErrorMessage, useField} from "formik";

export const CustomInput = ({...props}) => {
    const [field, meta] = useField(props)
    return (
        <>
            <input
                className={`form-control rounded-0 ${meta.touched && meta.error && `is-invalid`}`}
                autoComplete="off"
                {...field} {...props}
            />
            <div className='text-muted'>
                <ErrorMessage name={field.name}/>
            </div>
        </>
    )
}
