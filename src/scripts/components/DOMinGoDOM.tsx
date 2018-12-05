import * as React from "react";
import {css} from 'emotion'

interface defaultProps {
    defaultState: defaultState
}

interface defaultState {
    count: number;
}

const container = css({
    position: "fixed",
    width: "30%",
    height: "20%",
    top: "1%",
    right: "1%",
    textAlign: "center",
    backgroundColor: "#1e9cef",
    borderRadius: "10px",
    zIndex: 114514,
});

const mainPart = css({
    position: "fixed",
    height: "18%",
    width: "30%",
    top: "2%",
    backgroundColor: "#f1f1f1"
});

const innerText = css({
    fontSize: "1em",
    fontFamily: "sans-serif",
    textAlign: "center"
});

class DOMinGoDOM extends React.Component<defaultProps, defaultState> {
    constructor(props: defaultProps) {
        super(props);
        const {count} = props.defaultState;
        this.state = {
            count: count
        }
    }

    render() {
        return (
            <div className={container}>
                <div className={mainPart}>
                    <div className={innerText}>{`Counts is : ${this.state.count}`}</div>
                </div>
            </div>
        );
    }
}

export default DOMinGoDOM;