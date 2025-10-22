
import React, { useState } from 'react';
import { Assignment } from '../types';

const mockAssignments: Assignment[] = [
  { id: 'a1', title: 'Problem Set 3', course: 'Calculus II', dueDate: '3 days left', status: 'In Progress' },
  { id: 'a2', title: 'Lab Report 1', course: 'Physics I', dueDate: '5 days left', status: 'To Do' },
  { id: 'a3', title: 'Essay Draft', course: 'Academic English', dueDate: '1 week left', status: 'To Do' },
  { id: 'a4', title: 'Final Project Proposal', course: 'Intro to Programming', dueDate: '2 weeks left', status: 'To Do' },
  { id: 'a5', title: 'Quiz 2', course: 'Calculus II', dueDate: 'Completed', status: 'Completed' },
];

const getStatusStyles = (status: 'To Do' | 'In Progress' | 'Completed') => {
  switch (status) {
    case 'To Do': return 'bg-red-500/20 text-red-300';
    case 'In Progress': return 'bg-yellow-500/20 text-yellow-300';
    case 'Completed': return 'bg-green-500/20 text-green-300';
  }
};

const Tracker: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);

  const handleStatusChange = (id: string, newStatus: Assignment['status']) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-light mb-6">Progress Tracker</h2>
      <div className="overflow-x-auto bg-secondary rounded-lg">
        <table className="w-full text-left">
          <thead className="border-b border-primary">
            <tr>
              <th className="p-4">Assignment</th>
              <th className="p-4">Course</th>
              <th className="p-4">Due</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id} className="border-b border-primary last:border-b-0 hover:bg-primary/50 transition-colors">
                <td className="p-4 font-medium text-light">{assignment.title}</td>
                <td className="p-4 text-muted">{assignment.course}</td>
                <td className="p-4 text-muted">{assignment.dueDate}</td>
                <td className="p-4">
                  <select
                    value={assignment.status}
                    onChange={(e) => handleStatusChange(assignment.id, e.target.value as Assignment['status'])}
                    className={`px-3 py-1 rounded-full text-sm font-semibold border-0 focus:ring-0 ${getStatusStyles(assignment.status)} bg-secondary`}
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tracker;
