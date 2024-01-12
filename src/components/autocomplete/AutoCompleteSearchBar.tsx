import axios from "axios";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import ProductLists from "../product/ProductLists";
import { Product } from "../../utils/helper";
import "./AutoCompleteSearchBar.css";
import { PRODUCTS } from "../../utils/helper";

const AutoCompleteSearchBar = () => {
  const [query, setQuery] = useState<string>(""); // This state stores user input value
  const [products, setProducts] = useState<Product[]>([]); // This state stores list of products
  const [searchResults, setSearchResults] = useState<Product[]>([]); // This state stores filtered products from iser input
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(-1); // This state stores index of the dropdown list
  const inputRef = useRef<HTMLInputElement>(null) // To store any input tag value
  
  /**
   * This hook call product API when page load
   */
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(PRODUCTS);
      setProducts(data);
    };
    fetchData();
  }, []);

  /**
   *
   * @param event Trigger change event
   * This function set user input value and filter the product list.
   */
  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setSearchResults(
      products.filter((product) =>
        product.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  /**
   *
   * @param event Trigger Keyboard arrow key
   * This function handle keyboard up/down/enter functionality for the dropdown
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      setSelectedProductIndex((prevIndex) =>
        prevIndex === -1 ? searchResults.length - 1 : prevIndex - 1
      );
    } else if (event.key === "ArrowDown") {
      setSelectedProductIndex((prevIndex) =>
        prevIndex === searchResults.length - 1 ? -1 : prevIndex + 1
      );
    } else if (event.key === "Enter") {
      if (selectedProductIndex !== -1) {
        const selectedProduct = searchResults[selectedProductIndex];
        alert(`You have selected ${selectedProduct.title}`);
        setQuery("");
        setSelectedProductIndex(-1);
        setSearchResults([]);
      }
    }
  };
  /**
   *
   * @param product Product parameter stores product details like id, title and image url
   * This function handle selected product when user clicked on the product
   */
  const handleProductClick = (product: Product) => {
    alert(`You selected ${product.title}`);
    setQuery("");
    setSearchResults([]);
  };
  return (
    <div className="container">
      <div className="header">Search for products</div>
      <input
        type="text"
        onChange={handleQueryChange}
        onKeyDown={handleKeyDown}
        className="search-bar"
        value={query}
        ref={inputRef}
        placeholder="Enter your search products"
      />
      {query !== "" && searchResults.length > 0 && (
        <ProductLists
          query={query}
          products={searchResults}
          selectedProductIndex={selectedProductIndex}
          handleProductClick={handleProductClick}
        />
      )}
    </div>
  );
};

export default AutoCompleteSearchBar;
