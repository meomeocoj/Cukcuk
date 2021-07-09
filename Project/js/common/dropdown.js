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
    //arrow click
    arrow.click(function(e){
        e.stopPropagation();
        $(this).parent().find('.department-name').focus();
        $(this).parent().find('.dropdown-list').slideToggle(250,"linear").addClass('dropdown-list-active');
        $(this).toggleClass('arrow-click');
        return true;
    })
    //handle each click
    items.each(function(){
        $(this).click(function(e) {
            e.stopPropagation();
            $(this).parent().parent().find('input').val($(this).text().trim());
            $(this).siblings().removeClass('item-active');
            $(this).siblings().find('i').css('visibility', 'hidden');
            $(this).addClass('item-active').find('i').css('visibility','visible');
            $(this).parent().slideToggle(250,"linear").parent().find('.arrow').toggleClass('arrow-click');;
        })
    })

    //input handler
    input.val($(items[0]).text().trim());
    input.on({
        click: function(){
            $(this).val('');
        },
        keyup: function(e){
            let xBtn = $(this).parent().find('i')[0];
            $(xBtn).css("visibility","visible");
        }
    })
    //x_btn handler
    $(i_x).click(function(e){
        e.stopPropagation;
        $(this).css('visibility','hidden');
        $(this).parent().find('input').val('');
    })
    $(items[0]).addClass('item-active').find('i').css('visibility', 'visible');
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
dropdownHandler($('#dropdown-header')); 
dropdownHandler($('#department-filter'));
// let dropdownHeader = new Dropdown($('#dropdown-header'));
