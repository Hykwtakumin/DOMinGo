import * as React from "react";
import {useState} from "react";
import chromep from 'chrome-promise';
import {StyleSheet, css} from 'aphrodite'
//import {jsx, css} from '@emotion/core'

// const menuContainer = css({
//     display: "flex",
//     flexDirection: "row",
//     flexWrap: "nowrap",
//     textAlign: "center"
// });
//
// const menuButton = css({
//     display: "inline-block",
//     backGround: "#1d81ff",
//     border: "solid, 3px, #1d81ff",
//     color: "#ffffff",
//     margin: "1%",
//     borderRadius: "3px"
// });

export const MenuList: React.FC<{}> = () => {

    return (
        <div className={"domingo-sub-control-panel"}>
            <button className={"domingo-control-button"} value="戻す" onClick={() => {
            }}/>
            <button className={"domingo-control-button"} value="⇩導入" onClick={() => {
            }}/>
            <button className={"domingo-control-button"} value={"⇧共有"} onClick={() => {
            }}/>
            <button className={"domingo-control-button"} value={"設定"} onClick={() => {
            }}/>
        </div>
    );
};