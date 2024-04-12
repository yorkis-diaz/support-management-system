import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSupport } from '../redux/actions/supportActions';

// CSS
import '../styles/form.css';

const FormComponent = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  })

  const { name, email, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSupport(formData));
    setFormData({ name: '', email: '', description: '' });
  };

  return (
    <div>
      <div className='form-container'>
          <h2>Submit a Support Ticket</h2>
          <form onSubmit={handleSubmit} className='form-container'>
              <div className='form-group'>
                  <label htmlFor='name' className='form-label'>Name:</label>
                  <input 
                    type='text'
                    placeholder='Name'
                    name='name'
                    className='form-input' 
                    value={name} 
                    onChange={handleChange}
                    required
                  />
              </div>
              
              <div className='form-group'>
                  <label htmlFor='email' className='form-label'>Email:</label>
                  <input 
                    type='email' 
                    placeholder='Email' 
                    className='form-input'
                    name='email'
                    value={email} 
                    onChange={handleChange}
                    required
                  />
              </div>
              
              <div className='form-group'>
                  <label htmlFor='description' className='form-label'>Description:</label>
                  <textarea 
                    placeholder='Description'
                    className='form-textarea'
                    name='description'
                    value={description} 
                    onChange={handleChange}
                    required
                  />
              </div>
              <button type='submit' className='form-button' onSubmit={handleSubmit}>Submit</button>
          </form>
      </div>
    </div>
  );
};

export default FormComponent;