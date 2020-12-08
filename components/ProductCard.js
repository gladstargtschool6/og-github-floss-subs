import { useState } from 'react';
import Button from './ui/Button';

export default function ProductCard({
  product,
  handleCheckout,
  price,
  priceString,
  session,
  userLoaded,
  loading
}) {
  const defaultImage = 'https://i.imgur.com/Frm0OBA.jpg';

  const [quantity, changeQuantity] = useState(1);

  const onQuantityChange = (e) => {
      changeQuantity(prevQuantity => prevQuantity = e.target.value);
  };

  return (
    <div className={'rounded-lg shadow-sm divide-y divide-accents-2 bg-primary-2 max-w-xs h-auto ml-3 m-2'}>
      <div className="grid grid-rows-2 p-4">
        <div className="grid justify-items-stretch box-content h-40 justify-center ">
          {product.image ? 
          <img className="bg-cover max-h-40"
            src={product.image}
            alt={product.name}
          /> : <div className="bg-cover mt-8">
            <h1 className="text-3xl text-center break-words ">No Image Available</h1>
            </div>}
          {/* <img
            src={product.image ? product.image :  <div><h1>No Image Available</h1></div>}
            alt={product.name}
          /> */}
        </div>
        <div>
          <h2 className="text-2xl mt-4 leading-6 font-semibold text-white break-words">
            {product.name}
          </h2>
          <p className="mt-4 -mb-8 text-accents-5">{product.description}</p>
          
        </div>
        <div className="-mt-8">
          <p className="">
            <span className="text-2xl font-extrabold white">{priceString}</span>
            <span className="text-base font-medium text-accents-8"></span>
          </p>
          <div className=" float-right -mt-7">
            <label>Quantity &nbsp;</label>
            <input className="text-black" min="1" max="99" type="number" value={quantity} onChange={onQuantityChange} />
          </div>
          <Button
            variant="slim"
            type="button"
            disabled={session && !userLoaded}
            loading={loading}
            onClick={() => handleCheckout(price.id, quantity)}
            className="mt-4 block w-full rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900 "
          >
            Purchase
          </Button>
        </div>
      </div>
    </div>
  );
}
