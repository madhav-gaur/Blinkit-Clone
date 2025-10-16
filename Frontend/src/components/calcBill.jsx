export const calcBill = (cartData = []) => {
    const { totalSaving, productTotal } = cartData.reduce(
        (acc, item) => {
            // console.log(item)
            const { price, discount } = item.productId;
            acc.totalSaving += Math.floor((price * discount) / 100) * item.quantity;
            acc.productTotal += Math.floor(price - (price * discount) / 100) * item.quantity;
            return acc;
        },
        { totalSaving: 0, productTotal: 0 }
    );

    const deliveryCharge = productTotal > 99 ? 0 : 25;
    const handlingCharge = 2;
    let totalPayblePrice = productTotal + deliveryCharge + handlingCharge;
    if (productTotal === 0) {
        totalPayblePrice = 0
    }

    return { totalSaving, productTotal, deliveryCharge, handlingCharge, totalPayblePrice };
};