export interface Category {
    CATEGORY_ID: string;
    CATEGORY_CD: string;
    CATEGORY_NAME: string;
    CATEGORY_DETAILS: string;
    isEdit: boolean;
  }
    
  export const CategoryColumns = [
      {
        key: 'CATEGORY_ID',
        type: 'text',
        label: 'Category ID',
        required: true,
      },
      {
        key: 'CATEGORY_CD',
        type: 'text',
        label: 'Code',
      },
      {
        key: 'CATEGORY_NAME',
        type: 'text',
        label: 'Name',
      },
      {
        key: 'CATEGORY_DETAILS',
        type: 'text',
        label: 'Description',
      },
      {
        key: 'isEdit',
        type: 'isEdit',
        label: '',
      },
  ];