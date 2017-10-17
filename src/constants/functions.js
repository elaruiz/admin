export const loadScript = (url) => {
    return new Promise((resolve,reject) => {
        let script = document.createElement('script');
        script.src = url;
        script.addEventListener('load', () => {
            resolve();
        });
        script.addEventListener('error', () => {
            reject();
        });
        document.body.appendChild(script);
    });
};

export const resolveFields = (obj, fields) => {
    let result = obj;
    fields.split('.').forEach(field => {
        if(result !== undefined) {
            result = result[field];
        }
    });
    return result;
};

export const hasError = (errorObject, field) => {
    if(errorObject !== null) {
        return errorObject.validation && errorObject.validation.keys.indexOf(field) !== -1;
    }
    return false;
};

export const changePageTitle = (title) => {
    const header = document.getElementById('main-header');
    const h1 = header.getElementsByTagName('h1');
    h1[0].innerText = title;
};