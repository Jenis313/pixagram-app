import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log('baseurl ',BASE_URL)
const http = axios.create({
    baseURL : BASE_URL,
    responseType: 'json',
    timeout: 20000,
    timeoutErrorMessage: 'Request Timeout'
})

// header's information here
const getHeaders = (isSecured = false) => {
    let options = {
        'Content-Type' : 'application/json'
    }
    if(isSecured){
        // If we want something to be accessed only if there's  valid token then we pass isSecured parameter as true whenever we call httpClient
        options['Authorization'] = localStorage.getItem('token')
    }
    return options;
}
// http requests configuration
const GET = (url, isSecured = false, params = {}) => {
    return http.get(url, {
        headers : getHeaders(isSecured),
        params
    })
}
const POST = (url, data, isSecured = false, params = {}) => {
    return http.post(url, data, {
        headers : getHeaders(isSecured),
        params
    })
}
const PUT = (url, data, isSecured = true, params = {}) => {
    return http.put(url, data, {
        headers : getHeaders(isSecured),
        params
    })
}
const PATCH = (url, data, isSecured = true, params = {}) => {
    return http.patch(url, data, {
        headers : getHeaders(isSecured),
        params
    })
}
const DELETE = (url, isSecured = false, params) => {
    return http.delete(url, {
        headers : getHeaders(isSecured),
        params
    })
}
const UPLOAD = (method, url, data = {}, files = []) => {
    return new Promise((resolve, reject) => {
        // for uploading files we are usin xmlhttprequest
        // we are sending value as form data
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        // append files in form data
        // This will work for both single and multiple files(it's like filling form)
        files.forEach(item => {
            formData.append('images', item, item.name)
        })
        // append textual data in formdata(it's like filling form)
        for(let key in data){
            formData.append(key, data[key])
        }
        xhr.onreadystatechange = () => {
            // console.log(xhr.readyState)
            if(xhr.readyState === 4){
                console.log('status--> ',xhr.status)
                if(xhr.status === 200){
                    resolve(xhr.response)
                }else{
                    reject(xhr.response)
                }
            }
        }
        xhr.open(method, `${BASE_URL}${url}?token=${localStorage.getItem('token')}`, true);
        xhr.send(formData);

    })
}

export const httpClient = {
    GET,
    POST,
    PUT,
    DELETE,
    UPLOAD,
    PATCH
}