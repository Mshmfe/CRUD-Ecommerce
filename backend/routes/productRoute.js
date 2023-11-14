import { Router } from "express";

import {
  createProducts,
  deleteSingleProduct,
  gitAllProduct,
  gitSingleProduct,
  updateSingleProduct,
} from "../controllers/productControllers.js";
import {
  productValidator,
  validateProduct,
  validateUpdateProduct,
} from "../validation/productValidator.js";
import { runValidation } from "../validation/validation.js";

const productRouter = Router();
//GET -> /products->git all product
productRouter.get("/", gitAllProduct);

//GET -> /products->git single product
productRouter.get("/:id", productValidator(), runValidation, gitSingleProduct);

//DELETE -> /products->delete single product
productRouter.delete(
  "/:id",
  productValidator(),
  runValidation,
  deleteSingleProduct
);

//POST -> /products->create product
productRouter.post("/", validateProduct, runValidation, createProducts);

//PUT -> /products->update single product
productRouter.put(
  "/:id",
  productValidator(),
  validateUpdateProduct,
  runValidation,
  updateSingleProduct
);
export default productRouter;
