import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReportsUpload = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axios.get('http://localhost:8080/reports');
            setReports(response.data);
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);

        try {
            await axios.post('http://localhost:8080/reports/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setTitle('');
            setFile(null);
            fetchReports(); // Refresh the report list after upload
        } catch (error) {
            console.error('Error uploading report:', error);
        }
    };

    const viewReport = (filename) => {
        window.open(`http://localhost:8080/reports/${filename}`, '_blank');
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '700px', marginLeft: '230px', marginTop: '50px' }}>
            <h1 className="mb-4">Upload Report</h1>
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Report Title" 
                    value={title} 
                    onChange={handleTitleChange} 
                />
            </div>
            <div className="mb-3">
                <input 
                    type="file" 
                    className="form-control" 
                    onChange={handleFileChange} 
                />
            </div>
            <button 
                className="btn btn-primary" 
                onClick={handleUpload}
            >
                Upload
            </button>

            <h2 className="mt-5">Uploaded Reports</h2>
            <ul className="list-group mt-3">
                {reports.map(report => (
                    <li key={report.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{report.id} {report.title}</span>
                        <button 
                            className="btn btn-info btn-sm" 
                            onClick={() => viewReport(report.filename)}
                        >
                            View
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReportsUpload;
