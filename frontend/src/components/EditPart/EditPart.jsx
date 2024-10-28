import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { editPartThunk } from "../../store/parts";

import '../AddPart/AddPart.css';

export default function EditPart({ part, setPartChecker }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [updatedName, setUpdatedName] = useState(part.name);
    const [updatedDescription, setUpdatedDescription] = useState(part.description);
    const [partImage, setPartImage] = useState(part.imageUrl);
    const [selectedFile, setSelectedFile] = useState(null);

    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        setUpdatedName(part.name);
        setUpdatedDescription(part.description);
        setPartImage(part.imageUrl);
        setSelectedFile(null);

        setErrors({});
        setIsButtonDisabled(true);
    }, [part]);

    useEffect(() => {
        const newErrors = {};

        if (!updatedName || updatedName.trim() === "") {
            newErrors.name = "Please enter a valid Part Name";
        } else if (updatedName === part.name) {
            newErrors.name = "Please enter a new Part Name";
        }

        setErrors(newErrors);
        setIsButtonDisabled(Object.keys(newErrors).length > 0);
    }, [updatedName, updatedDescription, selectedFile, part.name]);

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file); // Set the file in selectedFile state
            setPartImage(URL.createObjectURL(file));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!isButtonDisabled) {
            await dispatch(editPartThunk({
                id: part.id,
                name: updatedName,
                description: updatedDescription,
                imageUrl: selectedFile || partImage
            }))
                .then(() => {
                    setPartChecker(true);
                    closeModal();
                });
        }
    };

    return (
        <div className="add-part-container">
            <form onSubmit={handleSave} className="add-part-form">
                <div className="add-part-title">Edit a Part</div>
                <div className="add-part-form">
                    <div className="add-part-input">
                        <label>Part Name</label>
                        <input
                            type="text"
                            name="name"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                        />
                        {errors.name && <div className="edit-part-error">{errors.name}</div>}
                    </div>
                    <div className="add-part-input">
                        <label>Description</label>
                        <textarea
                            value={updatedDescription}
                            onChange={(e) => setUpdatedDescription(e.target.value)}
                        />
                    </div>
                    <div className="add-part-input">
                        <img src={partImage} alt="part-avatar" className="part-image" />
                        <input
                            type="file"
                            name="img_url"
                            onChange={updateFile}
                            accept=".jpg, .jpeg, .png"
                        />
                    </div>
                </div>
                <div className="add-part-buttons">
                    <button
                        type="submit"
                        disabled={isButtonDisabled}
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
