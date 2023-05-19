import { P, H1 } from '@elements/Text';
import { TertiaryButton } from '@elements/button';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import Image from 'next/image';

export default function Custom404() {
  return (
    <div className="bg-gray-200 h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="bg-white border rounded-md flex items-center justify-center mx-4 md:w-2/3 ">
          <div className="flex flex-col items-center py-16 ">
            <Image
              className="px-4"
              src="https://res.cloudinary.com/di9zvktdc/image/upload/v1684472513/ShopZen/404_gls6ef.svg"
              alt=""
              height={300}
              width={300}
            />
            <H1 className="px-4 pt-8 pb-4 text-gray-800">Page not found! </H1>
            <P className="px-4 pb-10 text-gray-600">
              Oops! Looks like you followed a bad link. If you think this is a
              problem with us, please tell us.
            </P>
            <TertiaryButton Icon={ChevronLeftIcon} className="mx-4 h-10 w-44">
              Go Back Home
            </TertiaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
