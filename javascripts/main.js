/*jshint esversion: 6 */

const $ = require('jquery');
const custFact = require('./customerFactory');
const print = require('./DOMOutput');

console.log('"Script Check', "Hello?");

custFact.getCustomers()
    .then((data)=> {
        print.printToDom(data);
        });
  
$('#submit').on("click", () => {
    let newCustomer = {
        name: $('#cust-name').val(),
        age: $('#cust-age').val(),
        member_level: $('#member-level').val()
    };
    if (newCustomer.member_level !== null) {
    custFact.storeCustomer(newCustomer)
    .then(() => {
        return custFact.getCustomers();
    })
    .then((data) => {
        print.printToDom(data);    
    });
    } else if (newCustomer.member_level === null) {
        alert("Please Select Member Level");
    }
});

//Delete from database
$(document).on("click", ".delCustomer", function() {
    console.log("Delete Click", this.id);
    custFact.deleteCustomer(this.id)
    .then(() => {
        return custFact.getCustomers();
    })
    .then((data) => {
        print.printToDom(data);
    });
});

let currentId = '';
$(document).on("click", ".editCustomer", function() {
    console.log('EDIT EL', $(this).siblings().eq('0').text());
    currentId = $(this).siblings().eq('3').attr('id');
    console.log("Got ID?", currentId);
    $('#cust-name').val($(this).siblings().eq('0').text()); 
    $('#cust-age').val($(this).siblings().eq('1').text()); 
    $('#member-level').val($(this).siblings().eq('2').text()); 
    $('#display-cust').html('');
    $('#input-heading').text("Edit Customer Information").css({
        "background-color": "red",
        "display": "inline-block"
    });
    $('#submit').hide();
    $('#cust-form').append(`<button id="submit-edit">Submit Edit</button>`);
});

$(document).on("click", "#submit-edit", function(){
    let editCustomer = {
        name: $('#cust-name').val(),
        age: $('#cust-age').val(),
        member_level: $('#member-level').val()
    };
    console.log('EDIT INFO', currentId);
    custFact.editCustomer(editCustomer, currentId)
    .then(() => {
        $('#input-heading').text("Customer Input:").css({
            "background-color": "transparent",
            "display": "block"
        });
        $('#submit').show();
        $('#submit-edit').remove();
        $('#cust-name').val(''); 
        $('#cust-age').val(''); 
        $('#member-level').val('');
        return custFact.getCustomers();
       })
    .then((data) => {
        print.printToDom(data);
    });
       
});
