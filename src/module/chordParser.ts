import { barPaddingLeftRatio, barPaddingRightRatio } from "../config/lengths";
import type { NoteSymbol, Accidental } from "./classes";
import { constructNoteSymbol, constructAccidental } from "./classes";

export class Chord {
    noteSymbol: NoteSymbol | null;
    accidental: Accidental | null;
    suffix1: string;
    suffix2: string;
    bassNoteSymbol: NoteSymbol | null;
    bassAccidental: Accidental | null;

    constructor(
        noteSymbol: NoteSymbol | null,
        accidental: Accidental | null,
        suffix1: string,
        suffix2: string,
        bassNoteSymbol: NoteSymbol | null,
        bassAccidental: Accidental | null
    ) {
        this.noteSymbol = noteSymbol;
        this.accidental = accidental;
        this.suffix1 = suffix1;
        this.suffix2 = suffix2;
        this.bassNoteSymbol = bassNoteSymbol;
        this.bassAccidental = bassAccidental;
    }
}

export type ChordPlaceHolder = Chord | "%" | "/" | "N.C.";

export function parseChord(s: string): ChordPlaceHolder | null {
    if (s == "%") {
        return "%";
    }
    if (s == "/") {
        return "/";
    }
    if (s == "N.C.") {
        return "N.C.";
    }
    if (
        s.match(
            /^[A-G](|b|bb|#|##)(|(_[^_\^\/]*))(|(\^[^_\^\/]*))(|(\/[A-G](|b|bb|#|##)))$/
        )
    ) {
        let vecSlash: string[] = s.split("/");
        let vecCaret: string[] = vecSlash[0].split("^");
        let vecUnderbar: string[] = vecCaret[0].split("_");
        let rootString: string = vecUnderbar[0];
        let noteSymbol: NoteSymbol | null = constructNoteSymbol(
            rootString.charAt(0)
        );
        let accidental: Accidental | null = constructAccidental(
            rootString.substring(1)
        );
        let suffix1: string = !!vecUnderbar[1] ? vecUnderbar[1] : "";
        let suffix2: string = !!vecCaret[1] ? vecCaret[1] : "";
        let bassNoteSymbol: NoteSymbol | null = !!vecSlash[1]
            ? constructNoteSymbol(vecSlash[1].charAt(0))
            : null;
        let bassAccidental: Accidental | null = !!vecSlash[1]
            ? constructAccidental(vecSlash[1].substring(1))
            : null;
        return new Chord(
            noteSymbol,
            accidental,
            suffix1,
            suffix2,
            bassNoteSymbol,
            bassAccidental
        );
    }
    if (s.match(/^\/[A-G](|b|bb|#|##)$/)) {
        let bassNoteSymbol: NoteSymbol | null = constructNoteSymbol(
            s.charAt(1)
        );
        let bassAccidental: Accidental | null = constructAccidental(
            s.substring(2)
        );
        return new Chord(null, null, "", "", bassNoteSymbol, bassAccidental);
    }
    return null;
}

export class ChordInBar {
    chordPlaceHolder: ChordPlaceHolder;
    xRel: number;

    constructor(chordPlaceHolder: ChordPlaceHolder, xRel: number) {
        this.chordPlaceHolder = chordPlaceHolder;
        this.xRel = xRel;
    }
}

export function parseChords(s: string): Array<ChordInBar> {
    let chordStrings: string[] = s.trim().split(/\s+/);
    let chordsRaw: Array<ChordPlaceHolder> = chordStrings
        .map(parseChord)
        .filter((x) => !!x);
    let n: number = chordsRaw.length;
    let calcXRel = (i: number) =>
        barPaddingLeftRatio +
        (1 - barPaddingLeftRatio - barPaddingRightRatio) * (i / n);
    return chordsRaw.map((x, i) => new ChordInBar(x, calcXRel(i)));
}
