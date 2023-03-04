import React from 'react';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from './FormInput';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IBlog } from '../../store/blogs/reducer';
// import { useAppDispatch } from '../../store';

const validate = Yup.object({
  title: Yup.string().required('title is required'),
  content: Yup.string().min(6, 'min 6 characters or more').required('required'),
  author: Yup.string(),
});
// const includesword = (arrayOfArrays: any[], item: any) => {
//   let array, i, j;
//   for (i = 0; i < arrayOfArrays.length; ++i) {
//     array = arrayOfArrays[i];
//     for (j = 0; j < array.length; ++j) {
//       if (array[j] === item) {
//         return true;
//       }
//     }
//   }
//   return false;
// };
interface AddDialogProps {
  open: boolean;
  onClose: () => void;
  isUpdate?: boolean;
  initValues?: IBlog;
}
export const AddBlogForm: React.FC<AddDialogProps> = ({
  open,
  onClose,
  isUpdate,
  initValues,
}) => {
  const initialstate = {
    title: '',
    content: '',
    author: '',
  };
  let navigate = useNavigate();
  const updateInitialState = {
    title: initValues?.title,
    content: initValues?.content,
    author: initValues?.author,
  };
  const handleSubmit = async (values: any, helper: FormikHelpers<any>) => {
    helper.setSubmitting(true);
    if (isUpdate) {
      const url = process.env.REACT_APP_BLOG_API ?? '';

      axios
        .post(`${url}`, {
          title: formik.values.title,
          content: formik.values.content,
          author: formik.values.author,
        })
        .then(function (response) {
          toast.success(response.data._id);
          navigate('/');
        })
        .catch(function (error) {
          toast.error(error);
        });
      formik.isSubmitting = false;
    } else {
      formik.isSubmitting = true;
      const url = process.env.REACT_APP_BLOG_API ?? '';
      axios
        .post(`${url}`, {
          title: formik.values.title,
          content: formik.values.content,
          author: formik.values.author,
        })
        .then(function (response) {
          navigate('/');
        })
        .catch(function (error) {
          toast.error(error);
        });
      formik.isSubmitting = false;
      formik.resetForm({
        values: initialstate,
        errors: {},
        touched: {},
      });
      toast.success('Word added successfully');
    }
    helper.setSubmitting(false);
    onClose();
  };
  const formik = useFormik({
    initialValues: isUpdate ? updateInitialState : initialstate,
    validationSchema: validate,
    onSubmit: handleSubmit,
  });
  return (
    <div className="justify-self-center">
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
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

        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
          <button
            data-modal-toggle="large-modal"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
          >
            {formik.isSubmitting
              ? 'Loading...'
              : isUpdate
              ? 'Update Word'
              : 'Add Word'}
          </button>
          <button
            onClick={onClose}
            data-modal-toggle="large-modal"
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};
