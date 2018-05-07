import { Trip } from './trip';

export const TRIPS: Trip[] = [
    {
        'id': 1,
        'destination': 'Madrid, Spain',
        'cost': 600,
        'startdate': 'May 15',
        'leavedate': 'May 20',
        'image': 'madrid.png',
        // 'travelCosts': [
        //     { 'plane': 60 },
        //     { 'car': 0 },
        //     { 'bus': 0 },
        //     { 'train': 0 },
        //     { 'boat': 0 },
        //     { 'other': 0 }
        // ],
        // 'lodgingCosts': [
        //     { 'hotel': 180 },
        //     { 'AirBnb': 30 },
        //     { 'other': 0 }
        // ],
        // 'miscCosts': [
        //     { 'food': 300 },
        //     { 'amusementPark': 20 },
        //     { 'other': 0 }
        // ]
    },
    {
        'id': 2,
        'destination': 'Geneva, Switzerland ',
        'cost': 1200,
        'startdate': 'June 15',
        'leavedate': 'June 20',
        'image': 'geneva.png'
    },
    {
        'id': 3,
        'destination': 'Rome, Italy ',
        'cost': 1600,
        'startdate': 'April 18',
        'leavedate': 'April 20',
        'image': 'rome.png'
    }
];
