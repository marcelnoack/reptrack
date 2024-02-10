import { clsx } from 'clsx';

interface RptDrawerProps {
    open: boolean;
    onBackdropClick: () => void;
    drawerContent: React.ReactNode;
}

export const RptDrawer = ( { open, onBackdropClick, drawerContent }: RptDrawerProps ) => {

    return (
        <>
            <div
                className={clsx( 'fixed top-0 left-0 bottom-0 w-9/12 min-w-min bg-zinc-800 transform transition-all z-50 border-zinc-500', open ? 'border-r ' : '-translate-x-full' )}>
                {drawerContent}
            </div>
            <div
                className={clsx( 'fixed top-0 left-0 bottom-0 w-full bg-slate-300 backdrop-blur-sm transition-opacity z-40', open ? 'opacity-50' : 'opacity-0 -translate-x-full' )}
                onClick={onBackdropClick}></div>
        </>
    )
}