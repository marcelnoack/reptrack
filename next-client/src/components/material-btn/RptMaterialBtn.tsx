'use client';
export interface RptMaterialBtnProps {
    icon: string;
    action: () => void;
    label?: string;
    mini?: boolean;
}

export const RptMaterialBtn = ( props: RptMaterialBtnProps ) => <button
    type={'button'}
    data-testid={'rpt-material-btn'}
    className={'flex items-center justify-center border border-transparent rounded-full bg-zinc-800 text-inherit bg-center outline-0 cursor-pointer transition duration-250 ' +
        'focus:border-green-500 focus:bg-zinc-400 hover:bg-zinc-400 ' +
        `${props.mini ? 'p-2': 'p-2.5'} ${props.label?.length && 'rounded-lg pl-3 pr-5'}`}
    onClick={props.action}>
    <span className={'material-icons text-white light:text-black'}>{props.icon}</span>
    {props.label?.length &&  <label>{props.label}</label>}
</button>