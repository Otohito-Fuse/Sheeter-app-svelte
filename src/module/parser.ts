import { Bar, Stave, Note, noteSymbols, NoteSymbol, constructAccidental, constructNoteSymbol, Accidental, NoteHeight } from "./classes";

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

export function parse(s: string): Array<Stave> {
    let bars: string[] = s.split("|");
    bars.shift();
    bars.pop();
    let n: number = 0;
    let output: Array<Stave> = [];
    while (n < bars.length) {
        if (n % 4 == 0) {
            output.push(new Stave([parseBar(bars[n])]));
        } else {
            let m = output.length - 1;
            output[m].bars.push(parseBar(bars[n]));
        }
        n++;
    }
    return output;
}

function parseNote(s: string): Note | null {
    if (!s.match(/(A|B|C|D|E|F|G|R)(|n|#|##|b|bb).\d*\/\d*/)) {
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

    let symbolWithAccidental: string = heightString.match(/[^\d]*/)[0];

    if (symbolWithAccidental == "R") {
        return new Note("Rest", lenNumer, lenDenom);
    }

    let symbol: NoteSymbol | null = constructNoteSymbol(symbolWithAccidental.charAt(0));
    let accidental: Accidental | null = constructAccidental(symbolWithAccidental.substring(1));
    let octave: number = parseInt(heightString.substring(1).match(/\d*/)[0]);
    if (!symbol || !accidental) {
        return null;
    } else {
        return new Note(new NoteHeight(symbol, octave, accidental), lenNumer, lenDenom);
    }
}

function notesToElements(notes: Array<Note>): Bar {
    return new Bar([], [], [], []);
}