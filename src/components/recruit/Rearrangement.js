import React from 'react';
import { icon } from '../../content/icon';


export default function Rearrangement(props) {

    const handleDragStart = (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
        e.dataTransfer.effectAllowed="move";
        console.log(e.target.id);
        console.log("called");
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.target.style.cursor = "move";
    };

    const moveSection = (prevId, currentId) => {
        if (prevId === currentId) return;
        const element = props.section[prevId];
        const newSection = [...props.section];
        if(prevId > currentId) {
            newSection.splice(currentId, 0, element);
            newSection.splice(prevId + 1, 1);
        } else {
            newSection.splice(currentId + 1, 0, element);
            newSection.splice(prevId, 1);
        }
        props.setSection(newSection);
    };
    
    const handleDrop = (e, currentId) => {
        e.preventDefault();
        const prevId = Number(e.dataTransfer.getData("text/plain"));
        moveSection(prevId, currentId);
    };

    const section = props.section.map((item, index) => {
        return (
            <div
                id={index} 
                key={index}
                className={props.style.rearrangement}
                draggable="true"
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop= {(e) => handleDrop(e, index)}
            >
                <h2>{item}</h2>
                <div className={props.style.upAndDown}>
                    {index !== 0 && (
                        <button className={props.style.artBtn} onClick={() => moveSection(index, index-1)}>
                            <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 60 60">
                                <path d={icon.up} stroke="blue" fillOpacity="0.8"/>
                            </svg>
                        </button>
                    )}

                    {index !== (props.section.length - 1) && (
                        <button className={props.style.artBtn} onClick={() => moveSection(index, index+1)}>
                            <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 60 60">
                                <path d={icon.down}  stroke="blue" fillOpacity="0.8"/>
                            </svg>  
                        </button>
                    )}
                </div>
            </div>
        );
    });

    return (
        <>
            {section}
            <div className="formBtnGroup">
                <button className="formBtn cancel" onClick={(e) => props.setIsModalOpen(false)}>Close</button>
            </div>
        </>
    );
}