import { barPaddingLeftRatio, barPaddingRightRatio } from "../config/lengths";
import { Bar, Stave, Note, NoteSymbol, constructAccidental, constructNoteSymbol, Accidental, NoteHeight, NoteHeadType, NoteHead } from "./classes";

export function parse(s: string): Array<Stave> {
    let bars: string[] = s.split("|");
    bars.shift();
    bars.pop();
    let n: number = 0;
    let m: number = -1;
    let output: Array<Stave> = [];
    while (n < bars.length) {
        if (n % 4 == 0) {
            output.push(new Stave([parseBar(bars[n])]));
            m++;
        } else {
            output[m].bars.push(parseBar(bars[n]));
        }
        n++;
    }
    return output;
}

function parseBar(s: string): Bar {
    let noteStrings: string[] = s.trim().split(/\s+/);
    let notes: Array<Note> = [];
    for (let noteString of noteStrings) {
        let note = parseNote(noteString);
        if (note) {
            notes.push(note);
        }
    }

    return notesToElements(notes);
}

function parseNote(s: string): Note | null {
    if (!s.match(/(A|B|C|D|E|F|G|R)(|n|#|##|b|bb)\d*.\d*\/\d*/)) {
        return null;
    }

    let heightString: string = s.split(".")[0];
    let lengthString: string = s.split(".")[1];

    let lenNumer: number;
    let lenDenom: number;
    let lenNumerString = lengthString.split("/")[0];
    let lenDenomString = lengthString.split("/")[1];
    if (!lenNumerString) {
        lenNumer = 1;
    } else {
        lenNumer = parseInt(lenNumerString);
    }
    if (!lenDenomString) {
        lenDenom = 1;
    } else {
        lenDenom = parseInt(lenDenomString);
    }

    let symbolWithAccidental: string = heightString.replace(/\d+/, "");
    if (symbolWithAccidental == "R") {
        return new Note(null, lenNumer, lenDenom);
    }

    let symbol: NoteSymbol | null = constructNoteSymbol(symbolWithAccidental.charAt(0));
    let accidental: Accidental | null = constructAccidental(symbolWithAccidental.substring(1));
    if (symbol && accidental && heightString.match(/\d+/)) {
        let octave: number = parseInt(heightString.match(/\d+/)[0]);
        return new Note(new NoteHeight(symbol, octave, accidental), lenNumer, lenDenom);
    } else {
        return null;
    }
}

function notesToElements(notes: Array<Note>): Bar {
    let noteHeads: Array<NoteHead> = [];

    let lengthSum: number = 0;
    for (let { lenNumer, lenDenom } of notes) {
        lengthSum += lenNumer / lenDenom;
    }
    let lengthPartialSum: number = 0;
    for (let { height, lenNumer, lenDenom } of notes) {
        if (height) {
            let yRel: number = height.toYRel();
            let xRel: number = barPaddingLeftRatio + (1 - barPaddingLeftRatio - barPaddingRightRatio) * (lengthPartialSum / lengthSum);
            
            let noteHeadType: NoteHeadType;
            let dots: number;
            if (lenNumer == lenDenom) {
                noteHeadType = "whole";
                dots = 0;
            } else if (lenNumer * 2 == lenDenom * 3) {
                noteHeadType = "whole";
                dots = 1;
            } else if (lenNumer * 4 == lenDenom * 7) {
                noteHeadType = "whole";
                dots = 2;
            } else if (lenNumer * 2 == lenDenom) {
                noteHeadType = "half";
                dots = 0;
            } else if (lenNumer * 4 == lenDenom * 3) {
                noteHeadType = "half";
                dots = 1;
            } else if (lenNumer * 8 == lenDenom * 7) {
                noteHeadType = "half";
                dots = 2;
            } else {
                noteHeadType = "quarter";
                if (lenNumer % 3 == 0) {
                    dots = 1;
                } else if (lenNumer % 7 == 0) {
                    dots = 2;
                } else {
                    dots = 0;
                }
            }
            noteHeads.push(new NoteHead(xRel, yRel, noteHeadType, dots, "none"));
        }
        lengthPartialSum += lenNumer / lenDenom;
    }
    return new Bar(noteHeads, [], [], []);
}