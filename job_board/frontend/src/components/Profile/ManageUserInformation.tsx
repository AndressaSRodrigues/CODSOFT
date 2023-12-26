import { useReducer } from "react";
import DeleteUserModal from "./DeleteUserModal";
import EditNameModal from "./EditNameModal";

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
    isChangeRoleModalOpen: false,
    isChangePasswordModalOpen: false,
  };

  const [modalState, dispatchModal] = useReducer(modalReducer, initialModalState);

  const handleOpenModal = (modalName: string) => {
    dispatchModal({ type: OPEN_MODAL, modalName });
  };

  const handleCloseModal = (modalName: string) => {
    dispatchModal({ type: CLOSE_MODAL, modalName });
  };

  const hoverStyle = 'cursor-pointer hover:bg-primary hover:text-white hover:rounded-md hover:px-2';

  return (
    <>
      <div className="w-full flex flex-col items-start justify-start text-md gap-2 lg:text-lg lg:my-4">
        <h1 className="text-primary text-2xl font-bold mb-4">Manage Account</h1>
        <span onClick={() => handleOpenModal("isEditNameModalOpen")} className={hoverStyle}>
          Edit Name
        </span>
        <span onClick={() => handleOpenModal("isChangeRoleModalOpen")} className={hoverStyle}>
          Change Role
        </span>
        <span onClick={() => handleOpenModal("isChangePasswordModalOpen")} className={hoverStyle}>
          Change Password
        </span>
        <span onClick={() => handleOpenModal("isDeleteModalOpen")} className={hoverStyle}>
          Delete my account
        </span>
      </div>
      {modalState.isDeleteModalOpen && <DeleteUserModal open={true} onClose={() => handleCloseModal("isDeleteModalOpen")} />}
      {modalState.isEditNameModalOpen && <EditNameModal open={true} onClose={() => handleCloseModal("isEditNameModalOpen")}/> }
    </>
  );
}

export default ManageUserInformation;
