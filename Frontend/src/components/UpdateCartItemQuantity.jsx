import SummaryApi from "../common/summaryAPI";
import Axios from "../utils/axios";

export const UpdateCartItemQty = async (updation, id, cartData) => {
    try {
        const suspectProduct = cartData.find((item) => item.productId._id === id);
        if (!suspectProduct) throw new Error("Product not found in cart");

        await Axios({
            ...SummaryApi.updateCartItemQty,
            data: { cartItemId: suspectProduct._id, updation }
        });

    } catch (error) {
        console.error(error);
    }
};
