import { H4, P } from '@common/components/elements/Text';
import { TertiaryButton } from '@common/components/elements/button';
import asPortalPage from '@common/hoc/asPortalPage';

const OrderDetails = () => {
  return (
    <div>
      <div className="flex justify-center flex-col items-start w-full lg:w-9/12 xl:w-full ">
        <h3 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 w-full  md:text-left text-gray-800">
          Order Details
        </h3>

        <div className="sm:flex justify-between pt-6">
          <div className="flex">
            <P>Order On: </P>
            <P className="text-gray-600 ml-2"> 12/12/2020</P>
          </div>
          <div className="border border-gray-200 h-6 w-0.5 ml-4 hidden sm:block"></div>
          <div className="flex sm:ml-4">
            <P>Order ID: </P>
            <P className="text-gray-600 ml-2">#2345-ffd3-g6789</P>
          </div>
        </div>

        <div className="flex justify-center items-center w-full mt-3  flex-col space-y-4 ">
          <div className="flex md:flex-row justify-start items-start md:items-center  border border-gray-200 w-full">
            <div className="w-40 md:w-32">
              <img
                className="hidden md:block"
                src="https://i.ibb.co/wWp4m6W/Rectangle-8.png"
                alt="girl-in-red-dress"
              />
              <img
                className="md:hidden "
                src="https://i.ibb.co/f8pyz8q/Rectangle-8.png"
                alt="girl-in-red-dress"
              />
            </div>
            <div className="flex justify-start md:justify-between items-start md:items-center  flex-col md:flex-row w-full p-4 md:px-8">
              <div className="flex flex-col md:flex-shrink-0  justify-start items-start">
                <h3 className="text-lg md:text-xl  w-full font-semibold leading-6 md:leading-5  text-gray-800">
                  Premium Quaility Red Dress
                </h3>
                <div className="flex flex-row justify-start  space-x-4 md:space-x-6 items-start mt-4 ">
                  <p className="text-sm leading-none text-gray-600">
                    Quantity: <span className="text-gray-800"> 01</span>
                  </p>
                  <div className="border border-gray-200 h-6 w-0.5"></div>
                  <p className="text-sm leading-none text-gray-600">
                    Buy again
                  </p>
                </div>
              </div>
              <div className="flex mt-4 md:mt-0 md:justify-end items-center w-full ">
                <p className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-gray-800">
                  $28.00
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start mt-8 xl:mt-10 space-y-10 w-full">
          <div className="flex justify-start items-start flex-col md:flex-row  w-full md:w-auto space-y-8 md:space-y-0 md:space-x-14 xl:space-x-8  lg:w-full">
            <div className="flex jusitfy-start items-start flex-col space-y-2">
              <p className="text-base font-semibold leading-4  text-gray-800">
                Billing Address
              </p>
              <p className="text-sm leading-5 text-gray-600">
                180 North King Street, Northhampton MA 1060
              </p>
            </div>
            <div className="flex jusitfy-start items-start flex-col space-y-2">
              <p className="text-base font-semibold leading-4  text-gray-800">
                Shipping Address
              </p>
              <p className="text-sm leading-5 text-gray-600">
                180 North King Street, Northhampton MA 1060
              </p>
            </div>
            <div className="flex jusitfy-start items-start flex-col space-y-2">
              <p className="text-base font-semibold leading-4  text-gray-800">
                Shipping Method
              </p>
              <p className="text-sm leading-5 text-gray-600">
                DHL - Takes up to 3 working days
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-4 w-full">
            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
              <div className="flex justify-between  w-full">
                <P className=" text-gray-800">Subtotal</P>
                <P className=" text-gray-600">$56.00</P>
              </div>
              <div className="flex justify-between  w-full">
                <P className=" text-gray-800">
                  Discount{' '}
                  <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">
                    LIMITED
                  </span>
                </P>
                <P className=" text-gray-600">
                  -$28.00 (50%)
                </P>
              </div>
              <div className="flex justify-between  w-full">
                <P className="text-gray-800">Shipping</P>
                <P className=" text-gray-600">$8.00</P>
              </div>
            </div>
            <div className="flex justify-between items-center w-full">
              <H4 className=" text-gray-800">
                Total
              </H4>
              <H4 className="text-gray-600">
                $36.00
              </H4>
            </div>
            <div className="flex w-full justify-center items-center pt-1 md:pt-4  xl:pt-8 space-y-6 md:space-y-8 flex-col">
              <TertiaryButton className="w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary-800">
                Track Your Order
              </TertiaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default asPortalPage('Order Details')(OrderDetails);
