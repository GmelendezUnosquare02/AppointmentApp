export interface Appointment {
    id?: number;
    title: string;
    date: string;
    user: string;
    isApproved: boolean;
    isCanceled: boolean;
  }