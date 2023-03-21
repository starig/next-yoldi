import React, { FC, useState } from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";
import {CurrentPage} from "@/types/types";

interface Footer {
    currentPage: CurrentPage;
}

const Footer: FC<Footer> = ({currentPage}) => {
  const token = '';
  return !token ? (
    <footer className={styles.wrapper}>
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
  ) : <></>;
};

export default Footer;
