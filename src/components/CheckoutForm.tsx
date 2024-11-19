import { useContext, useEffect, useState } from "react";
import PhoneInput from "./PhoneInput";
import PrimaryInput from "./PrimaryInput";
import CountrySelect from "./CountrySelect";
import MaestroIcon from "../assets/maestro.svg";
import MasterIcon from "../assets/mastercard.svg";
import SepaIcon from "../assets/sepa.svg";
import VisaIcon from "../assets/visa.svg";
import { gState } from "../context/Context";

export type UserInfo = {
  email: string;
  name: string;
  age: number;
  loginPhone: string;
  contactPhone: string;
  address: string;
  Nr: number;
  city: string;
  country: string;
  postalCode: string;
  monthlySessions: number;
  paymentMethod: string;
  cardNumber?: string;
  cardHolderName?: string;
  IBAN?: string;
  BIC?: string;
  discount: number;
};

const CheckoutForm: React.FC = () => {
  const [selectedMonths, setSelectedMonths] = useState<number>(12);
  const [user, setUser] = useState<UserInfo>({
    email: "",
    name: "",
    age: 0,
    loginPhone: "",
    contactPhone: "",
    address: "",
    Nr: 0,
    city: "",
    country: "",
    postalCode: "",
    monthlySessions: 8,
    paymentMethod: "Visa",
    cardNumber: "",
    cardHolderName: "",
    IBAN: "",
    BIC: "",
    discount: 0,
  });
  const [payINAdvance, setPayINAdvance] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    name: "",
    age: "",
    loginPhone: "",
    contactPhone: "",
    address: "",
    Nr: "",
    city: "",
    country: "",
    postalCode: "",
    monthlySessions: "",
    cardNumber: "",
    cardHolderName: "",
    IBAN: "",
    BIC: "",
    discount: "",
    paymentMethod: "",
  });

  const validateForm = () => {
    let isValid = true;

    // Reset all errors
    setErrorMessages({
      email: "",
      name: "",
      age: "",
      loginPhone: "",
      contactPhone: "",
      address: "",
      Nr: "",
      city: "",
      country: "",
      postalCode: "",
      monthlySessions: "",
      cardNumber: "",
      cardHolderName: "",
      IBAN: "",
      BIC: "",
      discount: "",
      paymentMethod: "",
    });

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email) {
      setErrorMessages((prev) => ({ ...prev, email: "Email is required." }));
      isValid = false;
    } else if (!emailRegex.test(user.email)) {
      setErrorMessages((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
      isValid = false;
    }

    // Validate login phone number
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!user.loginPhone) {
      setErrorMessages((prev) => ({
        ...prev,
        loginPhone: "Login phone is required.",
      }));
      isValid = false;
    } else if (!phoneRegex.test(user.loginPhone)) {
      setErrorMessages((prev) => ({
        ...prev,
        loginPhone: "Please enter a valid login phone number.",
      }));
      isValid = false;
    }

    // Validate contact phone number
    if (!user.contactPhone) {
      setErrorMessages((prev) => ({
        ...prev,
        contactPhone: "Contact phone is required.",
      }));
      isValid = false;
    } else if (!phoneRegex.test(user.contactPhone)) {
      setErrorMessages((prev) => ({
        ...prev,
        contactPhone: "Please enter a valid contact phone number.",
      }));
      isValid = false;
    }

    // Validate name
    if (!user.name) {
      setErrorMessages((prev) => ({ ...prev, name: "Name is required." }));
      isValid = false;
    }

    // Validate age
    if (user.age && (isNaN(user.age) || user.age <= 0)) {
      setErrorMessages((prev) => ({
        ...prev,
        age: "Please enter a valid age.",
      }));
      isValid = false;
    }

    // Validate address
    if (!user.address) {
      setErrorMessages((prev) => ({
        ...prev,
        address: "Address is required.",
      }));
      isValid = false;
    }

    // Validate number (Nr)
    if (!user.Nr || user.Nr <= 0) {
      setErrorMessages((prev) => ({
        ...prev,
        Nr: "Please enter a valid number (Nr).",
      }));
      isValid = false;
    }

    // Validate city
    if (!user.city) {
      setErrorMessages((prev) => ({ ...prev, city: "City is required." }));
      isValid = false;
    }

    // Validate country
    if (!user.country) {
      setErrorMessages((prev) => ({
        ...prev,
        country: "Country is required.",
      }));
      isValid = false;
    }

    // Validate postal code
    if (!user.postalCode) {
      setErrorMessages((prev) => ({
        ...prev,
        postalCode: "Postal code is required.",
      }));
      isValid = false;
    }

    // Validate monthly sessions
    if (
      user.monthlySessions &&
      (isNaN(user.monthlySessions) || user.monthlySessions <= 0)
    ) {
      setErrorMessages((prev) => ({
        ...prev,
        monthlySessions: "Please enter a valid number of monthly sessions.",
      }));
      isValid = false;
    }

    // Validate card information if payment method is Visa
    if (user.paymentMethod === "Visa") {
      if (!user.cardNumber || !user.cardHolderName) {
        setErrorMessages((prev) => ({
          ...prev,
          cardNumber: "Please provide all credit card details.",
        }));
        isValid = false;
      }
      const cardNumberRegex = /^[0-9]{16}$/;
      if (user.cardNumber && !cardNumberRegex.test(user.cardNumber)) {
        setErrorMessages((prev) => ({
          ...prev,
          cardNumber: "Please enter a valid card number.",
        }));
        isValid = false;
      }
    }

    // Validate IBAN if payment method is SEPA
    if (user.paymentMethod === "SEPA") {
      if (!user.IBAN) {
        setErrorMessages((prev) => ({ ...prev, IBAN: "IBAN is required." }));
        isValid = false;
      }
    }

    // Validate BIC if payment method is SEPA
    if (user.paymentMethod === "SEPA") {
      if (!user.BIC) {
        setErrorMessages((prev) => ({ ...prev, BIC: "BIC is required." }));
        isValid = false;
      }
    }
    if (!user.cardHolderName) {
      setErrorMessages((prev) => ({
        ...prev,
        cardHolderName: "Card Holder Name is required.",
      }));
      isValid = false;
    }

    // Validate payment method
    if (!user.paymentMethod) {
      setErrorMessages((prev) => ({
        ...prev,
        paymentMethod: "Payment method is required.",
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    alert("Submitted Succssefully");
    setErrorMessages({
      email: "",
      name: "",
      age: "",
      loginPhone: "",
      contactPhone: "",
      address: "",
      Nr: "",
      city: "",
      country: "",
      postalCode: "",
      monthlySessions: "",
      cardNumber: "",
      cardHolderName: "",
      IBAN: "",
      BIC: "",
      discount: "",
      paymentMethod: "",
    });
    console.log("User Data Submitted:", user);
  };

  const handleInputChange = (key: keyof UserInfo, value: string | number) => {
    setUser((prevUser) => ({ ...prevUser, [key]: value }));
  };

  const handlePaymentMethodChange = (method: string) => {
    handleInputChange("paymentMethod", method);
  };
  useEffect(() => {
    setPrice(
      Number(user.monthlySessions) *
        selectedMonths *
        20 *
        (user.discount > 0 ? 1 - user.discount : 1)
    );
  }, [selectedMonths, user.monthlySessions, user.discount]);
  const [RTL, setRTL] = useState(false);
  const context = useContext(gState);
  if (!context) return null; // or render a fallback if the context is not available

  const { rtl } = context;
  console.log(rtl);
  useEffect(() => {
    setRTL(rtl);
  }, [rtl]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 shadow-lg rounded-sm bg-white my-8 w-full">
      <div
        className={`${
          RTL && "lg:col-start-3"
        } col-span-1 lg:col-span-3 p-5 lg:p-10`}
      >
        <h2 className="text-xl lg:text-2xl text-center">
          Registration & Booking at GoStudents
        </h2>
        <h5 className="text-sm lg:text-md text-gray-700 text-center">
          The leading platform for online tutoring.
        </h5>
        <form className="px-10 py-10 space-y-5">
          <PhoneInput
            label="LOGIN Phone NUMBER"
            subLabel="Preferably the student's"
            value={user.loginPhone}
            onChange={(value) => handleInputChange("loginPhone", value)}
            error={errorMessages.loginPhone}
          />

          <PhoneInput
            label="Contact Phone NUMBER"
            subLabel="Preferably the parent's"
            value={user.contactPhone}
            onChange={(value) => handleInputChange("contactPhone", value)}
            error={errorMessages.contactPhone}
          />

          <PrimaryInput
            value={user.email}
            onChange={(value) => handleInputChange("email", value)}
            inputType="email"
            placeholder="Contact Email Address"
            error={errorMessages.email}
          />

          <PrimaryInput
            value={user.name}
            onChange={(value) => handleInputChange("name", value)}
            inputType="text"
            error={errorMessages.name}
            placeholder="Contact Name"
          />

          <div className="flex  w-full gap-2">
            <div className="w-8/12">
              <PrimaryInput
                value={user.address}
                onChange={(value) => handleInputChange("address", value)}
                inputType="text"
                placeholder="Billing Address"
                error={errorMessages.address}
              />
            </div>

            <div className="w-4/12">
              <PrimaryInput
                value={user.Nr}
                onChange={(value) => handleInputChange("Nr", Number(value))}
                inputType="number"
                placeholder="Nr"
                error={errorMessages.Nr}
              />
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <PrimaryInput
              value={user.postalCode}
              onChange={(value) => handleInputChange("postalCode", value)}
              inputType="text"
              placeholder="Postal Code"
              error={errorMessages.postalCode}
            />

            <PrimaryInput
              value={user.city}
              onChange={(value) => handleInputChange("city", value)}
              inputType="text"
              placeholder="City"
              error={errorMessages.city}
            />

            <CountrySelect
              value={user.country}
              onChange={(value) => handleInputChange("country", value)}
              error={errorMessages.country}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-[450] text-gray-500/70 tracking-wider">
              MONTHLY SESSIONS
            </label>
            <select
              value={user.monthlySessions}
              onChange={(e) =>
                handleInputChange("monthlySessions", Number(e.target.value))
              }
              className="bg-gray-200/50 outline-none w-full text-gray-400 h-[50px] px-4 rounded-md"
            >
              {[8, 12, 16, 24].map((session, index) => (
                <option key={index} value={session}>
                  {session} SESSIONS
                </option>
              ))}
            </select>
            {errorMessages.monthlySessions && (
              <div className="text-red-500">
                {errorMessages.monthlySessions}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-[450] text-gray-500/70 tracking-wider">
              PAYMENT METHOD
            </label>
            {errorMessages.paymentMethod && (
              <div className="text-red-500">{errorMessages.paymentMethod}</div>
            )}
            <div className="flex flex-col space-y-3">
              {/* Card Payment Methods */}

              {/* SEPA Payment Method */}
              <label className="inline-flex items-center cursor-pointer space-x-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="SEPA"
                  checked={user.paymentMethod === "SEPA"}
                  onChange={() => handlePaymentMethodChange("SEPA")}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <img src={SepaIcon} alt="SEPA" className="w-10" />
              </label>
              {user.paymentMethod === "SEPA" && (
                <div className="space-y-5">
                  <PrimaryInput
                    value={user.cardHolderName || ""}
                    onChange={(value) =>
                      handleInputChange("cardHolderName", value)
                    }
                    inputType="text"
                    placeholder="Account Holder's Name"
                    error={errorMessages.cardHolderName}
                  />

                  <PrimaryInput
                    value={user.IBAN || ""}
                    onChange={(value) => handleInputChange("IBAN", value)}
                    inputType="text"
                    placeholder="IBAN"
                    error={errorMessages.IBAN}
                  />

                  <PrimaryInput
                    value={user.BIC || ""}
                    onChange={(value) => handleInputChange("BIC", value)}
                    inputType="text"
                    placeholder="BIC/SWIFT Code (Optional)"
                    error={errorMessages.BIC}
                  />
                </div>
              )}
              <label className="inline-flex items-center cursor-pointer space-x-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Card"
                  checked={["Visa", "Mastercard", "Maestro"].includes(
                    user.paymentMethod
                  )}
                  onChange={() => handlePaymentMethodChange("Visa")}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <div className="flex items-center space-x-2">
                  <img src={VisaIcon} alt="Visa" className="w-8" />
                  <img src={MasterIcon} alt="Mastercard" className="w-8" />
                  <img src={MaestroIcon} alt="Maestro" className="w-8" />
                </div>
              </label>

              {/* Card Details Input */}
              {["Visa", "Mastercard", "Maestro"].includes(
                user.paymentMethod
              ) && (
                <div className="space-y-5">
                  <div className="col-span-2 sm:col-span-1">
                    <PrimaryInput
                      value={user.cardHolderName || ""}
                      onChange={(value) =>
                        handleInputChange("cardHolderName", value)
                      }
                      inputType="text"
                      placeholder="Card Holder Name"
                      error={errorMessages.cardHolderName}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <PrimaryInput
                      value={user.cardNumber || ""}
                      onChange={(value) =>
                        handleInputChange("cardNumber", value)
                      }
                      inputType="text"
                      placeholder="Card Number"
                      error={errorMessages.cardNumber}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      <div
        className={`${
          RTL && "lg:col-start-1 lg:row-start-1"
        }  col-span-1 lg:col-span-2 bg-gray-200/50 p-5 lg:p-10`}
      >
        <h5 className="font-medium text-lg text-gray-800">ORDER OVERVIEW</h5>
        <div className="grid grid-cols-2 sm:grid-cols-3 mt-4">
          {[6, 9, 12, 16, 24, 36].map((months) => (
            <div
              key={months}
              onClick={() => setSelectedMonths(months)}
              className={`border-2 rounded-sm p-4 text-center cursor-pointer ${
                selectedMonths === months
                  ? "border-blue-500 "
                  : "border-gray-200 bg-white text-gray-400"
              }`}
            >
              {months} MONTHS
            </div>
          ))}
        </div>
        {errorMessages.monthlySessions && (
          <div className="text-red-500">{errorMessages.monthlySessions}</div>
        )}
        <label className="inline-flex items-center cursor-pointer my-5">
          <input
            type="checkbox"
            checked={payINAdvance}
            onChange={() => {
              setPayINAdvance(!payINAdvance);
              setUser((prevUser) => ({
                ...prevUser,
                discount: !payINAdvance ? 0.05 : 0,
              }));
              setPrice(
                Number(user.monthlySessions) *
                  selectedMonths *
                  20 *
                  (user.discount > 0 ? 1 - user.discount : 1)
              );
            }}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 ">
            Pay in advance - EXTRA 5% DISCOUNT
          </span>
        </label>
        <div className="m-10 space-y-5">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium text-xs">
              NUMBER OF SESSIONS P.M.
            </span>
            <span className="text-gray-900 font-medium">
              {user.monthlySessions}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium text-xs">
              REGULAR PRICE
            </span>
            <span className="text-gray-900 font-medium line-through">
              {(price + price * user.discount).toFixed(2)}$
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium text-xs">
              YOUR PRICE
            </span>
            <span className="text-gray-900 font-medium">
              {price.toFixed(2)}$
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-500 font-medium text-xs">
              DISCOUNT {user.discount * 100}%
            </span>
            <span className="text-green-500 font-medium text-base">
              -{(price * user.discount).toFixed(2)}
            </span>
          </div>
          <div className="bg-white border-white border-2" />
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium text-xs">SETUP FEE</span>
            <span className="text-blue-600 font-medium">0.00$</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium text-xs">
              TOTAL P.M.
            </span>
            <span className="text-gray-900 font-medium">
              {price.toFixed(2)}$
            </span>
          </div>
          <div className="flex gap-3">
            <input type="checkbox" name="conditions" id="conditions" />
            <label htmlFor="conditions" className="text-gray-500 text-sm">
              I agree to the{" "}
              <span className="text-blue-300">Terms and Conditions</span> and
              understand my{" "}
              <span className="text-blue-300">right of withdrawal</span> as well
              as the circumstances that lead to a repeal of the same.
            </label>
          </div>
          <button
            onClick={handleSubmit}
            className="block w-full bg-gradient-to-tr from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white py-2 rounded-md"
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
