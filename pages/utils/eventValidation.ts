import * as yup from 'yup';

interface Values {
  title: string;
  topic: string;
  description: string;
  extraInfo: string;
  city: string;
  address: string;
}

export const validationSchema: Values | string | any = yup.object().shape({
  title: yup
    .string()
    .min(5, 'Τουλάχιστον 5 χαρακτήρες (από 5 μέχρι μέχρι 35 χαρακτήρες!)')
    .max(35, 'Υπερβαίνει τους 35 χαρακτήρες (από 5 μέχρι μέχρι 35 χαρακτήρες!)')
    .required('Υποχρεωτικό πεδίο!'),
  description: yup
    .string()
    .min(10, 'Τουλάχιστον 10 χαρακτήρες (από 10 μέχρι μέχρι 5000 χαρακτήρες!)')
    .max(
      5000,
      'Υπερβαίνει τους 5000 χαρακτήρες (από 10 μέχρι μέχρι 5000 χαρακτήρες!)'
    )
    .required('Υποχρεωτικό πεδίο!'),
  topic: yup.string().required('Υποχρεωτικό πεδίο!'),
  city: yup.string().required('Υποχρεωτικό πεδίο!'),
  address: yup
    .string()
    .required('Υποχρεωτικό πεδίο!')
    .min(2, 'Τουλάχιστον 2 χαρακτήρες (από 2 μέχρι μέχρι 25 χαρακτήρες!)')
    .max(
      25,
      'Υπερβαίνει τους 25 χαρακτήρες (από 2 μέχρι μέχρι 25 χαρακτήρες!)'
    ),
  extraInfo: yup
    .string()
    .max(200, 'Υπερβαίνει τους 200 χαρακτήρες (μέχρι 200 χαρακτήρες!)'),
});
