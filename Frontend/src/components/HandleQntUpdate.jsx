import SummaryApi from "../common/summaryAPI";
import Axios from "../utils/axios";

export const HandleQntUpdate = async ({
    updationType,
    localQty,
    cartData,
    setLocalQty,
    setLoading, 
    id,
}) => {
    if (setLoading) setLoading(true)
    console.log(updationType)
    const suspectProduct = cartData.find(
        (item) => item.productId._id === id
    );
    if (!suspectProduct) return;


    if (updationType === "remove" && localQty === 1) {
        
        setLocalQty(0);
        try {
            await Axios({
                ...SummaryApi.updateCartItemQty,
                data: {
                    cartItemId: suspectProduct._id,
                    updation: "remove",
                },
            });
        } catch (err) {
            console.error(err);
            setLoading(false)
            setLocalQty(1);
        }
        return;
    }


    const newQty = updationType === "add" ? localQty + 1 : localQty - 1;
    if (newQty < 1 || newQty > 9) return;
    setLocalQty(newQty);
    try {
        await Axios({
            ...SummaryApi.updateCartItemQty,
            data: {
                cartItemId: suspectProduct._id,
                updation: updationType,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
