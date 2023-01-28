import React from 'react';
import JobList from './components/JobList';
import Reception from './components/reception/Reception';
import { Routes, Route } from 'react-router-dom';
import Recruit from './components/recruit/Recruit';
import JobForm from './components/recruit/JobForm';
import ResumeList from './components/resume/ResumeList';
import CompanyForm from './components/recruit/CompanyForm';
import Saved from './components/Saved';
import Resume from './components/resume/Resume';

export default function MainRouter() {
    return (
        <Routes>
            <Route path="/" element={<JobList saved={false} />} />
            <Route path="/reception" element={<Reception />} />
            <Route path="/saved" element={<Saved />} />
            <Route exact path="/recruit" element={<Recruit><JobForm /></Recruit>} />
            <Route exact path="/recruit/company" element={<Recruit><CompanyForm /></Recruit>} />
            <Route path="/resume" element={<ResumeList />} />
            <Route path="/resume/:id" element={<Resume />} />
        </Routes>
    );
}