const OrderSummary = () => {
  return (
    <div className="flex flex-col md:pl-10 pl-4 pr-10 md:pr-4 bg-white overflow-y-auto overflow-x-hidden h-screen">
      <div className="flex flex-col">
        <div className="flex flex-col md:mt-10 mt-4">
          <h1 className="text-2xl font-semibold">Order Summary</h1>
          <div className="flex flex-col md:mt-4 mt-2">
            <label className="text-sm">Full Name</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
