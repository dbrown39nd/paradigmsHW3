

function sendEmail(){
    let email = 'dbrown39@nd.edu'; 
    let subject = ' ...'; 
    let emailBody = 'Hi Declan! ...';
    window.location = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(emailBody);
}