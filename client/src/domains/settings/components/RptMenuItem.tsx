import { clsx } from 'clsx';

interface RptMenuItemProps {
    label: string;
    icon?: string;
    href?: string;
    disabled?: boolean;
    onClick: () => void;
}

export const RptMenuItem = ( { label, icon, href, disabled, onClick }: RptMenuItemProps ) => {
    const _wrapperClasses = clsx( 'py-2 w-full rounded-lg', !disabled && 'text-slate-200 hover:bg-zinc-500', disabled && 'cursor-auto text-slate-500' );

    const content = (
        <div className="flex items-center ps-3 gap-6">
            {icon && <span className="material-symbols-rounded">{icon}</span>}
            <span className="font-medium">{label}</span>
        </div>
    )

    return (
        href?.length ? <a className={_wrapperClasses} href={href} target="_blank">
                <div className="flex items-center justify-between pr-3">
                    {content}
                    <span className="material-symbols-rounded text-md">open_in_new</span>
                </div>
            </a> :
            <button className={_wrapperClasses} onClick={onClick}>
                {content}
            </button>
    )
}