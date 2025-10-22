
export type View = 'ai-chat' | 'schedule' | 'events' | 'tracker';

export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'Completed';
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  location: string;
  type: 'lecture' | 'lab' | 'seminar';
}

export interface EventItem {
  id: string;
  date: string;
  title: string;
  description: string;
}

export interface AiResponseData {
  answer: string;
  videos: { title: string; url: string }[];
  quiz: {
    question: string;
    options: string[];
    answer: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string | AiResponseData;
}
