import { useEffect, useState } from "react";
import style from "./Home.module.css";
import { fetchProducts, removeProducts, toUpdateProducts } from "../../features/ProductsReducer";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai"; // Import close icon
import LoadingSpinner from "../Loading/Loading";
import {  Slide, toast, Zoom } from "react-toastify";
import { RenderStars } from "../stars/stars";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";

function Home() {
  const dispatch = useDispatch();
  const { products, loading} = useSelector((state) => state.products);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editableProduct, setEditableProduct] = useState(null);

  
  // Fetching products 
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // setting products for sorting
  useEffect(() => {
    if (products.length) {
      setSortedProducts(products);
    }
  }, [products]);

  // Sort by Price
  const sortProductsByPrice = () => {
    const sorted = [...sortedProducts].sort((a, b) => a.price - b.price);
    setSortedProducts(sorted);
    setIsSorted(true);
  };

// Remove the sorting 
  const removeSort = () => {
    setSortedProducts(products);
    setIsSorted(false);
  };

  // setting the edit product state for inline edit
  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditableProduct({ ...product });
  };
// setting value for updation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

// Updating the product
  const handleSave = (id) => {
    const updatedProducts = {...editableProduct,price:parseInt(editableProduct.price),rating:parseFloat(editableProduct.rating)}
    dispatch(toUpdateProducts({ id, updatedProducts }));
    setEditingProductId(null);
    toast.success('Product updated successfully',{pauseOnHover:false,closeOnClick:true,transition:Slide});
  };

// Removing the product
  const handleRemoveProduct = (id) => {
    dispatch(removeProducts(id));
    toast.success('Product deleted successfully',{autoClose:2000,pauseOnHover:false,closeOnClick:true,transition:Zoom});
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className={style.sortContainer}>
            {!isSorted && (
              <button onClick={sortProductsByPrice} className={style.sortButton}>
                Sort by Price
              </button>
            )}
            {isSorted && (
              <div className={style.sortActive}>
                <span className={style.sortedButton}>Sorted by Price</span>
                <AiOutlineClose onClick={removeSort} className={style.closeIcon} />
              </div>
            )}
          </div>
          <div className={style.productsContainer}>
            {sortedProducts &&
              sortedProducts.map((product) => (
                <div className={style.productContainer} key={product.id}>
                  <div className={style.productActions}>
                    {editingProductId === product.id ? (
                      <FaSave className={style.saveIcon} onClick={() => handleSave(product.id)} />
                    ) : (
                      <FaEdit className={style.editIcon} onClick={() => handleEdit(product)} />
                    )}
                    <FaTrash className={style.deleteIcon} onClick={() => handleRemoveProduct(product.id)} />
                  </div>
                  <div className={style.productImageContainer}>
                    <img
                      src={product.imageUrl}
                      alt="productImage"
                      width="100%"
                      height="100%"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className={style.productDetails}>
                    {editingProductId === product.id ? (
                      <>
                        <input
                          type="text"
                          name="title"
                          value={editableProduct.title}
                          onChange={handleChange}
                          className={style.editInput}
                        />
                        <textarea
                          name="description"
                          value={editableProduct.description}
                          onChange={handleChange}
                          className={style.editTextarea}
                        />
                        <input
                          type="number"
                          name="price"
                          value={editableProduct.price}
                          onChange={handleChange}
                          className={style.editInput}
                        />
                        <input
                          type="number"
                          name="rating"
                          value={editableProduct.rating}
                          onChange={handleChange}
                          className={style.editInput}
                        />
                      </>
                    ) : (
                      <>
                        <div className={style.productName}>
                          <p>{product.title}</p>
                          <p>{product.description}</p>
                        </div>
                        <div className={style.productOptions}>
                          <p>Price: &#8377;{product.price}</p>
                          <div>Ratings: <RenderStars rating={product.rating}/></div>
                        </div>
                      </>
                    )}
                  </div>
                  <NavLink to={`/productDetails/${product.id}`}>
                    <button className={style.details}>Product Details</button>
                  </NavLink>
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
}

export { Home };
