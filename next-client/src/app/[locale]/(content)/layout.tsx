import { PropsWithChildren } from 'react';

export default async function ContentLayout( {
                                               children,
                                           }: PropsWithChildren ) {

    return (
        <div className="h-screen flex flex-col">
            <header className="sticky top-0 z-50 bg-zinc-800 shadow-md text-white">
                <div className="py-4 mx-4 lg:mx-0">
                    <div className="flex items-center">
                        <img src="/Logo3-128_x_128.png" alt="reptrack logo" className="h-8"/>
                        <h1 className="mx-auto">Current Route</h1>
                        <div>Actions</div>
                    </div>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto bg-zinc-800">{children}</main>
            <footer className="sticky bottom-0 z-50">FOOTER</footer>
        </div>
    );
}