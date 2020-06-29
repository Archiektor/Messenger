import {splitIntoWords} from "./functions";

let a: number;
let b: number;
let c: number;

beforeEach(() => {
    a = 2;
    b = 3;
    c = 4;
})

/*test('sum should be correct', () => {
    // 1.data come from closure
    // 2.action
    const result1 = sum(a,b);
    const result2 = sum(b,c);

    // 3. expect result to be
    expect(result1).toBe(5);
    expect(result2).toBe(7);
})

test('mult should be correct', () => {
    // 1.data come from closure
    // 2.action
    const result1 = mult(a,b);
    const result2 = mult(b,c);

    // 3. expect result to be
    expect(result1).toBe(6);
    expect(result2).toBe(12);
})*/

describe("simple test", () => {
    test('Splitting into words should be correct', () => {
        // 1.data
        let sentence1 = "Hello my friend";
        let sentence2 = "JS - the    best    programming language";

        // 2.action
        const result1 = splitIntoWords(sentence1);
        const result2 = splitIntoWords(sentence2);
        // console.log("result2", result2);

        // 3. expect result to be
        expect(result1.length).toBe(3);
        expect(result1[0]).toBe("hello");
        expect(result1[1]).toBe("my");
        expect(result1[2]).toBe("friend");

        expect(result2.length).toBe(5);
        expect(result2[0]).toBe("js");
        expect(result2[1]).toBe("the");
        expect(result2[2]).toBe("best");
        expect(result2[3]).toBe("programming");
        expect(result2[4]).toBe("language");
    })
})
