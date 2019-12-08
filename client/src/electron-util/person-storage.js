const { shell,remote } = window.require('electron');
const electronStorage = "userLocalStorage";

export const setPersonGlobal = (person) => {
 remote.getGlobal(electronStorage).person = person;
}

export const getPersonGlobal = () => {
 return remote.getGlobal(electronStorage).person;
}