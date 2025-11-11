import { useRef, useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const modalRef = useRef();
    const [modalContent, setModalContent] = useState(null);

    const [onModalClose, setOnModalClose] = useState(null);

    const [dismisable, setDismisable] = useState(true);

    const closeModal = () => {
        setModalContent(null);

        if (typeof onModalClose === "function") {
            setOnModalClose(null);
            onModalClose();
        }
    };

    const contextValue = {
        modalRef,
        modalContent,
        setModalContent,
        setOnModalClose,
        closeModal,
        dismisable,
        setDismisable,
    };

    return (
        <>
            <ModalContext.Provider value={contextValue}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function Modal() {
    const { modalRef, modalContent, closeModal, dismisable } = useContext(ModalContext);

    if (!modalRef || !modalRef.current || !modalContent) return null;

    function onBackgroundClick() {
        if (dismisable != false) closeModal();
    }

    return ReactDOM.createPortal(
        <div id="modal" className={dismisable != false ? "dismisable" : ""}>
            <div id="modal-background" onClick={onBackgroundClick} />
            <div id="modal-content">{modalContent}</div>
        </div>,
        modalRef.current
    );
}

export const useModal = () => useContext(ModalContext);