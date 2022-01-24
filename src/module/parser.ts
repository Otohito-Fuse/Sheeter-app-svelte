import { barPaddingLeftRatio, barPaddingRightRatio } from "../config/lengths";
import { Bar, Stave, Note, NoteSymbol, constructAccidental, constructNoteSymbol, Accidental, NoteHeight, NoteHeadType, NoteHead, Stem, Beam, Rest, RestType } from "./classes";

export function parse(s: string): Array<Stave> {
    let bars: string[] = s.split("|");
    let configString: string = bars.shift().trim();
    bars.pop();
    let n: number = 0;
    let m: number = -1;
    let output: Array<Stave> = [];

    let config = parseConfig(configString);
    while (n < bars.length) {
        if (n % 4 == 0) {
            if (n == 0) {
                output.push(new Stave([parseBar(bars[n])], config.timeSignatureNumer, config.timeSignatureDenom, config.keySignature));
            } else {
                output.push(new Stave([parseBar(bars[n])], 0, 0, config.keySignature));
            }
            m++;
        } else {
            output[m].bars.push(parseBar(bars[n]));
        }
        n++;
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
            keySignature = keySignatureString.length * (-1);
        }
        timeSignatureNumer = parseInt(s.split(":")[1].split("/")[0]);
        timeSignatureDenom = parseInt(s.split(":")[1].split("/")[1]);
    }
    if (s.match(/^(b{1,7}|#{1,7})$/)) {
        let keySignatureString: string = s;
        if (keySignatureString.match(/^b{1,7}$/)) {
            keySignature = keySignatureString.length;
        } else if (keySignatureString.match(/^#{1,7}$/)) {
            keySignature = keySignatureString.length * (-1);
        }
    }
    if (s.match(/^\d+\/\d+$/)) {
        timeSignatureNumer = parseInt(s.split("/")[0]);
        timeSignatureDenom = parseInt(s.split("/")[1]);
    }
    return {
        "timeSignatureNumer": timeSignatureNumer,
        "timeSignatureDenom": timeSignatureDenom,
        "keySignature": keySignature,  
    };
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
    if (!s.match(/^(A|B|C|D|E|F|G|R)(|n|#|##|b|bb)\d*\.\d*\/\d*(|:t)$/)) {
        return null;
    }

    let heightString: string = s.split(".")[0];
    let lengthString: string = s.split(".")[1].split(":")[0];

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

    let lenGcd: number = gcd(lenNumer, lenDenom);
    lenNumer = Math.round(lenNumer / lenGcd);
    lenDenom = Math.round(lenDenom / lenGcd);

    let symbolWithAccidental: string = heightString.replace(/\d+/, "");
    if (symbolWithAccidental == "R") {
        return new Note(null, lenNumer, lenDenom, false);
    }

    let symbol: NoteSymbol | null = constructNoteSymbol(symbolWithAccidental.charAt(0));
    let accidental: Accidental | null = constructAccidental(symbolWithAccidental.substring(1));
    if (symbol && accidental && heightString.match(/\d+/)) {
        let octave: number = parseInt(heightString.match(/\d+/)[0]);
        // TODO: Consider how to treat ties
        return new Note(new NoteHeight(symbol, octave, accidental), lenNumer, lenDenom, s.includes(":t"));
    } else {
        return null;
    }
}

const gcd = (x: number, y: number) => {
    return (x % y) ? gcd(y, x % y) : y;
}

function notesToElements(notes: Array<Note>): Bar {
    let noteHeads: Array<NoteHead> = [];
    let stems: Array<Stem> = [];
    let beams: Array<Beam> = [];
    let rests: Array<Rest> = [];

    let lengthSum: number = 0;
    for (let { lenNumer, lenDenom } of notes) {
        lengthSum += lenNumer / lenDenom;
    }
    let lengthPartialSum: number = 0;
    for (let { height, lenNumer, lenDenom } of notes) {
        let xRel: number = barPaddingLeftRatio + (1 - barPaddingLeftRatio - barPaddingRightRatio) * (lengthPartialSum / lengthSum);
        if (height) {
            let yRel: number = height.toYRel();
            
            let noteHeadType: NoteHeadType;
            let dots: number;
            // TODO: Consider how to treat note values
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
            noteHeads.push(new NoteHead(xRel, yRel, noteHeadType, dots, height.accidental ? height.accidental : "none"));
        } else {
            let restType: RestType;
            let dots: number;
            // TODO: Consider how to treat note values
            if (lenNumer == lenDenom) {
                restType = "whole";
                dots = 0;
            } else if (lenNumer * 2 == lenDenom * 3) {
                restType = "whole";
                dots = 1;
            } else if (lenNumer * 4 == lenDenom * 7) {
                restType = "whole";
                dots = 2;
            } else if (lenNumer * 2 == lenDenom) {
                restType = "half";
                dots = 0;
            } else if (lenNumer * 4 == lenDenom * 3) {
                restType = "half";
                dots = 1;
            } else if (lenNumer * 8 == lenDenom * 7) {
                restType = "half";
                dots = 2;
            } else if (lenNumer * 4 == lenDenom) {
                restType = "quarter";
                dots = 0;
            } else if (lenNumer * 8 == lenDenom * 3) {
                restType = "quarter";
                dots = 1;
            } else if (lenNumer * 16 == lenDenom * 7) {
                restType = "quarter";
                dots = 2;
            } else if (lenNumer * 8 == lenDenom) {
                restType = "eighth";
                dots = 0;
            } else if (lenNumer * 16 == lenDenom * 3) {
                restType = "eighth";
                dots = 1;
            } else if (lenNumer * 32 == lenDenom * 7) {
                restType = "eighth";
                dots = 2;
            } else if (lenNumer * 16 == lenDenom) {
                restType = "sixteenth";
                dots = 0;
            } else if (lenNumer * 32 == lenDenom * 3) {
                restType = "sixteenth";
                dots = 1;
            } else if (lenNumer * 64 == lenDenom * 7) {
                restType = "sixteenth";
                dots = 2;
            }
            if (restType) {
                rests.push(new Rest(xRel, restType, dots));
            }
        }
        lengthPartialSum += lenNumer / lenDenom;
    }
    return new Bar(noteHeads, stems, beams, rests);
}