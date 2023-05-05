import { SignInForm } from '@/lib/auth/signin/SignInForm';

export default function SignIn() {

    return <div className={'min-h-screen flex items-center justify-center'}>
        <div className={'border rounded-lg border-white max-w-5xl m-10 lg:m-20'}>
            <div className="flex items-center justify-center rounded-lg">
                <div className="relative flex items-center justify-center w-1/2 hidden lg:block min-w-[430px]">
                    <img src="/auth-login.jpg" alt="women workout stock photo"
                         className={'w-full rounded-s-lg aspect-[2/3]'} width={'450'} height={'680'}/>
                    <div
                        className={'absolute inset-0 bg-white/20 backdrop-brightness-75 backdrop-blur-sm rounded-s-lg'}></div>
                    <h1 className={'absolute top-5 start-5 flex items-center justify-center gap-2'}>
                        <img src="/Logo3-128_x_128.png" alt="reptrack logo" className="h-12"/>
                        <span className={'text-2xl font-medium text-green-500'}>Reptrack</span>
                    </h1>
                </div>
                <div className={'lg:w-1/2 lg:min-w-[430px]'}>
                    <SignInForm/>
                </div>
            </div>
        </div>
    </div>
}
