const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const birthdate = document.getElementById("birthdate");
const checkbox1 = document.getElementById("checkbox1");
const checkbox2 = document.getElementById("checkbox2");

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
    isValidDate(dateString);
    isOldEnough(dateString);
});

const sendData = (firstnameValue, sRate, Count) => {
    if(sRate === Count){
        swal("Hello " + firstnameValue , "You are Registered", "success");
        form.reset();
    }

}

const SuccessMsg = (firstnameValue) => {
    let inputContr = document.getElementsByClassName('input-control');
    var Count = inputContr.length - 1;
    for(var i = 0; i < inputContr.length; i++){
        if(inputContr[i].className === "input-control success"){
            var sRate = 0 + i;
            console.log(sRate);
            sendData(firstnameValue, sRate, Count);
        
    } else{
            return false;
        }
    }
}

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    inputControl.className = "input-control error";

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    inputControl.className = "input-control success";

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const birthdateValue = birthdate.value.trim();

    if(firstnameValue === '') {
        setError(firstname, 'Please enter your firstname');
    } else {
        setSuccess(firstname);
    }

    if(lastnameValue === '') {
        setError(lastname, 'Please enter your lastname');
    } else {
        setSuccess(lastname);
    }

    if(emailValue === '') {
        setError(email, 'Please enter you email');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Please enter a valid email address');
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Please enter your password');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character');
    } else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        setSuccess(password2);
    }

    if (birthdateValue === "") {
        setError(birthdate, "Please enter your birthdate");
  } else if (!isValidDate(birthdateValue)) {
        setError(birthdate, "Please enter a valid birthdate in MM/DD/YYYY format");
  } else if (!isOldEnough(birthdateValue)) {
        setError(birthdate, "You must be 18 years or older to sign up");
  } else {
        setSuccess(birthdate);
  }

    if (!checkbox1.checked) {
        setError(checkbox1,"Please check this field");
    } else {
        setSuccess(checkbox1);
    }

    if (!checkbox2.checked) {
        setError(checkbox2,"Please check this field");
    } else {
        setSuccess(checkbox2);
    } 
        SuccessMsg(firstnameValue);
    
};

const isValidDate = (dateString) => {
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    return false;
  }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
    return false;
  }
    const year = date.getFullYear();
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
    return false;
  }
     return true;
};

const isOldEnough = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        age--;
  }

    return age >= 18;
};
