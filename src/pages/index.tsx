import asPortalPage from '@hoc/asPortalPage';
import { NextPage } from 'next';
import data from '@utils/data';
import ProductItem from '@modules/products/components/ProductItem';
import { Product } from '@appTypes/product';

const Home: NextPage = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.products.map((product: Product) => (
        <ProductItem
          key={product.id}
          {...product}
          // onSelect={handleOnSelectToggle}
        />
      ))}
    </div>
  );
};

export default asPortalPage('Home Page')(Home);
