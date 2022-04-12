
export interface ITypePokemon {
    slot: number,
    type: {
        name: string,
        url: string
    }
}
export interface IStatsPokemon {
    base_stat: number,
    effort: number,
    stat: {
        name: string,
        url: string
    }
}
export interface IMovePokemon {
    move: {
        name: string,
        url: string
    }
}

export interface IDetallePokemon {
    weight: number
    height: number
    id: string
    name: string
    types: ITypePokemon[],
    moves: IMovePokemon[],
    stats: IStatsPokemon[]
}


export interface IPokemon {
    name: string,
    id: string,
    detalle?: IDetallePokemon
}

export interface IActionPokemonEntities {
    payload: IPokemon[]
}
export interface IActionPokemon {
    payload: IPokemon
}



export interface IResponsePokemon {
    count: number,
    next: null | string,
    previous: null | string,
    results:
    {
        name: string,
        url: string
    }[],
}