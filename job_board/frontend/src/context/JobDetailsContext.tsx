import { createContext, useContext, useState, ReactNode } from "react";

interface JobDetailsContextProps {
    children: ReactNode;
}

interface JobDetailsContextValues {
    jobId: string | null;
    jobTitle: string | null;
    companyName: string | null;
    companyEmail: string | null;
    setJobDetails: (id: string, title: string, company: string, email: string) => void;
}

const JobDetailsContext = createContext<JobDetailsContextValues | undefined>(undefined);

export const JobDetailsProvider: React.FC<JobDetailsContextProps> = ({ children }) => {
    const [jobId, setJobId] = useState<string | null>(null);
    const [jobTitle, setJobTitle] = useState<string | null>(null);
    const [companyName, setCompanyName] = useState<string | null>(null);
    const [companyEmail, setCompanyEmail] = useState<string | null>(null);

    const setJobDetails = (id: string, title: string, company: string, email: string) => {
        setJobId(id);
        setJobTitle(title);
        setCompanyName(company);
        setCompanyEmail(email);
    };

    return (
        <JobDetailsContext.Provider value={{ jobId, jobTitle, companyName, companyEmail, setJobDetails }}>
            {children}
        </JobDetailsContext.Provider>
    );
};

export const useJobDetails = (): JobDetailsContextValues => {
    const context = useContext(JobDetailsContext);

    if (!context) {
        throw new Error('useJobDetails must be used within a JobDetailsProvider');
    }

    return context;
};