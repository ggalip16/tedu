
import React from 'react';
import { ScheduleItem } from '../types';
import { ClockIcon, LocationMarkerIcon } from './icons/Icons';

const mockSchedule: ScheduleItem[] = [
  { id: '1', time: '09:00 - 10:30', title: 'Calculus II', location: 'Room A-101', type: 'lecture' },
  { id: '2', time: '11:00 - 12:30', title: 'Introduction to Programming', location: 'Lab C-02', type: 'lab' },
  { id: '3', time: '14:00 - 15:30', title: 'Academic English', location: 'Room B-205', type: 'seminar' },
  { id: '4', time: '16:00 - 17:30', title: 'Physics I', location: 'Room A-102', type: 'lecture' },
];

const getTypeStyles = (type: 'lecture' | 'lab' | 'seminar') => {
  switch (type) {
    case 'lecture': return 'border-blue-500';
    case 'lab': return 'border-green-500';
    case 'seminar': return 'border-purple-500';
    default: return 'border-gray-500';
  }
};

const Schedule: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-light mb-6">Today's Schedule</h2>
      <div className="space-y-4">
        {mockSchedule.map((item) => (
          <div key={item.id} className={`bg-secondary p-5 rounded-lg border-l-4 ${getTypeStyles(item.type)} flex flex-col sm:flex-row sm:items-center sm:justify-between`}>
            <div>
              <p className="text-lg font-semibold text-light">{item.title}</p>
              <div className="flex items-center text-muted mt-1">
                <ClockIcon />
                <span className="ml-2">{item.time}</span>
              </div>
            </div>
            <div className="flex items-center text-muted mt-2 sm:mt-0">
               <LocationMarkerIcon />
              <span className="ml-2">{item.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
