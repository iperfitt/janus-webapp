import { TestBed, inject, async } from '@angular/core/testing';

import { HydraTraineeService } from './hydra-trainee.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HydraTrainee } from '../../entities/HydraTrainee';
import { UrlService } from '../urls/url.service';
import { environment } from '../../../../environments/environment';

fdescribe('HydraTraineeService', () => {
  const trainee = new HydraTrainee();
  trainee.traineeId = 23;
  this.context = environment.hydraContext;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HydraTraineeService, UrlService],
      imports: [HttpClientModule,
        HttpClientTestingModule]
    });
  });

  it('should be created', inject([HydraTraineeService], (service: HydraTraineeService) => {
    expect(service).toBeTruthy();
  }));

  it(`should get all trainees with batch id 1 and status Dropped`,
    async(
      inject([HttpClient, HttpTestingController, HydraTraineeService],
        (http: HttpClient, backend: HttpTestingController, service: HydraTraineeService) => {
          service.findAllByBatchAndStatus(1, 'Dropped').subscribe();

          backend.expectOne({
            url: `${this.context}trainees/batch/1/status/Dropped`,
            method: 'GET'
          });
        })
    )
  );

  it(`should findAllByBatchAndStatus and check the observable`,
    async(
      inject([HttpClient, HttpTestingController, HydraTraineeService],
        (http: HttpClient, backend: HttpTestingController, service: HydraTraineeService) => {
          service.findAllByBatchAndStatus(1, 'Dropped').subscribe(next => {
            expect(next).toBeTruthy();
          });

          backend.expectOne(`${this.context}trainees/batch/1/status/Dropped`).flush({});
        })
    )
  );

  it(`should NOT fail when sending an unmatched request to findAllByBatchAndStatus`,
    async(
      inject([HttpClient, HttpTestingController, HydraTraineeService],
        (http: HttpClient, backend: HttpTestingController, service: HydraTraineeService) => {
          service.findAllByBatchAndStatus(1, 'Dropped').subscribe();

          backend.match(`${this.context}trainees`);
        })
    )
  );

  it(`should create a new trainee`,
    async(
      inject([HttpClient, HttpTestingController, HydraTraineeService],
        (http: HttpClient, backend: HttpTestingController, service: HydraTraineeService) => {
          service.create(trainee).subscribe();

          backend.expectOne({
            url: `${this.context}trainees`,
            method: 'POST'
          });
        })
    )
  );

  it(`should create a new trainee and check the observable`,
    async(
      inject([HttpClient, HttpTestingController, HydraTraineeService],
        (http: HttpClient, backend: HttpTestingController, service: HydraTraineeService) => {
          service.create(trainee).subscribe(next => {
            expect(next).toBeTruthy();
          });

          backend.expectOne(`${this.context}trainees`).flush({});
        })
    )
  );

  it(`should NOT fail when sending an unmatched request to create`,
    async(
      inject([HttpClient, HttpTestingController, HydraTraineeService],
        (http: HttpClient, backend: HttpTestingController, service: HydraTraineeService) => {
          service.create(trainee).subscribe();

          backend.match(`${this.context}trainees`);
        })
    )
  );

  it(`should update a trainee`,
    async(
      inject([HttpClient, HttpTestingController, HydraTraineeService],
        (http: HttpClient, backend: HttpTestingController, service: HydraTraineeService) => {
          service.update(trainee).subscribe();

          backend.expectOne({
            url: `${this.context}trainees`,
            method: 'PUT'
          });
        })
    )
  );

  it(`should update the trainee and check the observable`,
    async(
      inject([HttpClient, HttpTestingController, HydraTraineeService],
        (http: HttpClient, backend: HttpTestingController, service: HydraTraineeService) => {
          service.update(trainee).subscribe(next => {
            expect(next).toBeTruthy();
          });

          backend.expectOne(`${this.context}trainees`).flush({});
        })
    )
  );

  it(`should NOT fail when sending an unmatched request to update`,
    async(
      inject([HttpClient, HttpTestingController, HydraTraineeService],
        (http: HttpClient, backend: HttpTestingController, service: HydraTraineeService) => {
          service.update(trainee).subscribe();

          backend.match(`${this.context}trainees`);
        })
    )
  );

  it(`should delete a trainee`,
    async(
      inject([HttpClient, HttpTestingController, HydraTraineeService],
        (http: HttpClient, backend: HttpTestingController, service: HydraTraineeService) => {
          service.delete(23).subscribe();

          backend.expectOne({
            url: `${this.context}trainees/23`,
            method: 'DELETE'
          });
        })
    )
  );

  it(`should delete the trainee and check the observable`,
    async(
      inject([HttpClient, HttpTestingController, HydraTraineeService],
        (http: HttpClient, backend: HttpTestingController, service: HydraTraineeService) => {
          service.delete(trainee.traineeId).subscribe(next => {
            expect(next).toBeTruthy();
          });

          backend.expectOne(`${this.context}trainees/${trainee.traineeId}`).flush({});
        })
    )
  );

  it(`should NOT fail when sending an unmatched request to delete`,
    async(
      inject([HttpClient, HttpTestingController, HydraTraineeService],
        (http: HttpClient, backend: HttpTestingController, service: HydraTraineeService) => {
          service.delete(trainee.traineeId).subscribe();

          backend.match(`${this.context}trainees/${trainee.traineeId}`);
        })
    )
  );
});
