import { useState } from 'react';

import { RptMaterialBtn } from '../material-btn/RptMaterialBtn';

interface RptInputProps {
    label: string;
    value: string;
    id: string;
    onChange: ( value: string ) => void;
    helperText?: string;
    placeholder?: string;
    dense?: boolean;
    isPassword?: boolean;
    required?: boolean;
    error?: string;
}

export const RptInput = ( props: RptInputProps ) => {
    const [ isPasswordVisible, setIsPasswordVisible ] = useState( false );

    const [ isError, setIsError ] = useState( false );

    const checkError = () => {
        if ( props.error ) {
            setIsError( true );
        } else {
            setIsError( false );
        }
    }

    return (
        <div className={'w-full rounded-md'}>
            <div className={'relative'}>
                <input
                    id={props.id}
                    data-cy={props.id}
                    autoComplete='off'
                    type={props.isPassword && !isPasswordVisible ? 'password' : 'text'}
                    value={props.value}
                    placeholder={props.placeholder}
                    onChange={( e ) => props.onChange( e.target.value )}
                    onBlur={() => checkError()}
                    className={`
                        w-full text-white bg-zinc-800 rounded border border-zinc-400 p-3 outline-0 resize-none transition ease-out duration-100
                        ${props.error?.length && 'border-red-500 text-red-500'} ${!props.error?.length && 'focus:border-green-500'}`
                    }
                />
                <label
                    htmlFor={props.id}
                    className={`absolute left-2.5 -translate-y-2/4 px-1 text-white bg-zinc-800 text-xs 
                ${props.value.length && 'top-0 left-3 py-1/4'} 
                ${props.error?.length && 'text-red-500'}`}>
                    {`${props.label}${props.required && '*'}`}
                </label>
                {props.isPassword &&
                  <span className={'absolute right-0 top-2/4 -translate-y-2/4 p-1'}>
              <RptMaterialBtn mini icon={isPasswordVisible ? 'visibility_off' : 'visibility'}
                              action={() => setIsPasswordVisible( !isPasswordVisible )}/>
            </span>}
            </div>
            <span
                className={`text-xs text-red-500 ml-4 mt-1 mb-2 ${isError ? '' : 'invisible'}`}>{props.error || '\u200B'}</span>
        </div>
    )
}