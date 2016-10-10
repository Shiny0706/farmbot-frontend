import {
    Step,
    Sequence,
    SequenceReducerState
} from "./interfaces";
import {
    nullSequence,
    EditCurrentSequence
} from "./actions";
import { generateReducer } from "../generate_reducer";

/** Adds an empty sequence to the front of the list. */
function populate(state: SequenceReducerState): Sequence {
    // This worries me. What if #current and #all get out of sync?
    let current_sequence = nullSequence();
    state.all.unshift(current_sequence);
    state.current = 0;
    return current_sequence;
}

const initialState: SequenceReducerState = {
    all: [
        {
            color: "red",
            kind: "sequence",
            args: {},
            name: "New Sequence",
            body: [],
            dirty: true
        }
    ],
    current: 0
};

export let sequenceReducer = generateReducer<SequenceReducerState>(initialState)
    .add<{index: number, comment: string}>("ADD_COMMENT", function(s, a) {
        let seq = s.all[s.current];
        seq.dirty = true;
        seq.body[a.payload.index].comment = a.payload.comment;
        return s;
    })
    .add<{ step: Step }>("PUSH_STEP", function (state, action) {
        let current_sequence = state
            .all[state.current] || populate(state);
        let { step } = action.payload;
        // typing not working. Thanks TS.
        let stepp = step as Step;
        current_sequence.body.push(stepp);
        current_sequence.dirty = true;
        return state;
    })
    .add<void>("ADD_SEQUENCE", function (state, action) {
        populate(state);
        return state;
    })
    .add<EditCurrentSequence>("EDIT_CURRENT_SEQUENCE", function (state, action) {
        let currentSequence = state.all[state.current] || populate(state);
        currentSequence.dirty = true;
        currentSequence.name = action.payload.name || currentSequence.name;
        currentSequence.color = action.payload.color || currentSequence.color;
        return state;
    })
    .add<{ step: Step, index: number }>("CHANGE_STEP", function (state, action) {

        /// DELETE THIS!?!?!?!?
        // let steps = state.all[state.current].body || populate(state).body;
        // let index = action.payload.index;
        // let current_step = steps[index];
        // steps[index] = assign<{}, Step>(current_step, action.payload.step);
        // state.all[state.current].dirty = true;
        let current = state.all[state.current].body[action.payload.index];
        _.assign(current, action.payload.step);
        return state;
    })
    .add<{ index: number }>("REMOVE_STEP", function (state, action) {
        let seq = state.all[state.current];
        let index = action.payload.index;
        seq.body = _.without(seq.body, seq.body[index]);
        seq.dirty = true;
        return state;
    })
    .add<Sequence>("SAVE_SEQUENCE_OK", function (state, action) {
        state.all[state.current] = action.payload;
        return state;
    })
    .add<Array<Sequence>>("FETCH_SEQUENCES_OK", function (state, action) {
        state.all = action.payload;
        return state;
    })
    .add<number>("SELECT_SEQUENCE", function (state, action) {
        let inx = action.payload;
        if (state.all[inx]) { state.current = inx; }
        return state;
    })
    .add<Sequence>("DELETE_SEQUENCE_OK", function (state, action) {
        let found = _.find(state.all, { name: action.payload.name });
        if (found) {
            _.pull(state.all, found);
            state.current = 0;
        } else {
            throw new Error("Tried to delete a sequence that doesn't exist. ");
        }
        return state;
    });
