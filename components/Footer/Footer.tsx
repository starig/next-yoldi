import React, {FC} from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";
import {Footer} from "@/types/types";


const Footer: FC<Footer> = ({currentPage}) => {
    return <footer className={styles.wrapper}>
      <span>
        {currentPage === "login" ? "Еще нет аккаунта?" : "Уже есть аккаунт?"}
      </span>
        {currentPage === "login" ? (
            <Link href={"/auth/register"} className="footerLink">
                Зарегистрироваться
            </Link>
        ) : (
            <Link href={"/auth/login"} className="footerLink">
                Войти
            </Link>
        )}
    </footer>
        ;
};

export default Footer;
