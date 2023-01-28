import React from 'react';

export default function PersoInfo(props) {
    const handleChange = (e) => {
        if (e.target.name === 'avatar') {
            const [ file ] = e.target.files;
            const reader = new FileReader();
            reader.onload = () => {
                const dataURL = reader.result;
                props.setPersoInfo({...props.persoInfoValue, [e.target.name]: dataURL});
            }
            reader.readAsDataURL(file);
        } else {
            props.setPersoInfo({...props.persoInfoValue, [e.target.name]: e.target.value});
        }
    }

    return (
        <form>
            <label><h2>Name</h2></label>
            <input type="text" name='name' value={props.persoInfoValue.name} onChange={handleChange}  />
            <label><h2>Address</h2></label>
            <input type="text" name='address' value={props.persoInfoValue.address} onChange={handleChange} />
            <label><h2>Telephone</h2></label>
            <input type="text" pattern="/" name='telephone' value={props.persoInfoValue.telephone} onChange={handleChange} />
            <label><h2>Email</h2></label>
            <input type="email" name='email' value={props.persoInfoValue.email} onChange={handleChange}  />
            <label><h2>Photo</h2></label>
            <img className={props.style.coverPhoto} src={props.persoInfoValue.avatar} alt="Profile" />
            <div className={props.style.btnGroup}>
                <label htmlFor="avatar" className={props.style.logoButton}>Add</label>
                <input className={props.style.logoInput} id="avatar" type="file" accept="image/*" autoComplete="off" name='avatar' onChange={handleChange} />
                <button className={props.style.logoButton} type="button">Remove</button>
            </div>
            <div className="formBtnGroup">
                <button type="button" className="formBtn save"  onClick={props.handleSubmit}>Save</button>
                <button type="button" className="formBtn cancel" onClick={props.handleCancel}>Cancel</button>
            </div>
        </form>
    )
}

PersoInfo.defaultProps = {
    persoInfo: {
        name: '',
        address: '',
        telephone: '',
        email: '',
        logo: '',
    }
}