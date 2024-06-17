import React, {useEffect, useState} from "react";
import {Box, Button, FormControl, Modal, TextField, Typography} from "@mui/material";
import {sendRequest} from "../../apiUtils.ts";
import {useForm} from 'react-hook-form';
import Team from "../../interfaces/Team";
import DatePicker from "../form-components/DatePicker.tsx"
import {ErrorMessage} from "@hookform/error-message";
import dayjs, {Dayjs} from 'dayjs';


type TeamModalProps = {
    isOpen: boolean;
    onClose: () => void;
    initialValues?: Team;
};

const TeamModal: React.FC<TeamModalProps> = ({isOpen, onClose, initialValues}) => {
    const isEdit: boolean = !!initialValues?.id

    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm<Team>({
        defaultValues: {
            name: '',
            description: '',
            version: '',
            lastDeploymentDate: new Date()
        }
    });

     const [dateError, setDateError] = useState<string | null>(null);


    const handleFormSubmit = async (formData: Team) => {
        if (!formData.lastDeploymentDate) {
            setDateError('Please select a date.');
            return;
        }

        if (Object.keys(errors).length > 0) {
            console.log('Form has errors, cannot submit');
            return;
        }
        let response;
        if (isEdit) {
            response = await editTeam({...formData});
        } else {
            response = await addTeam({...formData});
        }
        console.log('Added/edited successfully:', response);
        onClose();
    };

    useEffect(() => {
        if (isOpen && initialValues) {
            setValue('name', initialValues.name || '');
            setValue('description', initialValues.description || '');
            setValue('version', initialValues.version || '');
            setValue('lastDeploymentDate', initialValues.lastDeploymentDate || null);
        } else {
            setValue('name', '');
            setValue('description', '');
            setValue('version', '');
            setValue('lastDeploymentDate', null)
        }
    }, [isOpen, initialValues, setValue]);

    const addTeam = async (formData: Team) => {
        return await sendRequest('http://localhost:8080/api/teams', 'POST', formData);
    };

    const editTeam = async (formData: Team) => {
        const editedTeam: Team = {id: initialValues!.id, ...formData};
        return await sendRequest(`http://localhost:8080/api/teams/${initialValues!.id}`, 'PUT', editedTeam);
    };

    const handleCancel = () => {
        reset(); // Reset the form state
        onClose(); // Close the modal
    };

    const handleDateSelect = (selectedDate: Dayjs | null) => {
        setValue('lastDeploymentDate', selectedDate); // Update form value
        setDateError(null);
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
                    <Typography sx={{padding: 4}}  variant="h5">{isEdit ? "Edit Team" : "Add Team"}</Typography>
                    <FormControl fullWidth margin="normal" component="form" onSubmit={handleSubmit(handleFormSubmit)}
                                 sx={{paddingLeft: 4, paddingRight: 4, paddingBottom: 4}}>
                        {/*<Typography variant="h6" color="error"></Typography>*/}
                        <TextField
                            sx={{mb: errors.name ? 0 : 2}}
                            size="small"
                            {...register('name', {
                                required: true,
                                maxLength: {
                                    value: 50,
                                    message: "Team name must be at most 30 characters long."
                                }
                            })}
                            variant="outlined"
                            label="Team Name"
                        />
                        <ErrorMessage sx={{mb: 2}} errors={errors} name="name"
                                      as={<Typography variant="body2" color="error"/>}/>
                        <TextField
                            sx={{mb: errors.description ? 0 : 2}}
                            size="small"
                            {...register('description', {
                                required: true,
                                maxLength: {
                                    value: 250,
                                    message: "Description must be at most 250 characters long."
                                }
                            })}
                            variant="outlined"
                            label="Description"
                            multiline
                            rows={3}
                        />
                        <ErrorMessage sx={{mb: 2}} errors={errors} name="description"
                                      as={<Typography variant="body2" color="error"/>}/>
                        <TextField
                            sx={{mb: errors.version ? 0 : 2}}
                            size="small"
                            {...register('version', {
                                required: true,
                                pattern: {
                                    value: /^\d+(\.\d+){2}$/,
                                    message: "Version must be in the format x.y.z."
                                }
                            })}
                            variant="outlined"
                            label="Version"
                        />
                        <ErrorMessage sx={{mb: 2}} errors={errors} name="version"
                                      as={<Typography variant="body2" color="error"/>}/>
                        <DatePicker
                            onSelectDate={handleDateSelect}
                            hasError={dateError !== null}
                            initialValue={initialValues ? dayjs(initialValues.lastDeploymentDate) : null}
                        />
                        {dateError && <Typography variant="body2" color="error">{dateError}</Typography>}
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
};

export default TeamModal;

