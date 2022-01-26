import { barPaddingLeftRatio, barPaddingRightRatio } from "../config/lengths";
import { parseChords } from "./chordParser";
import {
    Bar,
    Stave,
    Note,
    NoteSymbol,
    constructAccidental,
    constructNoteSymbol,
    Accidental,
    NoteHeight,
    NoteHeadType,
    NoteHead,
    Stem,
    Beam,
    Rest,
    RestType,
    Tie,
} from "./classes";

export function parse(notes: string, chords: string): Array<Stave> {
    // About notes
    let bars: string[] = notes.split("|");
    let configString: string = bars.shift().trim();
    if (!bars[bars.length - 1] || bars[bars.length - 1].match(/^\s*$/)) {
        bars.pop();
    }
    let n: number = 0;
    let m: number = -1;
    let output: Array<Stave> = [];

    let config = parseConfig(configString);
    while (n < bars.length) {
        if (n % 4 == 0) {
            if (n == 0) {
                output.push(
                    new Stave(
                        [parseBar(bars[n])],
                        config.timeSignatureNumer,
                        config.timeSignatureDenom,
                        config.keySignature,
                        []
                    )
                );
            } else {
                output.push(
                    new Stave(
                        [parseBar(bars[n])],
                        0,
                        0,
                        config.keySignature,
                        []
                    )
                );
            }
            m++;
        } else {
            output[m].bars.push(parseBar(bars[n]));
        }
        n++;
    }

    // About ties between two staffs
    output.slice(0, -1).forEach(({ bars }, i) => {
        let numOfBars: number = bars.length;
        let numOfTiesOfLastBar: number = bars[numOfBars - 1].ties.length;
        if (
            numOfTiesOfLastBar > 0 &&
            bars[numOfBars - 1].ties[numOfTiesOfLastBar - 1].xRelTo >= 1
        ) {
            bars[numOfBars - 1].ties[numOfTiesOfLastBar - 1].xRelTo = 1;
            let yRel: number =
                bars[numOfBars - 1].ties[numOfTiesOfLastBar - 1].yRel;
            let isUpward: boolean =
                bars[numOfBars - 1].ties[numOfTiesOfLastBar - 1].isUpward;
            output[i + 1].bars[0].ties.push(
                new Tie(0, barPaddingLeftRatio, yRel, isUpward)
            );
        }
    });

    // About chords
    let chordBars: string[] = chords.split("|");
    chordBars.shift();
    if (
        !chordBars[chordBars.length - 1] ||
        chordBars[chordBars.length - 1].match(/^\s*$/)
    ) {
        chordBars.pop();
    }
    let k: number = 0;
    for (let i: number = 0; i < output.length; i++) {
        if (k == chordBars.length) break;
        for (let j: number = 0; j < output[i].bars.length; j++) {
            if (k == chordBars.length) break;

            output[i].chords.push(parseChords(chordBars[k]));
            k++;
        }
    }

    return output;
}

