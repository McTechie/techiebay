import Image from 'next/image'
import { motion } from 'framer-motion'

export const MiniImageOne = ({ product, productImageChoice, setProductImageChoice, itemKey }) => (
  <li
    key={itemKey}
    onClick={() => setProductImageChoice(itemKey)}
    className={`p-2 hover:cursor-pointer hover:scale-105 hover:shadow-md rounded-md border duration-150 ${productImageChoice === itemKey && 'shadow-md scale-105'}`}
  >
    <Image src={product.image} width={80} height={80} objectFit='contain' />
    {productImageChoice === itemKey ? (
      <motion.div className="underline" layoutId="underline" />
    ) : null}
  </li>
)

export const MiniImageTwo = ({ product, productImageChoice, setProductImageChoice, itemKey }) => (
  <li
    key={itemKey}
    onClick={() => setProductImageChoice(itemKey)}
    className={`p-2 hover:cursor-pointer hover:scale-105 hover:shadow-md rounded-md border hue-rotate-180 duration-150 ${productImageChoice === itemKey && 'shadow-md scale-105'}`}
  >
    <Image src={product.image} width={80} height={80} objectFit='contain' />
    {productImageChoice === itemKey ? (
      <motion.div className="underline" layoutId="underline" />
    ) : null}
  </li>
)

export const MiniImageThree = ({ product, productImageChoice, setProductImageChoice, itemKey }) => (
  <li
    key={itemKey}
    onClick={() => setProductImageChoice(itemKey)}
    className={`p-2 hover:cursor-pointer hover:scale-105 hover:shadow-md rounded-md border hue-rotate-90 duration-150 ${productImageChoice === itemKey && 'shadow-md scale-105'}`}
  >
    <Image src={product.image} width={80} height={80} objectFit='contain' />
    {productImageChoice === itemKey ? (
      <motion.div className="underline" layoutId="underline" />
    ) : null}
  </li>
)