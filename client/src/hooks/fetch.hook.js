import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from '../helper/helper'

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
const baseURL = process.env.REACT_APP_SERVER_DOMAIN || "http://localhost:8080";


/** custom hook */
export default function useFetch(query){
    console.log(query)
    const [getData, setData] = useState({ isLoading : false, apiData: undefined, status: null, serverError: null })

    useEffect(() => {

        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true}));

                const { username } = !query ? await getUsername() : '';
                
                const { data, status } = !query ? await axios.get(`${baseURL}/api/user/${username}`) : await axios.get(`${baseURL}/api/${query}`);

                if(status === 201){
                    setData(prev => ({ ...prev, isLoading: false}));
                    setData(prev => ({ ...prev, apiData : data, status: status }));
                }

                setData(prev => ({ ...prev, isLoading: false}));
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        };
        fetchData()

    }, [query]);

    return [getData, setData];
}