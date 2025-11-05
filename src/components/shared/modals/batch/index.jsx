import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { actions } from "../../../../redux/store";
import { useGetStandardQuery } from "../../../../api/standard";
import { InputItem } from "../../forms";
import { Validation } from "../../../../utils/constants/validation/validation";
import { isValidArray } from "../../../../utils/constants/validation/array";
import { useCreateBatchMutation, useUpdateBatchMutation } from "../../../../api/batch";
import { ModifiedSelect } from "../../options/CustomSelect";
import { admissionFormSelect } from "../../options/styles/CreatableSelect";
import { isStatusInclude } from "../../../../utils/constants/validation/response";

const BatchModal = () => {
    const { open, data } = useSelector((state) => state?.modal?.batch) || {};
    const [addReq, { isLoading: isCreating }] = useCreateBatchMutation();
    const [updateReq, { isLoading: isUpdating }] = useUpdateBatchMutation();
    const { data: standardData, isFetching } = useGetStandardQuery(null, {
        refetchOnMountOrArgChange: true,
    });

    const [standardOptions, setStandardOptions] = useState([{ value: "", label: "" }]);

    const form = useForm({
        defaultValues: { name: "", standardId: "" },
        resolver: yupResolver(Validation.BATCH),
    });

    const {
        formState: { errors },
        handleSubmit,
        register,
        getValues,
        setValue,
        reset,
        control,
    } = form;

    useEffect(() => {
        if (!standardData || standardData?.status !== 200) return;
        setStandardOptions(() => {
            return (
                isValidArray(standardData?.data) &&
                standardData?.data?.map(({ _id, name }) => {
                    return { value: _id, label: name };
                })
            );
        });
    }, [standardData]);

    useEffect(() => {
        if (!data) return;
        setValue("standardId", data?.standardId?._id || "");
        setValue("name", data?.name || "");

        return () => reset();
    }, [setValue, data, reset]);

    const handleClose = () => actions.modal.closeBatch();

    // Create and Update API
    const onSubmit = async (body) => {
        const response = data?._id ? await updateReq({ ...body, _id: data?._id }) : await addReq(body);
        const message = `Batch ${data?._id ? "updated" : "created"} successfully`;
        if (isStatusInclude(response?.data?.status)) {
            toast.success(message);
            form.reset();
        }
        handleClose();
    };

    return (
        <Modal show={open} onHide={handleClose} animation={true} centered>
            <Modal.Body className="rounded-3 bg-white edit_modal_width">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModifiedSelect
                        className="educational_select_width"
                        title="Standard"
                        name="standardId"
                        control={control}
                        options={standardOptions}
                        form={form}
                        CustomLabelStyle={"admissionLabel"}
                        CustomSelectStyle={admissionFormSelect}
                    />
                    <div className="mt-2">
                        <InputItem title={"Batch"} name={"name"} form={form} classNameLabel={"admissionLabel"} className={"masterInputClassName"} />
                    </div>
                    <div className="d-flex mt-3">
                        <button type="submit" disabled={isUpdating || isCreating} className="modal_save_button w-50 me-3">
                            Save
                        </button>
                        <button type="button" onClick={handleClose} className="w-50 modal_close_button">
                            Close
                        </button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default BatchModal;
