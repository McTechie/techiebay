import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { BadgeCheckIcon, StarIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, selectItems } from '../redux/slices/cartSlice'
import { selectProduct } from '../redux/slices/previewSlice'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}

const modal = {
  hidden: {
    y: '-100vh',
    opacity: 0
  },
  visible: {
    y: '4rem',
    opacity: 1,
    transition: { delay: 0.5 }
  }
}

const ProductImageLarge = ({ image, hueRotation }) => (
  <>
    <div className={`hidden lg:block p-2 border shadow-md px-4 hue-rotate-${hueRotation}`}>
      <Image
        src={image}
        width={320}
        height={320}
        objectFit='contain'
      />
    </div>
    <div className='lg:hidden p-2 border text-center shadow-md px-4'>
      <Image
        src={image}
        width={200}
        height={200}
        objectFit='contain'
      />
    </div>
  </>
)

const ProductImageOne = ({ image }) => <ProductImageLarge image={image} hueRotation={0} />
const ProductImageTwo = ({ image }) => <ProductImageLarge image={image} hueRotation={180} />
const ProductImageThree = ({ image }) => <ProductImageLarge image={image} hueRotation={90} />

const MiniImageItem = ({ product, productImageChoice, setProductImageChoice, itemKey, hueRotation }) => (
  <li
    key={itemKey}
    onClick={() => setProductImageChoice(itemKey)}
    className={`p-2 hover:cursor-pointer hover:scale-105 hover:shadow-md rounded-md border hue-rotate-${hueRotation}`}>
    <Image src={product.image} width={80} height={80} objectFit='contain' />
    {productImageChoice === itemKey ? (
      <motion.div className="underline" layoutId="underline" />
    ) : null}
  </li>
)

const MiniImageMap = ({ product, productImageChoice, setProductImageChoice }) => (
  <>
    <MiniImageItem
      product={product}
      productImageChoice={productImageChoice}
      setProductImageChoice={setProductImageChoice}
      itemKey={1}
      hueRotation={0}
    />
    <MiniImageItem
      product={product}
      productImageChoice={productImageChoice}
      setProductImageChoice={setProductImageChoice}
      itemKey={2}
      hueRotation={180}
    />
    <MiniImageItem
      product={product}
      productImageChoice={productImageChoice}
      setProductImageChoice={setProductImageChoice}
      itemKey={3}
      hueRotation={90}
    />
  </>
)

const ProductPreview = ({ setShowProductPreview }) => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const { productId, stars, hasPrimeDelivery } = useSelector(selectProduct);

  const { data: product } = useSWR(`https://fakestoreapi.com/products/${productId}`, fetcher);

  const [showFullDescription, setShowFullDescription] = useState(true);
  const [productImageChoice, setProductImageChoice] = useState(1);

  const handleAddItemToCart = () => {
    const item = {
      id: productId,
      title: product.title,
      price: Math.round(product.price * 10),
      description: product.description,
      category: product.category,
      image: product.image,
      stars,
      hasPrimeDelivery,
      count: 1
    };

    dispatch(addToCart(item));
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        variants={backdrop}
        initial='hidden'
        animate='visible'
        className='fixed top-0 left-0 w-full h-full z-[60] shadow-sm overflow-auto'
        >
        <div className='absolute w-full h-full bg-black opacity-70' />
        {product && (<motion.div
          className='max-w-screen-lg mx-auto pt-10 pb-20 px-16 bg-white rounded-md'
          variants={modal}
          initial='hidden'
          animate='visible'
        >  
          <div className='flex justify-between items-center'>
            <h3 className='text-lg md:text-xl lg:text-3xl text-black border-b py-2 border-gray-400'>
              {product.title}
            </h3>
            <button className='closePreviewBtn relative left-4 bottom-4' onClick={() => setShowProductPreview(false)}>
              X
            </button>
          </div>

          <div className='grid md:grid-cols-4 mt-10 gap-5 space-y-4'>
            <div className='md:col-span-2 flex flex-col justify-center lg:flex-row'>
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  key={productImageChoice}
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {productImageChoice === 1 ? (
                    <ProductImageOne image={product.image} />
                  ) : productImageChoice === 2 ? (
                    <ProductImageTwo image={product.image} />
                  ) : (
                    <ProductImageThree image={product.image} />
                  )}
                </motion.div>
              </AnimatePresence>
              <ul className='hidden md:flex lg:flex-col justify-between mt-5 lg:ml-5 lg:mt-0'>
                <MiniImageMap
                  product={product}
                  productImageChoice={productImageChoice}
                  setProductImageChoice={setProductImageChoice}
                />
              </ul>
            </div>

            <div className='md:col-span-2 mx-2 px-4 flex flex-col justify-evenly relative bottom-7'>
              <h5 className='font-bold text-gray-600 leading-loose'>Description:</h5>
              <p className='text-gray-600 leading-snug text-justify'>
                {product.description.length >= 300 && showFullDescription
                  ? (
                    <>
                      <span>{product.description.slice(0, product.description.slice(0, 300).lastIndexOf('.')) + '...'}</span>
                      <span className='pl-1 text-sky-600 hover:underline hover:cursor-pointer' onClick={() => setShowFullDescription(false)}>Read more</span>
                    </>
                  ) : (
                    <>
                      <span>{product.description + ' '}</span>
                      {product.description.length > 300 && <span className='pl-1 text-sky-600 hover:underline hover:cursor-pointer' onClick={() => setShowFullDescription(true)}>Read less</span>}
                    </>
                  )}
              </p>

              <h5 className='mt-2 font-bold text-gray-600 leading-loose flex items-center space-x-5'>Rating:
                <div className='inline-flex pl-1'>
                  {Array(stars)
                    .fill()
                    .map((_, i) => (
                      <StarIcon key={i} className='h-5 text-orange-500' />
                    ))}
                </div>
                <span className='font-normal italic text-sm text-gray-400'>
                  {product.rating.count} Reviews
                </span>
              </h5>

              <h5 className='font-bold text-gray-600 leading-loose flex items-center'>Shipping:
                {hasPrimeDelivery && (
                  <div className='inline-flex items-center space-x-2 pl-2'>
                    <Image src='/prime.png' alt='Techiebay Prime Delivery' width={50} height={50} />
                    <p className='text-xs text-gray-500'>Next-Day Delivery</p>
                  </div>
                )}
              </h5>

              <h5 className='font-bold text-gray-600 leading-loose'>Price:
                <div className='inline-flex items-center font-normal pl-2'>
                  &#8377;{Math.round(product.price * 10)} <span className='text-red-400 ml-1 text-sm line-through'>{Math.round(product.price * 10 * 1.5)}</span>
                </div>
              </h5>

              <button
                disabled={items.findIndex(item => item.id === id) >= 0}
                onClick={handleAddItemToCart}
                className='mt-auto btn disabled:from-orange-500 disabled:to-orange-400'
              >
                {items.findIndex(item => item.id === id) >= 0 ? (
                    <div className='flex items-center justify-center'>
                      <BadgeCheckIcon className='h-5 mr-2' />
                      Added to Cart
                    </div>
                  ) : (
                  'Add to Cart'
                )}
              </button>
            </div>
          </div>
        </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
 
export default ProductPreview;