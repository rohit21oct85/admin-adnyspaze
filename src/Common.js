import {
    elements
}
    from './Cons';
import axios from 'axios'
const CommonService = {
    getHttp,
    postHttp,
    deleteHttp,
    putHttp,
    getQueryParamFromUrl
}
var api_url = elements.API_ENDPOINT;
const headers = {
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + localStorage.getItem("token")
}
function getHttp(dataUrl, Param) {
    return axios.get(api_url + dataUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("token")
        }, params: Param
    }).then(handleResponse)
}

function postHttp(dataUrl, data) {
    return axios.post(api_url + dataUrl, data, { headers: headers }).then(handleResponse)
}

function deleteHttp(dataUrl) {
    return axios.delete(api_url + dataUrl).then(handleResponse)
}

function putHttp(dataUrl, data) {
    return axios.put(api_url + dataUrl, data).then(handleResponse)
}

function handleResponse(response) {
    document.body.classList.add('hide-loader')
    if (response !== null || response !== undefined) {
        return response;
    } else {
        const error = "error occoured"
        return Promise.reject(error);
    }
}
function getQueryParamFromUrl(variable) {

    var query = window.location.search.substring(1);
    var vars = query.split("&");

    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");

        if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
}

export default CommonService;