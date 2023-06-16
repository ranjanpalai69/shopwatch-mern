import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import getLoggedUserData from "../utils/LoggedUserData";
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct } from "../redux/AppReducer/admin/action";
import { toast } from 'react-toastify';
import { DELETE_PRODUCT_REQUEST_SUCCESS } from "../Constant/actionTypes";
import { useNavigate } from "react-router-dom"


function ProductTableItem({ ind, image, _id, startIndex }) {
  const loggedUser = getLoggedUserData()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { responseMsg, isLoading } = useSelector(store => store.getProductReducer);
  const [localResponseMsg, setLocalResponseMsg] = useState(responseMsg);

  // handle delete product
  const deleteProductData = (id) => {
    const payload = {
      token: loggedUser.token,
      productId: id
    }
    dispatch(deleteProduct(payload))
  };

  useEffect(() => {
    if (localResponseMsg) {
      if (localResponseMsg === "Product deleted success") {
        toast.success(localResponseMsg, { autoClose: 1500 })
        dispatch({ type: DELETE_PRODUCT_REQUEST_SUCCESS, payload: null })
        setLocalResponseMsg(null);
      } else {
        toast.error(localResponseMsg, { autoClose: 1500 })
      }
    }
  }, [localResponseMsg, dispatch])



  // handle edit redirect
  const editProduct = (id) => {
    navigate(`/admin/product/edit/${id}`)
  };

  return (
    <>
      <tr key={startIndex + ind}>
        <td>{startIndex + ind + 1}</td>
        <td>
          <img src={image} alt={_id} />
        </td>
        <td>{_id}</td>
        <td onClick={() => editProduct(_id)}>
          <FiEdit />
        </td>
        <td onClick={() => deleteProductData(_id)}>
          {isLoading ? "Deleting..." : <FaTrashAlt />}
        </td>
      </tr>
    </>
  );
}

export default ProductTableItem;
