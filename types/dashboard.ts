export type types = {
    name: string,
    planned: number,
    received: number
}
export type item = {
    name: string,
    planned: number,
    received: number
}

export type groups = {
    title: string,
    types: {
        name: string
        planned: number
        received: number
    }[],
}