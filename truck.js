class Truck {
    
    counter;
    length;
    width;
    interval;
    type;
    docks;
    docknumber;

    constructor(length, width, interval, type) {
        this.length = length;
        this.width = width;
        this.interval = interval;
        this.type = type;
        this.docks = document.getElementsByClassName("btn");
        for (let i = 0; i < this.docks.length; i++) {
           this.docks[i].addEventListener("click", this.changeTrucks);
        }
    }

    addTruck() {
        let trucks = document.getElementsByClassName("trucks");
        let truck = document.createElement("img"); 
        truck.src = "https://cdn-icons-png.flaticon.com/512/6643/6643396.png";
        truck.className = "truck";
        let count = document.getElementsByClassName("truck").length;
        truck.id = ++count;
        truck.onclick = () => {this.openTruck(this.width,this.length, truck.id)};
        this.docknumber = this.getDockNumber();
        
        let canTruckDrive = document.createElement("h5");
        canTruckDrive.textContent = "This truck can drive.";
        canTruckDrive.className = "can-truck-drive type-" + this.type;
        canTruckDrive.id = "cantruckdrive"+truck.id;
        trucks[this.docknumber].appendChild(canTruckDrive);

        trucks[this.docknumber].appendChild(truck);
    }

    changeTrucks() {
        this.trucks = document.getElementsByClassName("trucks");
        let docks = document.getElementsByClassName("button");
        setTimeout(() => {
            for (let i = 0; i < docks.length; i++) {
                if (docks[i].checked) {
                    this.trucks[i].style.visibility = 'visible'
                }
                else {
                    this.trucks[i].style.visibility = 'hidden'
                }
            }
        }, 10)
    }

    getDockNumber() {
        let docks = document.getElementsByClassName("button");
        for (let i = 0; i < docks.length; i++) {
            if (docks[i].checked) {
                return i;
            }
        }
    }

    openTruck(width, length, id) {
        let interior = null;

        if(document.getElementById("interior" + id) == null) {
            interior = document.createElement("div");
            interior.className = "interiorcontainer";
            interior.id = "interior" + id;

            let bigcontainer = document.getElementById("biginteriorcontainer");
            let text = document.createElement("h3");
            text.textContent = "Truck number " + id;
            text.className = "title";
            text.id = "title" + id;
            bigcontainer.appendChild(text);
            bigcontainer.appendChild(interior);

            let columns = "";

            interior.style.height = length * 25 + "px";
            interior.style.width = width * 25 + "px";

            for (let i = 0; i < width; i++) {
                columns += "auto ";
            }

            interior.style.gridTemplateColumns = columns;

            for (let i = 0; i < length*width; i++) {
                let grid = document.createElement("div");
                grid.className = "griditem droppable";
                grid.id = i+1;
                interior.appendChild(grid);
            }
        }
        interior = document.getElementById("interior" + id);
        let interiors = document.getElementsByClassName("interiorcontainer");

        Array.from(interiors).forEach(element => { 
            if (element == interior) {
                element.style.visibility = "visible"
            }
            else {
                element.style.visibility = "hidden"
            }
        });
        let text = document.getElementById("title" + id);
        let texts = document.getElementsByClassName("title");

        Array.from(texts).forEach(element => { 
            if (element == text) {
                element.style.visibility = "visible"
            }
            else {
                element.style.visibility = "hidden"
            }
        });

    }
}