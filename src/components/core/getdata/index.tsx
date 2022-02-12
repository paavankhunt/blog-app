import { useEffect, useState } from "react";
import axios from 'axios';

const  GetData=(url:string)=> {
  const [data, setData] = useState<any[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      axios.get(url, {
          signal: abortCont.signal,
        })
        .then((response) => {
          if (!response) {
            // error coming back from server
            throw Error("could not fetch the data for that resource");
          }
          return response.data;
        })
        .then((myJson) => {
          setIsPending(false);
          setData(myJson); 
          setError(null);
        })
        .catch((err) => {
          // auto catches network / connection error
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 0);
    return () => abortCont.abort();
  }, [url]);
  return { data, isPending, error };
}

export default GetData;
