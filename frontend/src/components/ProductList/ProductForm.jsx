import React, { useState ,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { API_ENDPOINT } from '../../../Constant.js';

import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';


const ProductForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imageFiles, setImageFiles] = useState([]);
  const navigate = useNavigate();

const onSubmit = async (data,e) => {
  try {
    
    const accessToken = localStorage.getItem("accessToken");

 
    // Redirect to login if not logged in
    useEffect(() => {
      if (!accessToken) {
        alert("You are not logged in. Redirecting to login page.");
        navigate("/login");
      }
    }, [accessToken, navigate]);

    
    const images =imageFiles;

    const requestData = {
        title: data.title,
        tags: data.tags.split(',').map(tag => tag.trim()), // Handle tags as an array
        description: data.description,
        images: images,  // Ensure images is an array
      };
  
      // Now, send the formData or the requestData as needed
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("tags", data.tags.split(',').map(tag => tag.trim()).join(","));
      formData.append("description", data.description);
    
      // Append image files to FormData
      imageFiles.forEach(image => {
        if (image instanceof File) {
          formData.append("images", image);  // Append the image file
        } else {
          console.error('Invalid image type:', image);
        }
      });
  
      
  
      

    // Send the data to the backend
    const response = await axios.post(`${API_ENDPOINT}/api/cars/`, formData,{
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`, // Pass token in Authorization header
        } // If using cookies
    });

    alert('Product submitted successfully!');
    
    // Reset the form
    e.target.reset();
    
    // const responseData = response.data;

    
  } catch (error) {
    alert(error.message)
    if (error.response) {
        console.error("Error submitting data:", error.response.data);  // Detailed response from the server
      } else {
        console.error("Error submitting data:", error.message);
      }
  }
};


  // Handle file input changes (up to 10 images)
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length + imageFiles.length <= 10) {
      setImageFiles([...imageFiles, ...Array.from(files)]);
    } else {
      alert('You can only upload a maximum of 10 images');
    }
  };

  // Remove an image from the selected files
  const removeImage = (index) => {
    const newImages = [...imageFiles];
    newImages.splice(index, 1);
    setImageFiles(newImages);
  };

  return (
<div className='productformbg'>
    <div className="product-form-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            {...register('title', { required: "Title is required" })}
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            {...register('tags', { required: "Tags are required" })}
          />
          {errors.tags && <p className="error">{errors.tags.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register('description', { required: "Description is required" })}
          />
          {errors.description && <p className="error">{errors.description.message}</p>}
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
            {imageFiles.map((file, index) => (
              <div key={index} className="image-item">
                <img src={URL.createObjectURL(file)} alt="preview" width="100" />
                <button type="button" onClick={() => removeImage(index)}>Remove</button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default ProductForm;
