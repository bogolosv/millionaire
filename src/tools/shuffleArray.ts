import {getRandomNumber} from "./getRandomNumber";

export function shuffleArray<T>(array: T[]) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {
        randomIndex = getRandomNumber(0, currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}