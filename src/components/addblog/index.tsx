import React from 'react';
import { useFormik } from 'formik';
import FormInput from './forminput';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const validate = Yup.object({
  title: Yup.string().required('title is required'),
  content: Yup.string().min(6, 'min 6 characters or more').required('required'),
  author: Yup.string().required('author is required'),
});

const initialState = {
  title: '',
  content: '',
  author: '',
};

function AddBlog() {
  let navigate = useNavigate();
  const handleSubmit = () => {
    formik.isSubmitting = true;
    const url = process.env.REACT_APP_BLOG_API ?? '';
    axios
      .post(`${url}`, {
        title: formik.values.title,
        content: formik.values.content,
        author: formik.values.author,
      })
      .then(function (response) {
        toast.success(response.data._id);
        console.log(response);
        navigate('/');
      })
      .catch(function (error) {
        toast.error(error);
      });
    formik.isSubmitting = false;
  };
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validate,
    onSubmit: handleSubmit,
  });
  return (
    <div className="justify-self-center  mt-11">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-col text-left bg-gradient-to-r from-blue-500 border p-11  mx-11 ">
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <h1 className="text-3xl mb-5">Add Blog</h1>
          <FormInput
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.errors}
            touched={formik.touched}
            onBlur={formik.handleBlur}
          />
          <FormInput
            label="Content"
            type="textarea"
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.errors}
            touched={formik.touched}
            onBlur={formik.handleBlur}
          />
          <FormInput
            label="Author"
            name="author"
            value={formik.values.author}
            onChange={formik.handleChange}
            error={formik.errors}
            touched={formik.touched}
            onBlur={formik.handleBlur}
          />
          <button
            className="flex justify-around my-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
            type="submit"
          >
            {formik.isSubmitting ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;
