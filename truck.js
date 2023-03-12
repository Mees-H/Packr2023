class Truck {
    
    length;
    width;
    interval;
    type;

    constructor(length, width, interval, type) {
        this.length = length;
        this.width = width;
        this.interval = interval;
        this.type = type;
    }

    addTruck() {
        let trucks = document.getElementById("trucks");

        let truck = document.createElement("img"); 
        truck.src = "https://cdn-icons-png.flaticon.com/512/6643/6643396.png";

        trucks.appendChild(truck);
    }
}