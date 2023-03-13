class Form {

    form;
    step;
    length;
    width;
    interval;
    type;
    spans;

    constructor() {
        this.form = document.getElementById("form");
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
        formgroup.className = "form-group ml-2 mt-2 border border-dark rounded";
        formgroup.id = "size";
    
        formgroup = this.addLength(formgroup);
        formgroup = this.addWidth(formgroup);
        formgroup = this.addButton(formgroup);
        formgroup = this.addSteps(formgroup);

        this.form.appendChild(formgroup);
    }

    createArrivalForm() {
        let formgroup = document.createElement("div");
        formgroup.className = "form-group ml-2 mt-2 border border-dark rounded";
        formgroup.id = "arrival";
    
        formgroup = this.addInterval(formgroup);
        formgroup = this.addButton(formgroup);
        formgroup = this.addSteps(formgroup);

        this.form.appendChild(formgroup);
    }

    createTypeForm() {
        let formgroup = document.createElement("div");
        formgroup.className = "form-group ml-2 mt-2 border border-dark rounded";
        formgroup.id = "type";
    
        formgroup = this.addTypes(formgroup);
        formgroup = this.addButton(formgroup);
        formgroup = this.addSteps(formgroup);

        this.form.appendChild(formgroup);
    }

    addLength(formgroup) {
        let label = document.createElement("label");
        label.setAttribute("for", "length");
        label.textContent = "Length";

        let input = document.createElement("input");
        input.setAttribute("type", "number");
        input.className = "form-control";
        input.id = "length";
        input.required = true;
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
        input.required = true;
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
        for (let index = 0; index < 3; index++) {
            let span = document.createElement("span");
            span.className = "step";
            spans[index] = span;
            formgroup.appendChild(span);
        }
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
    }

    validate() {
        let form = document.getElementById("form-group");
        if ((this.width < 10 || this.length < 10) && this.step == 2) {
            let error = document.createElement("p");
            error.innerText = "The length and width fields are required!";
            error.className = "text-danger";
            form.appendChild(error);
            alert("test");
            this.step--;
            
        }
        if (this.interval == "" && this.step == 3) {
            this.step--;
        }
    }
}

