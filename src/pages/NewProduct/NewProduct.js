import React, { useState } from "react";
import "./NewProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const NewProduct = () => {
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState([]);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const dispatch = useDispatch();


    const handleChange = (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value }
      })
    };


    const handleCategory = (e) => {
      setCategory(e.target.value.split(","));
    };

    const handleSize = (e) => {
      setSize(e.target.value.split(","));
    };

    const handleColor = (e) => {
      setColor(e.target.value.split(","));
    };

    const handleClick = (e) => {
      e.preventDefault();
      //give file unique name with prefixing timestamp to stop it being overwritten
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // Handle unsuccessful uploads
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            //console.log('File available at', downloadURL);
            console.log({ ...inputs, img: downloadURL, size: size, color: color, category: category });
            const product = { ...inputs, img: downloadURL, category: category };
            addProduct(product, dispatch);
          });
        }
      );
    };

    console.log(inputs);
    console.log(category);


    return (
      <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input name="name" type="text" placeholder="Product Name" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name="description" type="text" placeholder="Description..." onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input name="size" type="text" placeholder="15ml,35ml,90ml" onChange={handleSize}/>
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input name="color" type="text" placeholder="pink,orange" onChange={handleColor}/>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="number" placeholder="100" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Category</label>
          <input name="category" type="text" placeholder="Dehydration,Redness" onChange={handleCategory}/>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="instock" id="active" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">Create</button>
      </form>
    </div>
    );
  }

  export default NewProduct