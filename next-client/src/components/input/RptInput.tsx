'use client';
import { useState } from 'react';
import { RptMaterialBtn } from '@/components/material-btn/RptMaterialBtn';

interface RptInputProps {
    label: string;
    value: string;
    onChange: ( value: string ) => void;
    helperText?: string;
    placeholder?: string;
    multiline?: boolean;
    dense?: boolean;
    isPassword?: boolean;
    required?: boolean;
    error?: string;
}

export const RptInput = ( props: RptInputProps ) => {

    const [ isPasswordVisible, setIsPasswordVisible ] = useState( false );

    return (
        <div className="w-full relative rounded-md">
            {props.multiline ?
                <textarea/>
                : <input
                    autoComplete='off'
                    type={props.isPassword && !isPasswordVisible ? 'password' : 'text'}
                    value={props.value}
                    placeholder={props.placeholder}
                    onChange={( e ) => props.onChange( e.target.value )}
                    className={`
                        w-full text-white bg-zinc-800 rounded border border-zinc-400 p-3 outline-0 resize-none transition ease-out duration-100
                        ${props.error?.length && 'border-red-500 text-red-500'} ${!props.error?.length && 'focus:border-green-500'}`
                    }
                />
            }
            {props.label.length && <label
              className={`absolute left-4 -translate-y-2/4 px-1 text-white bg-zinc-800 text-xs ${props.value.length && 'top-0 left-3 py-1/4'} ${props.error?.length && 'text-red-500'}`}>{`${props.label}${props.required && '*'}`}</label>}
            {( props.isPassword && !props.multiline ) && <span className={'absolute right-0 top-2/4 -translate-y-2/4 p-1'}>
              <RptMaterialBtn mini icon={isPasswordVisible ? 'visibility_off': 'visibility'} action={() => setIsPasswordVisible( !isPasswordVisible )}/>
            </span>}
            {props.error?.length && <span className={'text-xs text-red-500 pl-4'}>{props.error}</span>}
        </div>
    )
}