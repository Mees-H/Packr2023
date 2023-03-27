class Truck {
    
    length;
    width;
    interval;
    type;
    trucks;
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
        this.trucks = document.getElementsByClassName("trucks");
    }

    addTruck() {

        let img = document.createElement("img"); 
        img.src = "https://cdn-icons-png.flaticon.com/512/6643/6643396.png";

        this.docknumber = this.getDockNumber();

        this.trucks[this.docknumber].appendChild(img);
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
}