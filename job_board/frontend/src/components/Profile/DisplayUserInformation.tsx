import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserByEmail } from "../../services/users";
import { User } from "../../interfaces/User";
import Loading from "../../assets/Loading.gif";

function DisplayUserInformation() {
    const { token, userEmail } = useAuth();
    const [userInfo, setUserInfo] = useState<User>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        getUserByEmail(token, userEmail)
            .then((data) => {
                setUserInfo(data)
                setLoading(false);
            })
            .catch((error) => {
                console.error(error)
            })
    }, []);

    const titleStyle = "text-primary font-bold";
    const spanStyle = "flex flex-col text-md lg:text-lg";

    return (
        <>
            <div className="w-full flex flex-col items-start justify-start gap-4 mb-6 lg:ml-60 lg:my-4">
                <h1 className="text-primary text-2xl font-bold lg:mb-6">Account Information</h1>
                {loading ? (
                    <div className="flex flex-col justify-center items-center">
                        <img src={Loading} alt="loading..." width="300vw" />
                    </div>
                ) : (userInfo && (
                    <>
                        <span className={spanStyle}>
                            <span className={titleStyle}>
                                Name
                            </span>
                            {userInfo.name}
                        </span>
                        <span className={spanStyle}>
                            <span className={titleStyle}>
                                Goal
                            </span>
                            {userInfo.role === "person" ? "I am looking for a job." : "I am looking for talent."}
                        </span>
                        <span className={spanStyle}>
                            <span className={titleStyle}>
                                Email
                            </span>
                            {userInfo.email}
                        </span>
                    </>
                ))
                }
            </div>
        </>
    )
};

export default DisplayUserInformation
