import React from 'react';
import Style from './Reception.module.css';
import { defaultJobCover } from '../../content/defaultJobCover';

export default function Reception() {
    return (
        <>
            <h1>Reception</h1>
            <div className="wrapper">
                <section className={Style.messageContainer}>
                    <img className={Style.defaultCoverPhoto} src={defaultJobCover.img} alt="Sender" />
                    <div>
                        <h2>Facilitator Madagascar</h2>
                        <p>Dear Vonjy, We thank you for your candidature</p>
                    </div>
                </section>
                <hr />
            </div>
        </>
    );
}