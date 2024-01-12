export const PRODUCTS = "https://fakestoreapi.com/products"; // API end point for product list API

/**
 * 
 * @param text user input text
 * @returns regular expression for user entered value
 */
export const escapeRegExp = (text: string) => {
    return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

/**
 * Type properties of Product object
 */
export type Product = {
    id: number;
    title: string;
    image: string;
  };