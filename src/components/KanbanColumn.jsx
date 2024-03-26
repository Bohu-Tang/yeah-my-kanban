import React, { useState } from 'react';
import { css } from '@emotion/react';
import KanbanCard from './KanbanCard';
import KanbanNewCard from './KanbanNewCard';

function kanbanColumnStyles(bgColor) {
    return css`
        flex: 1 1;
        display: flex;
        flex-direction: column;
        border: 1px solid gray;
        border-radius: 1rem;
        background-color: ${bgColor};

        & > h2 {
            margin: 0.6rem 1rem;
            padding-bottom: 0.6rem;
            border-bottom: 1px solid gray;

            & > button {
                float: right;
                margin-top: 0.2rem;
                padding: 0.2rem 0.5rem;
                border: 0;
                border-radius: 1rem;
                height: 1.8rem;
                line-height: 1rem;
                font-size: 1rem;
            }
        }

        & > ul {
            flex: 1;
            flex-basis: 0;
            margin: 1rem;
            padding: 0;
            overflow: auto;
        }
    `;
}
// 看板列组件
export default function KanbanColumn(
    {
        bgColor,
        title,
        setIsDragSource = () => {
        },
        setIsDragTarget = () => {
        },
        onDrop,
        cardList = [],
        setDraggedItem,
        canAddNew = false,
        onAdd,
        onRemove,
    },
) {
    const [showAdd, setShowAdd] = useState(false);
    const handleAdd = () => {
        setShowAdd(true);
    };
    const handleSubmit = (newCard) => {
        setShowAdd(false);
        onAdd && onAdd(newCard);
    };

    return (
      <section
        css={kanbanColumnStyles(bgColor)}
        onDragStart={() => {
                setIsDragSource(true);
            }}
        onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                setIsDragTarget(true);
            }}
        onDragLeave={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'none';
                setIsDragTarget(false);
            }}
        onDrop={(e) => {
                e.preventDefault();
                onDrop && onDrop(e);
            }}
        onDragEnd={(e) => {
                e.preventDefault();
                setIsDragTarget(false);
                setIsDragSource(false);
            }}
      >
        <h2>
          {title}
          {canAddNew && <button onClick={handleAdd} disabled={showAdd}>⊕ 添加新卡片</button>}
        </h2>
        <ul>
          {canAddNew && showAdd && <KanbanNewCard submitTitle={handleSubmit} />}
          {
                    cardList.map((item) => (
                      <KanbanCard
                        key={item.title}
                        onDragStart={() => setDraggedItem && setDraggedItem(item)}
                        onRemove={onRemove}
                        {...item}
                      />
                    ))
                }
        </ul>
      </section>
    );
}
