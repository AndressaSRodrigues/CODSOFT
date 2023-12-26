export interface JobApplicationProps {
    _id: string;
    userEmail: string;
    jobId: string;
    jobTitle: string;
    resume: File;
    companyName: string;
    companyEmail: string;
    date: string;
}