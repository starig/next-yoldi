import React, {FC, useEffect, useState} from 'react';
import styles from '../Auth.module.scss';
import {ErrorMessage, Field, Form, Formik, FormikErrors, FormikValues} from "formik";
import Password from '@/assets/svg/password.svg';
import Email from '@/assets/svg/email.svg';
import Eye from '@/assets/svg/eye.svg';
import User from '@/assets/svg/user.svg';
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import {AuthResponse, CurrentPage, UserInfo} from "@/types/types";
import useSWR from "swr";
import {apiURL} from "@/pages/api/constants";
import {postFetcher} from "@/pages/api/requests";
import {useRouter} from "next/router";
import {useLocalStorage, useReadLocalStorage} from "usehooks-ts";

const Register: FC = () => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const router = useRouter();
    const [shouldFetch, setShouldFetch] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [token, setToken] = useLocalStorage<string | null>('authToken', null);
    const currentToken = useReadLocalStorage('authToken');

    const {data, isLoading, error} = useSWR<AuthResponse>(
        shouldFetch ? `${apiURL}/auth/sign-up` : null,
        (url) =>
            postFetcher(url, {
                name: userInfo?.name,
                email: userInfo?.email,
                password: userInfo?.password,
            })
    );

    useEffect(() => {
        if (data != undefined) {
            setToken(data.value);
            router.push('/');
        }
    }, [data])

    useEffect(() => {
        if (currentToken) {
            router.push('/');
        }
    }, [currentToken])

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.formBox} style={{maxHeight: 424}}>
                    <h3 className={styles.title}>Регистрация в Yoldi Agency</h3>
                    {error && <span className={styles.formError}>{error}</span>}
                    <Formik
                        initialValues={{name: '', email: '', password: ''}}
                        validate={(values: FormikValues) => {
                            const errors: FormikErrors<any> = {};
                            if (!values.email) {
                                errors.email = '* Обязательное поле';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = '* Неверно введен email';
                            }
                            if (!values.password) {
                                errors.password = '* Обязательное поле';
                            }
                            if (!values.name) {
                                errors.name = '* Обязательное поле';
                            }
                            return errors;
                        }}
                        onSubmit={(values, {setSubmitting}) => {
                            setUserInfo(values);
                            setShouldFetch(true);
                            setTimeout(() => {
                                setSubmitting(false);
                            }, 800)
                        }}
                    >
                        {({isSubmitting, errors, values}) => (
                            <Form className={styles.form}>
                                <>
                                    <ErrorMessage name="name" component="div" className={styles.error}/>
                                    <div className={'input'}>
                                        <Image src={User} alt={'Имя'}/>
                                        <Field type="text" name="name" placeholder={'Имя'}/>
                                    </div>
                                </>
                                <>
                                    <ErrorMessage name="email" component="div" className={styles.error}/>
                                    <div className={'input'}>
                                        <Image src={Email} alt={'Email'}/>
                                        <Field type="email" name="email" placeholder={'E-mail'}/>
                                    </div>
                                </>
                                <>
                                    <ErrorMessage name="password" component="div" className={styles.error}/>
                                    <div className={'input'}>
                                        <Image src={Password} alt={'Пароль'}/>
                                        <Field name="password" placeholder={'Пароль'}
                                               type={passwordVisible ? "text" : "password"}/>
                                        <Image src={Eye} style={{
                                            cursor: 'pointer'
                                        }} alt={'Показать пароль'}
                                               onClick={() => setPasswordVisible(!passwordVisible)}/>
                                    </div>
                                </>
                                <button type="submit" className={styles.button}
                                    //@ts-ignore
                                        disabled={isSubmitting || errors.email || errors.password || !values.email || !values.password}>
                                    Создать аккаунт
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <Footer currentPage={CurrentPage.REGISTER} />
        </>

    );
}

export default Register;
