import { useEffect, useMemo, useState } from "react"

export const useForm = (initialForm = {}, formValidations={}) => {
    
    const [formState, setformState] = useState( initialForm
        // username: 'Ayaka',
        // email: 'KamizatoAyaya@jenshin.com',
        // pass: '123456'	
    )
    const [formValidationState, setformValidations] = useState({})

    useEffect(() => {
      createValidators()
    }, [formState])

    useEffect(() => {
        setformState(initialForm)
    }, [initialForm])
    
    
    const isFormValid = useMemo(() => {

        for (const formField of Object.keys(formValidationState)) {
            if (formValidationState[formField] !== null) {
                return false
            }
        }
        return true


    }, [formValidationState])


    const onInputChange = ({ target }) => {
        setformState({
            ...formState,
            [target.name]: target.value
        })
    }

    const onResetForm = () => {
        setformState(initialForm)
    }

    const createValidators = () => {
        const formCheckValues = {}

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField]

            formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
        }

        setformValidations(formCheckValues)
        
    }
    return {
        ...formState,
        formState, 
        onInputChange,
        onResetForm,
        ...formValidationState,
        isFormValid
    }
}
