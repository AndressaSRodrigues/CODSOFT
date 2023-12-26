import { useAuth } from "../../context/AuthContext"

function DisplayUserInformation() {
    const { userName, userRole, userEmail } = useAuth();

    const titleStyle = 'text-primary font-bold';
    const spanStyle = 'flex flex-col text-md lg:text-lg';

    return (
        <>
            <div className="w-full flex flex-col items-start justify-start gap-4 mb-6 lg:ml-60 lg:my-4">
                <h1 className="text-primary text-2xl font-bold lg:mb-6">Account Information</h1>
                <span className={spanStyle}>
                    <span className={titleStyle}>
                        Name
                    </span>
                    {userName}
                </span>
                <span className={spanStyle}>
                    <span className={titleStyle}>
                        Goal
                    </span>
                    {userRole === 'person' ? 'I am looking for a job.' : 'I am looking for talent.'}
                </span>
                <span className={spanStyle}>
                    <span className={titleStyle}>
                        Email
                    </span>
                    {userEmail}
                </span>
            </div>
        </>
    )
}

export default DisplayUserInformation