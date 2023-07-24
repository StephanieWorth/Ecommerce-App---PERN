import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import './Product.css';
import Chart from '../../components/chart/Chart';
import { productData } from '../../testData';
import { useSelector } from "react-redux";
import { userRequest } from '../../requestMethods';

const Product = () => {
    const location = useLocation();
    const productId = parseInt(location.pathname.split("/")[2]);
    //console.log(productId);
    const [productStats, setProductStats] = useState([]);


    const product = useSelector((state) => state.product.products.find((product) => product.id === productId))
    //console.log(product);
    
    const MONTHS = useMemo(
        () => [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
      []
    );

    useEffect(() => {
        const getStats = async () => {
          try {
            const res = await userRequest.get("orders/income?pid" + productId);
            console.log("API response data:", res.data); // Add this line to check the response data
            const list = res.data.sort((a,b) => {
                return a.id - b.id
            })
            list.map((item) => 
              setProductStats(prev => [
                ...prev,
                {name: MONTHS[item.id - 1], Sales: item.total },
              ])
            );
          } catch (err) {
            console.error(err.message);
          }
        };
        getStats();
      }, [productId, MONTHS]);



    if (!product) {
        return <div>Loading...</div>;
    }
  
   return (
    <div className="product">
    <div className="productTitleContainer">
      <h1 className="productTitle">Product</h1>
      <Link to="/newproduct">
        <button className="productAddButton">Create</button>
      </Link>
    </div>
    <div className="productTop">
        <div className="productTopLeft">
            <Chart data={productStats} dataKey="Sales" title="Sales Performance"/>
        </div>
        <div className="productTopRight">
            <div className="productInfoTop">
                <img 
                    src={product.img} 
                    alt="product image" 
                    className="productInfoImg" 
                />
                <span className="productName">{product.name}</span>
            </div>
            <div className="productInfoBottom">
                <div className="productInfoItem">
                    <span className="productInfoKey">id:</span>
                    <span className="productInfoValue">{product.id}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">sales:</span>
                    <span className="productInfoValue">5123</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">in stock:</span>
                    <span className="productInfoValue">{product.instock}</span>
                </div>
            </div>
        </div>
    </div>
    <div className="productBottom">
        <form className="productForm">
            <div className="productFormLeft">
                <label>Product Name</label>
                <input type="text" placeholder={product.name} />
                <label>Product Description</label>
                <input type="text" placeholder={product.description} />
                <label>Price</label>
                <input type="text" placeholder={product.price} />
                <label>In Stock</label>
                <select name="inStock" id="idStock">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div className="productFormRight">
                <div className="productUpload">
                    <img 
                        src={product.img} 
                        alt="product image" 
                        className="productUploadImg" 
                    />
                    <label for="file">
                        <Publish/>
                    </label>
                    <input type="file" id="file" style={{display:"none"}} />
                </div>
                <button className="productButton">Update</button>
            </div>
        </form>
    </div>
  </div>
  );
}

export default Product