import React, {FC, useState} from 'react';
import Image from "next/image";
import styles from './Header.module.scss';
import LogoSvg from '@/assets/svg/logo-wrapper.svg';
import EmptyAvatar from "@/components/EmptyAvatar/EmptyAvatar";
import Link from "next/link";

const Header: FC = () => {
    const [auth, setAuth] = useState<boolean>(true);

    return (
        <header className={styles.header}>
            <div className={styles.leftSide}>
                <Image src={LogoSvg} alt={'Yoldi'}/>
                <h2 className={styles.logoTitle}>Разрабатываем и запускаем сложные веб проекты</h2>
            </div>
            <div className={styles.rightSide}>
                {
                    auth ? <Link href={'/profile'}><div className={styles.userInfo}>
                        <span className={styles.userName}>Jordan</span>
                        <EmptyAvatar name={'Jordan'}/>
                    </div></Link> : <div className={styles.button}><button>Войти</button></div>
                }
            </div>
        </header>
    );
};
export default Header;
