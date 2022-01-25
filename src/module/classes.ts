import type { ChordInBar } from "./chordParser";

export class Stave {
    bars: Array<Bar>;
    timeSignatureNumer: number;
    timeSignatureDenom: number;
    keySignature: number;
    chords: Array<Array<ChordInBar>>;

    constructor(bars: Array<Bar>, timeSignatureNumer: number, timeSignatureDenom: number, keySignature: number, chords: Array<Array<ChordInBar>>) {
        this.bars = bars;
        this.timeSignatureNumer = timeSignatureNumer;
        this.timeSignatureDenom = timeSignatureDenom;
        this.keySignature = keySignature;
        this.chords = chords;
    }
}

export class Bar {
    noteHeads: Array<NoteHead>;
    stems: Array<Stem>;
    beams: Array<Beam>;
    rests: Array<Rest>;
    ties: Array<Tie>

    constructor(noteHeads: Array<NoteHead>, stems: Array<Stem>, beams: Array<Beam>, rests: Array<Rest>, ties: Array<Tie>) {
        this.noteHeads = noteHeads;
        this.stems = stems;
        this.beams = beams;
        this.rests = rests;
        this.ties = ties;
    }
}

export type NoteHeadType = "whole" | "half" | "quarter";

export class NoteHead {
    xRel: number;
    yRel: number;
    noteHeadType: NoteHeadType;
    dots: number;
    accidental: Accidental;

    constructor(xRel: number, yRel: number, noteHeadType: NoteHeadType, dots: number, accidental: Accidental) {
        this.xRel = xRel;
        this.yRel = yRel;
        this.noteHeadType = noteHeadType;
        this.dots = dots;
        this.accidental = accidental;
    }
}

export class Tie {
    xRelFrom: number;
    xRelTo: number;
    yRel: number;
    isUpward: boolean;

    constructor(xRelFrom: number, xRelTo: number, yRel: number, isUpward: boolean) {
        this.xRelFrom = xRelFrom;
        this.xRelTo = xRelTo;
        this.yRel = yRel;
        this.isUpward = isUpward;
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
    dots: number;

    constructor(xRel: number, restType: RestType, dots: number) {
        this.xRel = xRel;
        this.restType = restType;
        this.dots = dots;
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

    toYRel(): number {
        switch(this.symbol) {
            case "A":
                return -1 + 7 * (this.octave - 4);
            case "B":
                return 7 * (this.octave - 4);
            case "C":
                return -6 + 7 * (this.octave - 4);
            case "D":
                return -5 + 7 * (this.octave - 4);
            case "E":
                return -4 + 7 * (this.octave - 4);
            case "F":
                return -3 + 7 * (this.octave - 4);
            case "G":
                return -2 + 7 * (this.octave - 4);
        }
    }
}

export class Note {
    height: NoteHeight | null;
    lenNumer: number;
    lenDenom: number;
    withTie: boolean;

    constructor(height: NoteHeight | null, lenNumer: number, lenDenom: number, withTie: boolean) {
        this.height = height;
        this.lenNumer = lenNumer;
        this.lenDenom = lenDenom;
        this.withTie = withTie;
    }
}