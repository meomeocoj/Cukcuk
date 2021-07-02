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
        })
        $('.close-btn').click(function(){
            $('.dialog-container').hide();
        })
        $('#cancel').click(function(){
            $('.dialog-container').hide();
        })
        //reload data
        $('#btnRefresh').click(function(){
            alert('1');
        })
        //save date
        $('#btnSave').click(function(){
            //validate data from clients

        })
        $('.must-fill-input').blur(function(){
            var value = $(this).val();
            if(!value){
                $(this).addClass('border-red');
            }else{
                $(this).removeClass('border-red');
            }
        })
        
    }
    loadData(){
        
    }
}