window.onload = function () {

    var url = window.location;
    let searchParams = new URLSearchParams(url.search);

    alert(searchParams.get('id'));
}