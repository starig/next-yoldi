import React, {FC} from 'react';
import styles from '../Auth.module.scss';
import {ErrorMessage, Field, Form, Formik, FormikErrors, FormikValues} from "formik";
import Password from '@/assets/svg/password.svg';
import Email from '@/assets/svg/email.svg';
import Eye from '@/assets/svg/eye.svg';
import Image from "next/image";

const Login: FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.formBox}>
                <h3 className={styles.title}>Вход в Yoldi Agency</h3>
                <Formik
                    initialValues={{email: '', password: ''}}
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
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        console.log('login')
                        setSubmitting(false);
                    }}
                >
                    {({isSubmitting, errors, values}) => (
                        <Form className={styles.form}>
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
                                    <Image src={Password} alt={'Email'}/>
                                    <Field type="password" name="password" placeholder={'Пароль'}/>
                                    <Image src={Eye} alt={'Email'}/>
                                </div>
                            </>
                            <button type="submit" className={styles.button}
                                    disabled={isSubmitting || errors.email || errors.password || !values.email || !values.password}>
                                Войти
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Login;
