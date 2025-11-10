import React from 'react';
import { useTranslation } from "react-i18next"
import './Dashboard.css';

const KPIDataHead: React.FC<{ title: string }> = (props) => {
    const { t } = useTranslation()
    return (
        <>
            <h4 className='kpi-data-head'>{t(props.title)}</h4>
        </>
    );
};

export default KPIDataHead; 
