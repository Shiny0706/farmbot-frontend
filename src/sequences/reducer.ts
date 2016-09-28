import { assign } from "lodash";
import {
    Step,
    Sequence,
    UnplacedStep,
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
            name: "New Sequence",
            steps: [],
            dirty: true
        }
    ],
    current: 0
};

export let sequenceReducer = generateReducer<SequenceReducerState>(initialState)
    .add<{ step: UnplacedStep }>("PUSH_STEP", function (state, action) {
        let current_sequence = state
            .all[state.current] || populate(state);
        let { step } = action.payload;
        step.position = step.position || current_sequence.steps.length;

        // typing not working. Thanks TS.
        let stepp = step as Step;
        current_sequence.steps.push(stepp);
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
        let steps = state.all[state.current].steps || populate(state).steps;
        let index = action.payload.index;
        let step = steps[index];
        steps[index] = assign<{}, Step>(step, action.payload.step);
        state.all[state.current].dirty = true;
        return state;
    })
    .add<{ index: number }>("REMOVE_STEP", function (state, action) {
        let seq = state.all[state.current];
        let index = action.payload.index;
        seq.steps = _.without(seq.steps, seq.steps[index]);
        seq.steps = repositionSteps(seq.steps);
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

/** Transforms input array of steps into new step array where all elements have
    a position attirbute that is equal to their `index` in the array. */
function repositionSteps(steps: (Step | UnplacedStep)[]): Step[] {
    let transform = (step: Step, position: number): Step => {
        return assign<{}, Step>({}, step, { position });
    };
    return steps.map(transform);
}
