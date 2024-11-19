import CheckoutForm from "../components/CheckoutForm";
import FlagsModal from "../components/FlagsModal";

const OrderPage = () => {
  return (
    <div className=" w-full flex flex-col justify-start items-center">
      <div className=" w-full">
        <FlagsModal/>
      </div>
      <div className="flex justify-center items-center w-full md:w-10/12 ">
      <CheckoutForm />
      </div>
    </div>
  );
};

export default OrderPage;
