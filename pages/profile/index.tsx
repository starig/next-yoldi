import React, {FC} from 'react';
import styles from './Profile.module.scss';
import EmptyAvatar from "@/components/EmptyAvatar/EmptyAvatar";
import Pen from '@/assets/svg/pen-solid.svg';
import SignOut from '@/assets/svg/sign-out.svg';
import Image from "next/image";

const Profile: FC = () => {
    return (
        <div className={styles.profile}>
            <div className={styles.cover}></div>
            <div className={styles.container}>
                <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                        <EmptyAvatar name={'Jordan'} width={100} height={100}/>
                    </div>
                    <div className={styles.userName}>
                        <div className={styles.userNameInfo}>
                            <span className={styles.name}>Jordan</span>
                            <span className={styles.email}>jordan@nba.com</span>
                        </div>
                        <div className={styles.userNameEdit}>
                            <button className={styles.button}>
                                <Image src={Pen} alt={'Редактировать'} />
                                Редактировать
                            </button>
                        </div>
                    </div>
                    <div className={styles.userDescription}>
                        Рыбатекст используется дизайнерами, проектировщиками и фронтендерами, когда нужно быстро
                        заполнить макеты или прототипы содержимым. Это тестовый контент, который не должен нести
                        никакого смысла, лишь показать наличие самого текста или продемонстрировать типографику в деле.
                    </div>
                </div>
                <div className={styles.logOut}>
                    <button className={styles.button}>
                        <Image src={SignOut} alt={'Выйти'} />
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
