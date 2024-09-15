import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [images, setImages] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("description", description);

        try {
            const response = await axios.post("http://localhost:8080/images/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setImageUrl(`http://localhost:8080/images/${response.data.name}`);
            setMessage("Image uploaded successfully!");
            setMessageType("success");
            fetchImages(); // Refresh the image list
        } catch (error) {
            console.error("Error uploading image", error);
            setMessage("Error uploading image. Please try again.");
            setMessageType("error");
        }
    };

    const fetchImages = async () => {
        try {
            const response = await axios.get("http://localhost:8080/images");
            setImages(response.data);
        } catch (error) {
            console.error("Error fetching images", error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div className="container mt-5" style={{ paddingTop: '70px' , paddingBottom: '200px' }}>
            <h2 className="mb-4">Upload and View Images</h2>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="file">Choose File</label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="file"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="description">Image Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            placeholder="Enter image description"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </div>
                    <button className="btn btn-primary mt-3" onClick={handleUpload}>
                        Upload Image
                    </button>

                    {/* Display message */}
                    {message && (
                        <div className={`alert mt-3 ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {message}
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    {imageUrl && (
                        <div className="mt-3">
                            <h4>Uploaded Image:</h4>
                            <img src={imageUrl} alt="Uploaded" className="img-fluid" />
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-5">
                <h3>All Uploaded Images</h3>
                <div className="row">
                    {images.map((image) => (
                        <div className="col-md-4 mb-4" key={image.imageID}>
                            <div className="card">
                                <img
                                    src={`http://localhost:8080/images/${image.name}`}
                                    alt={image.description}
                                    className="card-img-top"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{image.name}</h5>
                                    <p className="card-text">{image.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;
