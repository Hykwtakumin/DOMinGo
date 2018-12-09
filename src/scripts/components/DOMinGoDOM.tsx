import * as React from "react";
import {css} from 'emotion'
import {MouseDOM} from "./MouseDOM";

interface defaultProps {
    defaultState: defaultState
}

interface defaultState {
    count: number,
    mdLeft: number,
    mdRight: number,
    mdTop: number,
    mdBottom: number,
    mdWidth: number,
    mdHeight: number
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
        const {count, mdLeft, mdRight, mdTop, mdBottom, mdWidth, mdHeight} = props.defaultState;
        this.state = {
            count: count,
            mdLeft: mdLeft,
            mdRight: mdRight,
            mdTop: mdTop,
            mdBottom: mdBottom,
            mdWidth: mdWidth,
            mdHeight: mdHeight
        };
    }

    upDateMouseDOM = (event: MouseEvent) => {
        const mouseElm = window.document.elementFromPoint(event.clientX, event.clientY).getBoundingClientRect();
        console.dir(window.document.elementFromPoint(event.clientX, event.clientY));
        this.setState({
            mdLeft: mouseElm.left,
            mdRight: mouseElm.right,
            mdTop: mouseElm.top,
            mdBottom: mouseElm.bottom,
            mdWidth: mouseElm.width,
            mdHeight: mouseElm.height
        });
    };

    removeMouseDOM = (event: MouseEvent) => {

    };

    componentWillMount() {
        window.document.addEventListener("mousemove", this.upDateMouseDOM);
    }


    handleMouseMove = (event) => {
        const mouseDom = window.document.elementFromPoint(event.x, event.y);
        console.dir(mouseDom);
    };

    componentWillUnmount() {
        window.document.removeEventListener("mousemove", this.upDateMouseDOM)
    };

    render() {
        return (
            <div>
                <div className={container}>
                    <div className={mainPart}>
                        <div className={innerText}>{`Counts is : ${this.state.count}`}</div>
                    </div>
                </div>
                <MouseDOM
                    mdLeft={this.state.mdLeft}
                    mdTop={this.state.mdTop}
                    mdWidth={this.state.mdWidth}
                    mdHeight={this.state.mdHeight}
                />
            </div>
        );
    }
}

export default DOMinGoDOM;