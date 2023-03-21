import styles from '@/styles/Home.module.scss';
import EmptyAvatar from "@/components/EmptyAvatar/EmptyAvatar";

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <h3 className={styles.title}>Список аккаунтов</h3>
        <ul className={styles.usersList}>
          <li className={styles.usersItem}>
            <EmptyAvatar name={'Jordan'} />
            <div className={styles.info}>
              <span className={styles.name}>Jordan</span>
              <span className={styles.email}>jordan@nba.com</span>
            </div>
          </li>
          <li className={styles.usersItem}>
            <EmptyAvatar name={'Jordan'} />
            <div className={styles.info}>
              <span className={styles.name}>Jordan</span>
              <span className={styles.email}>jordan@nba.com</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
