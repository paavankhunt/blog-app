import React from "react";
import Singleblog from "./singleblog";
import GetData from "../core/getdata";
import Loader from "../core/loader";

const url = process.env.REACT_APP_BLOG_API ?? "";
const Home = () => {
  const {
    data,
    isPending,
    error,
  } = GetData(url);

  return (
    <div className=' divide-y-2 divide-solid divide-slate-700'>
      {error && <div>{error}</div>}
      {isPending && (
        <Loader/>
      )}
      {data && data.map((i) => <Singleblog blogdata={i} key={i._id} />)}
    </div>
  );
};

export default Home;
