import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Delete } from '../../../icons';
import DeleteDialog from '../../DeleteDialog';

export const SingleBlog = ({ ...props }) => {
  let navigate = useNavigate();
  let blogdata = props.blogdata;
  const deleteblog = () =>
    axios
      .delete(`${process.env.REACT_APP_BLOG_API}/${blogdata._id}`)
      .catch((err) => {
        return err;
      });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const handleAddDialogToggle = () => {
    setIsAddDialogOpen(!isAddDialogOpen);
  };

  const handleDeleteDialogToggle = () => {
    setIsDeleteDialogOpen(!isDeleteDialogOpen);
  };
  return (
    <div>
      <DeleteDialog
        onClose={handleDeleteDialogToggle}
        open={isDeleteDialogOpen}
        onDelete={() => deleteblog()}
      />
      <div className="container w-full pt-20 mx-auto md:max-w-3xl">
        <div className="w-full px-4 text-xl leading-normal text-gray-800 md:px-6">
          <div className="font-sans">
            <div className="flex items-center pt-6 pb-2 justify-between">
              <div className=" font-sans text-3xl font-bold text-gray-900 break-normal md:text-4xl">
                {blogdata.title.slice(0, 25)}
                {blogdata.title.length > 25 ? '...' : ''}
              </div>
              <div className="flex gap-5">
                <button
                  className="p-2 rounded-full bg-slate-200 shadow-3xl"
                  data-modal-toggle="large-modal"
                  onClick={() => {
                    handleAddDialogToggle();
                  }}
                >
                  <Edit className="w-5 h-5 fill-current" />
                </button>
                <button
                  className="p-2 rounded-full bg-slate-200"
                  onClick={() => handleDeleteDialogToggle()}
                >
                  <Delete className="w-5 h-5 fill-current" />
                </button>
              </div>
            </div>

            {blogdata.timestamp && (
              <p className="text-sm font-normal text-gray-600 md:text-base">
                {moment(blogdata.timestamp).format('MMMM Do YYYY, h:mm:ss a')}
              </p>
            )}
          </div>

          <p className="py-6">
            {blogdata.content.slice(0, 200)}
            {blogdata.content.length > 200 ? '...' : ''}
          </p>

          {blogdata.quote && (
            <blockquote className="pl-8 my-8 italic border-l-4 border-green-500 md:pl-12">
              {blogdata.quote}
            </blockquote>
          )}
          <div className="flex items-center w-full py-12 font-sans">
            {blogdata.author && (
              <>
                <img
                  className="w-10 h-10 mr-4 rounded-full"
                  src="http://i.pravatar.cc/300"
                  alt="Avatar of Author"
                />
                <div className="flex-1 px-2">
                  <p className="mb-2 text-base font-bold leading-none md:text-xl">
                    {blogdata.author}
                  </p>
                </div>
              </>
            )}
            <div className="justify-end">
              <button
                className="px-4 py-2 text-xs font-bold text-gray-500 bg-transparent border border-gray-500 rounded-full hover:border-green-500 hover:text-green-500"
                onClick={() => navigate(`/blog/${blogdata._id}`)}
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
