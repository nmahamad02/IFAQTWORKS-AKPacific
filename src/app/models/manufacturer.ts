export interface Manufacturer {
    MANUFACTURER_ID: number;
    MANUFACTURER_CD: string;
    MANUFACTURER_NAME: string;
    PHONE1: string;
    isEdit: boolean;
}
    
export const ManufacturerColumns = [
      {
        key: 'MANUFACTURER_CD',
        type: 'text',
        label: 'Manufacturer Code',
        required: true,
      },
      {
        key: 'MANUFACTURER_NAME',
        type: 'text',
        label: 'Manufacturer Name',
      },
      {
          key: 'PHONE1',
          type: 'text',
          label: 'Mobile Number',
      },
      {
        key: 'isEdit',
        type: 'isEdit',
        label: '',
      },
  ];