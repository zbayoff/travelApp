export class Trip {
    id: number;
    destination: string;
    startdate: string;
    leavedate: string;
    image: string;
    urls: Url[];
    costs: Cost[];
}

export class Cost {
    label: string;
    cost: number;
}

export class Url {
    url: string;
}
