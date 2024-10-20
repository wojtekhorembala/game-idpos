export interface IPeopleAttrResponse {
    name: string;
    mass: string;
    height: string;
}

export interface IStarshipsListItem {
    uid: string;
}

export interface IRequestByIdResponse<T> {
    message: string;
    result: {
        uid: string;
        properties: T;
    };
}

export interface IRequestStarshipsResponse {
    message: string;
    results: IStarshipsListItem[];
}
