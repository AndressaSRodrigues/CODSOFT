import DisplayUserInformation from "../components/Profile/DisplayUserInformation";
import ManageUserInformation from "../components/Profile/ManageUserInformation";

function UserProfile() {
    const divStyle = "min-w-screen h-fit bg-neutral-200 flex flex-col justify-center rounded-md shadow-md p-4 gap-4 m-8 lg:flex lg:flex-row lg:m-16 lg:gap-0";

    return (
        <>
            <div className={divStyle}>
                <DisplayUserInformation />
                <ManageUserInformation />
            </div>
        </>
    )
};

export default UserProfile
