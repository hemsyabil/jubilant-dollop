import React from 'react';
import { useTranslation } from "react-i18next"
import './Dashboard.css';
import { Card } from 'antd';

const KPIDataCard: React.FC<{ title: string }> = (props) => {
    const { t } = useTranslation()
    return (
        <>
            <Card className='kpi-data-card'>
                <p>{t(props.value)}</p>
                <p>{t(props.titleName)}</p>
            </Card>
        </>
    );
};

export default KPIDataCard; 
