import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import rptLogo from '../../assets/Logo-192x192.png';
import authRegisterImg from '../../assets/auth-register.jpg';
import { GoogleAuthButton } from '../../components/google/GoogleAuthButton';
import { useApi } from '../../hooks/data-access/useApi';
import { RptInput } from '../../components/input/RptInput';
import { AuthPage } from './AuthLayout';

interface Props {
    onNav: ( to: AuthPage ) => void;
}

export const RegisterPage = ( { onNav }: Props ) => {
    const { t: tCommon } = useTranslation( 'common' );
    const { t: tRegister } = useTranslation( 'translation' );
    const { usePost } = useApi();

    const RegisterSchema = z.object( {
        firstName: z.string()
            .min( 1, { message: tRegister( 'register.labelFirstNameRequired' ) } ),
        lastName: z.string()
            .min( 1, { message: tRegister( 'register.labelLastNameRequired' ) } ),
        email: z.string()
            .min( 1, { message: tRegister( 'register.labelEmailRequired' ) } )
            .email( { message: tRegister( 'register.labelEmailInvalid' ) } ),
        password: z.string()
            .min( 1, { message: tRegister( 'register.labelPasswordRequired' ) } )
            .regex( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{10,}$/, { message: tRegister( 'register.labelPasswordInvalid' ) } )
    } );

    type RegisterType = z.infer<typeof RegisterSchema>;

    const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterType>( {
        mode: 'all',
        resolver: zodResolver( RegisterSchema ),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    } );

    const firstNameValue = watch( 'firstName' );
    const lastNameValue = watch( 'lastName' );
    const emailValue = watch( 'email' );
    const passwordValue = watch( 'password' );

    const { mutate, isLoading, isSuccess, isError, error } = usePost( '/auth/signup', JSON.stringify( {
        user: {
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            password: passwordValue
        }
    } ), { credentials: 'include' }, [ '/profile' ] )

    if ( !isLoading && isSuccess ) {
        return <Navigate to={'/'} replace={true}/>
    }

    return (
        <div className={'min-h-screen flex items-center justify-center'}>
            <div className={'border rounded-lg border-white max-w-5xl m-10 lg:m-20'}>
                <div className="flex items-center justify-center rounded-lg">
                    <div className="relative flex items-center justify-center w-1/2 hidden lg:block min-w-[430px]">
                        <img src={authRegisterImg} alt="women workout stock photo" width={'450'} height={'680'}
                             className={'w-full rounded-s-lg aspect-[2/3]'}/>
                        <div
                            className={'absolute inset-0 bg-white/20 backdrop-brightness-75 backdrop-blur-sm rounded-s-lg'}></div>
                        <h1 className={'absolute top-5 start-5 flex items-center justify-center gap-2'}>
                            <img src={rptLogo} alt="reptrack logo" className="h-12"/>
                            <span className={'text-2xl font-medium text-green-500'}>Reptrack</span>
                        </h1>
                    </div>
                    <div className={'lg:w-1/2 lg:min-w-[430px]'}>
                        <form className="flex flex-col gap-4 p-10 w-full"
                              onSubmit={handleSubmit( () => mutate() )}>
                            <h1 className="lg:hidden flex items-center justify-center gap-2">
                                <img src={rptLogo} alt="reptrack logo" className="h-12"/>
                                <span className="text-2xl font-medium text-green-500">Reptrack</span>
                            </h1>
                            <h2 className="text-white mb-2">{tRegister( 'register.labelRegister' )}</h2>
                            <RptInput
                                id={'register_first_name_input'}
                                label={tCommon( 'general.firstName' )}
                                placeholder={tCommon( 'general.firstName' )}
                                error={errors?.firstName?.message}
                                value={firstNameValue}
                                {...register( 'firstName' )}
                                required
                            />
                            <RptInput
                                id={'register_last_name_input'}
                                label={tCommon( 'general.lastName' )}
                                placeholder={tCommon( 'general.lastName' )}
                                error={errors?.lastName?.message}
                                value={lastNameValue}
                                {...register( 'lastName' )}
                                required
                            />
                            <RptInput
                                id={'register_email_input'}
                                label={tCommon( 'general.email' )}
                                placeholder={tCommon( 'general.email' )}
                                error={errors?.email?.message}
                                value={emailValue}
                                {...register( 'email' )}
                                required
                            />
                            <RptInput
                                id={'register_password_input'}
                                label={tCommon( 'general.password' )}
                                placeholder={tCommon( 'general.password' )}
                                error={errors?.password?.message}
                                value={passwordValue}
                                {...register( 'password' )}
                                required
                                isPassword
                            />
                            {isError &&
                              <span data-cy={'register_error'}
                                    className={'text-red-500'}>{( error as any )?.message}</span>}
                            <button
                                data-cy={'register_submit_btn'}
                                type="submit"
                                disabled={isLoading || !!errors?.firstName || !!errors?.lastName || !!errors?.email || !!errors?.password}
                                className="bg-green-500 text-black rounded-md p-3 flex items-center justify-center gap-2 hover:bg-green-400 focus:bg-green-400 disabled:bg-gray-600 disabled:cursor-not-allowed outline-none"
                            >
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
                                {tRegister( 'register.labelRegister' )}
                            </button>
                            <div className="flex flex-wrap items-center justify-cente gap-2 text-white">
                                <span>{tRegister( 'register.labelAlreadyAccount' )}</span>
                                <button
                                    className="border-b border-transparent text-green-500 hover:border-green-500 hover:border-b"
                                    onClick={() => onNav( 'login' )}
                                >
                                    {tRegister( 'register.labelLogin' )}
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}