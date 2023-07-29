import React, { useEffect, useState } from 'react';
import Style from './JobList.module.css';
import { Link } from 'react-router-dom';
import JobItem from './JobItem';
import JobApi from '../api-back/JobApi';
import Modal from './Modal';

export default function JobList(props) {
    const [ jobList, setJobList ] = useState([]);
    const [ isFullView, setIsFullView ] = useState(false);
    const [ trackChange, setTrackChange] = useState(false);

    useEffect(() => {
        let list;
        if (props.saved) {
            list = JobApi.getJobList(true);
        } else {
            list = JobApi.getJobList();
        }
        list.then((data) => {
            if (data && data.error) {
              console.log(data.error)
            } else {
              setJobList(data)
            }
        });
    }, [trackChange, props.saved]);

    const saveJob = async (id) => {
        await JobApi.saveJob(id);
        setTrackChange(prev => !prev);
    };

    const handleClick = (e, item) => {
        e.stopPropagation();
        if (!window.getSelection().isCollapsed) return;
        setIsFullView(item);
    };

    const jobs = jobList.map((item, index) => {
        return (
            <div className={Style.jobItem} key={index} onClick={(e) => handleClick(e, item) }>
                <JobItem saveJob={saveJob} content={item} />
            </div>
    )});

    return (
        <>
            <div className="navigation">
                <Link to="/recruit">
                    <button className="navButton">
                        Hire
                    </button>
                </Link>
            </div>
            <h1>{props.saved ? 'Saved' : 'Job List'}</h1>
            <div>
                {jobs}
            </div>
            {isFullView && (
                <Modal isOpen={isFullView} title="Job">
                    <JobItem saveJob={saveJob} detail={true} isFullView={isFullView} setIsFullView={setIsFullView} content={isFullView} />
                    <div className="formBtnGroup">
                        <button className="formBtn" type="button" onClick={() => setIsFullView(false)}>Cancel</button>
                    </div>
                </Modal>
            )}
        </>
    );
}