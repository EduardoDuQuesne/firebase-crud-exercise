/*jshint esversion: 6 */

const $ = require('jquery');

let fbUrl = 'https://fir-lesson-b5ccc.firebaseio.com/';

module.exports.getCustomers = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${fbUrl}customers.json`
        }).done( (data) => {
            resolve(data);
        }).fail((error) => {
            reject(error);
        });
    });
}; 

module.exports.storeCustomer = (customer) => {
  return new Promise((resolve, reject) => {
      $.ajax({
          url: `${fbUrl}customers.json`,
          method: "POST",
          data: JSON.stringify(customer),
      }).done( (data) => {
          resolve(data);  
      }).fail((error) => {
          reject(error);
      });
  });  
};

module.exports.deleteCustomer = (id) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${fbUrl}customers/${id}.json`,
            method: "DELETE"
        }).done(data => {
            resolve(data);   
        }).fail((error) => {
            reject(error);
        });
    });
};

module.exports.editCustomer = (customer, id) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${fbUrl}customers/${id}.json`,
            method: "PATCH",
            data: JSON.stringify(customer)
        }).done( (data) => {
            resolve(data);
        }).fail((error) => {
            reject(error);
        });
    });
};