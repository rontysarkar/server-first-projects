import { TSchedule } from './offeredCourse.interface';

export const hastTimeConflict = (
  assignSchedules: TSchedule[],
  newAssignSchedule: TSchedule,
) => {
  for (const schedule of assignSchedules) {
    const existingStartTime = new Date(`1971-01-01T${schedule.startTime}:00`);
    const existingEndTime = new Date(`1971-01-01T${schedule.endTime}:00`);
    const newStartTime = new Date(
      `1971-01-01T${newAssignSchedule.startTime}:00`,
    );
    const newEndTime = new Date(`1971-01-01T${newAssignSchedule.endTime}:00`);
    // exist  10:00   12:00     // 12:00 14:00
    // new    09:00   11:00
    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }

  return false;
};
