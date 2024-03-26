import React, { useState, useEffect, useRef } from 'react';
import { kanbanCardStyles, kanbanCardTitleStyles } from './App';

// 添加卡片组件
export default function KanbanNewCard({ submitTitle }) {
    const [title, setTitle] = useState('');
    const titleChange = (e) => {
        setTitle(e.target.value);
    };
    const enterKeyDown = (e) => {
        if (e.key === 'Enter') {
            const newCard = {
                id: new Date().toString(),
                title,
                status: 'todo',
            };
            submitTitle(newCard);
        }
    };

    const inputElem = useRef(null);
    useEffect(() => {
        inputElem.current.focus();
    }, []);

    return (
      <li css={kanbanCardStyles}>
        <h3>添加新卡片</h3>
        <div css={kanbanCardTitleStyles}>
          <input onChange={titleChange} onKeyDown={enterKeyDown} type="text" ref={inputElem} />
        </div>
      </li>
    );
}
