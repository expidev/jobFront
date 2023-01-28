import React from 'react';
import Style from './Preview.module.css';

export default function Preview(props) {
    const displayExpiEdu = (list) => {
        return list.map((item, key) => {
            return (
                <section key={key}>
                    <div className={Style.titleWithDate}>
                        <h3 className={Style.heading2}>{item.title}</h3>
                        <p className={Style.date}>{item.date}</p>
                    </div>
                    <p className={Style.place}>{item.place}</p>
                    <div>{item.description.split('\n').map((line, index) => <p className={Style.line} key={index}>{line}<br/></p>)}</div>
                </section>
            )
        });
    };

    const displaySkillsLanguages = (list) => {
        return list.map((item, key) => {
            return (
                <section key={key}>
                    <p className={Style.line}>{item.title}{item.level ? `: ${item.level}` : ''}</p>
                </section>
            )
        });
    }

    return (
        <div>
            <div className={Style.head}>
                <section className={Style.leftHead}>
                    <h1>{props.persoInfo.name}</h1>
                    <div>
                        <p>{props.persoInfo.address}<br/>{props.persoInfo.telephone} | {props.persoInfo.email}</p>
                    </div>
                </section>
                <img className={Style.avatar} src={props.persoInfo.avatar} alt="profile" />
            </div>
            <section>
                <h2 className={Style.heading1}>Experiences</h2>
                {displayExpiEdu(props.experienceInfo)}
            </section>
            <section>
                <h2 className={Style.heading1}>Educations</h2>
                {displayExpiEdu(props.educationInfo)}
            </section>
            <section>
                <h2 className={Style.heading1}>Languages</h2>
                {displaySkillsLanguages(props.languageInfo)}
            </section>
            <section>
                <h2 className={Style.heading1}>Skills</h2>
                <div className={Style.skills}>
                    {displaySkillsLanguages(props.skillsInfo)}
                </div>
            </section>
            <div className="formBtnGroup">
                <button type="button" className="formBtn cancel" onClick={(e) => props.setModalChoice(false)}>Cancel</button>
            </div>
        </div>
    );
}