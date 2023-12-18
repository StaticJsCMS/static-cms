import type { FC, ReactNode } from 'react';
import './Modal.css';
interface ModalProps {
    open: boolean;
    children: ReactNode;
    className?: string;
    onClose?: () => void;
}
declare const Modal: FC<ModalProps>;
export default Modal;
