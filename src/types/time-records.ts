
export interface timeRecord {
    id: number;
    employeeId: number;
    dateTime: string;
    type: 'ARRIVAL' | 'EXIT';
    createdAt: string;
    updatedAt: string | null;
}