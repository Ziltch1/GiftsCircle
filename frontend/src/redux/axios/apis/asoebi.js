import api from '../axios';


const AddEventAsoebiApi = (data) => {
    return api.post('/asoebi/create', data);
}

const GetAsoebiItemsApi = () => {
    return api.get('/asoebiItem/Get/All');
}

export {GetAsoebiItemsApi};
