import React, {FC, useEffect, useState} from 'react';
import Image from "next/image";
import styles from './Header.module.scss';
import LogoSvg from '@/assets/svg/logo-wrapper.svg';
import EmptyAvatar from "@/components/EmptyAvatar/EmptyAvatar";
import Link from "next/link";
import useSWR from "swr";
import {apiURL} from "@/api/constants";
import {getFetcher} from "@/api/requests";
import {useReadLocalStorage} from "usehooks-ts";

const Header: FC = () => {
    const [auth, setAuth] = useState<boolean>(false);
    const token = useReadLocalStorage<string | null>('authToken');

    const {data, isLoading, error, mutate} = useSWR(`${apiURL}/profile`, (url) =>
        getFetcher(url, {
            headers: {
                "X-API-KEY": token,
            },
        })
    );


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
