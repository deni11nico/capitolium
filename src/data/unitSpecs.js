/**
 * Room schedules taken from the cadastral surveys ("releveu apartament")
 * drawn by ing. Fitero Lucian, December 2025, one PDF per unit in imagini/.
 *
 * `area` is suprafata utila in square metres. `rooms` counts habitable rooms
 * (camere), matching how Romanian listings quote them.
 *
 * `schedule` lists only what counts toward the usable area, so the rows always
 * sum to `area`. `extra` holds what the survey records separately outside that
 * total, such as a terrace or a basement box, and is shown after the total.
 */

export const unitSpecs = {
  'ap-1': {
    rooms: 2,
    area: 65.7,
    landShare: '94/795',
    schedule: [
      { ro: 'Hol și bucătărie', en: 'Hall and kitchen', area: 19.4 },
      { ro: 'Baie', en: 'Bathroom', area: 7.4 },
      { ro: 'Cameră', en: 'Room', area: 20.6 },
      { ro: 'Cameră', en: 'Room', area: 18.3 },
    ],
  },

  'ap-2': {
    rooms: 2,
    area: 50.2,
    landShare: '135/795',
    schedule: [
      { ro: 'Hol și bucătărie', en: 'Hall and kitchen', area: 15.2 },
      { ro: 'Cameră', en: 'Room', area: 15.8 },
      { ro: 'Cameră', en: 'Room', area: 15.9 },
      { ro: 'Baie', en: 'Bathroom', area: 3.3 },
    ],
  },

  'ap-3': {
    rooms: 1,
    area: 32.6,
    landShare: '62/795',
    extra: { ro: 'Terasă', en: 'Terrace', area: 9.1 },
    schedule: [
      { ro: 'Hol', en: 'Hall', area: 1.8 },
      { ro: 'Bucătărie', en: 'Kitchen', area: 7.3 },
      { ro: 'Baie', en: 'Bathroom', area: 5.0 },
      { ro: 'Cămară', en: 'Pantry', area: 2.2 },
      { ro: 'Cameră', en: 'Room', area: 16.3 },
    ],
  },

  'ap-5': {
    rooms: 1,
    area: 23.1,
    landShare: '41/795',
    schedule: [
      { ro: 'Hol', en: 'Hall', area: 4.1 },
      { ro: 'Baie', en: 'Bathroom', area: 3.4 },
      { ro: 'Cameră', en: 'Room', area: 15.6 },
    ],
  },

  'ap-6': {
    rooms: 1,
    area: 22.5,
    landShare: '40/795',
    schedule: [
      { ro: 'Hol', en: 'Hall', area: 3.7 },
      { ro: 'Baie', en: 'Bathroom', area: 3.2 },
      { ro: 'Cameră', en: 'Room', area: 15.6 },
    ],
  },

  'ap-7': {
    rooms: 1,
    area: 34.0,
    landShare: '68/795',
    extra: { ro: 'Boxă la subsol', en: 'Basement box', area: 15.5 },
    schedule: [
      { ro: 'Hol și bucătărie', en: 'Hall and kitchen', area: 14.1 },
      { ro: 'Baie', en: 'Bathroom', area: 5.2 },
      { ro: 'Cameră', en: 'Room', area: 14.7 },
    ],
  },

  // The cellar has no survey of its own, so it carries no schedule.
  'ap-4': null,
}
