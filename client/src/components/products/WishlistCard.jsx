import React from "react";
import styles from "./styles/wishlist.module.css";
import { useNavigate } from "react-router-dom";
import getLoggedUserData from "../../utils/LoggedUserData";
import { useDispatch } from "react-redux";
import { RemoveWishListAction } from "../../redux/AppReducer/wishlist/actions";
import { toast } from "react-toastify";
function WishlistCard(props) {
  // console.log("propsData:-", props.productId);
// console.log("props:-",props);
  const navigate = useNavigate();
  const loggedUser = getLoggedUserData();
  const token = loggedUser.token;
  const dispatch = useDispatch();

  const handleWishlistRemove = async (id) => {
    const payload = {
      productId: id,
      token: token,
    };

    console.log(payload);

    try {
      let res = await dispatch(RemoveWishListAction(payload));
      // console.log("res:-", res);

      if (res === undefined) {
        throw new Error("Something went wrong", { autoClose: 2000 });
      }

      if (res && res.hint === "reSuc") {
        localStorage.removeItem(`product_${props.productId._id}`);
        toast.success(res.msg, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  return (
    <>
      <div className={styles.__child_container} key={props.productId._id}>
        <div
          className={styles.__image__}
          onClick={() => navigate(`/product/single/${props.productId._id}`)}
        >
          <img src={props?.productId?.image} alt={props.productId?.title} />
        </div>
        <p>{props?.productId?.title}</p>
        <div className={styles.__buttons__div}>

          {props?.productId?.Stock<1?<button style={{cursor:"not-allowed",backgroundColor:"red",color:"white"}} >OUT OF STOCK</button>: <button onClick={()=>navigate(`/checkout/buyNow/${props.productId._id}`)} >BUY NOW</button>}
         
          <button onClick={() => handleWishlistRemove(props.productId._id)}>
            REMOVE
          </button>
        </div>
      </div>
    </>
  );
}

export default WishlistCard;
