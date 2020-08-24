export class Config {
   public static COUNTRY_LIST = [
    {label: 'United States of America', value: '+1'},
    {label: 'United Kingdoms', value: '+44'},
    {label: 'Nigeria', value: '+234'}
  ];

  public static CATEGORY_LIST = [
    {label: 'Love', value: 'Love'},
    {label: 'Romance', value: 'Romance'},
    {label: 'Goofy', value: 'Goofy'},
    {label: 'Humour', value: 'Humour'},
    {label: 'Crime', value: 'Crime'},
    {label: 'Fan Fiction', value: 'Fan Fiction'},
    {label: 'Adventure', value: 'Adventure'},
    {label: 'Fantasy', value: 'Fantasy'}
     ];

  public static PLAYERCONTROLS =  [
        {name: 'password', type: 'password', required:true, validations: {}, errors: {}, placeholder: 'Enter Your Password'},
        {name: 'playerName', type: 'text', required:true, validations: {}, errors: {}, placeholder: 'Full Name *'},
        {
          name: 'countryCode',
          type: 'select',
          options: Config.COUNTRY_LIST,
          required:true,
          validations: {},
          errors: {},
          placeholder: 'Country'
        },
        {
          name: 'phone',
          type: 'phone',
          required:true,
          validations: {
            pattern: /^[0-9]{5,20}$/
          },
          errors: {
            pattern: 'Please enter a valid phone number'
          },
          placeholder: 'Phone Number'
        }];

  public static STORYCONTROLS = [
  {name: 'storyTitle', type: 'text', required:true, validations: {}, errors: {}, placeholder: 'Title'},
  {name: 'Image',
  type: 'file',
  validations: {},
  errors: {},
  placeholder: 'Upload Story Image'},
  {name: 'category',
  type: 'checkbox-group',
  options: Config.CATEGORY_LIST,
  required:true,
  validations: {},
  errors: {}}
  ];

}
