import React, { useEffect } from 'react';

export default function ExperienceEducation(props) {
    let addSection, mainContent, setMainContent;

    if  (props.content === 'Experience') {
        mainContent = props.experienceInfo;
        setMainContent = props.setExperienceInfo;
        addSection = props.addExperienceSection;
    } else {
        mainContent = props.educationInfo;
        setMainContent = props.setEducationInfo;
        addSection = props.addEducationSection;
    }

    useEffect(() => {
        Array.from(document.querySelectorAll('textarea')).forEach(item => {
            props.handleAutosizeTextarea(item);
        });
    }, []);

    const handleChange = (e) => {
        const index =  Number(e.target.dataset.index);
        const newContent = mainContent.map((item, ref) => {
            if(index === ref) {
                return {...item, [e.target.name]: e.target.value}
            } else {
                return item
            }
        });
        setMainContent(newContent);
    }

    const handleTextareaChange = (e) => {
        props.handleAutosizeTextarea(e.target);
        handleChange(e);
    }

    const mainContents = mainContent.map((item, index) => {
        return (
            <fieldset key={index} className={props.style.fieldset}>
                <label><h2>Name</h2></label>
                <input type="text" name='title' value={item.title || ''} data-index={index} onChange={handleChange} />
                <label><h2>Date</h2></label>
                <input  type="text" name='date' value={item.date || ''} data-index={index} onChange={handleChange} />
                <label><h2>Place</h2></label>
                <input  type="text" name='place' value={item.place || ''} data-index={index} onChange={handleChange} />
                <label><h2>Description</h2></label>
                <textarea className={props.style.textarea} onChange={handleTextareaChange} name='description' value={item.description || ''} data-index={index}></textarea>
            </fieldset>
        );
    });


    return (
        <form onSubmit={props.handleSubmit}>
            {mainContents}
            <div className="formBtnGroup">
                <button type="button" className="formBtn add" onClick={addSection}>Add Section</button>
                <button type="button" className="formBtn save" onClick={props.handleSubmit}>Save</button>
                <button type="button" className="formBtn cancel" onClick={props.handleCancel}>Cancel</button>
            </div>
        </form>
    );
}