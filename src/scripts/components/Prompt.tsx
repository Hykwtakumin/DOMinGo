import * as React from "react";
import {FC, useState, useRef, useEffect} from "react";
import {jsx, css} from '@emotion/core'
import {DOMinGoAction} from "../libs/DOMinGOTypes";
import {ButtonList} from "./ButtonList";
import {MenuList} from "./MenuList";


export const Prompt: React.FC<{}> = ({}) => {
    return (
        <div className={"domingo-control-panel"}>
            <ButtonList/>
            <MenuList/>
        </div>
    );
};