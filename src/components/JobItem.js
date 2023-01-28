import React from 'react';
import { defaultJobCover } from '../content/defaultJobCover';
import { icon } from '../content/icon';
import Style from './JobItem.module.css';

export default function JobItem(props) {

    const handleSave = (e) => {
        e.stopPropagation();
        if(props.disable) return;
        if(props.isFullView) {
            props.setIsFullView({...props.isFullView, saved: !props.isFullView.saved});
        }
        props.saveJob(props.content._id);
    }

    const content = Object.keys(props.content).map((item, index) => {
        if (['_id', 'title', 'description', 'companyName', 'date', 'logo', 'saved'].includes(item)) {
            return '';
        } else {
            return (
                <div key={index}>
                    <h3>{item}</h3>
                    <p>{props.content[item]}</p>
                </div>
            );
        }
    })

    return (
        <section className={Style.job}>
            <div className={Style.title}>
                <h2>{props.content.title}</h2>
                <p>{props.content.date.substr(5,12)}</p>
            </div>
            <hr/>
            <div style={{overflow: 'auto'}}>
                <p>{props.content.companyName || "Anonym Company"}</p>
                <img className={Style.coverPhoto} src={props.content.logo || defaultJobCover.img} alt="Company logo" />
                <p>{props.content.description}</p>
            </div>
            {props.detail && content}
            <svg className={Style.starContainer} width="50" height="50" xmlns="http://www.w3.org/2000/svg" onClick={handleSave}>
                    <path className={Style.star} d={icon.star} stroke="black" fill={props.content.saved ? 'yellow' : 'grey'} fillOpacity="0.8"/>
            </svg>
            
        </section>
    );
}