import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import axios from 'axios';
import { API_ENDPOINT } from '../../../Constant.js';
import { useNavigate } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



const ProductDetailPage = () => {
  const { id } = useParams();
//   const history = useHistory(); // To navigate after deletion or after saving changes
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };


  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [currentImage, setCurrentImage] = useState(null); // State to store the current image being viewed

  const handleImageClick = (image) => {
    setCurrentImage(image); // Set the image to display in the modal
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setCurrentImage(null); // Clear the current image
  };


const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    existingImages: [], // URLs of existing images
    newImages: [], // New images as File objects
  });
  

  const accessToken = localStorage.getItem("accessToken");


  const fetchData = async () => {
    try {
      
        const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(`${API_ENDPOINT}/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // If using token
        }
      });

      const responseData = response.data;
      setProduct(responseData);
    
    setFormData({
        title: responseData.title,
        description: responseData.description,
        tags: Array.isArray(responseData.tags) ? responseData.tags.join(', ') : '',
        existingImages: responseData.images || [], // Existing image URLs
        newImages: [], // Reset new images
      });
      
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setFormData((prevFormData) => ({
      ...prevFormData,
      newImages: [...prevFormData.newImages, ...files], // Add new files
    }));
  };
  
  
  const removeImage = (index, isExisting) => {
    if (isExisting) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        existingImages: prevFormData.existingImages.filter((_, i) => i !== index),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        newImages: prevFormData.newImages.filter((_, i) => i !== index),
      }));
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData instance
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append(
      "tags",
      formData.tags ? formData.tags.split(",").map((tag) => tag.trim()).join(",") : ""
    );
    formDataToSend.append("description", formData.description);

    if (formData.existingImages.length > 0) {
        formDataToSend.append("existingImages", JSON.stringify(formData.existingImages));
      }

    formData.newImages.forEach((image) => {
    if (image instanceof File) {
      formDataToSend.append("images", image); // Add new file
    }
  });
  
  

    try {

      handleOpen();
      // Send the updated product data using PUT request
      const response = await axios.put(`${API_ENDPOINT}/api/cars/${id}`, formDataToSend , {
        headers: {
            // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`, // Pass token if needed
        },
      });

      if(response)
        {
          handleClose();
        }

      const responseData = response.data;
      setProduct(responseData);  // Update product data
      setIsEditing(false); // Exit edit mode
      fetchData();
    //   navigate(-1); 

    } catch (error) {
      handleClose();
      console.error("Error updating product:", error);
    }
  };


  const handleDelete = async () => {
    try {
      // Send DELETE request using axios
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(`${API_ENDPOINT}/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // If using token
        }
      });
  
      // If successful, redirect to the products page
      navigate('/productlist');
      
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(error.message)
      // Optionally show an error message to the user
    }
  };
  

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-detail"  style={{
        maxWidth: '1000px',
        margin: '40px auto',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light semi-transparent background
        borderRadius: '16px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
        border: '1px solid #e0e0e0',
        backdropFilter: 'blur(10px)', /* Frosted glass effect */
        WebkitBackdropFilter: 'blur(10px)', /* Safari support */
        border: '1px solid rgba(255, 255, 255, 0.3)', /* Light border to enhance glass look */
      }}>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        
        <h3>Product Details</h3>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <h1>Edit Product</h1>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="images">Upload Images</label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="image-preview">
            {/* // Rendering existing images (Cloudinary URLs) */}
{formData.existingImages && formData.existingImages.length > 0 ? (
  formData.existingImages.map((image, index) => (
    <div className="product-details" key={`existing-${index}`}>
      <img src={image} alt={`Existing image ${index}`} style={{ width: "100px", height: "100px" }} />
      <button type="button" onClick={() => removeImage(index,true)}>Remove</button>
    </div>
  ))
) : (
  <p>No existing images</p>
)}

{/* // Rendering new images (local File objects as previews) */}
{formData.newImages && formData.newImages.length > 0 ? (
  formData.newImages.map((image, index) => (
    <div className="product-details" key={`new-${index}`}>
      <img
        src={URL.createObjectURL(image)} // Use URL.createObjectURL for local files
        alt={`New image ${index}`}
        style={{ width: "100px", height: "100px" }}
      />
      <button type="button" onClick={() => removeImage(index,false)}>Remove</button>
    </div>
  ))
) : (
  <p>No new images added</p>
)}









              {/* {formData.images.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image} alt={`Product Image ${index + 1}`} width="100" />
                  <button type="button" onClick={() => removeImage(index)}>Remove</button>
                </div>
              ))} */}
            </div>
          </div>

          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <>
  <div style={{
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  }}>
    <h1 style={{
      fontSize: '2rem',
      color: '#333',
      marginBottom: '10px',
      textAlign: 'center',
    }}>
      Title: {product.title}
    </h1>

    <p style={{
      fontSize: '1.2rem',
      color: '#555',
      lineHeight: '1.5',
      marginBottom: '10px',
    }}>
      Description: {product.description}
    </p>

    <p style={{
      fontSize: '1.1rem',
      color: '#777',
      fontStyle: 'italic',
      marginBottom: '20px',
    }}>
      Tags: {Array.isArray(product.tags) ? product.tags.join(", ") : "No tags available"}
    </p>

    <div 
      className="image-gallery" 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        padding: '10px',
        borderTop: '1px solid #ddd',
        borderBottom: '1px solid #ddd',
        paddingTop: '20px',
        paddingBottom: '20px',
        marginBottom: '20px',
      }}
    >
      {formData.existingImages && formData.existingImages.length > 0 ? (
        formData.existingImages.map((image, index) => (
          <div key={`existing-${index}`} style={{
            overflow: 'hidden',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          }}
          onClick={() => handleImageClick(image)} >
            <img 
              src={image} 
              alt={`Existing image ${index}`} 
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                transition: 'transform 0.3s',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        ))
      ) : (
        <p style={{
          color: '#999',
          textAlign: 'center',
        }}>
          No existing images
        </p>
      )}
    </div>

    {isModalOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={handleCloseModal} // Close modal when clicking outside the image
        >
          <div 
            style={{
              position: 'relative',
              maxWidth: '90%',
              maxHeight: '90%',
            }}
          >
            <img 
              src={currentImage} 
              alt="Large View" 
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              }}
            />
            <button 
              onClick={handleCloseModal} 
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                border: 'none',
                borderRadius: '50%',
                padding: '8px',
                cursor: 'pointer',
                fontSize: '20px',
              }}
            >
              X
            </button>
          </div>
        </div>
      )}

    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
    }}>
      <button 
        onClick={() => setIsEditing(true)} 
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
      >
        Edit Product
      </button>

      <button 
        onClick={handleDelete} 
        style={{
          padding: '10px 20px',
          backgroundColor: '#f44336',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e53935'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f44336'}
      >
        Delete Product
      </button>
    </div>
  </div>
</>

      )}
    </div>
  );
};

export default ProductDetailPage;
