import {Box, Button, FormControl, Modal, TextField, Typography} from "@mui/material";
import TeamDropdown from "../form-components/TeamDropdown.tsx";
import React, {useEffect, useState} from "react";
import Member from "../../interfaces/Member.ts";
import {useForm} from "react-hook-form";
import {sendRequest} from "../../apiUtils.ts";
import {ErrorMessage} from "@hookform/error-message";

type MemberModalProps = {
    isOpen: boolean;
    onClose: () => void;
    initialValues?: Member;
};

const MemberModal: React.FC<MemberModalProps> = ({isOpen, onClose, initialValues}) => {
    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm<Member>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            teamId: ''
        }
    });

    const {register: dropdownRegister} = useForm<{ teamId: string }>();
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
    const isEdit: boolean = !!initialValues?.id

    const handleFormSubmit = async (formData: Member) => {
        setFormSubmitted(true);
        console.log('Form data:', formData)
        let response;
        if (isEdit) {
            response = await editMember(formData);
        } else {
            response = await addMember(formData);
        }
        console.log('Added/edited successfully:', response);
        onClose();

    };

    useEffect(() => {
        if (isOpen && initialValues) {
            setValue('firstName', initialValues.firstName);
            setValue('lastName', initialValues.lastName);
            setValue('email', initialValues.email);
            setValue('teamId', initialValues.teamId);
        } else {
            setValue('firstName', '');
            setValue('lastName', '');
            setValue('email', '');
            setValue('teamId', '');
        }
    }, [isOpen, initialValues, setValue]);


    const addMember = async (formData: Member) => {
        return await sendRequest('http://localhost:8080/api/members', 'POST', formData);
    }


    const editMember = async (formData: Member) => {
        const editedMember: Member = {id: initialValues!.id, ...formData};
        return await sendRequest(`http://localhost:8080/api/members/${initialValues!.id}`, 'PUT', editedMember);
    }

    const handleSelectTeam = (teamId: string) => {
        setValue('teamId', teamId);
        console.log("team selected: " + teamId.toString())
    }

    const handleCancel = () => {
        reset(); // Reset the form state
        setFormSubmitted(false);
        onClose(); // Close the modal
    };

    return (
        <Modal open={isOpen} onClose={onClose} className="add-modal">
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    outline: 'none',
                    height: '100vh'
                }}>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        width: 400,
                        display: 'flex',
                        flexDirection: 'column',
                        outline: 'none',
                        border: '1px solid',
                        borderColor: 'primary.secondary',
                        borderRadius: 1,
                    }}>
                    <Typography sx={{padding: 4}}  variant="h5">{isEdit ? "Edit Member" : "Add Member"}</Typography>
                    <FormControl fullWidth margin="normal" component="form" onSubmit={handleSubmit(handleFormSubmit)}
                                 sx={{paddingLeft: 4, paddingRight: 4, paddingBottom: 4}}>
                        <TextField
                            sx={{mb: errors.firstName ? 0 : 2}}
                            size="small"
                            {...register('firstName', {
                                required: true,
                                maxLength: 30,
                                pattern: {
                                    value: /^[A-Za-z'-]+$/,
                                    message: "First name cannot contain numbers or spaces"
                                }
                            })}
                            variant="outlined"
                            label="First Name"
                        />
                        <ErrorMessage sx={{mb: 2}} errors={errors} name="firstName"
                                      as={<Typography variant="body2" color="error"/>}/>
                        <TextField
                            sx={{mb: errors.lastName ? 0 : 2}}
                            size="small"
                            {...register('lastName', {
                                required: true,
                                maxLength: 30,
                                pattern: {
                                    value: /^[A-Za-z'-]+$/,
                                    message: "Last name cannot contain numbers or spaces"
                                }
                            })}
                            variant="outlined"
                            label="Last Name"
                        />
                        <ErrorMessage sx={{mb: 2}} errors={errors} name="lastName"
                                      as={<Typography variant="body2" color="error"/>}/>
                        <TextField
                            sx={{mb: errors.email ? 0 : 2}}
                            size="small"
                            {...register('email', {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Must have a valid email format"
                                }
                            })}
                            variant="outlined" label="Email"
                        />
                        <ErrorMessage sx={{mb: 2}} errors={errors} name="email"
                                      as={<Typography variant="body2" color="error"/>}/>
                        <TeamDropdown onSelectTeam={handleSelectTeam}
                                      dropdownRegister={dropdownRegister}
                                      formSubmitted={formSubmitted}
                                      initialValue={initialValues?.teamId}/>
                        {errors.teamId && <Typography variant="body2" color="error">Please select a team</Typography>}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            paddingTop: 2
                        }}>
                            <Button type="submit" variant="contained" color="primary" sx={{mr: 2}}>
                                Submit
                            </Button>
                            <Button onClick={handleCancel} variant="outlined">
                                Cancel
                            </Button>
                        </Box>
                    </FormControl>
                </Box>
            </Box>
        </Modal>
    );
}

export default MemberModal;