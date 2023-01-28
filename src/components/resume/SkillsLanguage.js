import React from 'react';

export default function SkillsLanguage(props) {
    let addSection, mainContent, setMainContent;

    if  (props.content === 'Skills') {
        mainContent = props.skillsInfo;
        setMainContent = props.setSkillsInfo;
        addSection = props.addSkillsSection;
    } else {
        mainContent = props.languageInfo;
        setMainContent = props.setLanguageInfo;
        addSection = props.addLanguageSection;
    }

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

    const mainContents = mainContent.map((item, index) => {
        return (
            <fieldset key={index} className={props.style.fieldset}>
                <label><h2>Name</h2></label>
                <input type="text" name='title' value={item.title || ''} data-index={index} onChange={handleChange} />
                <label><h2>Level</h2></label>
                <input type="text" name='level' value={item.level || ''} data-index={index} onChange={handleChange} />
            </fieldset>
        );
    });


    return (
        <form>
            {mainContents}
            <div className="formBtnGroup">
                <button type="button" className="formBtn add" onClick={addSection}>Add Section</button>
                <button type="button" className="formBtn save"  onClick={props.handleSubmit}>Save</button>
                <button type="button" className="formBtn cancel" onClick={props.handleCancel}>Cancel</button>
            </div>
        </form>
    );
}