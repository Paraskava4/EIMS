export const formatAddress = (state) => {
    if (!state) return "";
    const { houseNo, address1, address2, pincode } = state || {};
    let str = "";
    if (houseNo) str += `${houseNo}, `;
    if (address1) str += `${address1}, `;
    if (address2) str += `${address2}, `;
    if (pincode) str += `${pincode}`;
    return str;
};
