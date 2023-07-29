import React, { useCallback, useEffect, useRef } from 'react';
import Style from './Modal.module.css';
import ReactDOM from 'react-dom';

export default function Modal(props) {
    const modalRef = useRef(null);

    const getStyleValue = useCallback((computedStyle, key) => {
        return parseInt(computedStyle[key], 10) || 0;
    }, []);

    useEffect(() => {
        if (props.isOpen) {
            const modalStyle = getComputedStyle(modalRef.current);
            const bodyHeight = getStyleValue(getComputedStyle(document.body), 'height');
            const newBodyHeight = Math.max(bodyHeight, 120 + getStyleValue(modalStyle, 'height') + getStyleValue(modalStyle, 'padding-top') + getStyleValue(modalStyle, 'padding-bottom'));
            document.body.style.height = newBodyHeight + 'px';
        }

        return () => {
            document.body.style.height = 'auto';
        }
    }, [props.isOpen, getStyleValue]);
    return (
        <>
            {props.isOpen && ReactDOM.createPortal((
                <div className={Style.modalOverlay}>
                    <div className={Style.modalContainer} ref={modalRef}>
                        <h1 className={Style.modalTitle}>{props.title}</h1>
                        <div className={Style.modalContent}>
                            {props.children}
                        </div>
                    </div>
                </div>
            ), document.getElementById('modal'))}
        </> 
    );
}