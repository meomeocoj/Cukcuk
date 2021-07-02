$(document).ready(function() {
    new Employees;
    $('.must-fill').append(" (<span style='color:red;'>*</span>)");
})

class Employees extends Base{
    constructor(){
        super();
    }
}
