import styles from '@/styles/Home.module.scss';
import EmptyAvatar from "@/components/EmptyAvatar/EmptyAvatar";
import {apiURL} from "@/api/constants";
import {getFetcher} from "@/api/requests";
import useSWR from "swr";
import {UserInfo} from "@/types/types";
import {Oval} from "react-loader-spinner";
import Link from "next/link";


export default function Home() {
    const {data, isLoading, error} = useSWR<UserInfo[]>(
        `${apiURL}/user`,
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
        return (
            <div className={styles.home}>
                <div className={styles.container}>
                    <h3 className={styles.title}>Список аккаунтов</h3>
                    <ul className={styles.usersList}>
                        {
                            data.slice(data.length - 7, data.length).map((user) => {
                                return <Link href={`/profile/${user.slug}`} key={user.slug}>
                                    <li className={styles.usersItem}>
                                        <EmptyAvatar name={user.name}/>
                                        <div className={styles.info}>
                                            <span className={styles.name}>{user.name}</span>
                                            <span className={styles.email}>{user.email}</span>
                                        </div>
                                    </li>
                                </Link>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    } else if (error) {
        return <>{error}</>
    } else {
        return <></>
    }

}
