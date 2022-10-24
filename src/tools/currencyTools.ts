export const getFormattedCurrency = (value: string | number) => {
    if(!isNaN(+value)){
        const valueStr = String(value);
        return "$" + valueStr.split('').reverse().reduce((prev, current, index) =>{
            let next = current + prev;
            if((index + 1) % 3 === 0 && (index + 1) !== valueStr.length){
                next = ',' + next;
            }
            return next;
        }, '');
    }
    else {
        return "$0";
    }
}