import React from 'react';
import AddDialog from '../AddDialog';
import GetData from '../core/getdata';
import Loader from '../core/loader';
import Singleblog from './singleblog';

const url = process.env.REACT_APP_BLOG_API ?? '';

const Home = () => {
  const { data, isPending, error } = GetData(url);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const handleAddDialogToggle = () => {
    setIsAddDialogOpen(!isAddDialogOpen);
  };
  return (
    <div className=" divide-y-2 divide-solid divide-slate-700 ">
      <AddDialog open={isAddDialogOpen} onClose={handleAddDialogToggle} />
      {error && <div>{error}</div>}
      {isPending && <Loader />}

      {data && data.map((i) => <Singleblog blogdata={i} key={i._id} />)}
      <button
        className=" text-white mt-11 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  w-40 justify-self-right"
        type="button"
        data-modal-toggle="large-modal"
        onClick={() => {
          handleAddDialogToggle();
        }}
      >
        Add Word
      </button>
    </div>
  );
};

export default Home;
