import { Bar, Stave } from "./classes";

function parseBar(s: string): Bar {
    return new Bar([], [], [], []);
}

export function parse(s: string): Array<Stave> {
    let list: string[] = s.split("|");
    let n: number = 0;
    let output: Array<Stave> = [];
    while (n < list.length) {
        if (n % 4 == 0) {
            output.push(new Stave([parseBar(list[n])]));
        } else {
            let m = output.length - 1;
            output[m].bars.push(parseBar(list[n]));
        }
        n++;
    }
    return output;
}