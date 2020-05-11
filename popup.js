var storage = chrome.storage.sync;
storage.get('result', function(item){
    console.log(item.result);
    item.result.map((temp) => {
        console.log(document.getElementById(temp));
        if (document.getElementById(temp)) document.getElementById(temp).src = "./images/bad.png";
    });
    
});
// ищем скопированные элементы

let sberbankClasses = ["_1tzswgGe", "_3rWvwyFe", "_2YpAXkhm", "_2jYRUSBC", "_3FwtRK1V", "UI-NHC9k", "_3zCh991a", "_-72SKgRD", "_1AoZ3a5D", "_3fyB5gj8", "_34n43CT2", "_2iY04zqi", "_6VutorcE", "_171STrhe", "_33CNSDQE", "JcVwWDtr", "_1Q3vlXmG", "rKQElInY", "_32gKhx8T", "DSCsDQWt", "_3ZWZi7hQ", "_3LLRTp2C", "_1UekfrON", "_1NfhbhGY", "_3kABhQxG", "_1G73p3zO", "_3_ykDAGH", "_3pfnp2jP", "swOdzLv_", "_1pZGw_tQ", "jLbDM2_G", "_3c9cjtss", "_3PBiDTsK", "_33gA0uWg", "_2Ll58U3Y", "K74kZyZL", "_3P7O1cis", "jL5sEB2I", "_2lO29eDs", "jh1rCy6q", "AaTeQF6u", "_3baBo27J", "_1RAnAa0O", "b6wzedSd", "_2TYhtzIO", "_1FVrqGTF", "_2Eadga62", "_1Fs7PnCg", "_2f-8Fjfk", "_3M6Bk9EV", "nX9gAIKl", "_3Uwd_rqT", "_3xcEQ-pW", "HEJxvQWN", "_1DGRJL-u", "n2GUVQZf", "_292BKw0b", "F9DS0r3x", "_38FnNC-c", "_1fffb6OZ", "_3rKU3hjU", "_2LzLYztK", "_2IeoPjJ3", "_22EreIWz", "SoBsWKeh", "_3ehnRtyC", "_3831CO2h", "BSWGdEFo", "_2NGpUowM", "_3cL9Hyd3", "_2vHcLIu-", "yGdrq2N7", "_1nqNAWsE", "_37ySe07R", "_1EEpqhD3", "_1wcFdNsk", "_1JYt8F4s", "_3k63NLZS", "_26WmcDio", "Yjcj5aC1", "_2YkqWn0v", "_2-7-A6-d", "_3kKOmW3t", "_3dpePwtg", "_2MsShMDb", "UUk5z6Mi", "_3IsrhwWG", "_2FM8W5yE", "_3wC3_L_h", "_1VUqIpF5", "_2PMv3LOR", "SAtJVHUM"];
let classes = [];
let allImages = [];
const coppyElem = {
    isCoppy: false,
    count: 0,
};
let result = [];
const waight = [0, 0, 0, 0, 0];

function getClasses(elem) {
    for (let i=0; i<elem.length; i++) {
        if (elem[i].classList.length !== 0) {
            for (let j=0; j<elem[i].classList.length; j++) {
                if (!classes.includes(elem[i].classList[j])) {
                    classes.push(elem[i].classList[j]);
                    if (sberbankClasses.includes(elem[i].classList[j])) {
                        coppyElem.count++;
                    }
                }
            }
        };

        // если адреса прописаны в backgroung-image
        //console.log(elem[i].style.backgroundImage);
        if (elem[i].style.backgroundImage) {
            const url = elem[i].style.backgroundImage.replace('url("', '').replace('")','');
            if (!allImages.includes(url)) {
                allImages.push(url);
            }
        }

        if (elem[i].children.length !== 0) {
            getClasses(elem[i].children);
        }
    }
}
if (document.body) {
    const elem = document.body.children;
    getClasses(elem);
}

if (coppyElem.count !== 0) coppyElem.isCoppy = true;

if (coppyElem.isCoppy) {
    document.getElementById('coppy').src = "./images/bad.png";
    result.push('coppy');
}

//ицем поля для ввода данных
const hasForm = {
    isForm: false,
    isPhone: false,
    isLogin: false,
    isPassword: false,
}

function checkForms(forms) {
    for (let i=0; i<forms.length; i++) {
        if ((forms[i].innerHTML.toLowerCase().includes('логин')) || (forms[i].innerHTML.toLowerCase().includes('login'))) {
            hasForm.isLogin = true;
            hasForm.isForm = true;
        }

        if ((forms[i].innerHTML.toLowerCase().includes('пароль')) || (forms[i].innerHTML.toLowerCase().includes('password'))) {
            hasForm.isPassword = true;
            hasForm.isForm = true;
        }

        if ((forms[i].innerHTML.toLowerCase().includes('телефон')) || (forms[i].innerHTML.toLowerCase().includes('phone'))) {
            hasForm.isPhone = true;
            hasForm.isForm = true;
        }
    }
}
if (document.body) {
    const forms = document.body.getElementsByTagName('form');
    checkForms(forms);
}

if (!hasForm.isForm) {
    result.push('forms');
    storage.set({
        result:result
    });
}

//Проверяем дату регистрации домена
let url = window.location.href.replace('http://','').replace('https://','').split('/')[0];
console.log(url);
const getTime = async function(url){
    return await fetch('https://htmlweb.ru/analiz/api.php?whois&url=' + url + '&json')
    .then(response => response.json())
    .then((data) => {
        // const dateSplit = data.creation.split('.');
        // const dateReg = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
        // const correntDate = new Date();
        // const timeBefore = correntDate.getTime() - dateReg.getTime()
        // console.log(timeBefore);
        // if (timeBefore < 1000000) {
        //     result.push('date');
        //     storage.set({
        //         result:result
        //     });
        //     storage.set({
        //         url:url
        //     });
        // }        
    })
    .catch(console.log.bind(console));
}

if (url === 'chrome-extension:') {
    storage.get('url', function(item){
        url = item.url;
        // getTime(url);
    });
} else {
    // getTime(url);
}




// получаем изображения
const images = document.getElementsByTagName('img');
for (var i = 0; i < images.length; ++i)
{
    allImages.push(images[i].src);
}

// работа с изображениями
fetch('http://project/?imgs=' + allImages)
  .then(response => response.text())
  .then((data) => {
      console.log();
      if (data.includes('None')) {
        result.push('imgs');
        storage.set({
            result:result
        });
      }
  })
  .catch(console.log.bind(console));;