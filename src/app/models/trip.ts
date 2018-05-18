export class Trip {
    id: number;
    destination: string;
    startdate: string;
    leavedate: string;
    image: string;
    costs: Cost[];
}

export class Cost {
    costLabel = '';
    costAmt = '';
}

