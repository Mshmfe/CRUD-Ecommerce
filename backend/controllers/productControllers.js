import { v4 as uuidv4 } from "uuid";

let products = [
  {
    id: 1,
    name: "Laptop",
    price: 320,
  },
  {
    id: 2,
    name: "Phone",
    price: 370,
  },
  {
    id: 3,
    name: "Tablet",
    price: 1490,
  },
  {
    id: 4,
    name: "Gaming Console",
    price: 1200,
  },
  {
    id: 5,
    name: "Camera",
    price: 800,
  },
];

//GET -> /products->git all product
export const gitAllProduct = (req, res) => {
  try {
    res.status(200).json({
      message: "all product are returend ",
      payload: products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//GET -> /products/id->git single product
export const gitSingleProduct = (req, res, next) => {
  try {
    const id = req.params.id;
    const product = products.find((product) => product.id === Number(id));
    if (!product) {
      return res.status(404).send({
        success: false,
        message: `Product not found with the id: ${id}`,
      });
    }
    res.status(200).json({
      message: "Single product is returned",
      payload: product,
    });
  } catch (error) {
    //send the error to the app level middleware by use next
    next(error);
  }
};
//DELETE -> /products/id->delete single product
export const deleteSingleProduct = (req, res, next) => {
  try {
    const id = req.params.id;
    const filterProduct = products.filter(
      (product) => product.id != Number(id)
    );
    products = filterProduct;
    if (!filterProduct) {
      return res.status(404).send({
        success: false,
        message: `Product not found with the id: ${id}`,
      });
    }
    res.status(204).json({});
  } catch (error) {
    //send the error to the app level middleware by use next
    next(error);
  }
};
//POST -> /products->create product
export const createProducts = (req, res) => {
  try {
    const data = req.body;
    console.log("Received data:", data);
    const newProduct = {
      id: uuidv4(),
      name: data.name,
      price: data.price,
    };
    console.log(newProduct);
    products.push(newProduct);

    res.status(201).json({
      message: "Product is created",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

//PUT -> /products/id->update single product
export const updateSingleProduct = (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price } = req.params;
    const findIndexproduct = products.findIndex(
      (product) => product.id === Number(id)
    );

    if (!findIndexproduct === -1) {
      return res.status(404).send({
        success: false,
        message: `Product not found with the id: ${id}`,
      });
    }
    products[findIndexproduct] = {
      ...products[findIndexproduct],
      ...req.body,
    };

    res.status(200).json({
      message: " product is updated",
      payload:products[findIndexproduct]
    });
  } catch (error) {
    //send the error to the app level middleware by use next
    next(error);
  }
};
