$(document).ready(function() {
    new Employees('Employees');
    
})

class Employees extends Base{
    constructor(ApiName){
        super(ApiName);
    }
}
