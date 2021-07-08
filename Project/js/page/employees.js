$(document).ready(function() {
    let abc = new Employees('Employees');
    // consle.log(abc.ApiName);
})

class Employees extends Base{
    constructor(ApiName){
        super(ApiName);
    }
}
