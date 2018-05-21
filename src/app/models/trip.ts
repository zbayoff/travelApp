export class Trip {
    _id: number;
    destination: string;
    startdate: string;
    leavedate: string;
    image: string;
    costs: Cost[];
    totalCost: number;
}

export class Cost {
    costLabel = '';
    costAmt = 0;
}