function parseConfig(s: string): any {
    let timeSignatureNumer: number = 0;
    let timeSignatureDenom: number = 0;
    let keySignature: number = 0;
    if (s.match(/^(|b{1,7}|#{1,7}):\d+\/\d+$/)) {
        let keySignatureString: string = s.split(":")[0];
        if (keySignatureString.match(/^b{1,7}$/)) {
            keySignature = keySignatureString.length;
        } else if (keySignatureString.match(/^#{1,7}$/)) {
            keySignature = keySignatureString.length * -1;
        }
        timeSignatureNumer = parseInt(s.split(":")[1].split("/")[0]);
        timeSignatureDenom = parseInt(s.split(":")[1].split("/")[1]);
    }
    if (s.match(/^(b{1,7}|#{1,7})$/)) {
        let keySignatureString: string = s;
        if (keySignatureString.match(/^b{1,7}$/)) {
            keySignature = keySignatureString.length;
        } else if (keySignatureString.match(/^#{1,7}$/)) {
            keySignature = keySignatureString.length * -1;
        }
    }
    if (s.match(/^\d+\/\d+$/)) {
        timeSignatureNumer = parseInt(s.split("/")[0]);
        timeSignatureDenom = parseInt(s.split("/")[1]);
    }
    return {
        timeSignatureNumer: timeSignatureNumer,
        timeSignatureDenom: timeSignatureDenom,
        keySignature: keySignature,
    };
}

function parseBar(s: string): Bar {
    let noteStrings: string[] = s.trim().split(/\s+/);
    let notes: Array<Note> = [];
    for (let noteString of noteStrings) {
        let note = parseNote(noteString);
        if (!!note) {
            notes.push(note);
        }
    }

    return notesToElements(notes);
}

function parseNote(s: string): Note | null {
    if (!s.match(/^(A|B|C|D|E|F|G|R)(|n|#|##|b|bb)\d*\.\d*\/\d*(|:t)$/)) {
        return null;
    }

    let heightString: string = s.split(".")[0];
    let lengthString: string = s.split(".")[1].split(":")[0];

    let lenNumerString = lengthString.split("/")[0];
    let lenDenomString = lengthString.split("/")[1];
    let lenNumer: number = !!lenNumerString ? parseInt(lenNumerString) : 1;
    let lenDenom: number = !!lenDenomString ? parseInt(lenDenomString) : 1;

    let lenGcd: number = gcd(lenNumer, lenDenom);
    lenNumer = Math.round(lenNumer / lenGcd);
    lenDenom = Math.round(lenDenom / lenGcd);

    let symbolWithAccidental: string = heightString.replace(/\d+/, "");
    if (symbolWithAccidental == "R") {
        return new Note(null, lenNumer, lenDenom, false);
    }

    let symbol: NoteSymbol | null = constructNoteSymbol(
        symbolWithAccidental.charAt(0)
    );
    let accidental: Accidental | null = constructAccidental(
        symbolWithAccidental.substring(1)
    );
    if (symbol && accidental && heightString.match(/\d+/)) {
        let octave: number = parseInt(heightString.match(/\d+/)[0]);
        return new Note(
            new NoteHeight(symbol, octave, accidental),
            lenNumer,
            lenDenom,
            s.includes(":t")
        );
    } else {
        return null;
    }
}

const gcd = (x: number, y: number) => {
    return x % y ? gcd(y, x % y) : y;
};

function notesToElements(notes: Array<Note>): Bar {
    let noteHeads: Array<NoteHead> = [];
    let stems: Array<Stem> = [];
    let beams: Array<Beam> = [];
    let rests: Array<Rest> = [];
    let ties: Array<Tie> = [];

    let n: number = notes.length;
    let lengthArray: Array<number> = Array(n + 1).fill(0);
    for (let i: number = 1; i <= n; i++) {
        lengthArray[i] =
            lengthArray[i - 1] + notes[i - 1].lenNumer / notes[i - 1].lenDenom;
    }
    for (let i: number = 0; i < n; i++) {
        let { height, lenNumer, lenDenom, withTie } = notes[i];
        let xRel: number =
            barPaddingLeftRatio +
            (1 - barPaddingLeftRatio - barPaddingRightRatio) *
                (lengthArray[i] / lengthArray[n]);
        if (!!height) {
            let yRel: number = height.toYRel();

            let noteHeadType: NoteHeadType;
            let dots: number;

            let numer0: number;
            let denom0: number;
            if (lenNumer % 3 == 0) {
                dots = 1;
                numer0 = 2 * lenNumer;
                denom0 = 3 * lenDenom;
            } else if (lenNumer % 7 == 0) {
                dots = 2;
                numer0 = 4 * lenNumer;
                denom0 = 7 * lenDenom;
            } else {
                dots = 0;
                numer0 = lenNumer;
                denom0 = lenDenom;
            }
            if (numer0 > denom0) {
                continue;
            } else if (2 * numer0 > denom0) {
                noteHeadType = "whole";
            } else if (4 * numer0 > denom0) {
                noteHeadType = "half";
            } else {
                noteHeadType = "quarter";
            }
            noteHeads.push(
                new NoteHead(
                    xRel,
                    yRel,
                    noteHeadType,
                    dots,
                    height.accidental ? height.accidental : "none"
                )
            );

            if (withTie) {
                let isUpward: boolean = yRel >= 0 ? true : false;
                let xRelTo: number =
                    i == n - 1
                        ? 1 + barPaddingLeftRatio
                        : barPaddingLeftRatio +
                          (1 - barPaddingLeftRatio - barPaddingRightRatio) *
                              (lengthArray[i + 1] / lengthArray[n]);
                ties.push(new Tie(xRel, xRelTo, yRel, isUpward));
            }
        } else {
            let restType: RestType;
            let dots: number;

            let numer0: number;
            let denom0: number;
            if (lenNumer % 3 == 0) {
                dots = 1;
                numer0 = 2 * lenNumer;
                denom0 = 3 * lenDenom;
            } else if (lenNumer % 7 == 0) {
                dots = 2;
                numer0 = 4 * lenNumer;
                denom0 = 7 * lenDenom;
            } else {
                dots = 0;
                numer0 = lenNumer;
                denom0 = lenDenom;
            }
            if (numer0 > denom0) {
                continue;
            } else if (2 * numer0 > denom0) {
                restType = "whole";
            } else if (4 * numer0 > denom0) {
                restType = "half";
            } else if (8 * numer0 > denom0) {
                restType = "quarter";
            } else if (16 * numer0 > denom0) {
                restType = "eighth";
            } else {
                restType = "sixteenth";
            }
            rests.push(new Rest(xRel, restType, dots));
        }
    }
    return new Bar(noteHeads, stems, beams, rests, ties);
}
