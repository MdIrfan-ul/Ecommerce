import { useDispatch } from "react-redux";
import style from "./ProductsForm.module.css";
import { addProducts } from "../../features/ProductsReducer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";


function ProductsForm() {
  const [productsData, setProductsData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    rating: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();



// Setting input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductsData((prevState)=>({...prevState,[name]:value}));
  };

// Clearing input fields
  const clearInput=()=>{
    setProductsData({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
        rating: ""
      });
  }

  // FormHandler to add new products
  const handleSubmit = (e) => {
    e.preventDefault();

    // converting price and ratings to integer/float.

  try {
    const formData = {
      ...productsData,
      price: parseInt(productsData.price),
      rating: parseFloat(productsData.rating)
    };
    dispatch(addProducts(formData));
    toast.success('Product Added Successfully',{pauseOnHover:false,closeOnClick:true,transition:Bounce});
    clearInput();
    navigate('/');
  } catch (error) {
    console.log(error);
  }
 
  
    
  };
  return (
    <>
      <div className={style.productsFormContainer}>
        <h2 className={style.heading}>Add Product </h2>
        <form className={style.productForm} onSubmit={handleSubmit}>
          <label htmlFor="title" className={style.productsLabel}>
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="Enter product title"
            className={style.productsInput}
            onChange={handleChange}
          />
          <label htmlFor="description" className={style.productsLabel}>
            Description
          </label>
          <textarea name="description" id="description" rows="4" cols="50" className={style.productsTextArea}placeholder="Enter Description" onChange={handleChange}>
        </textarea>
          <label htmlFor="price" className={style.productsLabel}>
            Price &#8377;
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            placeholder="Enter Price &#8377;"
            className={style.productsInput}
            onChange={handleChange}
          />
          <label htmlFor="imageUrl" className={style.productsLabel}>
            ImageUrl
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            required
            placeholder="Enter ImageUrl"
            className={style.productsInput}
            onChange={handleChange}
          />
          <label htmlFor="rating" className={style.productsLabel}>
            Ratings
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            required
            placeholder="Enter Ratings"
            min="0.1"
            max="5"
            step="0.1"
            className={style.productsInput}
            onChange={handleChange}
          />
          <button type="submit" className={style.addBtn}>
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}

export { ProductsForm };
