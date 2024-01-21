import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import rptLogo from '../../assets/Logo-192x192.png';
import authLoginImg from '../../assets/auth-login.jpg';
import { RptInput } from '../../components/input/RptInput';
import { GoogleAuthButton } from '../../components/google/GoogleAuthButton';
import { useApi } from '../../hooks/data-access/useApi';
import { AuthPage } from './AuthLayout';

interface Props {
    onNav: ( to: AuthPage ) => void;
}

export const LoginPage = ( { onNav }: Props ) => {
    const { t: tCommon } = useTranslation( 'common' );
    const { t: tLogin } = useTranslation( 'translation' );
    const { usePost } = useApi();

    const LoginSchema = z.object( {
        email: z.string()
            .min( 1, { message: tLogin( 'login.labelEmailRequired' ) } )
            .email( { message: tLogin( 'login.labelEmailInvalid' ) } ),
        password: z.string()
            .min( 1, { message: tLogin( 'login.labelPasswordRequired' ) } )
    } ).required()

    type LoginType = z.infer<typeof LoginSchema>;

    const { register, handleSubmit, formState: { errors }, watch } = useForm<LoginType>( {
        mode: 'all',
        resolver: zodResolver( LoginSchema ),
        defaultValues: {
            email: '',
            password: ''
        }
    } )

    const emailValue = watch( 'email' );
    const passwordValue = watch( 'password' );

    const { mutateAsync, isLoading, isSuccess, isError, error } = usePost( '/auth/login', JSON.stringify( {
        email: emailValue,
        password: passwordValue
    } ), { credentials: 'include' }, [ '/profile' ] )

    if ( !isLoading && isSuccess ) {
        return <Navigate to={'/'} replace={true}/>
    }

    return <div className='min-h-screen flex items-center justify-center'>
        <div className='border rounded-lg border-white max-w-5xl m-10 lg:m-20'>
            <div className='flex items-center justify-center rounded-lg'>
                <div className='relative flex items-center justify-center w-1/2 hidden lg:block min-w-[430px]'>
                    <img src={authLoginImg} alt='women workout stock photo'
                         className='w-full rounded-s-lg aspect-[2/3]' width='450' height='680'/>
                    <div
                        className='absolute inset-0 bg-white/20 backdrop-brightness-75 backdrop-blur-sm rounded-s-lg'></div>
                    <h1 className='absolute top-5 start-5 flex items-center justify-center gap-2'>
                        <img src={rptLogo} alt='reptrack logo' className='h-12'/>
                        <span className='text-2xl font-medium text-green-500'>Reptrack</span>
                    </h1>
                </div>
                <div className='lg:w-1/2 lg:min-w-[430px]'>
                    <form
                        className={'flex flex-col gap-4 p-10 w-full overflow-hidden transition-{max-height} ease duration-300 max-h-[2000px]'}
                        onSubmit={handleSubmit( () => mutateAsync() )}
                    >
                        <h1 className={'lg:hidden flex items-center justify-center gap-2'}>
                            <img src={rptLogo} alt="reptrack logo" className="h-12"/>
                            <span className={'text-2xl font-medium text-green-500'}>Reptrack</span>
                        </h1>
                        {/*TODO: Loading Spinner*/}
                        {/*{true && <div className={'w-full text-white text-center'}>Success! You are now being*/}
                        {/*  redirected...</div>}*/}
                        <div className={'flex flex-col gap-4'}>
                            <h2 className={'text-white mb-2'}>{tLogin( 'login.labelLogin' )}</h2>
                            <RptInput
                                id={'signin_email_input'}
                                label={tCommon( 'general.email' )}
                                placeholder={tCommon( 'general.email' )}
                                error={errors?.email?.message}
                                value={emailValue}
                                {...register( 'email' )}
                                required/>
                            <RptInput
                                id={'signin_password_input'}
                                label={tCommon( 'general.password' )}
                                placeholder={tCommon( 'general.password' )}
                                error={errors?.password?.message}
                                value={passwordValue}
                                {...register( 'password' )}
                                required
                                isPassword/>
                            {isError &&
                              <span data-cy={'signin_error'}
                                    className={'text-red-500'}>{( error as any )?.message}</span>}
                            <button
                                data-cy={'signin_submit_btn'}
                                type={'submit'}
                                disabled={isLoading || !!errors?.email || !!errors?.password}
                                className={'w-full bg-green-500 text-black rounded-md p-3 flex items-center justify-center gap-2 hover:bg-green-400 focus:bg-green-400 disabled:bg-gray-600 disabled:cursor-not-allowed outline-none'}>
                                {isLoading && (
                                    <div
                                        className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-green-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                        role="status">
                                              <span
                                                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                              >Loading...</span
                                              >
                                    </div>
                                )}
                                {tLogin( 'login.labelLogin' )}
                            </button>
                            <div className={'flex flex-wrap items-center justify-center gap-2 text-white'}>
                                <span>{tLogin( 'login.labelNoAccount' )}</span>
                                <button
                                    className="border-b border-transparent text-green-500 hover:border-green-500 hover:border-b"
                                    onClick={() => onNav( 'register' )}
                                >
                                    {tLogin( 'login.labelRegister' )}
                                </button>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-grow border-b border-gray-400"></div>
                                <div className="mx-4 text-gray-500">{tCommon( 'general.orCapitalized' )}</div>
                                <div className="flex-grow border-b border-gray-400"></div>
                            </div>
                            <div className="flex justify-center flex-grow">
                                <GoogleAuthButton/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}