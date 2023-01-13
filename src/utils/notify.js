import {toast} from 'react-toastify';
function showSuccess(message){
    toast.success(message);
}
function showError(message){
    toast.error(message);
}
export const Notify = {
    showSuccess,
    showError
}