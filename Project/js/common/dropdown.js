/*************************************
 * New method for dropdown-list
 * Created by ntminh
 * Date: 6/7/2021
*/
function dropdownHandler(dropdown){
    let items = dropdown.find('.item');
    let input = dropdown.find('input');
    let arrow = dropdown.find('.arrow');
    let i_x = dropdown.find('i')[0];
    let currentFocus = -1;
    //set the first is selected
    $(items[0]).addClass('item-active').find('i').css('visibility', 'visible');
    //arrow click
    arrow.click(function(e){
        currentFocus = -1;
        e.stopPropagation();
        $(this).parent().find('input').focus().val('');
        let dropdownList = $(this).parent().find('.dropdown-list');
        dropdownList.slideToggle(250,"linear").addClass('dropdown-list-active');
        $(this).toggleClass('arrow-click');
    })
    //handle each click
    items.each(function(){
        $(this).on({
            click:function(e) {
            e.stopPropagation();
            $(this).parent().parent().find('input').val($(this).text().trim());
            $(this).siblings().removeClass('item-active');
            $(this).siblings().find('i').css('visibility', 'hidden');
            $(this).addClass('item-active').find('i').css('visibility','visible');
            $(this).parent().slideToggle(250,"linear").parent().find('.arrow').toggleClass('arrow-click');
        },
    })
    })
    //input handler
    input.val($(items[0]).text().trim());
    input.on({
        click: function(){
            $(this).val('');
        },
        keyup: function(e){
            let inputVal = $(this).val().toString().toLowerCase();
            let items = $(this).parent().find('.item');
            let xBtn = $(this).parent().find('i')[0];
            if(inputVal){
                $(xBtn).css("visibility","visible");
                $.each(items, function(){
                    if($(this).find('span').text().toString().toLowerCase().indexOf(inputVal) > -1 ){
                        $(this).show();
                    }else{
                        $(this).hide();
                    }
                    
                })
                $(this).parent().find('.dropdown-list').slideDown(250,"linear");
                $(this).parent().find('.arrow').addClass('arrow-click');
            }else if(!inputVal){
                $(this).parent().find('.dropdown-list').slideUp(250,"linear");
                $(this).parent().find('.arrow').removeClass('arrow-click');
                $(xBtn).css("visibility","hidden");
            }
            items = items.filter(function(){
                return ($(this).css('display') != 'none');
            });
            
            if(e.keyCode == 38 && currentFocus  > 0){
                currentFocus--;
                $(items[currentFocus]).siblings().css("background-color","#fff");
                $(items[currentFocus]).css("background-color","#E9EBEE");
            }else if(e.keyCode == 40 && currentFocus < items.length - 1){
                currentFocus++;
                console.log(currentFocus);
                $(items[currentFocus]).siblings().css("background-color","#fff");
                $(items[currentFocus]).css("background-color","#E9EBEE");
            }else if(e.keyCode == 13){
                $(items[currentFocus]).trigger('click');
                currentFocus = -1;
            }
        }
    });
    //x_btn handler
    $(i_x).click(function(e){
        e.stopPropagation;
        $(this).css('visibility','hidden');
        $(this).parent().find('input').val('');
    })
        
    $(document).click(function(e){
        e.stopPropagation();
        if(!($(e.target).hasClass('dropdown-wrapper'))
            && !($(e.target).hasClass('department-name'))
            && !($(e.target).hasClass('.arrow'))){
            dropdown.find('.dropdown-list').slideUp(250,"linear");
            dropdown.find('.arrow').removeClass('arrow-click');
        }
    })
}
/**
 * Build Combobox
 * @param {*positionName} name 
 * @param {*host} url 
 * @param {*scopce} objScope 
 * Created by ntminh
 * Date:12/7/2021
 */
function createDropdownList(name,url, objScope){
    objScope = $('#department-filter');
    let dropdownList = objScope.find('.dropdown-list');
    let entityName = objScope.attr('entityName') + "Name";
    let data =  $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Positions',
        method:"GET",
    }).done((res) => {
        $.each(res, function(key, value){
         let item = $('<div class="item"></div>')
         let icon = $(' <i style="visibility:hidden"><img src="../Resource/icon/tick.png" alt=""></i>');
         let span = $('<span></span>')
         span.data('obj',value);
         span.text(span.data('obj')[entityName]);
         item.append(icon);
         item.append(span);
         dropdownList.append(item);
        })
        dropdownHandler(objScope);
    }).fail((err) => {
        console.log(err);
    })
}

createDropdownList();
dropdownHandler($('#dropdown-header')); 

// let dropdownHeader = new Dropdown($('#dropdown-header'));
