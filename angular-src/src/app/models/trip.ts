export class Trip {
    _id: number;
    destination: string;
    startdate: string;
    leavedate: string;
    image: Image;
    costs: Cost[];
    totalCost: number;
}

export class Cost {
    costLabel = '';
    costAmt = 0;
}

export class Image {
    url: string;
    user: string;
    userUrl: string;
}

