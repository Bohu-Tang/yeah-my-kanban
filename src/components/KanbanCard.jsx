import React, { useState, useEffect, useContext } from 'react';
import { css } from '@emotion/react';
import { kanbanCardStyles, kanbanCardTitleStyles } from './App';
import AdminContext from '../context/AdminContext';

// 卡片组件
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const UPDATE_INTERVAL = MINUTE;
const kanbanStatusStyle = css`
    text-align: right;
    font-size: 0.8rem;
    color: #333;
`;
export default function KanbanCard({
                                       title, status, onDragStart, onRemove,
                                   }) {
    const [displayTime, setDisplayTime] = useState(status);

    useEffect(() => {
        const updateDisplayTime = () => {
            const timePassed = new Date().getTime() - new Date(status).getTime();
            let relativeTime = '刚刚';
            if (MINUTE <= timePassed && timePassed < HOUR) {
                relativeTime = `${Math.ceil(timePassed / MINUTE)} 分钟前`;
            } else if (HOUR <= timePassed && timePassed < DAY) {
                relativeTime = `${Math.ceil(timePassed / HOUR)} 小时前`;
            } else if (DAY <= timePassed) {
                relativeTime = `${Math.ceil(timePassed / DAY)} 天前`;
            }
            setDisplayTime(relativeTime);
        };
        const intervalId = setInterval(updateDisplayTime, UPDATE_INTERVAL);
        updateDisplayTime();

        return function cleanup() {
            clearInterval(intervalId);
        };
    }, [status]);

    const handleDragStart = (e) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', title);
        onDragStart && onDragStart(e);
    };

    const isAdmin = useContext(AdminContext);

    return (
        <li  css={kanbanCardStyles} draggable onDragStart={handleDragStart}>
            <div css={kanbanCardTitleStyles}>{title}</div>
            <div css={kanbanStatusStyle}>
                <span>{displayTime}</span>
                {isAdmin && onRemove && (<button onClick={() => onRemove({ title })}>删除</button>)}
            </div>
        </li>
    );
}
