import { useReducer } from "react";
import DeleteUserModal from "./DeleteUserModal";
import EditNameModal from "./EditNameModal";
import ChangePassword from "./ChangePassword";

const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

type ModalAction = {
  type: typeof OPEN_MODAL | typeof CLOSE_MODAL;
  modalName: string;
};

const modalReducer = (state: Record<string, boolean>, action: ModalAction): Record<string, boolean> => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, [action.modalName]: true };
    case CLOSE_MODAL:
      return { ...state, [action.modalName]: false };
    default:
      return state;
  }
};

function ManageUserInformation() {
  const initialModalState = {
    isDeleteModalOpen: false,
    isEditNameModalOpen: false,
    isChangePasswordModalOpen: false,
  };

  const [modalState, dispatchModal] = useReducer(modalReducer, initialModalState);

  const handleOpenModal = (modalName: string) => {
    dispatchModal({ type: OPEN_MODAL, modalName });
  };

  const handleCloseModal = (modalName: string) => {
    dispatchModal({ type: CLOSE_MODAL, modalName });
  };

  const hoverStyle = "cursor-pointer hover:bg-primary hover:text-white hover:rounded-md hover:px-2";

  return (
    <>
      <div className="w-full flex flex-col items-start justify-start text-md gap-2 lg:text-lg lg:my-4">
        <h1 className="text-primary text-2xl font-bold mb-4">Manage Account</h1>
        <span onClick={() => handleOpenModal("isEditNameModalOpen")} className={hoverStyle}>
          Edit Name
        </span>
        <span onClick={() => handleOpenModal("isChangePasswordModalOpen")} className={hoverStyle}>
          Change Password
        </span>
        <span onClick={() => handleOpenModal("isDeleteModalOpen")} className={hoverStyle}>
          Delete my account
        </span>
      </div>
      {modalState.isDeleteModalOpen && <DeleteUserModal title="Delete Account" open={true} onClose={() => handleCloseModal("isDeleteModalOpen")} children={null} />}
      {modalState.isEditNameModalOpen && <EditNameModal title="Edit Name" open={true} onClose={() => handleCloseModal("isEditNameModalOpen")} children={null} />}
      {modalState.isChangePasswordModalOpen && <ChangePassword title="Change Password" open={true} onClose={() => handleCloseModal("isChangePasswordModalOpen")} children={null} />}
    </>
  );
};

export default ManageUserInformation;
