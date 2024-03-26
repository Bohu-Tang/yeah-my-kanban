import React, { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import logo from './logo.svg';
import './App.css';
import KanbanBoard, { COLUMN_KEY_TODO, COLUMN_KEY_ONGOING, COLUMN_KEY_DONE } from './KanbanBoard';
import AdminContext from '../context/AdminContext';
import { testPost } from '../apiService';

export const kanbanCardStyles = css`
    margin-bottom: 1rem;
    padding: 0.6rem 1rem;
    border: 1px solid gray;
    border-radius: 1rem;
    list-style: none;
    background-color: rgba(255, 255, 255, 0.4);
    text-align: left;

    &:hover {
        box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.2), inset 0 1px #fff;
    }
`;
export const kanbanCardTitleStyles = css`
    min-height: 3rem;

    & > input {
        width: 80%;
    }
`;

const DATA_STORE_KEY = 'kanban-data-store';

// 主程序
function App() {
  // 基础数据
  const [todoList, setTodoList] = useState([]);
  const [ongoingList, setOngoingList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  const updaters = {
    [COLUMN_KEY_TODO]: setTodoList,
    [COLUMN_KEY_ONGOING]: setOngoingList,
    [COLUMN_KEY_DONE]: setDoneList,
  };

  // 添加卡片相关
  const handleAdd = (column, newCard) => {
    console.log('handleAdd', column, newCard);
    updaters[column]((currentStat) => [newCard, ...currentStat]);
  };

  // 数据存取相关
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const data = window.localStorage.getItem(DATA_STORE_KEY);
    setTimeout(() => {
      if (data) {
        const kanbanColumnData = JSON.parse(data);
        setTodoList(kanbanColumnData.todoList);
        setOngoingList(kanbanColumnData.ongoingList);
        setDoneList(kanbanColumnData.doneList);
      }
      setIsLoading(false);
    }, 1000);
  }, []);
  const handleSaveAll = () => {
    window.localStorage.setItem(DATA_STORE_KEY, JSON.stringify({
      todoList,
      ongoingList,
      doneList,
    }));
  };

  // 卡片拖拽相关

  const handleRemove = (column, cardToRemove) => {
    updaters[column]((currentStat) => currentStat.filter((item) => item.title !== cardToRemove.title));
  };

  // 管理员模式相关
  const [isAdmin, setIsAdmin] = useState(false);
  const handleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  // 测试用
  const testButton = () => {
    let param = {"displayStart":1,"displayLength":10,"seeAble":true}
    
    testPost(param).then(res=>{
      console.log(res)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <span>我的看板</span>
          <button onClick={handleSaveAll}>保存所有卡片</button>
          <button onClick={handleAdmin}>
            {isAdmin ? '退出管理员模式' : '进入管理员模式'}
          </button>
          <button onClick={testButton}>测试按钮</button>

        </h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <AdminContext.Provider value={isAdmin}>
        <KanbanBoard
          isLoading={isLoading}
          todoList={todoList}
          ongoingList={ongoingList}
          doneList={doneList}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      </AdminContext.Provider>

    </div>
  );
}

export default App;
