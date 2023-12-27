import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateUserInfo } from "../../services/users";
import { useForm, Controller } from "react-hook-form";
import { FormControl, Stack, TextField } from "@mui/material";
import Modal from "../Shared/Modal";
import { ModalProps } from "../../interfaces/ModalProps";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

type FormData = {
    password: string;
    confirmPassword: string;
};

function ChangePassword({ title, open, onClose }: ModalProps) {
    const { token, userEmail } = useAuth();
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<boolean>(false);

    const { handleSubmit, control } = useForm<FormData>({
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            if (data.password !== data.confirmPassword) {
                setErrorMessage(true);
                return
            }
            await updateUserInfo(token, userEmail, data)
            setSuccessMessage(true);
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
                                                    name="password"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            label="Password"
                                                            type="password"
                                                            {...field}
                                                        />
                                                    )}
                                                />
                                                <Controller
                                                    name="confirmPassword"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            label="Confirm Password"
                                                            type="password"
                                                            {...field}
                                                        />
                                                    )}
                                                />
                                            </Stack>
                                            {errorMessage && (
                                                <span className="text-primary mt-2 text-center">
                                                    <ErrorOutlineIcon /> Passwords don't match.
                                                </span>
                                            )}
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
                                <span className="text-lg">Your password has been updated.</span>
                            </div>
                        )}
                    </Modal>
                </>
            )}
        </div>
    );
};

export default ChangePassword
