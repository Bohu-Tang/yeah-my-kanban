import React, {useState} from 'react';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import {useNavigate} from 'react-router-dom';

const items = [
    {
        label: 'Home',
        key: '/',
        icon: <MailOutlined/>,
    },
    {
        label: 'Kanban',
        key: 'kanban',
        icon: <AppstoreOutlined/>,
    }
];
const Nav = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState('/');
    const onClick = (e) => {
        console.log('click ', e);
        navigate(e.key);
        setCurrent(e.key);
    };
    return <Menu theme='dark' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>;
};
export default Nav;