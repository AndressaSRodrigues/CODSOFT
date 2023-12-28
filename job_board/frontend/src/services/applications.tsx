import { JobApplicationProps } from "../interfaces/JobApplicationProps";

const URL = "http://localhost:3000/";

export const sendNewApplication = async (
    token: string,
    jobId: string | null,
    jobTitle: string | null,
    userEmail: string,
    resume: File | null,
    companyName: string | null,
    companyEmail: string | null,
): Promise<JobApplicationProps> => {
    const formData = new FormData();
    formData.append("token", token)
    formData.append("userEmail", userEmail);
    formData.append("jobId", jobId || "");
    formData.append("jobTitle", jobTitle || "")
    formData.append("resume", resume || "");
    formData.append("companyName", companyName || "")
    formData.append("companyEmail", companyEmail || "");

    return fetch(`${URL}applications`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData
    })
        .then((response) => {
            return response.json() as Promise<JobApplicationProps>;
        })
        .catch((error) => {
            console.error(error)
            throw new Error("Failed to send application");
        });
};

export const getApplicationsByUser = async (userEmail: string): Promise<{ applications: JobApplicationProps[]}> => {
    return fetch(`${URL}applications/${userEmail}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json() as Promise<{ applications: JobApplicationProps[] }>;
        })
        .catch((error) => {
            console.error(error)
            throw new Error("Failed to fetch application");
        });
};

export const deleteJobApplication = async (token: string, id: string): Promise<{ applications: JobApplicationProps[]}> => {
    return fetch(`${URL}application/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    .then((response) => {
        return response.json();
    })
    .catch((error) => {
        console.error(error)
        throw new Error("Failed to delete application");
    });
};
