import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../entities/Note';
import { HydraTrainee } from '../../../hydra-client/entities/HydraTrainee';

@Pipe({
  name: 'noteByTraineeByWeek'
})
export class NoteByTraineeByWeekPipe implements PipeTransform {

  transform(value: Note[], trainee: HydraTrainee, week: number ): Note {

    const n = value.filter( (note) => {

        return (note.type === 'TRAINEE' && note.trainee != null &&
          note.trainee.traineeId === trainee.traineeId && Number(note.week) === Number(week));
      })[0];

      if (n != null) {
        return n;
      } else {
        return new Note();
      }

  }

}
