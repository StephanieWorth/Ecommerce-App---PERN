import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../../data";
import Product from "./Product";
import axios from "axios";


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat, filters, sort}) => {
    console.log(cat, filters, sort);
    //fetch data here
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
      const getProducts = async () => {
          try {
              const res = await axios.get( cat ? `http://localhost:5000/products?category=${cat}` : "http://localhost:5000/products" );
              console.log(res);
              setProducts(res.data);
          } catch (err) {
              console.log("error here")
          }
      };
      getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) => {
          const isCategoryMatch = filters.category
            ? item.category.includes(filters.category)
            : true;
          const isSizeMatch = filters.size
            ? item.size.includes(filters.size)
            : true;
          

          return isCategoryMatch && isSizeMatch;
        })
      );
  }, [products, cat, filters?.category, filters?.size]);

  useEffect(() => {
    if ((sort === "newest")) {
        setFilteredProducts((prev) => 
            [...prev].sort((a, b) => a.created - b.created)
        );
    } else if ((sort === "asc")) {
        setFilteredProducts((prev) =>
            [...prev].sort((a, b) => a.price - b.price)
        );
    } else if ((sort === "desc")) {
        setFilteredProducts((prev) =>
            [...prev].sort((a, b) => b.price - a.price)
        );
    }
  }, [sort]);

  
    return (
        <Container>
            {cat 
                ? filteredProducts.map((item) => <Product item={item} key={item.id} />) 
                : products
                    .slice(0,8)
                    .map((item) => <Product item={item} key={item.id} />)}
        </Container>        
    )
}

export default Products;