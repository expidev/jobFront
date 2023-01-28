import React from 'react';
import Style from './CompanyForm.module.css';
import { defaultJobCover } from '../../content/defaultJobCover';
import { useNavigate } from 'react-router';

export default function CompanyForm(props) {
    const navigate = useNavigate();
    const handleChange = (e) => {
        if (e.target.name === 'companyName') {
            props.setCompanyForm({...props.companyForm, companyName: e.target.value});
        }
        if (e.target.name === 'logo') {
            const [ file ] = e.target.files;
            const reader = new FileReader();
            reader.onload = () => {
                const dataURL = reader.result;
                props.setCompanyForm({...props.companyForm, logo: dataURL});
            }
            reader.readAsDataURL(file);
        }
    }

    const handleSave = (e) => {
        e.preventDefault();
        props.submitCompanyForm();
        navigate('/recruit');
    }

    const handleRemove = (e) => {
        props.setCompanyForm({...props.companyForm, logo: defaultJobCover.img});
    }

    return (
        <form name="companyForm">
            <h2>Company Name</h2>
            <input type="text" name="companyName" autoComplete="off" value={props.companyForm.companyName || ''} onChange={handleChange}/>
            <h2>Company Logo</h2>
            <img className={Style.coverPhoto} src={props.companyForm.logo} alt="logo of the company" />
            <div className={Style.btnGroup}>
                <label htmlFor="companyLogo" className={Style.logoButton}>Add</label>
                <input className={Style.logoInput} id="companyLogo" type="file" accept="image/*" autoComplete="off" name='logo' onChange={handleChange} />
                <button className={Style.logoButton} type="button"onClick={handleRemove}>Remove</button>
            </div>
            <div className="formBtnGroup">
                <button className="formBtn save" onClick={handleSave}>Save</button>
            </div>
        </form>        
    );
}