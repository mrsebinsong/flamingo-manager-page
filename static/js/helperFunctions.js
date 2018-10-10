export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function setCookie(cname, cvalue, exdays){

  let d = new Date();

  d.setTime(d.getTime() + (exdays*24*60*60*1000));

  document.cookie = `${cname}=${cvalue};expires=${d.toUTCString()};`;
  console.log("saved Cookie: ", `${cname}=${cvalue}`);
}

export function expireCookie(cname){

  const expireCookie = new Date(0).toUTCString();

  document.cookie =`${cname}=; expires=${expireCookie}`;
}
