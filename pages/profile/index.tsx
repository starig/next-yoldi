import React, {FC, useEffect, useState} from 'react';
import styles from './Profile.module.scss';
import EmptyAvatar from "@/components/EmptyAvatar/EmptyAvatar";
import Pen from '@/assets/svg/pen-solid.svg';
import SignOut from '@/assets/svg/sign-out.svg';
import Image from "next/image";
import Modal from 'react-modal';
import {Formik} from "formik";
import {UserInfo} from "@/types/types";
import {getFetcher, patchFetcher} from "@/api/requests";
import {apiURL} from "@/api/constants";
import useSWR from "swr";
import {useRouter} from "next/router";
import {useLocalStorage, useReadLocalStorage} from "usehooks-ts";
import {Oval} from "react-loader-spinner";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '600px',
        border: '1px solid #E6E6E6',
        borderRadius: '5px',
    },
    overlay: {
        background: 'rgba(0, 0, 0, .3)',
    }
};

Modal.setAppElement('#__next');

const Profile: FC = () => {
    const tokenValue = useReadLocalStorage('authToken');
    const [token, setToken] = useLocalStorage('authToken', tokenValue);
    const [newUserInfo, setNewUserInfo] = useState<UserInfo>();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [shouldFetch, setShouldFetch] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const router = useRouter();

    const userData = useSWR(`${apiURL}/profile`,
        (url) =>
            getFetcher(url, {
                headers: {
                    "X-API-KEY": token,
                },
            })
    );

    useEffect(() => {
        if (userData.data.status === 401) {
            logOut();
        }
    }, [userData])

    const {data, isLoading, error} = useSWR(
        shouldFetch ? `${apiURL}/profile` : null,
        async (url) => {
            const newName = newUserInfo?.name;
            const newSlug = newUserInfo?.slug;
            const newDescription = newUserInfo?.description;
            await patchFetcher(url, {
                userInfo: {
                    name: newName,
                    slug: newSlug,
                    description: newDescription,
                },
                token,
            });
        }
    );

    useEffect(() => {
        if (!tokenValue) {
            router.push('/auth/login')
        }
        setShouldFetch(false);
        if (window.innerWidth <= 640) {
            setIsMobile(true);
        }
    }, [])

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        setShouldFetch(false);
    }, [modalIsOpen])

    const logOut = () => {
        setToken(undefined);
        router.push('/auth/login');
    }

    if (userData.isLoading || isLoading || !userData.data)
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
    if (userData.data) {
        const {name, slug, description, email} = userData.data;
        return (
            <div className={`${styles.profile}`}>
                <div id={"modal"}>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => {
                            closeModal();
                        }}
                        style={customStyles}
                        contentLabel="Редактирование профиля"
                    >
                        <h4 className={styles.modalTitle}>Редактировать профиль</h4>
                        {error && <span className={styles.formError}>{error}</span>}
                        <Formik
                            initialValues={{
                                name: name,
                                slug: slug,
                                description: description,
                            }}
                            validate={(values) => {
                                const errors: any = {};
                                if (!values.name) {
                                    errors.name = "* Обязательное поле";
                                }
                                if (!values.slug) {
                                    errors.slug = "* Обязательное поле";
                                }
                                return errors;
                            }}
                            onSubmit={(values) => {
                                setNewUserInfo(values);
                                closeModal();
                                setShouldFetch(true);
                            }}
                        >
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  isSubmitting,
                              }) => (
                                <form onSubmit={handleSubmit} className={styles.formForm}>
                                    <label className={styles.inputLabel}>Имя</label>
                                    {errors.name && touched.name && (
                                        <span className={styles.formError}>
                  {/*@ts-ignore */}
                                            {errors.name}
                </span>
                                    )}
                                    <div className={"input"}>
                                        <input
                                            className={`inputField`}
                                            name={"name"}
                                            type={"text"}
                                            placeholder={"Имя"}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.name}
                                        />
                                    </div>
                                    <label className={styles.inputLabel}>Адрес профиля</label>
                                    {errors.slug && touched.slug && (
                                        <span className={styles.formError}>
                  {/*@ts-ignore */}
                                            {errors.slug}
                </span>
                                    )}
                                    <div className={"input"}>
                                        <div className={styles.slugLabel}>example.com/</div>
                                        <input
                                            className={`inputField ${styles.slugInput}`}
                                            name={"slug"}
                                            type={"text"}
                                            placeholder={"Адрес профиля"}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.slug}
                                        />
                                    </div>
                                    <label className={styles.inputLabel}>Описание</label>
                                    {errors.description && touched.description && (
                                        <span className={styles.formError}>
                  {/*@ts-ignore */}
                                            {errors.description}
                </span>
                                    )}
                                    <div className={`input ${styles.descriptionInputWrapper}`}>
                <textarea
                    className={`inputField ${styles.descriptionInput}`}
                    name={"description"}
                    placeholder={"Описание"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description ? values.description : ""}
                />
                                    </div>
                                    <div>{error}</div>
                                    <div className={styles.buttons}>
                                        <button
                                            className={`button ${styles.cancelButton} ${styles.button}`}
                                            onClick={closeModal}
                                        >
                                            Отмена
                                        </button>
                                        <button
                                            className={`button ${styles.saveButton} ${styles.button}`}
                                            type={"submit"}
                                            onClick={() => handleSubmit()}
                                            disabled={isSubmitting}
                                        >
                                            Сохранить
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </Modal>
                </div>
                <div className={styles.cover}></div>
                <div className={styles.container}>
                    <div className={styles.userInfo}>
                        <div className={styles.userAvatar}>
                            <EmptyAvatar name={name} width={100} height={100}/>
                        </div>
                        <div className={styles.userName}>
                            <div className={styles.userNameInfo}>
                                <span className={styles.name}>{name}</span>
                                <span className={styles.email}>{email}</span>
                            </div>
                            <div className={styles.userNameEdit}>
                                <button className={styles.button} onClick={() => {
                                    isMobile ? router.push('/profile/edit') : openModal()
                                }
                                }>
                                    <Image src={Pen} alt={'Редактировать'}/>
                                    Редактировать
                                </button>
                            </div>
                        </div>
                        <div className={styles.userDescription}>
                            {description}
                        </div>
                    </div>
                    <div className={styles.logOut}>
                        <button className={styles.button} onClick={logOut}>
                            <Image src={SignOut} alt={'Выйти'}/>
                            Выйти
                        </button>
                    </div>
                </div>
            </div>
        );
    } else if (userData.error) {
        return <>{userData.error}</>
    } else {
        return <></>
    }
}

export default Profile;
