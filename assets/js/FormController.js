class FormController {
    #apiEndpoint = "https://nominatim.openstreetmap.org/";
    #apiResponseLimit = "limit=1";
    #apiResponseFormat = "format=json";
    #apiResponseDetail = "addressdetails=1";

    #country = "country=nl";
    #housenumber = null;
    #postalcode = null;

    #xhrObject = null;

    #postalcodeElement = null;
    #housenumberElement = null;
    #responseElement = null;
    #checkElement = null;
    #submitElement = null;

    #validAddress = false;

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

        this.#postalcodeElement = document.querySelector(".js-postalcode");
        this.#housenumberElement = document.querySelector(".js-housenumber");
        this.#responseElement = document.querySelector(".js-address");
        this.#checkElement = document.querySelector(".js-postal-check");
        this.#submitElement = document.querySelector(".js-submit-form");
    }

    prepareEvents()
    {
        console.log("FormController - prepareEvents");

        this.#checkElement.addEventListener('click', (event) => {
            this.handleCheckEvent(event);
        });

        this.#submitElement.addEventListener('submit', (event) => {
            this.handleSubmitEvent(event);
        });
    }

    handleCheckEvent(event)
    {
        console.log("FormController - handleCheckEvent");

        event.preventDefault();

        if (this.validatePostalcode() && this.validateHousenumber()) {
            this.#postalcode = this.#postalcodeElement.value;
            this.#housenumber = this.#housenumberElement.value;
        } else {
            this.displayError("Vul een correcte postcode en huisnummer in.");
        }

        this.sendRequest();
    }

    validatePostalcode()
    {
        // https://stackoverflow.com/a/17898538
        const validRegex = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;

        if (validRegex.test(postalcode.value) && housenumber.value) {
            return true;
        }

        return false;
    }

    validateHousenumber()
    {
        if (housenumber.value) {
            return true;
        }

        return false;
    }

    sendRequest()
    {
        const url = this.#apiEndpoint
            + "?"
            + "postalcode="
            + this.#postalcode
            + "&"
            + "street="
            + this.#housenumber
            + "&"
            + this.#country
            + "&"
            + this.#apiResponseFormat
            + "&"
            + this.#apiResponseLimit
            + "&"
            + this.#apiResponseDetail
        ;

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

        console.log("FormController - handleResponse jsonResponse", jsonResponse);

        if (jsonResponse.length) {
            const address = jsonResponse[0].address.city + " " + jsonResponse[0].address.road;
            this.#responseElement.innerHTML = address;
            this.#validAddress = true;
        } else {
            this.#validAddress = false;
            this.displayError("Er ging iets mis met het ophalen van het adres, controleer de postcode en huisnummer en probeer het opnieuw.");
        }
    }

    handleSubmitEvent(event)
    {
        console.log("FormController - handleSubmitEvent");

        event.preventDefault();

        if (this.#validAddress) {
            console.log("got here");
        } else {
            this.displayError("Het adres moet nog gecontroleerd worden.");
        }
    }

    displayError(message)
    {
        this.#responseElement.innerHTML = message;
    }
}

// Vanilla JS document.ready() function
document.addEventListener('DOMContentLoaded', () => {
    new FormController();
});