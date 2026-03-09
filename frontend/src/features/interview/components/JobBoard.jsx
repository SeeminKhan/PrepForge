import React, { useState, useEffect } from 'react';
import { DndContext, closestCorners, TouchSensor, MouseSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useAuth } from '../../auth/hooks/useAuth';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { api } from '../services/interview.api';
import Column from './BoardColumn';
import JobCard from './JobCard';
import LoadingScreen from '../../../components/LoadingScreen';
import './jobboard.scss';

const DEFAULT_COLUMNS = ['Wishlist', 'Applied', 'Interviewing', 'Offer', 'Rejected'];

const JobBoard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeId, setActiveId] = useState(null); // the id actively being dragged

    // Filter reports by column
    const getColumnReports = (columnStatus) => reports.filter(r => r.status === columnStatus);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const { data } = await api.get('/api/interview/');
                setReports(data.interviewReports || []);
            } catch (error) {
                console.error("Failed to fetch reports:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
    );

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const activeReportId = active.id;
        const overColumnId = over.id;

        // If dropping inside the same column but reordering (if implemented later) or dragging to different column
        // dnd-kit core doesn't inherently supply the column ID on the over event if dropped on a card.
        // We ensure our Droppable columns and Sortable cards pass their container info.
        
        let newStatus = overColumnId;

        // If dropped over another card, get that card's status
        if (!DEFAULT_COLUMNS.includes(overColumnId)) {
             const targetCard = reports.find(r => r._id === overColumnId);
             if (targetCard) newStatus = targetCard.status;
        }

        const activeReport = reports.find(r => r._id === activeReportId);
        if (!activeReport || activeReport.status === newStatus || !DEFAULT_COLUMNS.includes(newStatus)) return;

        // Optimistically update UI
        setReports(current => 
            current.map(r => r._id === activeReportId ? { ...r, status: newStatus } : r)
        );

        try {
            await api.patch(`/api/interview/${activeReportId}/status`, { status: newStatus });
        } catch (error) {
            console.error("Failed to update status", error);
            // Revert on failure
            setReports(current => 
                current.map(r => r._id === activeReportId ? { ...r, status: activeReport.status } : r)
            );
        }
    };

    const handleCardClick = (id) => {
        // Navigate to the full interview page instead of opening sidebar
        navigate(`/interview/${id}`);
    };

    if (loading) return <LoadingScreen message="Loading your board..." variant="board" />;

    const draggingReport = activeId ? reports.find(r => r._id === activeId) : null;

    return (
        <div className="job-board-container">
            <header className="board-header">
                <h2>Interview Pipeline</h2>
                <p>Drag your generated Interview Plans from 'Wishlist' across the stages as your real-world application progresses.</p>
            </header>

            {reports.length === 0 && !loading ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#161B22', borderRadius: '12px', border: '1px dashed #30363D', margin: '2rem 0' }}>
                    <h3 style={{ fontSize: '1.25rem', color: '#e6edf3', marginBottom: '0.75rem' }}>Your pipeline is empty!</h3>
                    <p style={{ color: '#9CA3AF', marginBottom: '1.5rem' }}>Generate an Interview Plan on the Home page to see it appear here in your Wishlist.</p>
                </div>
            ) : null}

            <div className="board-scroll-area">
                <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <div className="board-columns">
                        {DEFAULT_COLUMNS.map(col => (
                            <Column key={col} id={col} title={col} tasks={getColumnReports(col)} onCardClick={handleCardClick} />
                        ))}
                    </div>
                    
                    <DragOverlay>
                        {draggingReport ? <JobCard report={draggingReport} isOverlay /> : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    );
};

export default JobBoard;
