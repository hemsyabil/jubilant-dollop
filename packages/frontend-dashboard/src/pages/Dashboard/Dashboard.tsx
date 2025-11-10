import React from 'react';
import '../../App.css';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Col, Flex, Row } from 'antd';
import KPIDataHead from '../../components/Dashboard/KPIDataHead';
import KPIDataCard from '../../components/Dashboard/KPIDataCard';
import StatusPieChart from '../../components/Dashboard/StatusPieChart';

export default function Dashboard() {
    return (
        <div className='container'>
            <Row justify="space-between" align="middle">
                <Col span={15}>
                    {/* Left side KPI Data Cards */}
                    <Flex gap="middle" align="start" vertical>
                        <KPIDataHead title="overall" />
                        <Flex gap="middle" justify="space-between" className='box-style'>
                            <KPIDataCard titleName="total sites" value="767" />
                            <KPIDataCard titleName="total instruments" value="1254" />
                            <KPIDataCard titleName="total applications" value="2698" />
                        </Flex>
                        <KPIDataHead title="key performance" />
                        <Flex gap="middle" justify="space-between" className='box-style'>
                            <KPIDataCard titleName="total sites" value="767" />
                            <KPIDataCard titleName="total instruments" value="1254" />
                            <KPIDataCard titleName="total applications" value="2698" />
                        </Flex>
                    </Flex>
                </Col>
                <Col span={9}>
                    {/* Right side Status Pie Chart */}
                    <StatusPieChart />
                </Col>
            </Row>
        </div >
    )
}
