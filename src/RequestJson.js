export default function requestJson() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://through-walls.ru/myjson/", false);
    xhr.send();

    if (xhr.status == 200) {
        return xhr.response;
    }
    else {
        return null;
    }
}
