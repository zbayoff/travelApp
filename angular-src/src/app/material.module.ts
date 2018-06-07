import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDividerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDividerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatProgressSpinnerModule
    ]
})
export class MaterialModule {}
