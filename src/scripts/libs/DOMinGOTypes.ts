export type ActionPair = {
    type: targetType,
    target: string,
    action: DOMinGoAction
};

export type reservedDOM = {
    type: targetType,
    target: string
}

export enum targetType {
    selector,
    cssClass
}

export type DOMinGoAction = {
    name: string,
    desc: string,
    class: string,
    style: string
}

export type CustomTheme = {}

export type AnonymusCustomTheme = {}