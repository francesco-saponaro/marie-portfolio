import React, { useEffect } from 'react'

// Sanity imports
import { client } from '../client'

// Hook fetching data from Sanity backend
function useFetchData(query, setData, setLoading) {

    console.log(arguments)
 
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    client.fetch(query, { signal: signal }).then((data) => {
      setData(data[0]);
      setLoading(false);
    })

    // Clean up
    return () => {
      controller.abort();
    }
  }, []);

}

export default useFetchData