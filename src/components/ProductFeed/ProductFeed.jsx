import Product from '../Product/Product'

const ProductMap = ({ products }) => (
  products.map(({ id, title, price, description, category, image, rating }) => (
    <Product
      key={id}
      title={title}
      price={price}
      description={description}
      category={category}
      image={image}
      rating={rating.rate}
    />
  ))
)

const ProductFeed = ({ products }) => {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
      {<ProductMap products={products.slice(0, 4)} />}

      <picture className='md:col-span-full'>
        <source srcSet='/row_banner.webp' type='image/webp' />
        <img src='/row_banner.webp' alt='' />
      </picture>

      <div className='md:col-span-2'>
        {<ProductMap products={products.slice(4, 5)} />}
      </div>

      {<ProductMap products={products.slice(5, products.length)} />}
    </div>
  );
}
 
export default ProductFeed;