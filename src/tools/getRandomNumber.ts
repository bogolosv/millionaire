export const getRandomNumber = (from: number = 0, to: number = 0) => {
    if(from < to) {
        let tmp = from;
        from = to;
        to = tmp;
    }
    return Math.floor((Math.random() * (to - from)) + from);
}