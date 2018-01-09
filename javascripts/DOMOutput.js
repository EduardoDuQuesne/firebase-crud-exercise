/*jshint esversion: 6 */

const $ = require('jquery');

module.exports.printToDom = ((data)  => {
    $('#display-cust').html('');
    let customerKeys = Object.keys(data);
    customerKeys.forEach((id) => {
        data[id].id = id;
        $('#display-cust').append(
            `<div>
            <h3 class="name">${data[id].name}</h3>
            <h4 class="age">${data[id].age}</h4>
            <h4 class="member-level">${data[id].member_level}</h4>
            <button id="${data[id].id}" class="delCustomer">Delete</button>
            <button id="edit-${data[id].id}"class="editCustomer">Edit</button>
            </div>`
        );
    });
});