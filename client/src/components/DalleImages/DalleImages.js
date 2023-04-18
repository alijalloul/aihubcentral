import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchImages } from '../../redux/Images';
import Image from './DalleImage/DalleImage';


const Posts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchImages(dispatch);
    },[]);

    

    const imagesInfo = useSelector(state => state.images.imagesInfo);
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(imagesInfo);
    },[imagesInfo]);

    if(images?.length === 0){
            return <h1>Be the first to post!</h1>
    }

    return(

            <div className='h-fit min-h-[calc(100vh-73px)] w-full px-10 flex bg-slate-50 justify-between max-sm:flex-col'>
                <div className='mt-10 grid grid-cols-[repeat(5,19%)] gap-y-5 gap-x-5'>
                {
                    images.map( (image, index) => (
                        <div key={image._id} className={` ${(index === 1) && ("row-start-1 col-start-1 row-end-3 col-end-3")}`}>
                            <Image imageInfo={image} index={index}/>
                        </div>
                    ))
                }
                </div>
            </div>
  );
}

export default Posts