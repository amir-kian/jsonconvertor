
function OpenTextModal(){
    debugger;
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    myModal.show();

    }
    
function CloseAllActiveModals(){
    debugger;
    $('.modal').modal('hide');
    }
    function OpenPlaceholderModal(){
        debugger;
        var myModal = new bootstrap.Modal(document.getElementById('Placeholder'));
        myModal.show();
    
        }
function removeInput(index){
    debugger;
    $("#formula"+index+"").remove();

}
function callSelect2(){
    debugger;
        $('.select2').select2(); 
    }
