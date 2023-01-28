import React, { cloneElement, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import JobApi from '../../api-back/JobApi';
import JobItem from '../JobItem';
import Modal from '../Modal';
import { defaultJobCover } from '../../content/defaultJobCover';
import Style from './Recruit.module.css';

export default function Recruit(props) {
    const [ section, setSection ] = useState(["Missions", "Requirements"]);
    const [ error, setError ] = useState(false);
    const [ companyForm, setCompanyForm ] = useState({companyName: '', logo: ''});
    const [ newSection, setNewSection ] = useState('');
    const [ preview, setPreview ] = useState({});
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ defaultForm, setDefaultForm ] = useState(true);
    const [ isDetail, setIsDetail ] = useState(false);
    const [ fixedRowsMin, setFixedRowsMin ] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/recruit") {
            setDefaultForm(true);
        }

        if (location.pathname === "/recruit/company") {
            setDefaultForm(false);
        }
    }, [ location ]);

    useEffect(() => {
        setCompanyForm(JobApi.getCompanyInfo() || {companyName:'', logo: defaultJobCover.img});
    }, []);

    const addNewSection = () => {
        setError(false);
        if(!newSection) {
            setError('code1')
            return;
        }
        setIsModalOpen(false);
        setSection([...section, newSection]);
    };

    const retrieveJobForm = () => {
        const uncontrolledJobForm = document.forms.jobForm;
        const sectionValue = {} ;
        section.forEach((item, index) => {
            const value = uncontrolledJobForm[`${item}${index}`].value;
            if (value) sectionValue[item] = value;
        });

        const job = {
            title: uncontrolledJobForm['title'].value,
            date: new Date().toGMTString(),
            description: uncontrolledJobForm['description'].value,
            saved: false,
            ...companyForm,
            ...sectionValue
        }

        return job;
    };

    const submitJobForm = () => {
        setError(false);
        const newJobRecruit = retrieveJobForm();
        if(!newJobRecruit.title || !newJobRecruit.description) {
            setError('code2');
            return;
        }
        JobApi.postJob(newJobRecruit);
        navigate('/');
    };

    const submitCompanyForm = () => {
        JobApi.postCompanyInfo(companyForm);
    };

    const handlePreview = () => {
        setError(false);
        const newJobRecruit = retrieveJobForm();
        if(!newJobRecruit.title || !newJobRecruit.description) {
            setError('code2');
            return;
        }
        setIsModalOpen('preview');
        setPreview(newJobRecruit);
    };

    return (
        <>
            { isModalOpen === 'preview' && (
                <Modal title="Preview" isOpen={isModalOpen}>
                    <ul className={Style.formNavigation}>
                    <li><button className={isDetail ? Style.formNavButton : `${Style.formNavButton} ${Style.active}`} onClick={() => setIsDetail(false)}>Light view</button></li>
                    <li><button className={!isDetail ? Style.formNavButton : `${Style.formNavButton} ${Style.active}`} onClick={() => setIsDetail(true)}>Full detail</button></li>
                    </ul>
                    <JobItem
                        content={preview}
                        detail={isDetail}
                        disable={true}
                    />
                    <div className="formBtnGroup">
                        <button className="formBtn cancel" type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </div>
                </Modal>
            )}
            <ul className="navigation">
                {defaultForm && ( 
                    <>
                        <li><button className="navButton" onClick={(e) => setIsModalOpen('newSection')}>Add section</button></li>
                        <li><button className="navButton" onClick={(e) => setIsModalOpen('rearrangement')}>Rearrangement</button></li>
                        <li><button className="navButton" onClick={handlePreview}>Preview</button></li>
                    </>)
                }
            </ul>
            <h1>Hire</h1>
            <div className="wrapper">
                <ul className={Style.formNavigation}>
                    <li><Link to="/recruit"><button className={!defaultForm ? Style.formNavButton : `${Style.formNavButton} ${Style.active}`}>Job Information</button></Link></li>
                    <li><Link to="/recruit/company"><button className={defaultForm ? Style.formNavButton : `${Style.formNavButton} ${Style.active}`}>Company Information</button></Link></li>
                </ul>
                {cloneElement(props.children,
                    {
                        section,
                        setSection,
                        setNewSection,
                        addNewSection,
                        error,
                        companyForm,
                        setCompanyForm,
                        submitCompanyForm,
                        setPreview,
                        submitJobForm,
                        setFixedRowsMin,
                        fixedRowsMin,
                        isModalOpen,
                        setIsModalOpen,
                        location
                    })
                }
            </div>
        </>
    );
}