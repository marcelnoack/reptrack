import { SignInForm } from '@/lib/auth/signin/SignInForm';

export default function SignIn() {

    return <div className={'min-h-screen flex items-center justify-center'}>
        <div className={'border rounded-lg border-white max-w-5xl m-10 lg:m-20'}>
            <div className="flex items-center justify-center rounded-lg">
                <div className="relative flex items-center justify-center w-1/2 hidden lg:block">
                    <img src="/auth-login.jpg" alt="women workout stock photo" className={'w-full rounded-s-lg'}/>
                    <div
                        className={'absolute inset-0 bg-white/20 backdrop-brightness-75 backdrop-blur-sm rounded-s-lg'}></div>
                    <h1 className={'absolute top-5 start-5 flex items-center justify-center gap-2'}>
                        <img src="/Logo3-128_x_128.png" alt="reptrack logo" className="h-12"/>
                        <span className={'text-2xl font-medium text-green-500'}>Reptrack</span>
                    </h1>
                </div>
                <div className="flex flex-col gap-4 p-10 lg:w-1/2">
                    <SignInForm/>
                </div>
            </div>
        </div>
    </div>
}
