import { Injectable, Inject } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UrlService {
  private context: string;

  /**
   * All urls associated with skills will come from this object
   */
  skills = {
    findAll: () => `${this.context}skills`,
    findAllActive: () => `${this.context}skills/active`,
    findById: (id: number) => `${this.context}skills/${id}`,
    save: () => `${this.context}skills`,
    update: () => `${this.context}skills`,
  };

  /**
   * Endpoints for batches
   */
  batches = {
    fetchAllByTrainer: (id: number) => `${this.context}batches/trainer/${id}`,
    fetchAll: () => `${this.context}batches`,
    save: () => `${this.context}batches`,
    update: () => `${this.context}batches`,
    delete: (batchId: number) => `${this.context}batches/${batchId}`,
  };

  /**
   * Endpoints for trainees
   */
  trainees = {
    findAllByBatch: (batchId: number) => `${this.context}trainees/batch/${batchId}`,
    findDroppedByBatch: (batchId: number) => `${this.context}trainees/batch/dropped/${batchId}`,
    save: () => `${this.context}trainees`,
    update: () => `${this.context}trainees`,
    delete: (traineeId: number) => `${this.context}trainees/${traineeId}`,
  };

  /**
   * Endpoints for trainers
   */
  trainers = {
    fetchByEmail: (email: string) => `${this.context}trainers/${email}`,
    fetchAll: () => `${this.context}trainers`,
    save: () => `${this.context}trainers`,
    update: () => `${this.context}trainers`,
    getTitles: () => `${this.context}trainers/titles`,
    getRoles: () => `${this.context}trainers/roles`,
  };

  constructor() {
    this.context = environment.hydraContext;
  }
}