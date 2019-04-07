export type ActionPair = {
    target: string,
    action: DOMinGoAction
};

export type DOMinGoAction = {
    name: string,
    desc: string,
    class: string,
    style: string
}

export type CustomTheme = {
    hostName: string,
    isAnonymous: boolean,
    desc: string,
    actionPairList: ActionPair[]
}