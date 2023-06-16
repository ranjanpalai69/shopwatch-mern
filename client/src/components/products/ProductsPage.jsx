import React, { useEffect, useState } from "react";
import styles from "./styles/products.module.css";
import { useMediaQuery } from "react-responsive";
import stylesTablet from "./styles/products.tablet.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import ProductCard from "./ProductCard";
import TabletProductCard from "./TabletProductCard";
import DocumentTitle from "../Helmet/Helmet";
import { getProductsData } from "../../redux/AppReducer/products/actions";
import InputCheckbox from "./InputCheckbox";
import { GoSettings } from "react-icons/go";
import { FiChevronDown } from "react-icons/fi";
import FilterModal from "../../modals/FilterModal";
import {
  brandOptionAv,
  categoryOptionAv,
  priceRanges,
  ratingOption,
} from "../../Constant/ProductsFiltersOption";
import MobileFilterModal from "../../modals/MobileFilterModal";
import ProductNotFound from "./ProductNotFound";

function ProductsPage() {
  const Dekstop = ({ children }) => {
    const isDekstop = useMediaQuery({ minWidth: 992 });
    return isDekstop ? children : null;
  };
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };

  // various filter section
  const [categoryOption, setCategoryOption] = useState(categoryOptionAv);
  // various branding secion
  const [brandOption, setBrandOption] = useState(brandOptionAv);

  // ratings

  const [selectedRating, setSelectedRating] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [minPrice, maxPrice] = selectedPriceRange.split("-");

  // mobile sortby
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // mobile filter
  const handleMobileFilterOpen = () => {
    setIsFilterOpen(true);
  };

  const handleMobileFilterClose = () => {
    setIsFilterOpen(false);
  };

  const { products, isLoading } = useSelector(
    (store) => store.getProductReducer
  );
  const dispatch = useDispatch();

  // this is Cateogory
  function handleCategoryChange(event, i) {
    const { value, checked } = event.target;
    const newSelectedCategories = [...selectedCategories];
    const newCheckboxex = [...categoryOption];
    newCheckboxex[i].checked = checked;
    setCategoryOption(newCheckboxex);
    const index = newSelectedCategories.indexOf(value);

    if (index > -1) {
      newSelectedCategories.splice(index, 1);
    } else {
      newSelectedCategories.push(value);
    }

    setSelectedCategories(newSelectedCategories);
  }

  // this is brand
  function handleBrandChange(event, i) {
    const { value, checked } = event.target;
    const newSelectedBrands = [...selectedBrands];
    const newBrand = [...brandOption];
    newBrand[i].checked = checked;
    setBrandOption(newBrand);
    const index = newSelectedBrands.indexOf(value);

    if (index > -1) {
      newSelectedBrands.splice(index, 1);
    } else {
      newSelectedBrands.push(value);
    }

    setSelectedBrands(newSelectedBrands);
  }

  useEffect(() => {
    dispatch(
      getProductsData({
        category: selectedCategories,
        brand: selectedBrands,
        minPrice: minPrice,
        maxPrice: maxPrice,
        ratings: selectedRating,
      })
    );
  }, [
    selectedCategories,
    selectedBrands,
    dispatch,
    minPrice,
    maxPrice,
    selectedRating,
  ]);

  const handleRatingChange = (event) => {
    setSelectedRating(Number(event.target.value));
  };

  // console.log("categoryfromLs:",categoryfromLs);

  return (
    <>
      <Dekstop>
        <DocumentTitle pageTitle="| PRODUCTS" />
        <main className={styles._main_div}>
          {/* filters container */}
          <div className={styles._filters}>
            <div className={styles._category_div}>
              <label className={styles._label_text}>Select Category</label>
              {categoryOption.map((item, index) => (
                <div key={index}>
                  <InputCheckbox
                    category="category"
                    id={`category-${index}`}
                    value={item.cate}
                    checking={item.checked}
                    onChangeHanlde={(event) =>
                      handleCategoryChange(event, index)
                    }
                    index={index}
                  />
                </div>
              ))}
            </div>
            <hr />

            <div className={styles._brand_div}>
              <label className={styles._label_text}>Select Brand</label>
              {brandOption.map((item, index) => (
                <div key={index}>
                  <InputCheckbox
                    category="brand"
                    id={`brand-${index}`}
                    value={item.brand}
                    checking={item.checked}
                    onChangeHanlde={(event) => handleBrandChange(event, index)}
                    index={index}
                  />
                </div>
              ))}
            </div>
            <hr />

            <div className={styles._price_div}>
              <label
                className={`${styles._label_text} ${styles._label_text_price}`}
              >
                Choose price range
              </label>
              <select
                value={selectedPriceRange}
                className={styles.__select__priceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              >
                <option value="" disabled>
                  -- Select price range --
                </option>
                {priceRanges.slice(1).map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            <hr />

            <div className={styles._rating_div}>
              <label>Choose rating</label>
              <select onChange={handleRatingChange} value={selectedRating}>
                <option value="" disabled>
                  Ratings
                </option>
                {ratingOption.map((rate, index) => (
                  <option key={index} value={rate}>
                    {rate}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* products container */}
          <div className={styles._products_container}>
            <div className={styles._products}>
              {isLoading ? (
                <Loader />
              ) : products === undefined || products.length === 0 ? (
                // <h1 style={{ textAlign: "center", marginLeft: "10%" }}>
                //   Products not available
                // </h1>
                <ProductNotFound/>
              ) : (
                products &&
                products?.map((el) => <ProductCard key={el._id} {...el} />)
              )}
            </div>
          </div>
        </main>
      </Dekstop>

      {/* Tablet*/}

      <Tablet>
        <DocumentTitle pageTitle="| PRODUCTS" />
        <main className={stylesTablet._tablet_main_div}>
          {/* filters container */}
          <div className={stylesTablet._tablet_category_div}>
            <div className={stylesTablet._tablet_category_div}>
              <label className={stylesTablet._tablet_label_text}>
                Select Category ::{" "}
              </label>
              {categoryOption.map((item, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={`category-${index}`}
                    value={item.cate}
                    checked={item.checked}
                    onChange={(event) => handleCategoryChange(event, index)}
                  />
                  <label htmlFor={`category-${index}`}>{item.cate}</label>
                </div>
              ))}
            </div>
            <hr />

            <div className={styles._tablet_brand_div}>
              <label className={styles._tablet_label_text}>
                Select Brand ::{" "}
              </label>
              {brandOption.map((item, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={`brand-${index}`}
                    value={item.brand}
                    checked={item.checked}
                    onChange={(event) => handleBrandChange(event, index)}
                  />
                  <label htmlFor={`brand-${index}`}>{item.brand}</label>
                </div>
              ))}
            </div>
            <hr />

            <div className={styles._tablet_price_div}>
              <label
                className={`${styles._tablet_label_text} ${styles._tablet__label_text_price}`}
              >
                Choose price range ::
              </label>
              <select
                value={selectedPriceRange}
                className={styles._tablet__select__priceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              >
                <option value="" disabled>
                  -- Select price range --
                </option>
                {priceRanges.slice(1).map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            <hr />

            <div className={styles._tablet_rating_div}>
              <label>Choose rating :: </label>
              <select onChange={handleRatingChange} value={selectedRating}>
                <option value="" disabled>
                  Ratings
                </option>
                {ratingOption.map((rate, index) => (
                  <option key={index} value={rate}>
                    {rate}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* products container */}
          <div className={stylesTablet._tablet_products_container}>
            <div className={stylesTablet._tablet_products}>
              {isLoading ? (
                <Loader />
              ) : products === undefined || products.length === 0 ? (
                <h1>Products not available</h1>
              ) : (
                products &&
                products?.map((el) => (
                  <TabletProductCard key={el._id} {...el} />
                ))
              )}
            </div>
          </div>
        </main>
      </Tablet>

      {/* Mobile */}

      <Mobile>
        <DocumentTitle pageTitle="| PRODUCTS" />
        <div className={stylesTablet._mobile_products_container}>
          <div className={stylesTablet._sroting_filtering_}>
            <div onClick={handleOpenModal}>
              <FiChevronDown />
              Sort by
            </div>
            <div onClick={handleMobileFilterOpen}>
              <GoSettings /> Filter
            </div>
          </div>
          <div className={stylesTablet._mobile_products}>
            {isLoading ? (
              <Loader />
            ) : products === undefined || products.length === 0 ? (
              <h1>Products not available</h1>
            ) : (
              products &&
              products?.map((el) => <TabletProductCard key={el._id} {...el} />)
            )}
          </div>
        </div>

        {isModalOpen && (
          <FilterModal
            onClose={handleCloseModal}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            priceRanges={priceRanges}
            handleRatingChange={handleRatingChange}
            selectedRating={selectedRating}
            ratingOption={ratingOption}
          />
        )}

        {isFilterOpen && (
          <MobileFilterModal
            onClose={handleMobileFilterClose}
            categoryOption={categoryOption}
            handleCategoryChange={handleCategoryChange}
            brandOption={brandOption}
            handleBrandChange={handleBrandChange}
          />
        )}
      </Mobile>
    </>
  );
}

export default ProductsPage;
