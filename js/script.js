const genderMale = document.querySelector('#gender-male');
const genderFemale = document.querySelector('#gender-female');
const age = document.querySelector('#age');
const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const activities = document.querySelector('.radios-group');
const submitButton = document.querySelector('.form__submit-button');
const resetButton = document.querySelector('.form__reset-button');
const result = document.querySelector('.counter__result');
const caloriesNorm = result.querySelector('#calories-norm');
const caloriesMinimal = result.querySelector('#calories-minimal');
const caloriesMaximal = result.querySelector('#calories-maximal');
const weightFormula = (age, height, weight) => (10 * weight) + (6.25 * height) - (5 * age);
let activityCoefficient = 1.2;

age.addEventListener('input', () => { 
    currentState();
});
height.addEventListener('input', () => { 
    currentState();
});
weight.addEventListener('input', () => {
     currentState();
});

activities.addEventListener('change', (evt) => {
    switch (evt.target.id) {
        case 'activity-minimal':
            activityCoefficient = 1.2;
            break;
        case 'activity-low':
            activityCoefficient = 1.375;
            break;
        case 'activity-medium':
            activityCoefficient = 1.55;
            break;
        case 'activity-high':
            activityCoefficient = 1.725;
            break;
        case 'activity-maximal':
            activityCoefficient = 1.9;
            break;
    }
});

submitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const temp = genderMale.checked ? 5 : -161;
    const res = Math.ceil((weightFormula(age.value, height.value, weight.value) + temp) * activityCoefficient);
    result.classList.remove('counter__result--hidden');
    caloriesNorm.textContent = res;
    caloriesMinimal.textContent = Math.ceil(res - res * 0.15);
    caloriesMaximal.textContent = Math.ceil(res + res * 0.15);
});

resetButton.addEventListener('click', () => {
    genderMale.setAttribute('checked', true);
    genderFemale.removeAttribute('checked', true);
    age.value = '';
    height.value = '';
    weight.value = '';
    activities.querySelector('#activity-minimal').setAttribute('checked', 'true');
    activities.querySelector('#activity-low').removeAttribute('checked', 'true');
    activities.querySelector('#activity-medium').removeAttribute('checked', 'true');
    activities.querySelector('#activity-high').removeAttribute('checked', 'true');
    activities.querySelector('#activity-maximal').removeAttribute('checked', 'true');
    result.classList.add('counter__result--hidden');
    currentState();
});

function currentState() {
    if (age.value !== "" && height.value !== "" && weight.value !== "") {
        submitButton.removeAttribute('disabled', true);
    } else {
        submitButton.setAttribute('disabled', true);
    }
    if (age.value !== "" || height.value !== "" || weight.value !== "") {
        resetButton.removeAttribute('disabled', true);
    } else {
        resetButton.setAttribute('disabled', true);
    }
}
