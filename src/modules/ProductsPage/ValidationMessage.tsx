import React from 'react';
import styles from './ProductsTable.module.scss';

const ValidationMessage = ({message}: {message: string}) => {
    return (
        <span className={styles.validationMessage}>{message}</span>
    );
};

export default ValidationMessage;
