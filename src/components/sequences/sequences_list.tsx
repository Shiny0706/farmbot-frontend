import * as React from "react";
import { selectSequence, addSequence } from "./sequence_actions";
import { SequenceReducerState } from "./interfaces";
import { Sequence } from "./interfaces";
import { AuthToken } from "../auth/auth_actions";

let buttonList = (dispatch: Function) => (seq: Sequence, index: number) => {
  let css = ["block-wrapper",
             "block",
             "full-width",
             "text-left",
             `${ seq.color || "purple" }-block`,
             "block-header"];
  let click = () => { dispatch(selectSequence(index)); };
  return <button key={ seq._id || index }
                 onClick={ click }
                 className={ css.join(" ") }>
    { seq.name + (seq.dirty ? "*" : "") }
    <i className="fa fa-pencil block-control" />
  </button>;
};

interface SequencesListProps {
  sequences: SequenceReducerState;
  dispatch: Function;
  auth: AuthToken;
}

export function SequencesList({sequences, dispatch}: SequencesListProps) {
    return( <div>
              <div className="widget-wrapper sequences-widget">
                <div className="row">
                  <div className="col-sm-12">
                    <button className="green button-like widget-control"
                            onClick={ () => dispatch(addSequence()) }>
                      Add
                    </button>
                    <div className="widget-header">
                      <h5>Sequences</h5>
                    </div>
                  </div>
                </div>
                <div className="widget-content no-bottom-padding">
                  <div className="row">
                    <div className="col-sm-12">
                      <div>
                        { sequences.all.map(buttonList(dispatch))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> );

  }
