import React from 'react';

export default function NewSectionForm(props) {
    const handleChange = (e) => {
        props.setNewSection(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addNewSection();
    }

    return (
        <form onSubmit={handleSubmit} name="newSectionForm">
            <h2 className="required">Section Title</h2>
            <input type="text" autoComplete="off" onChange={handleChange} />
            {props.error === 'code1' && <div className="error">Your input should not be empty!</div>}
            <div className="formBtnGroup">
                <button className="formBtn save"onClick={handleSubmit}>Save</button>
                <button className="formBtn cancel" type="button" onClick={() => props.setIsModalOpen(false)}>Cancel</button>
            </div>
        </form>     
    );
}