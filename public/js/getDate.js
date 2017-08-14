var getDate = () => {
    let dateC = new Date;
    let day = dateC.getDate(),
        month = dateC.getMonth() + 1,
        year = dateC.getFullYear(),
        hours = dateC.getHours(),
        minutes = dateC.getMinutes();

    if (month < 10) month = '0' + month;
    if (minutes < 10) minutes = '0' + minutes;

    return day + '/' + month + '/' + year + ', godz. ' + hours + ':' + minutes;
};

module.exports = {getDate};