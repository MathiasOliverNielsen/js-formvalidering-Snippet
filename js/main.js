// regular expressions til email og ingen special tegn
const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
const noSpecialSignsRegex = new RegExp(/[!@$%^&*(),?":{}|<>]/);

// Global variabel vi kan bruge til at holde styr på om der er fejl (true/false)
let formErrors = false;

function submitForm(event) {
  // PreventDefault for ikke at refreshe siden
  event.preventDefault();

  // Kør clearErrors funktionen hver gang vi "submitter" for at fjerne tidligere fejl beskeder
  clearErrors();

  // Her henter vi alle felter for lettere at kunne arbejde med dem
  let formFields = event.target;
  let firstname = formFields.firstname;
  let lastname = formFields.lastname;
  let address = formFields.address;
  let zipcode = formFields.zipcode;
  let country = formFields.country;
  let email = formFields.email;
  let password = formFields.password;
  let passwordRepeat = formFields.passwordRepeat;

  // hvis fornavn er tomt eller der kun findes et tegn i fornavn så vis en fejl besked
  if (isValueEmpty(firstname)) {
    setErrorMessage(firstname, 'Fornavn skal udfyldes');
  } else if (isValueLengthLessThen(firstname, 2)) {
    setErrorMessage(firstname, 'Dit fornavn skal være mindst to tegn');
  }

  // hvis efternavn er tomt eller kun er på 1 tegn, så vis en fejl besked
  if (isValueEmpty(lastname)) {
    setErrorMessage(lastname, 'Efternavn skal udfyldes');
  } else if (isValueLengthLessThen(lastname, 2)) {
    setErrorMessage(lastname, 'Dit efternavn skal være mindst to tegn');
  }

  // hvis adresse er tomt, eller adressen kun er 1 tegn eller der findes specielkaraktere i adresse, så vis en fejl besked
  if (isValueEmpty(address)) {
    setErrorMessage(address, 'Adresse skal udfyldes');
  } else if (isValueLengthLessThen(address, 2)) {
    setErrorMessage(address, 'Addressen skal være mindst to tegn');
  } else if (noSpecialSignsRegex.test(address.value)) {
    setErrorMessage(address, 'Adressen kan ikke indeholde specialtegn');
  }

  // hvis postnummer er tomt eller det ikke er præcis 4 karakterer
  if (isValueEmpty(zipcode)) {
    setErrorMessage(zipcode, 'Postnummer skal udfyldes');
  } else if (!isValueLength(zipcode, 4)) {
    setErrorMessage(zipcode, 'Postnummer er ugyldigt - skal være fire tal');
  }

  // hvis country value er tom eller der findes specialtegn i country.value, så vis en fejl besked
  if (isValueEmpty(country)) {
    setErrorMessage(country, 'Land skal udfyldes');
  } else if (noSpecialSignsRegex.test(country.value)) {
    setErrorMessage(country, 'Land kan ikke indeholde specieltegn');
  }

  // hvis email value er tom eller ikke passer med email regex så vis en fejl besked
  if (isValueEmpty(email)) {
    setErrorMessage(email, 'Email skal udfyldes');
  } else if (!emailRegex.test(email.value)) {
    setErrorMessage(email, 'Den indtastede email er ikke gylding');
  }

  // hvis password er under 8 karakterer, så vis en fejl besked
  if (isValueLengthLessThen(password, 8)) {
    setErrorMessage(password, 'Dit password skal være mindst 8 karakterer langt');
  }

  // hvis password gentagelsen ikke er ens med det første password så vis en besked
  if (!isValuesSame(password, passwordRepeat)) {
    setErrorMessage(passwordRepeat, 'De to password er ikke ens');
  }

  // Hvis der ikke er nogle errors længere så vis en besked til brugeren om at formularen er sendt
  if (formErrors === false) {
    alert('Tak - din formular er nu afsendt');
  }
}

// Funktion til at tjekke om et felts værdi er tom, efter vi har "trimmet" den for white space (mellemrum)
function isValueEmpty(field) {
  if (field.value.trim() === '') {
    return true;
  } else return false;
}

// Funktion til at tjekke om en værdis længde er noget bestemt (length)
function isValueLength(field, length) {
  console.log('length', field.value.length);
  if (field.value.length === length) {
    return true;
  } else return false;
}

// Funktion til at tjekke om en værdis længde er mindre end "length" variablen
function isValueLengthLessThen(field, length) {
  if (field.value.length < length) {
    return true;
  } else return false;
}

// Funktion til at tjekke om to værdier er de samme
function isValuesSame(field1, field2) {
  if (field1.value === field2.value) {
    return true;
  } else return false;
}

// Funktion til at sætte fejlbeskeder under et bestemt element (targetSibling)
// message argumentet er selve den besked der skal vises til brugeren
function setErrorMessage(targetSibling, message) {
  let errorElement = document.createElement('b');
  errorElement.classList.add('error');
  errorElement.innerText = message;
  targetSibling.after(errorElement);
  formErrors = true;
}

// Funktion til at fjerne alle fejlbeskeder
// Finder alle elementer med .error classen og sletter dem i et for-loop
function clearErrors() {
  let errors = document.querySelectorAll('.error');
  errors.forEach((error) => error.remove());
  formErrors = false;
}
