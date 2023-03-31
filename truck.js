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
        truck.onclick = () => {this.openTruck(this.width,this.length)};
        this.docknumber = this.getDockNumber();

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

    openTruck(width, length) {
        let interior = document.getElementById("interior");
        interior.innerHTML = "";

        let columns = "";

        interior.style.height = length * 25 + "px";

        for (let i = 0; i < width; i++) {
            columns += "auto ";
        }

        interior.style.gridTemplateColumns = columns;

        for (let i = 0; i < length*width; i++) {
            let grid = document.createElement("div");
            grid.className = "griditem droppable";
            interior.appendChild(grid);
        }
    }
}