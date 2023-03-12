class Form {

    form;
    step;
    length;
    width;
    spans;

    constructor() {
        this.form = document.getElementById("form");
        this.form.addEventListener("submit", function(event) {
          event.preventDefault();
        })
        this.step = 1;
    }

    resetForm() {

        switch(this.step) {
            case 1:
                this.createSizeForm();
            break;
            case 2:
                alert("test");
            break;
        }
    }

    createSizeForm() {
        let formgroup = document.createElement("div");
        formgroup.className = "form-group ml-2 mt-2 border border-dark rounded";
    
        formgroup = this.addLength(formgroup);
        formgroup = this.addWidth(formgroup);
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
        input.setAttribute("placeholder", "Width...")

        formgroup.appendChild(label);
        formgroup.appendChild(input);

        return formgroup;
    }

    addButton(formgroup) {
        let button = document.createElement("button");
        button.className = "btn btn-primary mt-2";
        button.textContent = "Next";
        button.id = "next";

        let spans = document.getElementsByClassName("step");
        button.onclick = () => {
            this.step = this.step + 1;
            for (let index = 0; index < 4; index++) {
                if (step == index + 1) {
                    spans[index].style.opacity = 1;
                }
                else {
                    spans[index].style.opacity = 0.5;
                }
            }
            this.length = document.getElementById("length").value;
            this.width = document.getElementById("width").value;
            this.resetForm();
        };
        formgroup.appendChild(button);
        return formgroup;
    }

    addSteps(formgroup) {
        let spans = [];
        for (let index = 0; index < 4; index++) {
            let span = document.createElement("span");
            span.className = "step";
            spans[index] = span;
            formgroup.appendChild(span);
        }
        spans[0].style.opacity = 1;
        this.spans = spans;
        
        return formgroup;
    }
}

