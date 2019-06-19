function FormParamsObject(params) {
    this.params = params;

    this.getFullObject = function() {
        return JSON.stringify(this.params, null, 4);
    }
    
    this.getObjectProperty = function(obj) {
        var result = this.params;
        var propArray = obj.split('.');
    
        if (propArray.length >= 0) {
            for (var i = 0; i < propArray.length; i++) {
                if (result === undefined) break;
                result = result[propArray[i]];
            }
        }
    
        return result === undefined ? null : result;
    }

    this.setObjectProperty = function(propPath, value) {
        var result = this.params;
        var propArray = propPath.split('.');
        var propLen = propArray.length;
    
        for (var i = 0; i < propLen - 1; i++) {
            var elem = propArray[i];
            if (!result[elem]) {
                result[elem] = {};
            } else {
                if (typeof(result[elem]) != "object") {
                    result[elem] = {};
                }
            }
            result = result[elem];
        }
        result[propArray[propLen - 1]] = value;
    
        return result[propArray[propLen - 1]];
    }

    this.convertObjectToArray = function(obj) {   
        var mainObj = this.getObjectProperty(obj);  
        var newObj = {};
        var result = [];
        var keyObj = Object.keys(mainObj);
        var size = Object.keys(mainObj).length;
        var maxLength = 0;
    
        for (var i = 0; i < size; i++) {
            if (maxLength < mainObj[keyObj[i]].length) maxLength = mainObj[keyObj[i]].length;
        }
    
        for (var i = 0; i < maxLength; i++) {
            for (var j = 0; j < maxLength; j++) {    
                if (!keyObj[j] || !mainObj[keyObj[j]][i]) continue;
                newObj[keyObj[j]] = mainObj[keyObj[j]][i];
            }
            result.push(newObj);
            newObj = {};
        }
        
        this.setObjectProperty(obj, result);
        return result;
    }
}


var params = new FormParamsObject({
    param1: 'test1',
    param2: {
        param21: 'test2',
        param22: {
            number: ["123", "456", "22"],
            text: ["text1", "text2"]
        }
    }
});

// params.getFullObject();
// params.getObjectProperty('param2.param21');
// params.getObjectProperty('param1.param11.param33'); 
// params.setObjectProperty('param2.param21', 'new value');
// params.setObjectProperty('param1.param11.param33', 'new value2');
// params.getObjectProperty('param1.param11.param33'); 
// params.convertObjectToArray('param2.param22');
// params.getFullObject();

// params.setObjectProperty('param2.param21', 1);
// params.setObjectProperty('param2.param21.p2', 2);