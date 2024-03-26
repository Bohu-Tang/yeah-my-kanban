import React, { useState } from 'react';
import { css } from '@emotion/react';
import KanbanColumn from './KanbanColumn';

const kanbanBoardStyles = css`
            flex: 10;
            display: flex;
            flex-direction: row;
            gap: 1rem;
            margin: 0 1rem 1rem;
        `;

const COLUMN_BG_COLOR = {
    loading: '#e3e3e3',
    todo: '#C9AF97',
    ongoing: '#FFE799',
    done: '#C0E8BA',
};

export const COLUMN_KEY_TODO = 'todo';
export const COLUMN_KEY_ONGOING = 'ongoing';
export const COLUMN_KEY_DONE = 'done';

// 看板面板组件
export default function KanbanBoard(
    {
        isLoading = true,
        todoList,
        ongoingList,
        doneList,
        onAdd,
        onRemove,
    },
) {
    const [draggedItem, setDraggedItem] = useState(null);
    const [dragSource, setDragSource] = useState(null);
    const [dragTarget, setDragTarget] = useState(null);
    const handleDrop = () => {
        if (!draggedItem || !dragSource || !dragTarget || dragSource === dragTarget) {
            return;
        }
        dragSource && onRemove(dragSource, draggedItem);
        dragTarget && onAdd(dragTarget, draggedItem);
    };

    return (
      <main css={kanbanBoardStyles}>
        {
                isLoading ? (
                  <KanbanColumn bgColor={COLUMN_BG_COLOR.loading} title="读取中" />
                ) : (
                  <>
                    <KanbanColumn
                      bgColor={COLUMN_BG_COLOR.todo}
                      title={
                        <span>待处理</span>
                            }
                      setIsDragTarget={(isTarget) => {
                                setDragTarget((isTarget ? COLUMN_KEY_TODO : null));
                            }}
                      setIsDragSource={(isSource) => {
                                setDragSource((isSource ? COLUMN_KEY_TODO : null));
                            }}
                      onDrop={handleDrop}
                      setDraggedItem={setDraggedItem}
                      cardList={todoList}
                      canAddNew
                      onAdd={onAdd.bind(null, COLUMN_KEY_TODO)}
                      onRemove={onRemove.bind(null, COLUMN_KEY_TODO)}
                    />

                    <KanbanColumn
                      bgColor={COLUMN_BG_COLOR.ongoing}
                      title="进行中"
                      setIsDragTarget={(isTarget) => {
                                setDragTarget((isTarget ? COLUMN_KEY_ONGOING : null));
                            }}
                      setIsDragSource={(isSource) => {
                                setDragSource((isSource ? COLUMN_KEY_ONGOING : null));
                            }}
                      onDrop={handleDrop}
                      setDraggedItem={setDraggedItem}
                      cardList={ongoingList}
                      onRemove={onRemove.bind(null, COLUMN_KEY_ONGOING)}
                    />

                    <KanbanColumn
                      bgColor={COLUMN_BG_COLOR.done}
                      title="已完成"
                      setIsDragTarget={(isTarget) => {
                                setDragTarget(isTarget ? COLUMN_KEY_DONE : null);
                            }}
                      setIsDragSource={(isSource) => {
                                setDragSource(isSource ? COLUMN_KEY_DONE : null);
                            }}
                      onDrop={handleDrop}
                      setDraggedItem={setDraggedItem}
                      cardList={doneList}
                      onRemove={onRemove.bind(null, COLUMN_KEY_DONE)}
                    />
                  </>

                )
            }
      </main>
    );
}
