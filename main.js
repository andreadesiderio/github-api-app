'use strict'

const baseUrl = "https://api.github.com/";

function fetchUrl(url){
fetch(url)
.then(response =>{
    if (response.ok){
       return response.json()}
    throw new Error(response.statusText);   
})
.then(responseJson => displayResult(responseJson))
.catch(error => displayErrorMessage(error.message)) 
}

function displayResult(responseJson){
    console.log(responseJson);
    for (let i = 0; i < responseJson.length; i++){
        let repo = responseJson[i];
        let result = `<li><h2>${repo.name}</h2><p><a href="${repo.html_url}" target="_blank">${repo.html_url}</a></p></li>`;
        $('.js-result').append(result);
    }
}

 function displayErrorMessage(message){
$('.js-errorMessageContainer').html(`<p>Error message: ${message}</p>`);
 }

function convertUrl(val){
    let endpoint = `users/${val}/repos`
    let url = baseUrl + endpoint;
    fetchUrl(url);
}

function handleFormSubmit(){
    $('form').on('submit', function(event){
        event.preventDefault();
        $('.js-result').empty();
        $('.js-errorMessageContainer').empty();
        let val = $('input').val();
        convertUrl(val);
    } )
}



$(function handleLoad(){
    handleFormSubmit();
})