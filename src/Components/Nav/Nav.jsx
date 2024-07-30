
import { NavLink, Outlet } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import style from "./Nav.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Nav() {
  const {carts} = useSelector(state=>state.carts);
  const [cartCount,setCartCount] = useState(0);

  useEffect(()=>{
    if(carts){
      setCartCount(carts.length);
    }
  },[carts]);
  return (
    <>
      <nav className={style.navContainer}>
        <div className={style.navContents}>
          <NavLink to='/' className={style.appName}>E-commerce</NavLink>
          <NavLink to='/' className={style.navLinks}>Products</NavLink>
          <NavLink to='/addProducts' className={style.navLinks}>Add Products</NavLink>
        </div>
        <div className={style.navProfile}>
          <NavLink to="/cart" className={style.cart}>
            Cart 
            <FaCartShopping className={style.icon} />
            <span className={style.cartCount}>{cartCount}</span>
          </NavLink>
          
          Profile
          <NavLink to='/' className={style.profile}>
            <IoPersonCircleOutline className={style.icon} />
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export { Nav };
