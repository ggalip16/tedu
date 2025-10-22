
import React from 'react';
import { EventItem } from '../types';
import { CalendarIcon } from './icons/Icons';

const mockEvents: EventItem[] = [
  { id: 'e1', date: 'Oct 26', title: 'Midterm Exams Begin', description: 'The official start of the midterm examination period for the fall semester.' },
  { id: 'e2', date: 'Nov 02', title: 'Guest Lecture: AI in Modern Science', description: 'A special lecture by Dr. Evelyn Reed on the impact of Artificial Intelligence.' },
  { id: 'e3', date: 'Nov 10', title: 'University Tech Fair', description: 'Explore opportunities and new technologies from leading tech companies on campus.' },
  { id: 'e4', date: 'Nov 15', title: 'Course Registration for Spring Semester', description: 'Registration opens for all students for the upcoming spring semester courses.' },
];

const UpcomingEvents: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-light mb-6">Upcoming Events</h2>
      <div className="space-y-6">
        {mockEvents.map((event) => (
          <div key={event.id} className="flex items-start gap-4">
            <div className="flex flex-col items-center justify-center bg-secondary p-3 rounded-lg w-20 flex-shrink-0">
              <span className="text-2xl font-bold text-accent">{event.date.split(' ')[1]}</span>
              <span className="text-sm text-muted">{event.date.split(' ')[0]}</span>
            </div>
            <div className="bg-secondary p-4 rounded-lg flex-1">
              <h3 className="text-lg font-semibold text-light">{event.title}</h3>
              <p className="text-muted mt-1">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
