import Product from './Product'

const ProductMap = ({ products, setShowProductPreview }) => (
  products.map(({ id, title, price, description, category, image, rating }) => (
    <Product
      key={id}
      id={id}
      title={title}
      price={price}
      description={description}
      category={category}
      image={image}
      rating={rating.rate}
      setShowProductPreview={setShowProductPreview}
    />
  ))
)

const ProductFeed = ({ products, setShowProductPreview }) => {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
      {<ProductMap
        setShowProductPreview={setShowProductPreview}
        products={products?.slice(0, 4)}
      />}

      <picture className='md:col-span-full'>
        <source srcSet='/row_banner.webp' type='image/webp' />
        <img src='/row_banner.webp' alt='' />
      </picture>

      <div className='md:col-span-2'>
        {<ProductMap
          setShowProductPreview={setShowProductPreview}
          products={products?.slice(4, 5)}
        />}
      </div>

      {<ProductMap
        setShowProductPreview={setShowProductPreview}
        products={products?.slice(5, products.length)}
      />}
    </div>
  );
}
 
export default ProductFeed;