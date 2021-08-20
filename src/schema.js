import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup
        .string()
        .required()
        .min(2, 'name must be at least 2 characters'),
    size: yup
        .string()
        .oneOf(['s', 'm', 'l'], 'please choose a size'),
    pepperoni: yup
        .boolean(),
    sausage: yup
        .boolean(),
    bacon: yup
        .boolean(),
    pineapple: yup
        .boolean(),
    garlic: yup
        .boolean(),
    chicken: yup
        .boolean(),
    extraCheese: yup
        .boolean(),
    special: yup
        .string(),
    quantity: yup
        .number()
        .required()
        .min(1, 'invalid quantity')
})
export default schema;

