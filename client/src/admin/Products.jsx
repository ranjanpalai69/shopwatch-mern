import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopSection from "./TopSection";
import { getProductsData } from "../redux/AppReducer/products/actions";
import { BsBoxFill } from "react-icons/bs";
import { AiOutlineFundView } from "react-icons/ai";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import Loader from "../components/loader/Loader";
import styles from "./styles/products.module.css";
import ProductTableItem from "./ProductTableItem";

// I want complete data

const Products = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const dispatch = useDispatch();
  const { products, isLoading, totalProductspage } = useSelector(
    (store) => store.getProductReducer
  );

  // pagination logic
  const totalpage = totalProductspage;
  const startIndex = (page - 1) * limit;

  let productsLegth = Number(localStorage.getItem("productsLegth")) || 0;
  let outOfStockLentgh = Number(localStorage.getItem("outOfStock")) || 0;
  // console.log(outOfStock);
  const data = [
    {
      title: "Total Products",
      count: productsLegth,
      icon: <BsBoxFill />,
    },
    {
      title: "In Stock",
      count: productsLegth - outOfStockLentgh,
      icon: <AiOutlineFundView />,
    },
    {
      title: "Out Of Stock",
      count: outOfStockLentgh,
      icon: <AiOutlineFundView />,
    },
  ];

  // total length=100
  // totalpage=20
  // limit =5

  useEffect(() => {
    const payload = {
      page,
      limit,
    };
    dispatch(getProductsData(payload));
  }, [dispatch, limit, page, setPage, setLimit]);

  return (
    <>
      <TopSection data={data} />
      {isLoading ? (
        <Loader />
      ) : (
        <table className={styles.__admin__product__table}>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Product</th>
              <th>Product Id</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody className={styles.__admin__product__body}>
            {products.length > 0 &&
              products?.map((el, ind) => (
                <ProductTableItem
                  key={ind}
                  {...el}
                  ind={ind}
                  startIndex={startIndex}
                />
              ))}
          </tbody>
        </table>
      )}

      {/* pagination */}
      <div className={styles.__admin__product__pagi}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          <GrLinkPrevious />
        </button>
        <p>{page}</p>
        <button
          disabled={page === totalpage ? true : false}
          onClick={() => setPage(page + 1)}
        >
          <GrLinkNext />
        </button>
      </div>
    </>
  );
};

export default Products;
