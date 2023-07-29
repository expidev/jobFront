class JobApi {
    constructor() {
        this.jobKey = "jobList";
        this.companyKey = "companyInformation"
    }
    // retrieve list or saved list, if true, return the saved list
    async getJobList(saved = false) {
        const query = saved ? '?saved=true': '';
        const option = {
            method: 'GET',
        }
        try {
            let response = await fetch(`https://jobback-nel0.onrender.com/api/v1/jobs/${query}`, option);
            return await response.json();
        } catch(err) {
            console.log(err);
        }
    }

    async postNewResume(resume) {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resume)
            }
            let response = await fetch('https://jobback-nel0.onrender.com/api/v1/resume', options);
            return await response.json();
        } catch(err) {
            console.log(err);
        }
    }

    async getResumeList() {
        try {
            let response = await fetch(`https://jobback-nel0.onrender.com/api/v1/resume`, {
                method: 'GET'
            });
            return await response.json();
        } catch(err) {
            console.log(err);
        }
    }

    async getResumeById(id) {
        try {
            let response = await fetch(`https://jobback-nel0.onrender.com/api/v1/resume/${id}`, {
                method: 'GET'
            });
            return await response.json();
        } catch(err) {
            console.log(err);
        }
    }

    async updateResumeById(id, data) {
        try {
            let response = await fetch(`https://jobback-nel0.onrender.com/api/v1/resume/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch(err) {
            console.log(err);
        }
    }

    getCompanyInfo() {
        return getLS(this.companyKey)
    }

    async saveJob(id) {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id}),
            }
            let response = await fetch(`https://jobback-nel0.onrender.com/api/v1/jobs/`, options);
            return await response.json();
        } catch(err) {
            console.log(err);
        }
    }
 
    async postJob(job) {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(job)
            }
            let response = await fetch('https://jobback-nel0.onrender.com/api/v1/jobs', options);
            return await response.json();
        } catch(err) {
            console.log(err);
        }
    }

    postCompanyInfo(data) {
        setLS(this.companyKey, data);
    }
}

const jobApi = new JobApi()

export default jobApi;

function getLS(key)  {
    return JSON.parse(localStorage.getItem(key));
}

function setLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}