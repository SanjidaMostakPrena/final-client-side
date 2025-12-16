import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';


const AddBook = () => {
  const { user } = useAuth(); 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddBook = async (data) => {
    try {
      
      const bookData = {
        ...data,
        addedBy: user.email,
      };

      const res = await fetch('http://localhost:5000/librarian/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      });

      const result = await res.json();

      if (res.ok) {
        alert('Book added successfully!');
        reset();
      } else {
        alert('Failed to add book: ' + (result.error || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('Error adding book. Check console.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold text-teal-600 mb-2">Add a Book</h2>
      <p className="mb-8 text-gray-600">Fill the form to add a new book</p>

      <form onSubmit={handleSubmit(handleAddBook)} className="space-y-6">
        {/* Book Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Book Name</span>
          </label>
          <input
            type="text"
            placeholder="Book Name"
            className="input input-bordered w-full"
            {...register('bookName', { required: true })}
          />
          {errors.bookName && (
            <span className="text-red-500 text-sm">Book name is required</span>
          )}
        </div>

        {/* Author */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Author</span>
          </label>
          <input
            type="text"
            placeholder="Author Name"
            className="input input-bordered w-full"
            {...register('bookAuthor', { required: true })}
          />
          {errors.bookAuthor && (
            <span className="text-red-500 text-sm">Author is required</span>
          )}
        </div>

        {/* Book Image */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Book Image URL</span>
          </label>
          <input
            type="text"
            placeholder="Image URL"
            className="input input-bordered w-full"
            {...register('bookImage', { required: true })}
          />
          {errors.bookImage && (
            <span className="text-red-500 text-sm">Book image is required</span>
          )}
        </div>

        {/* Status Dropdown */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Status</span>
          </label>
          <select
            className="select select-bordered w-full"
            {...register('status', { required: true })}
          >
            <option value="">Select Status</option>
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
          {errors.status && (
            <span className="text-red-500 text-sm">Status is required</span>
          )}
        </div>

        {/* Price */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Price</span>
          </label>
          <input
            type="number"
            placeholder="Price"
            className="input input-bordered w-full"
            {...register('price', { required: true, min: 0 })}
          />
          {errors.price && (
            <span className="text-red-500 text-sm">
              Price is required and must be positive
            </span>
          )}
        </div>

        {/* Optional Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Description (Optional)</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Add book description"
            {...register('description')}
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn bg-lime-400 hover:bg-lime-500 text-gray-800 font-bold w-full md:w-auto"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
