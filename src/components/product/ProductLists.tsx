import { useEffect } from "react";
import { Product } from "../../utils/helper";
import "./ProductLists.css";
import { escapeRegExp } from "../../utils/helper";

/**
 * Props type for ProductLists component
 */
type ProductListsProps = {
  query: string;
  products: Product[];
  selectedProductIndex: number;
  handleProductClick: (product: Product) => void;
};

const ProductLists = ({
  query,
  products,
  selectedProductIndex,
  handleProductClick,
}: ProductListsProps) => {
  /**
   * This hook get triggered when selectedProductIndex changes and call scrollActiveProductIntoView function
   */
  useEffect(() => {
    if (selectedProductIndex !== -1) {
      scrollActiveProductIntoView(selectedProductIndex);
    }
  }, [selectedProductIndex]);

  /**
   *
   * @param index Product list selected index id
   * This function scroll to the product to the view port
   */
  const scrollActiveProductIntoView = (index: number) => {
    const activeProduct = document.getElementById(`product-${index}`);
    if (activeProduct) {
      activeProduct.scrollIntoView({
        block: "nearest",
        inline: "start",
        behavior: "smooth",
      });
    }
  };
  /**
   *
   * @param title Text which is entered by user
   * @returns Product which matches user input text
   */
  const highlightText = (title: string) => {
    const reg = new RegExp(escapeRegExp(query), "ig");
    const result = title.replace(reg, function ($1) {
      return "<span class='highlight'>" + $1 + "</span>";
    });
    return result;
  };

  return (
    <div className="result-product-container">
      {products.map((product, index) => (
        <div
          key={product.id}
          id={`product-${index}`}
          className={`${
            selectedProductIndex === index ? "product-highlight" : ""
          } product-row`}
          onClick={() => handleProductClick(product)}
        >
          <p
            className={"product-title"}
            dangerouslySetInnerHTML={{ __html: highlightText(product.title) }}
          ></p>
          <img src={product.image} alt="" className="product-img" />
        </div>
      ))}
    </div>
  );
};

export default ProductLists;
