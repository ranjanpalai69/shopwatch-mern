

const getLoggedUserData = () => {
    const data = localStorage.getItem("loggedUser");
    if (data) {
        return JSON.parse(data);
    } else {
        return null;
    }
};
export default getLoggedUserData;
const loadUser = () => {
    const data = localStorage.getItem("registration");
    if (data) {
        return JSON.parse(data);
    } else {
        return null;
    }
};

export {loadUser};



