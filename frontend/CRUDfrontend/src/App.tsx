import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
type Product = {
  id: number;
  name: string;
  price: number;
 
};
const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
  });

const[isEdit,setIsEdit]=useState<boolean>(false);
const[selectedProductId,setSelectedProductId]=useState<number | null>(null);
  //HOW CAN I FETCH DATA FROM BACKEND
  const fetchAllProduct = async () => {
    const { data } = await axios.get("http://127.0.0.1:3002/products");
    setProducts(data.payload);
  };
  //here i can delete single product by this way
  const handleDelete = async (id: number) => {
   try {
    await axios.delete(`http://127.0.0.1:3002/products/${id}`);
    toast.success("Product deleted successfully")
    fetchAllProduct();

   } catch (error) {
    toast.error(error.response.data.message);
   }
  };
  //here i can create new product in this way
  const createNewProduct = async (product: { name: string; price: number }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3002/products",
        product
      );
      toast.success(response.data.message);
      fetchAllProduct();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  //ican update the product like this 
  
  const handleUpdateProduct=async()=>{
try {
  if(!selectedProductId){
    toast.error('Please select a product to update')
    return
  }
 
 const updateProductData={
    name:product.name,
    price:product.price,
  }
  await axios.put(`http://127.0.0.1:3002/products/${selectedProductId}`,updateProductData);
  
  toast.success("Product updated successfully");
  fetchAllProduct()
  setIsEdit(false);
  setSelectedProductId(null);
  setProduct({
    name:"",
    price:0
  })
} catch (error) {
  toast.error(error.response?.data.message)
}
  }

  const updateOrCreateNewProduct=async()=>{
if(isEdit){
  await handleUpdateProduct()
  
}else{
   await createNewProduct(product)
   
}
  }

  
  useEffect(() => {
    fetchAllProduct();
  }, []);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProduct((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    updateOrCreateNewProduct()
    setProduct({
      name: "",
      price: 0,
    });
   
    setIsEdit(false);
    setSelectedProductId(null);
  };
  return (
    <>
      <ToastContainer />
      <form action="" onSubmit={handleSubmit} className="form-box">
        <input
          type="text"
          placeholder="Enter the name of the product"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="input-box"
        />
        <input
          type="number"
          placeholder="Enter the price of the product"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="input-box"
        />
        <button className="btn">{isEdit ? "Edit" : "Create"}</button>
      </form>
      <section className="products">
        {products.length > 0 &&
          products.map((product) => {
            return (
              <article key={product.id} className="product">
                <h2>Name:{product.name}</h2>
                <h3>Price: {product.price} SR</h3>
                <button
                  className="btn"
                  onClick={() => {
                    handleDelete(product.id);
                  }}
                >
                  Delete
                </button>
              
                <button  className="btn" onClick={()=>{
                  setIsEdit(true);
                  setSelectedProductId(product.id);
                  setProduct({
                    name:product.name,
                    price:product.price
                  })
                }}>Update</button>
              </article>
            );
          })}
      </section>
    </>
  );
};

export default App;
