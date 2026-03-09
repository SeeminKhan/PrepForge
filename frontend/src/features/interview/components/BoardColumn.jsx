import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import JobCard from './JobCard';

const BoardColumn = ({ id, title, tasks, onCardClick }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div className="board-column">
            <div className="column-header">
                <h3>{title}</h3>
                <span className="task-count">{tasks.length}</span>
            </div>
            <div ref={setNodeRef} className="column-content">
                <SortableContext items={tasks.map(t => t._id)} strategy={verticalListSortingStrategy}>
                    {tasks.map(task => (
                        <JobCard key={task._id} report={task} onCardClick={onCardClick} />
                    ))}
                    {tasks.length === 0 && <div className="empty-column-placeholder">Drop here</div>}
                </SortableContext>
            </div>
        </div>
    );
};

export default BoardColumn;
