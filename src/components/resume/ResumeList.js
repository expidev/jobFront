import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import JobApi from '../../api-back/JobApi';
import { avatar } from '../../content/avatar';
import Modal from '../Modal';
import Style from './ResumeList.module.css';

export default function ResumeList() {
    const [ resumeList, setResumeList ] = useState([]);
    const [ newSection, setNewSection ] = useState('');
    const [ isNewResume, setIsNewResume ] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        JobApi.getResumeList().then(data => {
            if (data && data.error) {
                console.log(data.error)
              } else {
                setResumeList(data);
            }
        
        });
    }, []);

    const handleChange = (e) => {
        setNewSection(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const today = new Date();
        const newResume = 
            {
                date: today.toGMTString(),
                resume_id: `${today.getTime()}`,
                title: newSection,
                content:[
                    {
                        title: 'Personal Information',
                        content: {name: '', email: '', address: '', telephone: '', avatar: avatar.img}
                    },
                    {
                        title: 'Experience',
                        content: [{title: '', date: '', place:'', description: ''}]
                    },
                    {
                        title: 'Education',
                        content: [{title: '', date: '', place:'', description: ''}]
                    },
                    {
                        title: 'Skills',
                        content: [{title: '', level:'' }]
                    },
                    {
                        title: 'Languages',
                        content: [{title: '', level:'' }]
                    }
                ]
            };
        JobApi.postNewResume(newResume);
        navigate(`/resume/${newResume.resume_id}`);
    }

    const createResume = () => {
        setIsNewResume(true);
    }

    const resumes = resumeList.map((item, index) => {
        return (
            <Link to={`/resume/${item.resume_id}`} key={index}>
                <li className={Style.resume}>
                    <h2>CV: {item.title}</h2>
                </li>
            </Link>
        );
    });


    return (
        <>
            <ul className="navigation">
                <li><button className="navButton"onClick={createResume}>Create Resume</button></li>
            </ul>
            <Modal isOpen={isNewResume} title="New Resume">
                <form onSubmit={handleSubmit} name="newSectionForm">
                    <h2>Title</h2>
                    <input value={newSection} type="text" autoComplete="off" onChange={handleChange} />
                    <div className="formBtnGroup">
                        <button className="formBtn save" onClick={handleSubmit}>Save</button>
                        <button className="formBtn cancel"type="button" onClick={() => setIsNewResume(false)}>Cancel</button>
                    </div>
                </form> 
            </Modal>
            <h1>Resume List</h1>
            <ul className={Style.wrapper}>
                {resumes}
            </ul>
        </>
    )
}