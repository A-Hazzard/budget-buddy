export type paycheck = {
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