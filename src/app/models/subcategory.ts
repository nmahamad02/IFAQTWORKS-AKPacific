export interface Subcategory {
  SUBCATEGORY_ID: number;
  SUBCATEGORY_CD: string;
  SUBCATEGORY_NAME: string;
  SUBCATEGORY_DESCRIPTION: string;
  CATEGORY_ID: string;
  isEdit: boolean;
}
  
export const SubcategoryColumns = [
    {
      key: 'SUBCATEGORY_ID',
      type: 'text',
      label: 'Subcategory ID',
      required: true,
    },
    {
      key: 'SUBCATEGORY_CD',
      type: 'text',
      label: 'Code',
    },
    {
      key: 'SUBCATEGORY_NAME',
      type: 'text',
      label: 'Name',
    },
    {
      key: 'SUBCATEGORY_DESCRIPTION',
      type: 'text',
      label: 'Description',
    },
    {
      key: 'CATEGORY_ID',
      type: 'select',
      label: 'Description',
    },
    {
      key: 'isEdit',
      type: 'isEdit',
      label: '',
    },
];