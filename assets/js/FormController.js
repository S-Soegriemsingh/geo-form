class FormController {
    #apiEndpoint = "https://nominatim.openstreetmap.org/";
    #apiResponseLimit = "limit=1";
    #apiResponseFormat = "format=json";

    #country = "country=nl";
    #street = "street=49";
    #postalcode = "postalcode=3076zb";

    #xhrObject = null;

    #checkElement = null;
    #submitElement = null;

    constructor()
    {
        console.log("FormController - constructor");

        this.prepareObjects();

        this.prepareElements();

        this.prepareEvents();
    }

    prepareObjects()
    {
        this.#xhrObject = new XMLHttpRequest();
        this.#xhrObject.onload = () => {
            this.handleResponse(this.#xhrObject.response);
        };
    }

    prepareElements()
    {
        console.log("FormController - prepareElements");

        this.#checkElement = document.querySelector(".js-postal-check");
        this.#submitElement = document.querySelector(".js-submit-form");
    }

    prepareEvents()
    {
        console.log("FormController - prepareEvents");

        this.#checkElement.addEventListener('click', (event) => {
            this.handleCheckEvent(event);
        });
    }

    handleCheckEvent(event)
    {
        console.log("FormController - handleCheckEvent");

        event.preventDefault();

        // const url = "https://nominatim.openstreetmap.org/?postalcode=3076zb&format=json&limit=1";
        // const url = "https://nominatim.openstreetmap.org/?postalcode=3076zb&country=nl&street=49&format=json&limit=1";
        const url = "https://nominatim.openstreetmap.org/?postalcode=3071jk&country=nl&format=json&addressdetails=1";
        // const url = this.#apiEndpoint
        //     + "?"
        //     + this.#postalcode
        //     + "&"
        //     + this.#street
        //     + "&"
        //     + this.#country
        //     + "&"
        //     + this.#apiResponseFormat
        //     + "&"
        //     + this.#apiResponseLimit
        // ;

        console.log("FormController - handleCheckEvent url", url);

        this.#xhrObject.open(
            "GET",
            url
        );

        this.#xhrObject.send();
    }

    handleResponse(response)
    {
        console.log("FormController - handleResponse");

        const jsonResponse = JSON.parse(response);

        console.log("FormController - json", jsonResponse);
    }
}

// Vanilla JS document.ready() function
document.addEventListener('DOMContentLoaded', () => {
    new FormController();
});