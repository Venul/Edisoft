function FormParamsObject(params) {
    this.params = params;
}

function getFullObjectImpl() {
    return JSON.stringify(this, null, 4);
}

function getObjectPropertyImpl(obj) {
    let result = this.params;
    let propArray = obj.split('.');
    if (propArray.length >= 0) {
        for (var i = 0; i < propArray.length; i++) {
            if (result === undefined) break;
            result = result[propArray[i]];
        }
    }
    return result === undefined ? null : result;
}

function setObjectPropertyImpl(propPath, value) {
    let result = this.params;
    let propArray = propPath.split('.');
    let propLen = propArray.length;
    for (let i = 0; i < propLen - 1; i++) {
        let elem = propArray[i];
        if (!result[elem]) {
            result[elem] = {};
        } else {
            if (typeof(result[elem]) == "string") {
                result[elem] = {};
            }
        }
        result = result[elem];
    }
    result[propArray[propLen - 1]] = value;
    return result[propArray[propLen - 1]];
}

function convertObjectToArrayImpl(obj) {
    let mainObj = params.getObjectProperty(obj);

    let newObj = {};
    let result = [];
    let keyObj = Object.keys(mainObj);
    let size = keyObj.length;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < mainObj[keyObj[i]].length; j++) {
            newObj[keyObj[j]] = mainObj[keyObj[j]][i];
        }
        result.push(newObj);
        newObj = {};
    }

    params.setObjectProperty(obj, result);

    return result === undefined ? null : result;
}

var params = new FormParamsObject({
    param1: 'test1',
    param2: {
        param21: 'test2',
        param22: {
            number: ["123", "456"],
            text: ["text1", "text2"],
        }
    }
});

params.getFullObject = getFullObjectImpl;
params.getObjectProperty = getObjectPropertyImpl;
params.setObjectProperty = setObjectPropertyImpl;
params.convertObjectToArray = convertObjectToArrayImpl;


// params.getObjectProperty('param2.param21');
// params.getObjectProperty('param1.param11.param33'); 
// params.setObjectProperty('param2.param21', 'new value');
// params.setObjectProperty('param1.param11.param33', 'new value2');
// params.getObjectProperty('param1.param11.param33'); 
// params.convertObjectToArray('param2.param22');
// params.getFullObject();