import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/authSlice';

const useLoadingWithRefresh = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

   

    useEffect(() => {



            (async () => {
                try {
                 const {data} = await axios.get(`http://localhost:5555/refresh`, {
                     withCredentials: true
                 })
                 dispatch(setAuth(data))
                 setLoading(false)
                } catch (error: any) {
                 console.log(error);
                 setLoading(false)
                }
             })()

               // will preserve state now
        }, [])

    return loading;
}

export default useLoadingWithRefresh;