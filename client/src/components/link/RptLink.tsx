import { Link } from 'react-router-dom';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<typeof Link> {
}

export const RptLink = ( { to, className, children }: Props ) => {
    const defaultClasses = 'text-green-500 hover:text-green-400';

    return <Link to={to} className={className || defaultClasses}>{children}</Link>
}