import api from "../axios";

const CreateFundraisingApi = data => {
    return api.post(`/fundRaising/create`, data);
};

const GetFundraisingApi = id => {
    return api.get(`/fundRaising/${id}`)
};

export {CreateFundraisingApi, GetFundraisingApi};