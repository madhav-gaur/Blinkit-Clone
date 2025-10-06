import SummaryApi from "../common/summaryAPI";
import Axios from "../utils/axios";

export const UpdateCartItemQty = async (updation, id, cartData, getCartItem) => {
    try {
        const suspectProduct = cartData.find((item) => item.productId._id === id);
        if (!suspectProduct) throw new Error("Product not found in cart");
        
        // eslint-disable-next-line no-unused-vars
        const response = await Axios({
            ...SummaryApi.updateCartItemQty,
            data: { cartItemId: suspectProduct._id, updation }
        });

        // console.log(response);
    } catch (error) {
        console.error(error);
    } finally {
        getCartItem();
    }
};
