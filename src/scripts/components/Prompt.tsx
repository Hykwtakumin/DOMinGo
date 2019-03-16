/** @jsx jsx */
import * as React from "react";
import {FC, useState, useRef, useEffect} from "react";
import {jsx, css} from '@emotion/core'
import {DOMinGoAction} from "../libs/DOMinGOTypes";
import {ButtonList} from "./ButtonList";
import {MenuList} from "./MenuList";

const mainPanel = css({
    zIndex: 11454,
    backgroundColor: "#bddfd2",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    position: "fixed",
    width: "15%",
    top: "1%",
    right: "1%",
    textAlign: "center",
    borderRadius: "5px"
});


export const Prompt: React.FC<{}> = ({}) => {
    return (
        <div css={mainPanel}>
            <ButtonList/>
            <MenuList/>
        </div>
    );
};