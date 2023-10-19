import React, { useState } from 'react';

function CategoryCreationForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // New state for success message

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryCreation = async () => {
    try {
      const response = await fetch('/api/category/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Category created successfully
        console.log('Category created successfully');
        setSuccessMessage('Category created successfully'); // Set the success message
        setFormData({ name: '', description: '' }); // Reset the form data
      } else if (response.status === 400) {
        // Handle a bad request error (e.g., validation error)
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      } else {
        // Handle other errors
        console.error('Category creation failed');
        setErrorMessage('An error occurred while creating the category.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while creating the category.');
    }
  };

  return (
    <div>
      <h2>Create a Category</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name} // Bind the input value to the state
        onChange={handleInputChange}
      />
      <label>Description:</label>
      <input
        type="text"
        name="description"
        value={formData.description} // Bind the input value to the state
        onChange={handleInputChange}
      />
      <button onClick={handleCategoryCreation}>Create Category</button>
    </div>
  );
}

export default CategoryCreationForm;
