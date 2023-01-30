import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JobApi from '../../api-back/JobApi';
import Modal from './../Modal';
import Preview from './Preview';
import Style from './Resume.module.css';
import ResumeInfo from './ResumeInfo';

export default function Resume() {
    const [ resumeInfo, setResumeInfo ] = useState([]);
    const [ persoInfo, setPersoInfo ] = useState({name:'', address:'', email:'', date:'', logo:''});
    const [ experienceInfo, setExperienceInfo ] = useState([]);
    const [ educationInfo, setEducationInfo ] = useState([]);
    const [ skillsInfo, setSkillsInfo ] = useState([]);
    const [ languageInfo, setLanguageInfo ] = useState([]);
    const [ modalChoice, setModalChoice ] = useState(false);
    const [ trackChange, setTrackChange ] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        JobApi.getResumeById(id).then(data => {
            if (data && data.error) {
                console.log(data.error);
            } else {
                setResumeInfo(data.content);
                data.content.forEach(item => {
                    switch(item.title) {
                        case 'Personal Information':
                            setPersoInfo(item.content);
                            break;
                        case 'Experience':
                            setExperienceInfo(item.content);
                            break;
                        case 'Education':
                            setEducationInfo(item.content);
                            break;
                        case 'Skills':
                            setSkillsInfo(item.content);
                            break;
                        case 'Languages':
                            setLanguageInfo(item.content);
                            break;
                        default:
                            break;
                    }
                });
            }
        });
    }, [id, trackChange]);

    const submitForm = (e) => {
        const updatedResumeInfo = [
            {
                title: 'Personal Information',
                content: persoInfo
            },
            {
                title: 'Experience',
                content: experienceInfo
            },
            {
                title: 'Education',
                content: educationInfo
            },
            {
                title: 'Skills',
                content: skillsInfo
            },
            {
                title: 'Languages',
                content: languageInfo
            }
        ];
        JobApi.updateResumeById(id, updatedResumeInfo);
        setTrackChange(prev => !prev);
    }

    const addExperienceSection = (e) => {
        const newSection = {title: '', date: '', place: '', description: ''}
        setExperienceInfo([...experienceInfo, newSection]);
    }

    const addSkillsSection = (e) => {
        const newSection = {title: '', level: ''}
        setSkillsInfo([...skillsInfo, newSection]);
    }

    const addLanguageSection = (e) => {
        const newSection = {title: '', level: ''}
        setLanguageInfo([...languageInfo, newSection]);
    }

    const addEducationSection = (e) => {
        const newSection = {title: '', date: '', place: '', description: ''}
        setEducationInfo([...educationInfo, newSection]);
    }

    const resumeInfos = resumeInfo.map((item, index) => {
        if (item.title === 'New Sections') {
            return item.content.map((section, key) => {
                return (
                    <div className={Style.section} key={key} onClick={(e) => setModalChoice(section.title)}>
                        <h2>{section.title}</h2>
                    </div>
                );
            })
        }
        return (
            <div className={Style.section} key={index} onClick={(e) => setModalChoice(item.title)}>
                <h2>{item.title}</h2>
            </div>
        );
    });

    return (
        <>
            <Modal isOpen={modalChoice} title={modalChoice}>
                <ResumeInfo 
                    resumeInfo={resumeInfo} 
                    setResumeInfo={setResumeInfo} 
                    persoInfo={persoInfo}
                    setPersoInfo={setPersoInfo}
                    setModalChoice={setModalChoice} 
                    languageInfo={languageInfo}
                    setLanguageInfo={setLanguageInfo}
                    skillsInfo={skillsInfo}
                    setSkillsInfo={setSkillsInfo}
                    submitForm={submitForm} 
                    content={modalChoice} 
                    educationInfo={educationInfo}
                    experienceInfo={experienceInfo}
                    setEducationInfo={setEducationInfo}
                    setExperienceInfo={setExperienceInfo}
                    addExperienceSection={addExperienceSection}
                    addEducationSection={addEducationSection}
                    addLanguageSection={addLanguageSection}
                    addSkillsSection={addSkillsSection}
                />
            </Modal>
            <Modal isOpen={modalChoice==='Preview'}>
                <Preview 
                    persoInfo={persoInfo} 
                    experienceInfo={experienceInfo}
                    educationInfo={educationInfo}
                    skillsInfo={skillsInfo}
                    languageInfo={languageInfo}
                    setModalChoice={setModalChoice}
                />
            </Modal>
            <ul className="navigation">
                <li><button className="navButton" onClick={(e) =>setModalChoice('Preview')}>Preview</button></li>
            </ul>
            <h1>Resume</h1>
            <div className="wrapper">
                <ul className={Style.formNavigation}>
                    <li><button className={Style.formNavButton}>Resume</button></li>
                    <li><button className={Style.formNavButton}>Cover Letter</button></li>
                </ul>
                {resumeInfos}
            </div>    
        </>    
    );
}