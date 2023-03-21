import React, {FC, useState} from 'react';
import styles from './Profile.module.scss';
import {Formik} from "formik";
import {UserInfo} from "@/types/types";
import {useRouter} from "next/router";
import useSWR from "swr";
import {apiURL} from "@/api/constants";
import {getFetcher, patchFetcher} from "@/api/requests";
import {useLocalStorage, useReadLocalStorage} from "usehooks-ts";

const Edit: FC<UserInfo> = () => {
    const [newUserInfo, setNewUserInfo] = useState<UserInfo>();
    const token = useReadLocalStorage('authToken');
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [shouldFetch, setShouldFetch] = useState<boolean>(false);
    const router = useRouter();
    const userData = useSWR(`${apiURL}/profile`, (url) =>
        getFetcher(url, {
            headers: {
                "X-API-KEY": token,
            },
        })
    ).data;

    const {name, slug, description} = userData;

    const { data, isLoading, error } = useSWR(
        shouldFetch ? `${apiURL}/profile` : null,
        (url) => {
            const newName = newUserInfo?.name;
            const newSlug = newUserInfo?.slug;
            const newDescription = newUserInfo?.description;
            patchFetcher(url, {
                userInfo: {
                    name: newName,
                    slug: newSlug,
                    description: newDescription,
                },
                token,
            }).then(() => {
                router.push('/profile');
            });
        }
    );


    return <div className={styles.mobileEdit}>
        <h4 className={styles.modalTitle}>Редактировать профиль</h4>
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
                            onClick={() => router.push('/profile')}
                        >
                            Отмена
                        </button>
                        <button
                            className={`button ${styles.saveButton} ${styles.button}`}
                            type={"submit"}
                            onClick={() => handleSubmit()}
                        >
                            Сохранить
                        </button>
                    </div>
                </form>
            )}
        </Formik>

    </div>
}

export default Edit;