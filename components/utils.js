import {decode} from 'html-entities';

export function shuffleAnswers(incorrectArr, correct) {
    const correctIndex = Math.floor(Math.random() * 4);
    const newArr = incorrectArr.toSpliced(correctIndex, 0, correct);

    return {
        shuffledArray: newArr,
        correctIndex: correctIndex
    }
}

export function decodeText(text) {
    return decode(text, {level: 'html5' });
}

