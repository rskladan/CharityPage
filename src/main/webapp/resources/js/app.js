document.addEventListener("DOMContentLoaded", function () {

    /**
     * Form Select
     */
    class FormSelect {
        constructor($el) {
            this.$el = $el;
            this.options = [...$el.children];
            this.init();
        }

        init() {
            this.createElements();
            this.addEvents();
            this.$el.parentElement.removeChild(this.$el);
        }

        createElements() {
            // Input for value
            this.valueInput = document.createElement("input");
            this.valueInput.type = "text";
            this.valueInput.name = this.$el.name;

            // Dropdown container
            this.dropdown = document.createElement("div");
            this.dropdown.classList.add("dropdown");

            // List container
            this.ul = document.createElement("ul");

            // All list options
            this.options.forEach((el, i) => {
                const li = document.createElement("li");
                li.dataset.value = el.value;
                li.innerText = el.innerText;

                if (i === 0) {
                    // First clickable option
                    this.current = document.createElement("div");
                    this.current.innerText = el.innerText;
                    this.dropdown.appendChild(this.current);
                    this.valueInput.value = el.value;
                    li.classList.add("selected");
                }

                this.ul.appendChild(li);
            });

            this.dropdown.appendChild(this.ul);
            this.dropdown.appendChild(this.valueInput);
            this.$el.parentElement.appendChild(this.dropdown);
        }

        addEvents() {
            this.dropdown.addEventListener("click", e => {
                const target = e.target;
                this.dropdown.classList.toggle("selecting");

                // Save new value only when clicked on li
                if (target.tagName === "LI") {
                    this.valueInput.value = target.dataset.value;
                    this.current.innerText = target.innerText;
                }
            });
        }
    }

    document.querySelectorAll(".form-group--dropdown select").forEach(el => {
        new FormSelect(el);
    });

    /**
     * Hide elements when clicked on document
     */
    document.addEventListener("click", function (e) {
        const target = e.target;
        const tagName = target.tagName;

        if (target.classList.contains("dropdown")) return false;

        if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
            return false;
        }

        if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
            return false;
        }

        document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
            el.classList.remove("selecting");
        });
    });

    /**
     * Switching between form steps
     */
    class FormSteps {
        constructor(form) {
            this.$form = form;
            this.$next = form.querySelectorAll(".next-step");
            this.$prev = form.querySelectorAll(".prev-step");
            this.$step = form.querySelector(".form--steps-counter span");
            this.currentStep = 1;

            this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
            const $stepForms = form.querySelectorAll("form > div");
            this.slides = [...this.$stepInstructions, ...$stepForms];

            this.init();
        }

        /**
         * Init all methods
         */
        init() {
            this.events();
            this.updateForm();
        }

        /**
         * All events that are happening in form
         */
        events() {
            // Next step
            this.$next.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.preventDefault();
                    this.currentStep++;
                    this.updateForm();
                });
            });

            // Previous step
            this.$prev.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.preventDefault();
                    this.currentStep--;
                    this.updateForm();
                });
            });

            // Form submit
            this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));
        }

        /**
         * Update form front-end
         * Show next or previous section etc.
         */



        updateForm() {
            this.$step.innerText = this.currentStep;

            this.slides.forEach(slide => {
                slide.classList.remove("active");

                if (slide.dataset.step == this.currentStep) {
                    slide.classList.add("active");
                }
            });

            //TODO: Dodać komunikaty o błędach

            if (this.currentStep === 1) {
                var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
                var nextButton = document.getElementsByClassName("btn next-step")[0];

                if (checkboxes.length <= 0) {
                    nextButton.disabled = true;
                }
                document.body.addEventListener('change', function (e) {
                    let checkedCheckboxes = document.querySelectorAll('input[type=checkbox]:checked');
                    if (checkedCheckboxes.length <= 0) {
                        nextButton.disabled = true;
                    } else {
                        nextButton.disabled = false;
                    }
                })
            }

            if (this.currentStep === 2) {
                var quantityOfBags = document.getElementById("quantityOfBags");
                var nextButton = document.getElementsByClassName("btn next-step")[1];

                if (quantityOfBags.value === "") {
                    nextButton.disabled = true;
                }

                quantityOfBags.addEventListener("change", function (e) {
                    if (quantityOfBags.value === "" || quantityOfBags.value <= 0) {
                        nextButton.disabled = true;
                    } else {
                        nextButton.disabled = false;
                    }
                });
            }

            if (this.currentStep === 3) {
                var selectedInstitution = document.querySelector('input[type=radio]:checked');
                var nextButton = document.getElementsByClassName("btn next-step")[2];

                if (selectedInstitution === null) {
                    nextButton.disabled = true;
                } else {
                    nextButton.disabled = false;
                }

                document.body.addEventListener('change', function (e) {
                    nextButton.disabled = false;
                })
            }

            if (this.currentStep === 4) {
                var nextButton = document.getElementsByClassName("btn next-step")[3];
                var streetInput = document.getElementById("street");
                var cityInput = document.getElementById("city");
                var zipCodeInput = document.getElementById("zipCode");
                var pickUpDateInput = document.getElementById("pickUpDate");
                var pickUpTimeInput = document.getElementById("pickUpTime");

                var validate = false;
                nextButton.disabled = true;

                document.body.addEventListener("change", function (e) {
                    if (isFutureDate(pickUpDateInput.value)
                        && isProperTime(pickUpTimeInput.value)
                        && isZipCodeCorrect(zipCodeInput.value)
                        && isStreetCorrect(streetInput.value)
                        && isCityCorrect(cityInput.value)) {
                        validate = true;
                    }

                    if (validate === true) {
                        nextButton.disabled = false;
                    } else {
                        nextButton.disabled = true;
                    }
                })

                function isStreetCorrect(street) {
                    return street.length >= 3;
                }

                function isCityCorrect(city) {
                    return city.length >= 3;
                }

                function isZipCodeCorrect(zipCode) {
                    return /^\d{3}(-\d{2})?$/.test(zipCode);
                }

                function isProperTime(itime) {
                    itime = itime.split(":");
                    var hours = itime[0]
                    return (hours >= 8 && hours <= 20);
                }

                function isFutureDate(idate) {
                    var today = new Date().getTime(),
                        idate = idate.split("-");
                    idate = new Date(idate[0], idate[1] - 1, idate[2]).getTime();
                    return (today - idate) < 0;
                }
            }

            if (this.currentStep === 5) {
                let categories = [];
                let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
                let selectedInstitution = document.querySelector('input[type=radio]:checked').parentNode.children;
                let selectedInstitutionName = selectedInstitution[2].firstElementChild.innerHTML;

                for (var i = 0; i < checkboxes.length; i++) {
                    let categoryName = checkboxes[i].parentNode.children;
                    categories.push(categoryName[2].innerHTML);
                }

                document.querySelector("#quantity-result").innerHTML = "Worki: " + document.getElementById("quantityOfBags").value;
                document.querySelector("#category-result").innerHTML = "Z kategorii: " + categories.join(", ");
                document.querySelector("#institution-result").innerHTML = selectedInstitutionName;
                document.querySelector("#street-result").innerHTML = document.querySelector('#street').value;
                document.querySelector("#city-result").innerHTML = document.querySelector('#city').value;
                document.querySelector("#zipCode-result").innerHTML = document.querySelector('#zipCode').value;
                document.querySelector("#pickUpDate-result").innerHTML = document.querySelector('#pickUpDate').value;
                document.querySelector("#pickUpTime-result").innerHTML = document.querySelector('#pickUpTime').value;
                document.querySelector("#pickUpComment-result").innerHTML = document.querySelector('#pickUpComment').value;
            }


            this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 5;
            this.$step.parentElement.hidden = this.currentStep >= 5;

            this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 5;
            this.$step.parentElement.hidden = this.currentStep >= 5;

        }
    }

    const form = document.querySelector(".form--steps");
    if (form !== null) {
        new FormSteps(form);
    }
});
