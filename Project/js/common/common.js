/** *************************8
 * Formater Class
 * Created by ntminh
 * Date:8/7/2021
 */
class Formater{
    static formatGenderToServer(value){
        if(value == "Nam"){
            return 1;
        }else if(value == "Nữ"){
            return 2;
        }else if(value == "Khác") return 3;
        else return null;
    }
    static formatMoneyToServer(value){
        if(value){
            return value.toString().replaceAll('.','');
        }
        else return '';
    }
    static formatDateToClient(value){
        let date = new Date(value);
        let newDate = date.getDate();
        let newMonth= date.getMonth() + 1;
        let newYear = date.getFullYear();
        newDate = newDate < 10 ? "0" + newDate : newDate;
        newMonth = newMonth < 10 ? "0" + newMonth : newMonth;
        return '' + newDate + '/' + newMonth + '/' + newYear;    
    }
    static formatMoneyToClient(value){
        if(value){
            return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        }else return '';    
    }
    static formatGenderToClient(value){
        if(value==1){
            return "Nam";
        }else if(value == 2){
            return "Nữ";
        }else if(value == 3) "Khac";
        else return null;
    }
    static formatDateToInput(value){
        let date = new Date(value);
        let newDate = date.getDate();
        let newMonth= date.getMonth() + 1;
        let newYear = date.getFullYear();
        newDate = newDate < 10 ? "0" + newDate : newDate;
        newMonth = newMonth < 10 ? "0" + newMonth : newMonth;
        return '' + newYear + '-' + newMonth + '-' + newDate;   
    }
}

/**
 * Create new obj
 * Created by ntminh
 * Date: 9/7/2021
 */
class Dialog{
    static addDialog(){
        let newEmployee = {};
        let flag = true;
        //search required data
        $('.dialog-container').find('input[required]').each(function (){
            if ($(this).attr('validate') == 'false') {
                $('.dialog-container').find('input[required]').trigger('blur');
                $('.dialog-container').find('input[required]')[0].focus();
                flag = false;
                return null;
               }
           });
               //search another input
            if(!flag){
                return null;
            }
            $('.dialog-container').find('input').each(function () {  
                   let value = $(this).val();
                   if(value){
                    if($(this).attr('fieldname') === "Salary"){
                        value = Formater.formatMoneyToServer(value);
                    }else if($(this).attr('fieldname') === "Gender"){
                        value = Formater.formatGenderToServer(value);
                    }else if($(this).attr('fieldname') === "FullName"){
                     let fullName = value.split(" ");
                     newEmployee['LastName'] = fullName[0];
                     newEmployee['FirstName'] = fullName[fullName.length -1];
                     }
                     newEmployee[$(this).attr('fieldname')] = value;
                   }
           });
       return newEmployee;
    }
    static editDialog(){
        let newEmployee = {};
        $('.dialog-container').find('input').each(function () {  
            let value = $(this).val();
            if(value){
             if($(this).attr('fieldname') === "Salary"){
                 value = Formater.formatMoneyToServer(value);
             }else if($(this).attr('fieldname') === "Gender"){
                 value = Formater.formatGenderToServer(value);
             }else if($(this).attr('fieldname') === "FullName"){
              let fullName = value.split(" ");
              newEmployee['LastName'] = fullName[0];
              newEmployee['FirstName'] = fullName[fullName.length -1];
              }
              newEmployee[$(this).attr('fieldname')] = value;
            }
        });
        return newEmployee;
    }
}