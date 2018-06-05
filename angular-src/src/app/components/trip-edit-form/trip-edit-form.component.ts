import { Component, OnInit, Input, Output, OnChanges, ViewChild, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';

import { Trip, Cost, Image } from '../../models/trip';
import { TripService } from '../../service/trip.service';

@Component({
  selector: 'app-trip-edit-form',
  templateUrl: './trip-edit-form.component.html',
  styleUrls: ['./trip-edit-form.component.scss']
})
export class TripEditFormComponent implements OnInit, OnChanges {

  @Input() trip: Trip;
  @Input() costs: Cost;
  @Input() image: Image;
  tripEditForm: FormGroup;
  photo: any;

  @Output() tripSaveSubmit = new EventEmitter<any>();
  @ViewChild(FormGroupDirective) editForm;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService
  ) {

  }

  createForm() {
    this.tripEditForm = this.fb.group({
      destination: ['', Validators.required],
      startdate: '',
      leavedate: '',
      image: this.fb.group({
        url: [''],
        user: [''],
        userUrl: ['']
      }),
      costs: this.fb.array([]),
    });
  }

  get costsFormArray(): FormArray {
    return this.tripEditForm.get('costs') as FormArray;
  }

  addCost() {
    this.costsFormArray.push(this.fb.group({
      costLabel: ['', Validators.required],
      costAmt: [0, Validators.required]
    }));
  }

  removeCost(costID) {
    this.costsFormArray.removeAt(costID);
  }

  convertDates(date) {
    return date.substring(0, 10);
  }

  displayImg(photo) {
    console.log('display img photo: ');
    console.log(photo);

    if (Object.keys(photo).length === 0 && photo.constructor === Object) {
      this.photo = null;
      this.tripEditForm.patchValue({
        image: {
          url: '',
          user: '',
          userUrl: ''
        }
      });

    } else {
      this.photo = photo;
      // console.log('about to patch value');
      this.tripEditForm.patchValue({
        image: {
          url: photo.urls.regular,
          user: photo.user.name,
          userUrl: photo.user.links.html
        }
      });
    }
  }

  rebuildForm() {

    console.log(this.trip.image.url);

    this.tripEditForm.reset({
      destination: this.trip.destination,
      startdate: this.convertDates(this.trip.startdate),
      leavedate: this.convertDates(this.trip.leavedate),
      image: {
        url: this.trip.image.url,
        user: this.trip.image.user,
        userUrl: this.trip.image.userUrl
      }
    });

    // this.displayImg(this.trip.image);



    this.setCosts(this.trip.costs);

  }

  setCosts(costs: Cost[]) {
    const costFormGroup = costs.map((cost) => {
      return this.fb.group({
        costAmt: [cost.costAmt, Validators.required],
        costLabel: [cost.costLabel, Validators.required]
      });
    });
    const costsFormArray = this.fb.array(costFormGroup);
    this.tripEditForm.setControl('costs', costsFormArray);
  }

  saveTrip() {

    this.trip = this.prepareSaveTrip();

    this.tripService.putTrip(this.trip).subscribe(
      data => {
        this.tripSaveSubmit.emit(this.trip);
      },
      err => console.log(err)
    );
    this.rebuildForm();
  }

  prepareSaveTrip() {
    const formModel = this.tripEditForm.value;
    const costsDeepCopy: Cost[] = formModel.costs.map((cost: Cost) => {
      return Object.assign({}, cost);
    });

    const saveTrip: Trip = {
      _id: this.trip._id,
      destination: formModel.destination,
      startdate: formModel.startdate,
      leavedate: formModel.leavedate,
      image: formModel.image,
      totalCost: formModel.totalCost,
      costs: costsDeepCopy
    };
    return saveTrip;
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.createForm();
    this.rebuildForm();
  }


}
