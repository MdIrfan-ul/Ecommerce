import { useSelector } from "react-redux";
import style from "./Carts.module.css";
import { RenderStars } from "../stars/stars";

function Carts() {
  const { carts } = useSelector((state) => state.carts);


  return (
    <>
      <div className={style.yourCart}>Your Cart</div>
      <div className={style.cartContainer}>
        {carts.length === 0 ? (
          <div style={{fontSize:"25px"}}>No Products in Your Cart</div>
        ) : (
          carts.map((cart, index) => (
            <div key={index} className={style.cartItem}>
              <div className={style.productImage}>
                <img src={cart.imageUrl} alt={cart.title} />
              </div>
              <div className={style.productDetails}>
                <div className={style.productName}>Title: {cart.title}</div>
                <div className={style.productPrice}>
                  Price: &#8377;{cart.price}
                </div>
                <div className={style.ratings}>
                  Ratings:{<RenderStars rating={cart.rating}/>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export { Carts };
