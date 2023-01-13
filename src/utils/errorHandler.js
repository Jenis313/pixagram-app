import { Notify } from "./notify";
export const ErrorHandler = (error) => {
    // Handle all of your application's error in this method
    let message = 'Something went wrong'; //Defalt error message
    let err = error && error.response; //If only there is err the error.response will be executed
    // if you just log error(from parameter) it will show javascript error not the error from server, to see server error(custom error message from server) you need to log--> error.response (and this is related with axios)
    // more --> // https://github.com/axios/axios/issues/960#issuecomment-309287911
    
    message = err && err.data && err.data.msg;
    Notify.showError(message);
}