export class Stave {
    bars: Array<Bar>;

    constructor(bars: Array<Bar>) {
        this.bars = bars;
    }
}

export class Bar {
    noteHeads: Array<NoteHead>;
    stems: Array<Stem>;
    beams: Array<Beam>;
    rests: Array<Rest>;

    constructor(noteHeads: Array<NoteHead>, stems: Array<Stem>, beams: Array<Beam>, rests: Array<Rest>) {
        this.noteHeads = noteHeads;
        this.stems = stems;
        this.beams = beams;
        this.rests = rests;
    }
}

export type NoteHeadType = "whole" | "half" | "quarter";
export type Dot = 0 | 1 | 2;

export class NoteHead {
    x: number;
    y: number;
    noteHeadType: NoteHeadType;
    dot: Dot;

    constructor(x: number, y: number, noteHeadType: NoteHeadType, dot: Dot) {
        this.x = x;
        this.y = y;
        this.noteHeadType = noteHeadType;
        this.dot = dot;
    }
}

export type FlagType = "none" | "eighth" | "sixteenth";

export class Stem {
    x: number;
    yHead: number;
    yFlag: number;
    flagType: FlagType;

    constructor(x: number, yHead: number, yFlag: number, flagType: FlagType) {
        this.x = x;
        this.yHead = yHead;
        this.yFlag = yFlag;
        this.flagType = flagType;
    }
}

export class Beam {
    xLeft: number;
    xRight: number;
    yLeft: number;
    yRight: number;

    constructor(xLeft: number, xRight: number, yLeft: number, yRight: number) {
        this.xLeft = xLeft;
        this.xRight = xRight;
        this.yLeft = yLeft;
        this.yRight = yRight;
    }
}

export type RestType = "whole" | "half" | "quarter" | "eighth" | "sixteenth";

export class Rest {
    x: number;
    restType: RestType;

    constructor(x: number, restType: RestType) {
        this.x = x;
        this.restType = restType;
    }
}

export const noteSymbols: Array<string> = ["A", "B", "C", "D", "E", "F", "G"];

export type NoteSymbol = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export function constructNoteSymbol(s: string): NoteSymbol | null {
    switch(s) {
        case "A":
            return "A";
        case "B":
            return "B";
        case "C":
            return "C";
        case "D":
            return "D";
        case "E":
            return "E";
        case "F":
            return "F";
        case "G":
            return "G";
        default:
            return null;
    }
}

export type Accidental = "natural" | "sharp" | "double sharp" | "flat" | "double flat" | "none";

export function constructAccidental(s: string): Accidental | null {
    switch(s) {
        case "":
            return "none";
        case "n":
            return "natural";
        case "#":
            return "sharp";
        case "##":
            return "double sharp";
        case "b":
            return "flat";
        case "bb":
            return "double flat";
        default:
            return null;
    }
}

export class NoteHeight {
    symbol: NoteSymbol;
    octave: number;
    accidental: Accidental | null;

    constructor(symbol: NoteSymbol, octave: number, accidental: Accidental | null) {
        this.symbol = symbol;
        this.octave = octave;
        this.accidental = accidental;
    }
}

export class Note {
    height: NoteHeight | "Rest";
    lenNumer: number;
    lenDenom: number;

    constructor(height: NoteHeight | "Rest", lenNumer: number, lenDenom: number) {
        this.height = height;
        this.lenNumer = lenNumer;
        this.lenDenom = lenDenom;
    }
}