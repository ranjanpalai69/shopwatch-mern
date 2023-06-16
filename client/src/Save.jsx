import { useEffect, useState } from "react";
import getData from "./redux/AppReducer/actions";
import style from "./App.module.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("")
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [searchBtnPrice, SetsearchBtnPrice] = useState(false)
  const [searchBtnQuery, SetsearchBtnQuery] = useState(false)
 

  const ratingOption = [5, 4, 3, 2, 4.5, 3.5, 2.5]
  const categoryOption = ["Men", "Women", "Anyone"]
  const brandOption = ["Timex", "Fossil", "Fastrack", "Casio", "Amazfit", "Armani exchange"]


  const handleSearch = (e) => {
    e.preventDefault();
    SetsearchBtnQuery(!searchBtnQuery)

  }
  function handleSearchPrice() {
    SetsearchBtnPrice(!searchBtnPrice)
    setFiltersInUrl();

  }

  const setFiltersInUrl = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
  
    if (searchBtnQuery) {
      if (searchTerm !== "") {
        urlSearchParams.set("query", searchTerm);
      } else {
        urlSearchParams.delete("query");
      }
    }
  
    urlSearchParams.set("page", page);
    urlSearchParams.set("limit", 10);
  
    if (selectedBrands.length > 0) {
      urlSearchParams.set("brand", selectedBrands.join(","));
    } else {
      urlSearchParams.delete("brand");
    }
  
    if (category) {
      urlSearchParams.set("category", category);
    } else {
      urlSearchParams.delete("category");
    }
  
    if (sort) {
      urlSearchParams.set("_sort", sort);
    } else {
      urlSearchParams.delete("_sort");
    }
  
    if (order) {
      urlSearchParams.set("_order", order);
    } else {
      urlSearchParams.delete("_order");
    }
  
    if (rating) {
      urlSearchParams.set("ratings", rating);
    } else {
      urlSearchParams.delete("ratings");
    }
  
    if (searchBtnPrice) {
      if (minPrice && maxPrice) {
        urlSearchParams.set("minPrice", minPrice);
        urlSearchParams.set("maxPrice", maxPrice);
      } else {
        urlSearchParams.delete("minPrice");
        urlSearchParams.delete("maxPrice");
      }
    }
  
    const url = `${window.location.pathname}?${urlSearchParams.toString()}`;
    window.history.pushState({}, "", url);
  };
  

  setFiltersInUrl();

  function getFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const page = urlParams.get('page');
    const limit = urlParams.get('limit');
    const category = urlParams.get('category');
    const brands = urlParams.get('brand');
    const minPrice = urlParams.get('minPrice');
    const maxPrice = urlParams.get('maxPrice');
    const sort = urlParams.get('_sort');
    const order = urlParams.get('_order');
    const rating = urlParams.get('ratings');

    return ({
      query: query,
      page: +page,
      limit: +limit,
      category: category,
      brands: brands,
      minPrice: +minPrice,
      maxPrice: +maxPrice,
      sort: sort,
      order: order,
      ratings: +rating
    });

  }


  useEffect(() => {
    const filters = getFiltersFromURL();
    getData(filters)
      .then((res) => {
        if (res) {
          // console.log("component res::", res, "total::", res.length);

        }
        // Reset SetsearchBtnPrice and SetsearchBtnQuery state to false after receiving a response
        SetsearchBtnPrice(false);
        SetsearchBtnQuery(false);
      })

      .catch((err) => {
        alert(err);
      });
  }, [window.location.search]);

  const handleBrandChange = (event) => {
    const value = event.target.value;
    if (selectedBrands.includes(value)) {
      setSelectedBrands(selectedBrands.filter((brand) => brand !== value));
    } else {
      setSelectedBrands([...selectedBrands, value]);
    }
  };

  const brandClassName = () => {
    const className = brandOption && brandOption.length > 5 ? "_greater_five_brand" : "_five_brand";
    return className

  }

  return (
    <div className={style.App}>

      <form className={style._searchForm} onSubmit={handleSearch} >
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>


      <div className={style._select_Category}>
        <label htmlFor="">Select Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>---Select Category---</option>
          {categoryOption.map((cate, index) => (
            <option key={index} value={cate}>
              {cate}
            </option>
          ))}
        </select>

      </div>

      <div className={brandClassName()}>

        <label htmlFor="">Select Brand</label>
        {brandOption.map((brand, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={brand}
              value={brand}
              onChange={handleBrandChange}
            />
            <label htmlFor={brand}>{brand}</label>
          </div>
        ))}
      </div>



      <div>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button onClick={handleSearchPrice}>Search</button>
      </div>



      <div className={style._select_ratings}>
        <label htmlFor="">Choose ratings</label>
        <select
          value={rating}
          onChange={(e) => setRating(+e.target.value)}
        >
          <option value="" disabled>---Choose Rating---</option>
          {ratingOption.map((rate, index) => (
            <option key={index} value={rate}>
              {rate}
            </option>
          ))}
        </select>

      </div>

      <div className={style._order}>
        <label htmlFor="">Sort by</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">---Sort---</option>
          <option value="originalPrice">Price</option>
          <option value="ratings">Ratings</option>
        </select>
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="" disabled>---Select Order---</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className={style._pagination}>
        <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous</button>
        <span>{page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>


    </div>
  );
}

export default App;
