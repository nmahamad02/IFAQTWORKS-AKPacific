export interface Brand {
    BRAND_ID: number;
    BRAND_CD: string;
    BRAND_NAME: string;
    MANUFACTURER_CD: string;
    isEdit: boolean;
  }
    
  export const BrandColumns = [
      {
        key: 'BRAND_CD',
        type: 'text',
        label: 'Brand Code',
        required: true,
      },
      {
        key: 'BRAND_NAME',
        type: 'text',
        label: 'Brand Name',
      },
      {
          key: 'manufacturer_cd',
          type: 'select',
          label: 'Manufacturer Code',
      },
      {
        key: 'isEdit',
        type: 'isEdit',
        label: '',
      },
  ];