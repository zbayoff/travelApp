import { Trip } from './trip';

export const TRIPS: any = [
    {
        'id': 1,
        'destination': 'Madrid, Spain',
        'cost': 600,
        'startdate': 'May 15',
        'leavedate': 'May 20',
        'image': 'madrid.png',
        'travelCosts': {
            'plane': 60,
            'car': 25,
            'bus': 45,
            'train': 0,
            'boat': 0,
            'other': 0
        },
        'lodgingCosts': [
            { 'hotel': 60 },
            { 'airBnb': 54 },
            { 'other': 0 },
        ],
        'miscCosts': [
            { 'fun': 60 },
            { 'flying': 54 },
            { 'other': 0 },
        ]
    },
    {
        'id': 2,
        'destination': 'Geneva, Switzerland ',
        'cost': 1200,
        'startdate': 'June 15',
        'leavedate': 'June 20',
        'image': 'geneva.png',
        'travelCosts': {
            'plane': 60,
            'car': 0,
            'bus': 0,
            'train': 0,
            'boat': 0,
            'other': 0
        },
        'lodgingCosts': [
            { 'hotel': 60 },
            { 'airBnb': 54 },
            { 'other': 0 },
        ],
        'miscCosts': [
            { 'fun': 60 },
            { 'flying': 54 },
            { 'other': 0 },
        ]
    },
    {
        'id': 3,
        'destination': 'Rome, Italy ',
        'cost': 1600,
        'startdate': 'April 18',
        'leavedate': 'April 20',
        'image': 'rome.png',
        'travelCosts': {
            'plane': 60,
            'car': 0,
            'bus': 0,
            'train': 0,
            'boat': 0,
            'other': 0
        },
        'lodgingCosts': [
            { 'hotel': 60 },
            { 'airBnb': 54 },
            { 'other': 0 },
        ],
        'miscCosts': [
            { 'fun': 60 },
            { 'flying': 54 },
            { 'other': 0 },
        ]
    }
];
