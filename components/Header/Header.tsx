import React, {FC, useEffect, useState} from 'react';
import Image from "next/image";
import styles from './Header.module.scss';
import LogoSvg from '@/assets/svg/logo-wrapper.svg';
import EmptyAvatar from "@/components/EmptyAvatar/EmptyAvatar";
import Link from "next/link";
import useSWR from "swr";
import {apiURL} from "@/pages/api/constants";
import {getFetcher} from "@/pages/api/requests";
import {useLocalStorage, useReadLocalStorage} from "usehooks-ts";
import {useRouter} from "next/router";

const Header: FC = () => {
    const router = useRouter();
    const [auth, setAuth] = useState<boolean>(false);
    const token = useReadLocalStorage<string | undefined>('authToken');
    const [tokenValue, setTokenValue] = useLocalStorage('authToken', token);

    const {data, isLoading, error, mutate} = useSWR(`${apiURL}/profile`, (url) =>
        getFetcher(url, {
            headers: {
                "X-API-KEY": token,
            },
        })
    );

    const logOut = () => {
        setTokenValue(undefined);
        router.push('/auth/login');
    }

    useEffect(() => {
        console.log(data)
        if (data?.status === 401) {
            logOut();
        }
    }, [data])


    useEffect(() => {
        if (token) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    }, [token])

    const {name} = data ? data : '';
    return (
        <header className={styles.header}>
            <Link href={'/'}>
                <div className={styles.leftSide}>
                    <Image src={LogoSvg} alt={'Yoldi'}/>
                    <h2 className={styles.logoTitle}>Разрабатываем и запускаем сложные веб проекты</h2>
                </div>
            </Link>
            <div className={styles.rightSide}>
                {
                    auth ? <Link href={'/profile'}>
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>{name}</span>
                            <EmptyAvatar name={name}/>
                        </div>
                    </Link> : <div className={styles.button}>
                        <Link href={'/auth/login'}>
                            <button className={styles.loginBtn}>
                                Войти
                            </button>
                        </Link>

                    </div>
                }
            </div>
        </header>
    );
};
export default Header;
