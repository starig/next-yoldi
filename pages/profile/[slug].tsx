import React, {FC} from 'react';
import styles from './Profile.module.scss';
import EmptyAvatar from "@/components/EmptyAvatar/EmptyAvatar";
import {useRouter} from "next/router";
import useSWR from "swr";
import {apiURL} from "@/pages/api/constants";
import {getFetcher} from "@/pages/api/requests";
import {Oval} from "react-loader-spinner";
import {UserInfo} from "@/types/types";

const SlugProfile: FC = () => {
    const router = useRouter()
    const {slug} = router.query;
    const {data, isLoading, error} = useSWR(
        `${apiURL}/user/${slug}`,
        getFetcher
    );


    if (isLoading)
        return (
            <div className={`loader`}><Oval
                height={80}
                width={80}
                color="#E6E6E6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#838383"
                strokeWidth={2}
                strokeWidthSecondary={2}
            /></div>
        );
    if (data) {
        const user: UserInfo = data;
        return (
            <div className={styles.profile}>
                <div className={styles.cover}></div>
                <div className={styles.container}>
                    <div className={styles.userInfo}>
                        <div className={styles.userAvatar}>
                            <EmptyAvatar name={user.name} width={100} height={100}/>
                        </div>
                        <div className={styles.userName}>
                            <div className={styles.userNameInfo}>
                                <span className={styles.name}>{user.name}</span>
                                <span className={styles.email}>{user.email}</span>
                            </div>
                        </div>
                        <div className={styles.userDescription}>
                            {user.description ? user.description : 'Описания нет'}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (error) {
        return <div className={styles.errorContainer}>Ошибка: {error}</div>
    } else {
        return <></>
    }

}

export default SlugProfile;
