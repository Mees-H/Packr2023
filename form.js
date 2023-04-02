class Form {

    form;
    step;
    length;
    width;
    interval;
    type;
    spans;
    error;
    weather;

    constructor(weather) {
        this.weather = weather;
        this.form = document.getElementById("form");
        this.error = document.createElement("p");
        this.form.appendChild(this.error);
        this.error.id = "error";
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.step++;
            this.setOpacities(this.spans);
            this.setValues();
            this.validate();
            this.resetForm();
        });
        this.step = 1;
    }

    resetForm() {

        let formgroup = document.getElementsByClassName("form-group")
        if (formgroup.length != 0) {
            formgroup[0].remove();
        }
        switch(this.step) {
            case 1:
                this.createSizeForm();
            break;
            case 2:
                this.createArrivalForm();
            break;
            case 3:
                this.createTypeForm();
            break;
            case 4:
                this.createTruck();
                this.step = 1;
                this.createSizeForm();
            break;
        }
    }

    createSizeForm() {
        let formgroup = document.createElement("div");
        formgroup.className = "form-group ml-2 mt-2 mb-2 border border-dark rounded";
        formgroup.id = "size";
    
        formgroup = this.addTitle(formgroup);
        formgroup = this.addLength(formgroup);
        formgroup = this.addWidth(formgroup);
        formgroup = this.addButton(formgroup);
        formgroup = this.addSteps(formgroup);

        this.form.appendChild(formgroup);
    }

    createArrivalForm() {
        let formgroup = document.createElement("div");
        formgroup.className = "form-group ml-2 mt-2 mb-2 border border-dark rounded";
        formgroup.id = "arrival";
    
        formgroup = this.addTitle(formgroup);
        formgroup = this.addInterval(formgroup);
        formgroup = this.addButton(formgroup);
        formgroup = this.addSteps(formgroup);

        this.form.appendChild(formgroup);
    }

    createTypeForm() {
        let formgroup = document.createElement("div");
        formgroup.className = "form-group ml-2 mt-2 mb-2 border border-dark rounded";
        formgroup.id = "type";
    
        formgroup = this.addTitle(formgroup);
        formgroup = this.addTypes(formgroup);
        formgroup = this.addButton(formgroup);
        formgroup = this.addSteps(formgroup);

        this.form.appendChild(formgroup);
    }

    addTitle(formgroup) {
        let formTitle = document.createElement("h5");
        formTitle.textContent = "Create new truck";
        formgroup.appendChild(formTitle);
        return formgroup;
    }

    addLength(formgroup) {
        let label = document.createElement("label");
        label.setAttribute("for", "length");
        label.textContent = "Length";

        let input = document.createElement("input");
        input.setAttribute("type", "number");
        input.className = "form-control";
        input.id = "length";
        input.value = 5;
        input.setAttribute("placeholder", "Length...")

        formgroup.appendChild(label);
        formgroup.appendChild(input);

        return formgroup;
    }

    addWidth(formgroup) {
        let label = document.createElement("label");
        label.setAttribute("for", "width");
        label.textContent = "Width";
        label.className = "mt-2";

        let input = document.createElement("input");
        input.setAttribute("type", "number");
        input.className = "form-control";
        input.id = "width";
        input.value = 5;
        input.setAttribute("placeholder", "Width...")

        formgroup.appendChild(label);
        formgroup.appendChild(input);

        return formgroup;
    }

    addInterval(formgroup) {
        let label = document.createElement("label");
        label.setAttribute("for", "interval");
        label.textContent = "Interval";
        label.className = "mt-2";

        let input = document.createElement("input");
        input.setAttribute("type", "number");
        input.className = "form-control";
        input.id = "interval";
        input.value = 1;
        input.setAttribute("placeholder", "Interval...")

        formgroup.appendChild(label);
        formgroup.appendChild(input);

        return formgroup;
    }

    addTypes(formgroup) {
        let label = document.createElement("label");
        label.setAttribute("for", "selecttype");
        label.textContent = "Type";
        label.className = "mt-2";

        let input = document.createElement("select");
        input.className = "form-control";
        input.id = "selecttype";

        let option1 = document.createElement("option");
        let option2 = document.createElement("option");
        let option3 = document.createElement("option");
        let option4 = document.createElement("option");
        let option5 = document.createElement("option");

        option1.textContent = "Cold";
        option2.textContent = "Fragile";
        option3.textContent = "General";
        option4.textContent = "Pallets";
        option5.textContent = "Quick";

        option1.setAttribute("value", "Cold");

        input.appendChild(option1);
        input.appendChild(option2);
        input.appendChild(option3);
        input.appendChild(option4);
        input.appendChild(option5);

        formgroup.appendChild(label);
        formgroup.appendChild(input);

        return formgroup;
    }

    addButton(formgroup) {
        let button = document.createElement("button");
        let step = this.step;
        button.className = "btn btn-primary mt-2";
        button.textContent = "Next";
        button.id = "next";

        let spans = document.getElementsByClassName("step");
      
        formgroup.appendChild(button);
        return formgroup;
    }

    addSteps(formgroup) {
        let spans = [];
        let steps = document.createElement("div");
        steps.className = "steps";
        for (let index = 0; index < 3; index++) {
            let span = document.createElement("span");
            span.className = "step";
            spans[index] = span;

            steps.appendChild(span);
        }
        formgroup.appendChild(steps);
        spans[0].style.opacity = 1;
        this.spans = spans;
        this.setOpacities(spans);
        return formgroup;
    }

    setOpacities(spans) {
        for (let index = 0; index < 3; index++) {
            if (this.step == index + 1) {
                spans[index].style.opacity = 1;
            }
            else {
                spans[index].style.opacity = 0.5;
            }
        }
    }

    setValues() {
        if (document.getElementById("length") != null) {
            this.length = document.getElementById("length").value;
        }
        if (document.getElementById("width") != null) {
            this.width = document.getElementById("width").value;
        }
        if (document.getElementById("interval") != null) {
            this.interval = document.getElementById("interval").value;
        }
        if (document.getElementById("selecttype") != null) {
            this.type = document.getElementById("selecttype").value;
        }
    }

    createTruck() {
        let truck = new Truck(this.length, this.width, this.interval, this.type);
        truck.addTruck();
        this.weather.refreshAllCanCarDrive();
    }

    validate() {
        let form = document.getElementById("form");
        let error = document.getElementById("error");
        error.innerText = "";
        if ((this.width <= 0 || this.length <= 0) && this.step == 2) {
            error.innerText = "The length and width fields are required!";
            error.className = "text-danger";
            this.step--;
            
        }

        else if ((this.width > 10 || this.length > 10) && this.step == 2) {
            error.innerText = "The length or width of the truck cannot exceed 10!";
            error.className = "text-danger";
            this.step--;
        }

        if ((this.interval <= 0 || this.interval > 60) && this.step == 3) {
            error.innerText = "Please type in a number more than 0 and less than 60";
            error.className = "text-danger";
            this.step--;
            
        }
        
    }

}

