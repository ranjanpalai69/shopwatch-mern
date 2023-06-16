import React, { useState } from 'react'
import { GrLinkPrevious } from "react-icons/gr"
import styles from "./styles/payment.module.css"
import { AiOutlineArrowRight } from 'react-icons/ai';
import { SavePaymentOption } from '../../../utils/PaymentOption';

function Payments({ handlePrev, handleNext }) {

    const paymentOptions = [
        { id: 1, label: 'Credit Card' },
        { id: 2, label: 'UPI' },
        { id: 3, label: 'Cashon Delivery' },
    ];

    const paymentOptionEnumMap = {
        'Credit Card': 'creditCard',
        'UPI': 'UPI',
        'Cashon Delivery': 'cashOn',
    };

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
        const selectedOptionLabel = event.target.value;
        const selectedOptionEnum = paymentOptionEnumMap[selectedOptionLabel];
        setSelectedOption(selectedOptionEnum);
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log("Selected option:", selectedOption);
    //     handleNext();
    // };

    const handleValue = (value) => {
        // console.log("Selected option:", value);
        SavePaymentOption("payOption",value)
        handleNext()
    }

    return (
        <>
            <div className={styles.paymentOptions}>
                <div>
                    <h2>Select a payment option:</h2>
                    <div className={styles.optionsContainer}>
                        {paymentOptions.map((option) => (
                            <label key={option.id} className={styles.optionLabel}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value={option.label}
                                    className={styles.optionInput}
                                    checked={selectedOption === paymentOptionEnumMap[option.label]}
                                    onChange={handleOptionChange}
                                />
                                <span className={styles.optionText}>{option.label}</span>
                            </label>
                        ))}
                    </div>

                    {/* {selectedOption === "creditCard" && (
            <form onSubmit={handleSubmit} className={styles.__checkout__credit__card__form}>
              <label>
                Card Number:
                <input type="number" name="cardNumber" />
              </label>
              <label>
                Expiration Date:
                <input type="date" name="expirationDate" />
              </label>
              <label>
                CVV:
                <input type="number" name="cvv" />
              </label>

              <div className={styles.__checkout__buttons}>

              </div>

            </form>
          )}
          {selectedOption === "UPI" && (
            <form onSubmit={handleSubmit} className={styles.__checkout__Upi}>
              <label>
                UPI ID:
                <input type="text" name="upiId" />
              </label>
              <div className={styles.__checkout__buttons}>

              </div>
            </form>
          )} */}

                    {selectedOption === "creditCard" && (
                        <h1 className={styles.__checkout__cashon}>You Selected Credit Card</h1>
                    )}

                    {selectedOption === "UPI" && (
                        <h1 className={styles.__checkout__cashon}>You Selected UPI</h1>
                    )}

                    {selectedOption === "cashOn" && (
                        <h1 className={styles.__checkout__cashon}>You Selected Cashon Delivery</h1>
                    )}

                    <div className={styles.__checkout__buttons}>
                        <button onClick={handlePrev} className={styles.__checkout__previous}> <GrLinkPrevious />Prev</button>
                        <button type='submit' value="Submit" onClick={() => handleValue(selectedOption)} >Next <AiOutlineArrowRight /></button>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Payments;
