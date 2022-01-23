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

export class NoteHead {
    xRel: number;
    yRel: number;
    noteHeadType: NoteHeadType;
    dot: number;

    constructor(xRel: number, yRel: number, noteHeadType: NoteHeadType, dot: number) {
        this.xRel = xRel;
        this.yRel = yRel;
        this.noteHeadType = noteHeadType;
        this.dot = dot;
    }
}

export type FlagType = "none" | "eighth" | "sixteenth";

export class Stem {
    xRel: number;
    yRelHead: number;
    yRelFlag: number;
    flagType: FlagType;

    constructor(xRel: number, yRelHead: number, yRelFlag: number, flagType: FlagType) {
        this.xRel = xRel;
        this.yRelHead = yRelHead;
        this.yRelFlag = yRelFlag;
        this.flagType = flagType;
    }
}

export class Beam {
    xRelLeft: number;
    xRelRight: number;
    yRelLeft: number;
    yRelRight: number;

    constructor(xRelLeft: number, xRelRight: number, yRelLeft: number, yRelRight: number) {
        this.xRelLeft = xRelLeft;
        this.xRelRight = xRelRight;
        this.yRelLeft = yRelLeft;
        this.yRelRight = yRelRight;
    }
}

export type RestType = "whole" | "half" | "quarter" | "eighth" | "sixteenth";

export class Rest {
    xRel: number;
    restType: RestType;

    constructor(xRel: number, restType: RestType) {
        this.xRel = xRel;
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