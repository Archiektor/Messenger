export const sum = (a: number, b: number) => a + b;

export const mult = (a: number, b: number) => a * b;

export const splitIntoWords = (str: string) => {
    return str.toLowerCase().split(" ").map(word => word
        .replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, " ")
        .trim())
        .filter(word => word !== "");
}