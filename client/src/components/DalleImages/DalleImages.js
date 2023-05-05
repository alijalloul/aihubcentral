import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "framer-motion";

import { fetchImages } from '../../redux/Images';
import Image from './DalleImage/DalleImage';
import Loader from '../Loader/Loader';


const Posts = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const fetchImagesPending = useSelector(state => state.images.pending.fetchImages);

    useEffect(() => {
        fetchImages(dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        setLoading(fetchImagesPending);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchImagesPending])

    

    const imagesInfo = useSelector(state => state.images.imagesInfo);
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(imagesInfo);
    },[imagesInfo]);


    return(
        loading ? (
            <div className='w-full h-[calc(100vh-73px)] flex justify-center items-center'>
                <div className='flex flex-col justify-center items-center'>
                    <Loader />
                    <h2 className='mt-5'>Fetching Data...</h2>
                </div>
            </div>
        ) : (
            (images?.length === 0) ? (
                <h2>Be the first to post!</h2>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75}}
                    className='h-fit min-h-[calc(100vh-73px)] w-full px-10 flex bg-slate-50 justify-between sm:flex-col'>

                    <div className='mt-10 grid grid-cols-[repeat(5,19%)] gap-y-5 gap-x-5'>
                    {
                        images.map( (image, index) => (
                            <div key={image._id} className={` ${(index === 1) && ("row-start-1 col-start-1 row-end-3 col-end-3")}`}>
                                <Image imageInfo={image} index={index}/>
                            </div>
                        ))
                    }
                    </div>
                </motion.div>
            )
        )
  );
}

export default Posts