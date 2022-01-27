import QRCode from 'qrcode';

export const capitalizeFirstLetter = (string) => {
    if(!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const generateQR = async text => {
    try {
        return await QRCode.toDataURL(text);
    } catch(err) {
        console.log(err);
    }
}