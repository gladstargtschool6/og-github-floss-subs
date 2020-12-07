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
    <div
      
      className={'rounded-lg shadow-sm divide-y divide-accents-2 bg-primary-2'}
    >
      <div className="p-6">
        <div className="h-1/2">
          <img
            src={product.image ? product.image : defaultImage}
            alt={product.name}
          />
        </div>
        <h2 className="text-2xl mt-4 leading-6 font-semibold text-white">
          {product.name}
        </h2>
        <p className="mt-4 text-accents-5">{product.description}</p>
        <p className="mt-8">
          <span className="text-2xl font-extrabold white">{priceString}</span>
          <span className="text-base font-medium text-accents-8"></span>
        </p>
        <input className="text-black" min="1" max="99" type="number" value={quantity} onChange={onQuantityChange} />
        <Button
          variant="slim"
          type="button"
          disabled={session && !userLoaded}
          loading={loading}
          onClick={() => handleCheckout(price.id, quantity)}
          className="mt-8 block w-full rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
        >
          Purchase
        </Button>
      </div>
    </div>
  );
}
