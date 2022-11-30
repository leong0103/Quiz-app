import axios from "axios";

export const BASE_URL = "https://localhost:7220/";

export const ENDPOINTS = {
    participant: "participant",
    question: "question"
}

export const createAPIEndpoint = endpoint => {
    let url = BASE_URL + "api/" + endpoint + "/";
    return {
        fetch: () => axios.get(url),
        post: newRecord => axios.post(url, newRecord),
    }
}