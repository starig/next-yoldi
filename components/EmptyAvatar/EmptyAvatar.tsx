import React, {FC} from 'react';
import styles from './EmptyAvatar.module.scss';
import {EmptyAvatar} from "@/types/types";


const EmptyAvatar: FC<EmptyAvatar> = ({name, width, height}) => {
    const letter = name?.slice(0, 1).toUpperCase();
    return (
        <div style={{width: width ? width : 50, height: height ? height : 50}} className={styles.wrapper}>
            {letter}
        </div>
    );
}

export default EmptyAvatar;
