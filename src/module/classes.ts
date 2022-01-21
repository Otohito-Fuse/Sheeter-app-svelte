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