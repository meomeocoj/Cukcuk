class Base{
    constructor(){
        this.loadData();
        this.initiateEvents();
    }

    initiateEvents(){
        //click events
        $('#btnAdd').click(function(){
            //display the add dialog;
            $('.dialog-container').show();
            $('#employee-id').focus();
        })
        //autofocus when show;
        //close the add dialog
        $('.close-btn').click(function(){
            $('.dialog-container').hide();
            $('.must-fill-input').removeClass('border-red');
        })
        $('#cancel').click(function(){
            $('.dialog-container').hide();
            $('.must-fill-input').removeClass('border-red');
        })
        //reload data
        $('#btnRefresh').click(function(){
            alert('1');
        })
        //save date
        $('#btnSave').click(function(){
            //validate data from clients
            //required data
        })
        //must fill label
        $('.must-fill').append(" (<span style='color:red;'>*</span>)");
        //must fill field
        $('.must-fill-input').on({
            blur:function(){
                let value = $(this).val();
                if(!value){
                    $(this).addClass('border-red');
                }else{
                    $(this).removeClass('border-red');
                }
            },
            keyup:function(){
                let value = $(this).val();
                if(!value){
                    $(this).removeClass('border-red');
                }
            }
        });
        //validate the identity number
        $('#idenity-number').on({
            keyup: function(){
               let value = $(this).val();
               if(value && !value.match(/^\d*$/)){
                    $(this).addClass('border-red');
               }else{
                   $(this).removeClass('border-red');
               }
            },
            blur: function(){
                let value = $(this).val();
                if(!value || !value.match(/^(\d{10}|\d{12})$/)){
                    console.log(value);
                    $(this).addClass('border-red');
                }
                else{
                    $(this).removeClass('border-red');
                }
            }
        });
        //validate the email
        $('#email').on({
            blur: function(){
                let value = $(this).val();
                if(!value || !value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                    $(this).addClass('border-red');
                }else{
                    $(this).removeClass('border-red');
                }
            }
        });
        $('#phone-number').on({
            
        })
        
    }
    /*Load data from database*/
    loadData(){
        $.ajax({
            url:"http://cukcuk.manhnv.net/v1/Employees",
            method:"GET"
        }).done((res) => {
            //fetch data
           let tableThs = $("table thead th");
           let tbody = $('table tbody');
           //bindin data
           $.each(res, (index,obj) => {
            let tr = $("<tr></tr>");
               $.each(tableThs, (i,o) =>{
                  let fieldName = $(o).attr('fieldname');
                  let td = $('<td></td>');
                  let value = obj[fieldName];
                  if(fieldName == "DateOfBirth"){
                      value = formatDate(value);
                  }else if(fieldName == "Salary"){
                      value = formatMoney(value);
                  }
                  td.append(value);
                  tr.append(td);                  
               })
              tbody.append(tr);
           })
        })
    }
}