import React from 'react';
import ExperienceEducation from './ExperienceEducation';
import PersoInfo from './PersoInfo';
import Style from './ResumeInfo.module.css';
import SkillsLanguage from './SkillsLanguage';

export default function ResumeInfo(props) {

    const handleAutosizeTextarea = (input) => {
        const rowsMin = 70;
        // make sure to conform of the height in css, or make a closure
        input.style.height = `${rowsMin}px`;
        const currentHeight = input.scrollHeight;

        // checking if scrollHeight greater than the current Height
        if ( currentHeight > rowsMin) {
          const newHeight = parseInt(currentHeight*(1+.2));
          input.style.height = `${newHeight}px`;
        }
    };

    const handleSubmit= (e) => {
        props.submitForm();
        props.setModalChoice(false);
    }

    const handleCancel = () => {
        props.setModalChoice(false);
    }

    return (
        <>
            {props.content === 'Personal Information' && (
                <PersoInfo 
                    handleCancel={handleCancel}
                    handleSubmit={handleSubmit}
                    persoInfoValue={props.persoInfo} 
                    setPersoInfo={props.setPersoInfo} 
                    style={Style}
                />
            )}
            {(props.content === 'Education' || props.content === 'Experience') && (
                <ExperienceEducation
                    experienceInfo={props.experienceInfo}
                    educationInfo={props.educationInfo}
                    setExperienceInfo={props.setExperienceInfo}
                    setEducationInfo={props.setEducationInfo}
                    addEducationSection={props.addEducationSection}
                    addExperienceSection={props.addExperienceSection}
                    content={props.content}
                    handleAutosizeTextarea={handleAutosizeTextarea}
                    handleCancel={handleCancel}
                    handleSubmit={handleSubmit}
                    style={Style}
                />
            )}
            {(props.content === 'Skills' || props.content === 'Languages') && (
                <SkillsLanguage
                    skillsInfo={props.skillsInfo}
                    languageInfo={props.languageInfo}
                    setSkillsInfo={props.setSkillsInfo}
                    setLanguageInfo={props.setLanguageInfo}
                    addSkillsSection={props.addSkillsSection}
                    addLanguageSection={props.addLanguageSection}
                    content={props.content}
                    handleCancel={handleCancel}
                    handleSubmit={handleSubmit}
                    style={Style}
                />
            )}
        </>
    );
}