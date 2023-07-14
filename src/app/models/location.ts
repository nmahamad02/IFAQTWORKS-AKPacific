export interface Location {
    LOCATIONID: string;
    LOCATIONNAME: string;
    isEdit: boolean;
  }
    
  export const LocationColumns = [
      {
        key: 'LOCATIONID',
        type: 'text',
        label: 'Location ID',
        required: true,
      },
      {
        key: 'LOCATIONNAME',
        type: 'text',
        label: 'Name',
      },
      {
        key: 'isEdit',
        type: 'isEdit',
        label: '',
      },
  ];