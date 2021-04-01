import * as Yup from 'yup';

export const AddProductSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
    store: Yup.string()
        .required('Required'),
    price: Yup.number().min(1)
        .required('Required'),
    deliveryEstimationDate: Yup.string().required('Required'),
});
