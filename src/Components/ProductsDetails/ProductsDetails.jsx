import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsById } from "../../features/ProductsReducer";
import { useParams } from "react-router-dom";
import style from "./ProductsDetails.module.css"
import { addToCart } from "../../features/cartReducer";
import LoadingSpinner from "../Loading/Loading";
import { Flip, toast } from "react-toastify";

function ProductDetails(){
    const { productDetails, loading }  = useSelector(state=>state.products);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(()=>{
        dispatch(fetchProductsById(id));
    },[dispatch,id]);

// Adding Cart
    const handleAddToCart = (productDetails)=>{
        dispatch(addToCart(productDetails));
        toast.success("Products added to the Carts",{pauseOnHover:false,closeOnClick:true,transition:Flip});
      }
    
      // Check if productDetails is null or empty
    if (!productDetails || Object.keys(productDetails).length === 0) {
        return <div style={{ fontSize: "25px", textAlign: "center" }}>Make this product persistent to display details</div>;
    }
      const { imageUrl, title, price, rating, description } = productDetails;
    return (
        <>
        {loading?(<LoadingSpinner/>):(
        <div className={style.productDetailsContainer}>
            <div className={style.productDetails}>
                <div className={style.productImage}>
                    <img src={imageUrl} alt={title} />
                </div>
                <div className={style.productInfo}>
                    <div className={style.productTitle}>{title}</div>
                    <div className={style.productDescription}>{description}</div>
                    <div className={style.productPrice}>&#8377;{price}</div>
                    <div className={style.productRatings}>Ratings: {rating}</div>
                    <button className={style.addToCartButton} onClick={()=>handleAddToCart(productDetails)}>Add to Cart</button>
                </div>
            </div>
        </div>)}
       
        </>
    )

}

export {ProductDetails};


