import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const JobCard = ({ report, isOverlay, onCardClick }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: report._id,
        disabled: isOverlay,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    };

    const handleClick = (e) => {
        if(isDragging) return;
        if(onCardClick && !isOverlay) {
            onCardClick(report._id);
        }
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            className={`job-card ${isOverlay ? 'job-card--overlay' : ''}`}
            onClick={handleClick}
            {...attributes} 
            {...listeners}
        >
            <div className="job-card__header">
                <h4 className="job-card__title">{report.title || 'Untitled Position'}</h4>
                <div className={`match-badge ${report.matchScore >= 80 ? 'match-badge--high' : report.matchScore >= 60 ? 'match-badge--medium' : 'match-badge--low'}`}>
                    {report.matchScore}% Match
                </div>
            </div>
            
            <p className="job-card__date">Created {new Date(report.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default JobCard;
