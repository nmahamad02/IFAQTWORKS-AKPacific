export interface Salesman {
  SALESMAN_ID: number;
  SALESMAN_CD: string;
  NAME: string;
  MOBILE: string;
  EMAIL_ID: string;
  isEdit: boolean;
}
  
export const SalesmanColumns = [
    {
      key: 'SALESMAN_CD',
      type: 'text',
      label: 'Salesman Code',
      required: true,
    },
    {
      key: 'NAME',
      type: 'text',
      label: 'Salesman Name',
    },
    {
        key: 'MOBILE',
        type: 'text',
        label: 'Mobile Number',
    },
    {
      key: 'EMAIL_ID',
      type: 'email',
      label: 'Email',
      required: true,
      pattern: '.+@.+',
    },
    
    {
      key: 'isEdit',
      type: 'isEdit',
      label: '',
    },
];