import { forwardRef, useState } from 'react';
import { ChangeHandler } from 'react-hook-form';

import { RptMaterialBtn } from '../material-btn/RptMaterialBtn';

interface RptInputProps {
    label: string;
    id: string;
    value: string;
    onChange: ChangeHandler;
    onBlur: ChangeHandler;
    name: string;
    helperText?: string;
    placeholder?: string;
    dense?: boolean;
    isPassword?: boolean;
    required?: boolean;
    error?: string;
}

export const RptInput = forwardRef<HTMLInputElement, RptInputProps>( ( props, ref ) => {
    const [ isPasswordVisible, setIsPasswordVisible ] = useState( false );

    return (
        <div className={'w-full rounded-md'}>
            <div className={'relative'}>
                <input
                    id={props.name}
                    name={props.name}
                    data-cy={props.id}
                    autoComplete='off'
                    type={props.isPassword && !isPasswordVisible ? 'password' : 'text'}
                    onChange={props.onChange}
                    ref={ref}
                    placeholder={props.placeholder}
                    onBlur={props.onBlur}
                    className={`
                        w-full text-white bg-zinc-800 rounded border border-zinc-400 p-3 outline-0 resize-none transition ease-out duration-100
                        ${props.error?.length && 'focus:border-red-500'} ${!props.error?.length && 'focus:border-green-500'}`
                    }
                />
                <label
                    htmlFor={props.name}
                    className={`absolute left-2.5 -translate-y-2/4 px-1 text-white bg-zinc-800 text-xs 
                        ${props.error?.length && 'text-red-500'}`}>
                    {`${props.label}${props.required ? '*' : ''}`}
                </label>
                {props.isPassword &&
                  <span className={'absolute right-0 top-2/4 -translate-y-2/4 p-1'}>
              <RptMaterialBtn mini icon={isPasswordVisible ? 'visibility_off' : 'visibility'}
                              action={() => setIsPasswordVisible( !isPasswordVisible )}/>
            </span>}
            </div>
            <span
                className={`text-xs text-red-500 ml-4 mt-1 mb-2 ${props.error?.trim().length ? '' : 'invisible'}`}>{props.error || '\u200B'}</span>
        </div>
    )
} )