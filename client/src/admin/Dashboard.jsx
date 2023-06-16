import React, { useEffect } from 'react'
import TopSection from './TopSection'
import ChartHome from './ChartHome'
import { BsBoxFill } from "react-icons/bs";
import { AiOutlineFundView } from "react-icons/ai";
import { BiMessageAltDots } from "react-icons/bi";
import { getProductsData } from '../redux/AppReducer/products/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/loader/Loader';


const Dashboard = () => {
  const dispatch = useDispatch()
  const { products, isLoading } = useSelector(
    (store) => store.getProductReducer
  );

  let productsLegth = products?.length;



  const outOfStock = products.filter(item => item.Stock < 1)
  // console.log(outOfStock);
  const data = [
    {
      title: "Total Products",
      count: products?.length,
      icon: <BsBoxFill />
    },
    {
      title: "Out Of Stock",
      count: outOfStock?.length,
      icon: <AiOutlineFundView />
    },
    {
      title: "Total Messages",
      count: 20,
      icon: <BiMessageAltDots />
    }
  ]

  useEffect(() => {
    dispatch(getProductsData())
    localStorage.setItem("productsLegth", productsLegth)
    localStorage.setItem("outOfStock", outOfStock.length)
  }, [dispatch, productsLegth,outOfStock.length])



  return (
    <>
      <TopSection data={data} />

      {isLoading ? <Loader /> : <ChartHome data={data} />}

    </>
  )
}

export default Dashboard
