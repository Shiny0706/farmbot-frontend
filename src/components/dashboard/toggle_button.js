import React from 'react';

export class ToggleButton extends React.Component {
  caption() {
    var captions = {
      "0":     "no",
      "false": "no",
      "off":   "no",
      "1":     "yes",
      "true":  "yes",
      "on":    "yes",
    }

    return captions[String(this.props.toggleval)] || "---"
  }

  css() {
    var redCSS    = "button-like red";
    var greenCSS  = "button-like green";
    var yellowCSS = "button-like yellow";

    var cssClasses = {
      "0":     redCSS,
      "false": redCSS,
      "off":   redCSS,
      "1":     greenCSS,
      "true":  greenCSS,
      "on":    greenCSS
    }

    return cssClasses[String(this.props.toggleval)] || yellowCSS;
  }

  render() {
    return <button className={ this.css() }
                   onClick={ this.props.toggleAction }> { this.caption() }</button>
  }
}
