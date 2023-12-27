import { cartModel } from "../../models/cartModel.js";

class CartDao {
  async getAllProducts() {
    return await productModel.find();
  }
  
  async getCartById(id) {
    return await cartModel.findById(id);
  }

  async createCart(cart) {
    return await cartModel.create(cart);
  }

  async updateCart(id, cart) {
    return await cartModel.findByIdAndUpdate(id, cart);
  }

  async deleteProduct(id) {
    return await productModel.findByIdAndDelete(id);
  }
}

export default new CartDao();