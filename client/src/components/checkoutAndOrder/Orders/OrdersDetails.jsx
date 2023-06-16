import React, { useEffect, useState } from "react";
import DocumentTitle from "../../Helmet/Helmet";
import styles from "./styles/orderDetails.module.css";
import getLoggedUserData from "../../../utils/LoggedUserData";
import { AiOutlineDownload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSingleOrderAction,
  deleteOrderAtion,
} from "../../../redux/AppReducer/orders/actions";
import Loader from "../../loader/Loader";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import NoOrderFound from "./NoOrderFound";
import { Document, Page, Text, View, pdf, Image } from '@react-pdf/renderer';
import imageUrl from "./qr_code.jpg"
import pdfStyles from "./styles/InvoiceCss";
import sellerDetails from "./Seller";


function OrdersDetails() {
  const LoggedUser = getLoggedUserData();
  const [timer, setTimer] = useState(true);
  const dispatch = useDispatch();
  const storeData = useSelector((store) => store.GetSingleOrderReducer);
  const [userDetails, setUserDetails] = useState({});
  // getting complete url from browser
  const fullUrl = window.location.href;

  // split the url string by the "/" character
  const urlParts = fullUrl.split("/");

  // find the index of the "orderId" and "productId" strings
  const orderIdIndex = urlParts.indexOf("orderId") + 1;

  // extract the orderId and productId from the url
  const orderId = urlParts[orderIdIndex];

  const getUserDetails = async (userToken) => {
    let res = await fetch("http://localhost:8080/api/users/get/user", {
      headers: {
        "Content-Type": "application/json",
        token: userToken,
      },
    });

    const data = await res.json();
    // console.log("user data:",data);
    if (data?.user?._id) {
      setUserDetails(data?.user);
    }
  };
  useEffect(() => {
    const payload = {
      token: LoggedUser.token,
      orderId,
    };

    dispatch(GetSingleOrderAction(payload));
    getUserDetails(payload.token);
  }, [LoggedUser.token, orderId, dispatch]);

  // console.log("storedata from component:-", storeData);
  useEffect(() => {
    setTimeout(() => {
      setTimer(false);
    }, 2000);
  }, []);

  if (timer) {
    return <Loader />;
  }
  if (
    storeData?.order?.message === "Order not found" ||
    storeData?.isError === undefined
  ) {
    return <NoOrderFound />;
  }



  /// handle delete order

  const handleOrderDelete = async (id) => {
    const payload = {
      orderId: orderId,
      productId: id,
      token: LoggedUser.token,
    };

    try {
      let responseFromBackend = await dispatch(deleteOrderAtion(payload));
      // console.log(responseFromBackend, "response from backend");
      if (responseFromBackend === undefined) {
        throw new Error("Something went wrong");
      }

      if (responseFromBackend && responseFromBackend.hint === "orderRemoved") {
        toast.success(responseFromBackend.message, { autoClose: 1500 });
      } else if (responseFromBackend.hint === "productRe") {
        toast.success(responseFromBackend.message, { autoClose: 1500 });
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 1500 });
    }
  };

  // console.log("storeData:", storeData)

  const downloadPDF = async () => {
    const totalPrice = storeData?.order?.products && storeData.order.products.reduce((acc, item) => acc + item.productId.Stock * item.productId.discountPrice, 0);

    const doc = (

      <Document>
        <Page style={pdfStyles.page}>

          {/* to section start */}
          <View style={[pdfStyles.section, pdfStyles.mainHeader]}>
            <View style={{ flex: 1, flexDirection: "column" }}>
              <View style={pdfStyles.inline}>
                <Text style={[pdfStyles.heading, pdfStyles.inlineItem]}>Invoice Number:</Text>
                <Text style={[pdfStyles.text, pdfStyles.inlineItem]}>"INV-2023-001"</Text>
              </View>
              <View style={pdfStyles.inline}>
                <Text style={[pdfStyles.heading, pdfStyles.inlineItem]}>Invoice Date:</Text>
                <Text style={[pdfStyles.text, pdfStyles.inlineItem]}>{new Date().toISOString().slice(0, 10)}</Text>
              </View>
              <View style={pdfStyles.inline}>
                <Text style={[pdfStyles.heading, pdfStyles.inlineItem]}>Order Id:</Text>
                <Text style={[pdfStyles.text, pdfStyles.inlineItem]}>{orderId}</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Image src={imageUrl} style={pdfStyles.qrCode} />
            </View>
          </View>


          {/* to section end */}


          {/* sellers and buyer section start */}

          <View style={pdfStyles.section}>
            <View style={pdfStyles.inline}>
              <Text style={[pdfStyles.heading, pdfStyles.inlineItem]}>Seller:</Text>
              <Text style={[pdfStyles.text, pdfStyles.inlineItem]}>
                {sellerDetails[0].name}, {sellerDetails[0].address}, {sellerDetails[0].city}, {sellerDetails[0].state} {sellerDetails[0].zipCode}
                {'\n'}
                Email: {sellerDetails[0].email}, Phone: +91 {sellerDetails[0].phone}
              </Text>
            </View>


            <View style={pdfStyles.inline}>
              <Text style={[pdfStyles.heading, pdfStyles.inlineItem]}>Buyer:</Text>
              <Text style={[pdfStyles.text, pdfStyles.inlineItem]}>
                {userDetails.name}, {storeData?.order?.deliveryAddress?.address}, {storeData?.order?.deliveryAddress?.city}, {storeData?.order?.deliveryAddress?.state} {storeData?.order?.deliveryAddress?.postalCode}
                {'\n'}
                Email: {userDetails.email}, Phone: +91 {userDetails.mobile}
              </Text>
            </View>
          </View>

          {/* sellers and buyer section end */}

          {/* product table start */}

          <View style={pdfStyles.section}>
            <Text style={[pdfStyles.heading, pdfStyles.tableHeading]}>{storeData?.order?.products && storeData.order.products.length < 2 ? "Item : " : "Items : "}</Text>
            <View style={pdfStyles.table}>
              <View style={pdfStyles.tableRow}>
                <Text style={[pdfStyles.tableCell, pdfStyles.bold]}>Description</Text>
                <Text style={[pdfStyles.tableCell, pdfStyles.bold]}>Quantity</Text>
                <Text style={[pdfStyles.tableCell, pdfStyles.bold]}>Price</Text>
                <Text style={[pdfStyles.tableCell, pdfStyles.bold]}>Total</Text>
              </View>
              {storeData?.order?.products && storeData.order.products.map((item, index) => (
                <View style={pdfStyles.tableRow} key={index}>
                  <Text style={pdfStyles.tableCell}>{item.productId.title.substr(0, 10)}...</Text>
                  <Text style={pdfStyles.tableCell}>{item.productId.Stock}</Text>
                  <Text style={pdfStyles.tableCell}> {item.productId.discountPrice}.00</Text>
                  <Text style={pdfStyles.tableCell}>  {item.productId.Stock * item.productId.discountPrice}.00</Text>
                </View>
              ))}
            </View>


          </View>


          {/* product table end */}

          {/* footer */}

          <View style={pdfStyles.mainHeader}>
            <View>
              <Text style={[pdfStyles.bold]} >Order through shopwatch.com</Text>
            </View>
            <View >
              <Text style={pdfStyles.totalBill}>Total Bill :  {totalPrice}.00 </Text>
            </View>
          </View>






        </Page>
      </Document>

    );


    const asPdf = pdf([]);
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `product_invoice_${orderId}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };




  return (
    <>
      <DocumentTitle pageTitle={"| ORDERS | DETAILS"} />

      <div className={styles.__orderDetails__info}>
        <div className={styles.__orderDetails__info_deliveryAddress}>
          <p>Delivery Address</p>
          <p>State: {storeData?.order?.deliveryAddress?.state} </p>
          <p>District : {storeData?.order?.deliveryAddress?.city} </p>
          <p>Block : {storeData?.order?.deliveryAddress?.block}</p>
          <p>Postal Code : {storeData?.order?.deliveryAddress?.postalCode}</p>
        </div>

        <div className={styles.__orderDetails_user_info}>
          <p>Your Info</p>
          <p>Name : {LoggedUser.name}</p>
          <p>Email : {userDetails.email}</p>
          <p>Phone : +91 {userDetails.mobile}</p>
        </div>

        <div className={styles.__orderDetails__info_download_invoice}>
          <p>Download Order Invoice</p>
          <button onClick={downloadPDF}>
            Download <AiOutlineDownload />
          </button>
        </div>
      </div>
      <div className={styles.__orderDetails__Order_info}>
        {storeData?.order?.products &&
          storeData.order.products.map((el, index) => (
            <div
              className={styles.__orderDetails__Order_Info_main_container}
              key={index}
            >
              <div>
                <img src={el.productId.image} alt={el.productId.title} />
                <p>{el.productId.title}</p>
              </div>

              <div>
                <p>Payment method : {storeData?.order?.paymentMethod}</p>
                <p>Order Status : {storeData?.order?.orderStatus}</p>
                <p>Price : ₹ {el.productId.discountPrice}</p>
              </div>

              <div>
                <FaTrashAlt
                  onClick={() => handleOrderDelete(el.productId._id)}
                />
              </div>
              <div>
                <p>Seller: {sellerDetails[0].name} </p>
                <p>Rate and review</p>
              </div>
            </div>
          ))}
      </div>


      {/* <div className={styles.__orderDetails__info_download_invoice_mobile}>
        <p>Download Order Invoice</p>
        <button onClick={handleDownload}>
          Download <AiOutlineDownload />{" "}
        </button>
      </div> */}
    </>
  );
}

export default OrdersDetails;





