import React from 'react';
import Style from './JobForm.module.css';
import Modal from '../Modal';
import NewSectionForm from './NewSectionForm';
import Rearrangement from './Rearrangement';

export default function JobForm(props) {
    // handle uncontrolled inputs, can use ref but I prefer raw javascript
    // despite breaking the best practice of react

    const handleSubmit = (e) => {
        e.preventDefault();
        props.submitJobForm();
    };

    const handleAutosizeTextarea = (e) => {
        const input = e.target;
        let rowsMin = props.fixedRowsMin;
        // make sure to conform of the height in css, or make a closure
        if (!rowsMin) {
            rowsMin = input.clientHeight;
            props.setFixedRowsMin(rowsMin);
        }

        input.style.height = `${rowsMin}px`;
        const currentHeight = input.scrollHeight;

        // checking if scrollHeight greater than the current Height
        if ( currentHeight > rowsMin) {
          const newHeight = parseInt(currentHeight*(1+.2));
          input.style.height = `${newHeight}px`;
        }
    };

    const sections = props.section.map((item, index) => {
        return (
            <div 
                id={index} 
                key={index}
            >
                <h2>{item}</h2>
                <textarea 
                    className={Style.textarea}
                    autoComplete="off"
                    onChange={handleAutosizeTextarea}
                    name={`${item}${index}`}
                >
                </textarea>
            </div>
        );
    });


    return (
        <>
            
            { props.isModalOpen === 'newSection' && 
                <Modal title="New Section" isOpen={props.isModalOpen}>
                    <NewSectionForm 
                        setIsModalOpen={props.setIsModalOpen} 
                        setNewSection={props.setNewSection} 
                        addNewSection={props.addNewSection}
                        error={props.error}
                    />
                </Modal>
            }
            { props.isModalOpen === 'rearrangement' && (
                <Modal title="Rearrangement" isOpen={props.isModalOpen}>
                    <Rearrangement
                        section={props.section}
                        setSection={props.setSection}
                        setIsModalOpen={props.setIsModalOpen} 
                        style={Style}
                    />
                </Modal>
            )}
            {props.error === 'code2' && <div className="error">You should not leave the position title and the description empty!</div>}
            <form name="jobForm" onSubmit={handleSubmit}>
                <h2 className="required">Position Title</h2>
                <input className={Style.input} type="text" autoComplete="off" name="title" required/>
                <div>
                    <h2 className="required">Description</h2>
                    <textarea 
                        className={Style.textarea}
                        autoComplete="off"
                        onChange={handleAutosizeTextarea}
                        name="description"
                        required
                    >
                    </textarea>
                </div>
                {sections}
                <button className={Style.submit} onClick={handleSubmit}>Submit</button>
                {props.error === 'code2' && <div className="error">You should not leave the position title and the description empty!</div>}
            </form>
        </>        
    );
}