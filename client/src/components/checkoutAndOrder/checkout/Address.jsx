import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "./styles/address.module.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DeliverinitialState } from "../../../objects/Objects";
import {
  deliveryAddressActionObj,
  storeAddressAction,
} from "../../../redux/AppReducer/checkout/actions";
import getLoggedUserData from "../../../utils/LoggedUserData";

function Address({ handleNext }) {
  const logedUser = getLoggedUserData();
  const [state, setState] = useState(DeliverinitialState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleAddress = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!state.address.trim()) {
      errors.address = "Address is required";
    }
    if (!state.block.trim()) {
      errors.block = "Block is required";
    }
    if (!state.state.trim()) {
      errors.state = "State is required";
    }
    if (!state.city.trim()) {
      errors.city = "City is required";
    }

    if (!state.postalCode) {
      errors.postalCode = "Postal code is required";
    } else if (state.postalCode.toString().length < 6) {
      errors.postalCode = "Postal code can not be less than 6 digits";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setErrors({});
      const { address, block, state: formState, city, postalCode } = state;
      const payload = {
        address,
        state: formState,
        block,
        city,
        postalCode,
        token: logedUser.token,
      };
      let data = await dispatch(deliveryAddressActionObj(payload));


      dispatch(storeAddressAction(payload));
      if (data === undefined) {
        toast.error("Something went wrong");
      }

      if (data && data.hint === "deSuces") {
        toast.success("Address Added");
        setTimeout(() => {
          localStorage.setItem(
            "deliveryAddressId",
            JSON.stringify(data.deliveryAddressId)
          );
          handleNext();
        }, 1000);
      }
    }
  };

  return (
    <>
   
      <form
        className={styles.__checkout__address_form}
        onSubmit={handleAddress}
      >
        <div>
          <label htmlFor="address1">Address </label>
          <input
            type="text"
            placeholder="Enter address1"
            value={state.address}
            onChange={(e) => setState({ ...state, address: e.target.value })}
          />
          {errors.address && (
            <p className={styles.__checkout__error_message}>{errors.address}</p>
          )}
        </div>

        <div>
          <label htmlFor="state">State</label>
          <input
            type="text"
            placeholder="Enter state"
            value={state.state}
            onChange={(e) => setState({ ...state, state: e.target.value })}
          />
          {errors.state && (
            <p className={styles.__checkout__error_message}>{errors.state}</p>
          )}
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            placeholder="Enter city"
            value={state.city}
            onChange={(e) => setState({ ...state, city: e.target.value })}
          />
          {errors.city && (
            <p className={styles.__checkout__error_message}>{errors.city}</p>
          )}
        </div>

        <div>
          <label htmlFor="block">Block</label>
          <input
            type="text"
            placeholder="Enter Block name"
            value={state.block}
            onChange={(e) => setState({ ...state, block: e.target.value })}
          />
          {errors.block && (
            <p className={styles.__checkout__error_message}>{errors.block}</p>
          )}
        </div>

        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="number"
            placeholder="Enter postal code"
            value={state.postalCode}
            onChange={(e) =>
              setState({ ...state, postalCode: Number(e.target.value) })
            }
          />
          {errors.postalCode && (
            <p className={styles.__checkout__error_message}>
              {errors.postalCode}
            </p>
          )}
        </div>

        <button type="submit" value="Submit">
          Next <AiOutlineArrowRight />
        </button>
      </form>
    </>
  );
}

export default Address;
