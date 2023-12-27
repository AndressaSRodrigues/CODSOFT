import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormControl, Stack, TextField } from "@mui/material";
import Modal from "../Shared/Modal";
import { ModalProps } from "../../interfaces/ModalProps";
import { updateUserInfo } from "../../services/users";
import { useAuth } from "../../context/AuthContext";

type FormData = {
    name: string;
};

function EditNameModal({ title, open, onClose }: ModalProps) {
    const { token, userId, userRole, userEmail, setUser } = useAuth();
    const [successMessage, setSuccessMessage] = useState<boolean>(false);

    const { handleSubmit, control } = useForm<FormData>({
        defaultValues: {
            name: "",
        }
    });

    const onSubmit = async (data: FormData) => {
        try {
            await updateUserInfo(token, userEmail, data)
            setUser(token, userId, userRole, data.name, userEmail);
            setSuccessMessage(true);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {open && (
                <>
                    <Modal title={title} open={open} onClose={onClose}>
                        {!successMessage && (
                            <>
                                <div className="flex flex-col justify-start">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <FormControl>
                                            <Stack spacing={2} className="w-72 lg:w-96">
                                                <Controller
                                                    name="name"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            label="Full Name"
                                                            type="text"
                                                            {...field}
                                                        />
                                                    )}
                                                />
                                            </Stack>
                                        </FormControl>
                                        <div className="flex flex-row items-end justify-end gap-4 mt-4">
                                            <button
                                                onClick={onClose}
                                                className="w-16 h-8 p-1 bg-neutral-400 rounded-md shadow-sm text-sm text-white">
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="w-16 h-8 p-1 bg-primary rounded-md shadow-sm text-sm text-white">
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        )}
                        {successMessage && (
                            <div className="flex flex-col items-center justify-center gap-4 p-4">
                                <span className="text-lg">Your name has been edited.</span>
                            </div>
                        )}
                    </Modal>
                </>
            )}
        </div>
    );
};

export default EditNameModal
