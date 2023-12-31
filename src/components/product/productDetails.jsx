import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GrDeliver } from "react-icons/gr";
import CardCarousel from '../features/CardCarousel';
import MediumHouseCard from '../features/MediumHomeCard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import HomeSectionTitle from '../features/HomeSectionTittle';
import { data } from '../../test';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByIdAsync, selectProductById, selectProductListStatus } from './productSlice';
import { toast } from 'react-toastify';
import { addToCartAsync, fetchItemsByUserIdAsync, selectItems } from '../cart/cartSlice';
import { Grid } from 'react-loader-spinner';
import { useCookies } from 'react-cookie';

const ProductDetails = () => {
    const params = useParams()
    const dispatch = useDispatch();
    const product = useSelector(selectProductById)
    const items = useSelector(selectItems);
    const status = useSelector(selectProductListStatus);
    const [cookies, setCookies] = useCookies(["token"]);
    const [token, setToken] = useState("");

    if (items) {
        console.log(items, "jfhdjshfjk")
    }
    // const images = [
    //     "https://cdn.pixabay.com/photo/2017/09/07/08/57/drone-2724257_1280.jpg",
    //     "https://cdn.pixabay.com/photo/2015/06/25/17/21/smart-watch-821557_1280.jpg",
    //     "https://cdn.pixabay.com/photo/2016/11/29/12/39/blur-1869564_1280.jpg",
    //     "https://cdn.pixabay.com/photo/2014/08/05/10/30/iphone-410324_1280.jpg",
    //     "https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849822_1280.jpg",
    // ]


    const [selectedImage, setSelectedImage] = useState("");


    // if(selectProduct?.product){
    //     setSelectedImage(selectProduct?.product?.images[0].url) 
    // }

    useEffect(() => {
        if (product && product.product && product.product.images && product.product.images.length > 0) {
            setSelectedImage(product.product.images[0].url);
        } else {
            setSelectedImage("");
        }
    }, [product]);

    useEffect(() => {
        dispatch(fetchProductByIdAsync(params.id))
    }, [dispatch, params.id])



    // if (product) {
    //     console.log(product, "selefh")
    // }

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };


    const handleCart = (e) => {
        e.preventDefault();
        // if (items.products.findIndex((item) => item.product.id === product.product._id) < 0) {
            // console.log({ items, product });
            const newItem = {
                _id: product.product._id,
                quantity: 1,
            };
            if (token) {
                const latestItem = { cartItem: newItem, jwtToken: token }
                dispatch(addToCartAsync({ item: latestItem }));
                toast("Item is added")
            }


        // } else {
        //     toast('Item Already added');
        // }
    };






    // const handleCart = (e) => {
    //     e.preventDefault();
    //     console.log("cleikk")
    //     toast("fjdsfksdhfdskjhfdsjk")

    // }

    useEffect(() => {
        if (cookies && cookies.token) {
            console.log(cookies.token, "dslfjadslk")
            setToken(cookies.token);
        }
    }, [cookies]);




    return <>

        <div>


            {status === 'loading' ? (
                <div className=' flex items-center justify-center h-[600px]'>
                    <Grid
                        height="80"
                        width="80"
                        color="rgb(79, 70, 229) "
                        ariaLabel="grid-loading"
                        radius="12.5"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            ) : null}

            {product && <>

                <section className="text-gray-700 body-font overflow-hidden bg-white">
                    <div className="container px-5 py-8 mx-auto">
                        <div className="w-full mx-auto flex flex-wrap md:px-32 px-0 flex-col md:flex-row">

                            <div className='md:w-[30%] w-full md:p-0 p-4 '>
                                <div className='w-full h-1/3 rounded-lg'>
                                    <img

                                        alt="ecommerce"
                                        className="w-full h-full object-cover object-center rounded-lg border border-gray-200"
                                        src={selectedImage}
                                    />
                                </div>
                                <div className='w-full flex flex-wrap items-center justify-center my-4 gap-3'>
                                    {product?.product && product?.product.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`w-[60px] h-[60px] border-2 rounded-md cursor-pointer ${selectedImage === image
                                                ? 'border-gray-500 ring-2 ring-green-200'
                                                : 'border-gray-200'
                                                }`}
                                            onClick={() => handleImageClick(image.url)}
                                        >
                                            <img
                                                src={image.url}
                                                alt={`Thumbnail ${index}`}
                                                className='w-full h-full object-cover object-center rounded'
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className='w-full flex items-center justify-between px-4'>
                                    <button onClick={handleCart} className='rounded-full px-8 py-2 bg-primary-blue text-white'>Add to Cart</button>
                                    <button className='rounded-full px-8 py-2 bg-primary-blue text-white'>Buy Now</button>
                                </div>
                            </div>
                            <div className=" md:w-[70%] w-full lg:pl-10 lg:py-0 mt-0 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">{product?.product.category}</h2>
                                <h1 className="text-primary-blue text-2xl title-font font-medium my-8">{product?.product.name}</h1>
                                <div className='flex gap-8'>
                                    <div className='flex flex-col gap-2'>
                                        <p className="text-primary-blue text-2xl title-font font-medium">CZ's</p>
                                        <p className="text-primary-blue text-2xl title-font font-medium">₹{product?.product.price}</p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <p className="text-gray-500 text-2xl title-font font-medium">MRP</p>
                                        <p className="text-gray-500 text-2xl title-font font-medium">₹{product?.product.price}</p>
                                    </div>
                                </div>
                                <p className='my-4 text-xl '>Standard EMI starting from ₹2,192/month <span className='ml-4 text-sm font-semibold text-primary-blue'>View Plans</span></p>
                                <div className="flex mb-4">
                                    <span className="flex items-center">
                                        <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <span className="text-gray-600 ml-3">{product?.product?.ratings} Reviews</span>
                                    </span>
                                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                        <a className="text-gray-500">
                                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                            </svg>
                                        </a>
                                        <a className="ml-2 text-gray-500">
                                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                            </svg>
                                        </a><span>(Start Rating)</span>
                                        <a className="ml-2 text-gray-500">
                                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                            </svg>
                                        </a>
                                    </span>
                                </div>
                                {product?.product.category === "Ac" ? <>           <h2 className='mb-2'>Key Features</h2>
                                    <ul className='list-disc list-inside ml-8 mb-4'>

                                        <li>1.5 Ton Inverter Split AC, 3 Star Rating</li>
                                        <li>Copper Condenser</li>
                                        <li>1 Year Comprehensive Warranty, 10 Years Compressor Warranty</li>
                                        <li>For Rooms up to 180 sq ft</li>
                                        <li>Power Consumption:1615W</li>
                                        <li>Refrigerant: R32</li>
                                        <li>Anti Microbial Air Filtration</li>
                                    </ul>

                                    <p className='text-xl font-bold mb-4'>Energy Efficiency <span>(Star Rating)</span></p>
                                    <div className='flex gap-4 mb-4'>
                                        <button className='px-5 py-2 text-white bg-primary-blue rounded-md'> 3 Star</button>
                                        <button className='px-4 py-2 text-gray-500 border-2 border-gray-500 bg-white rounded-md'> 5 Star</button>
                                    </div>
                                    <p className='text-xl font-bold mb-4'>Air Condition Capacity</p>
                                    <div className='flex gap-4 mb-4'>
                                        <button className='px-5 py-2 text-white bg-primary-blue rounded-md'> 1.0</button>
                                        <button className='px-4 py-2 text-gray-500 border-2 border-gray-500 bg-white rounded-md'> 1.5</button>
                                        <button className='px-4 py-2 text-gray-500 border-2 border-gray-500 bg-white rounded-md'> 2.0</button>
                                    </div>
                                </> : ""}
                                <p className="leading-relaxed">{product?.product?.description}</p>
                                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                    <div className="flex">
                                        <span className="mr-3">Color</span>
                                        <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                                        <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                                        <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                                    </div>
                                    <div className="flex ml-6 items-center">
                                        <span className="mr-3">Size</span>
                                        <div className="relative">
                                            <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                                <option>SM</option>
                                                <option>M</option>
                                                <option>L</option>
                                                <option>XL</option>
                                            </select>
                                            <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                    <path d="M6 9l6 6 6-6"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <span className="title-font font-medium text-2xl text-gray-900">$58.00</span>
                                    <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Buy</button>
                                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                        </svg>
                                    </button>
                                </div>


                                <div className='border-2 border-gray-500 my-4 p-4 rounded-lg'>
                                    <p className='text-xl font-semibold'>Delivery Options</p>
                                    <p className='my-4 text-xl '>Delivery to Mumbai 400001 <span className='ml-4 text-sm font-semibold text-primary-blue'>Change</span></p>
                                    <h2 className='mb-2 font-semibold'>Express Delivery</h2>
                                    <div className='flex  gap-4'>
                                        <ul className='list-disc list-inside ml-8 mb-4'>
                                            <li className='font-semibold'>Express Delivery, Tomorrow, 20-Sep-2023</li>
                                            <li className='font-semibold'>Free Delivery</li>
                                        </ul>
                                        <GrDeliver className='mt-2 text-white bg-primary-blue text-5xl rounded-md' />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pt-5 mb-5">
                    {/* <div className="max-w-7xl mx-auto px-5 md:px-10"> */}
                    {/* <div className="w-full flex items-center justify-between flex-col md:flex-row"> */}
                    <div className="max-w-7xl mx-auto px-5 md:px-10 ">
                        <div className="w-full flex items-center justify-between">
                            <HomeSectionTitle text="Featured Products" />
                            {/* Buttons container */}
                            <div className="flex space-x-4  md:mt-0">
                                <button
                                    onClick={() => scrollLeft("feat")}
                                    className="p-2 m-2 rounded-full bg-white"
                                >
                                    <FiChevronLeft />
                                </button>
                                <button
                                    onClick={() => scrollRight("feat")}
                                    className="p-2 m-2 rounded-full bg-white"
                                >
                                    <FiChevronRight />
                                </button>
                            </div>
                        </div>
                        {data && (
                            <div id="feat" className="flex overflow-x-scroll space-x-6 overflow-y-hidden hide-scrollbar">
                                <CardCarousel id="feat" data={data} Card={MediumHouseCard} />
                            </div>
                        )}
                    </div>
                </section>


            </>}


        </div>

    </>
}

export default ProductDetails