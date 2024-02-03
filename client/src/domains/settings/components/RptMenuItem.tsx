interface RptMenuItemProps {
    label: string;
    icon?: string;
    href?: string;
    onClick: () => void;
}

const _wrapperClasses = 'py-2 w-full text-slate-200 hover:bg-zinc-500 rounded-lg';

export const RptMenuItem = ( { label, icon, href, onClick }: RptMenuItemProps ) => {
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