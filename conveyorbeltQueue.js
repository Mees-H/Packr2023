class ConveyorbeltQueue {

    packages;
    
    constructor() {
        this.packages = [];
        this.createConveyorbeltQueue();
    }

    addPackageToQueue(newPackage) {
        this.packages.push(newPackage);
        this.reloadQueNumber();
    }

    getPackageFromQueue() {
        if (this.getQueueLength() != 0){
            let firstPackage = this.packages[0];
            this.packages.shift()
            this.reloadQueNumber();
            return firstPackage;
        }
    }

    getQueueLength() {
        return this.packages.length;
    }

    reloadQueNumber() {
        let conveyorbeltQueueNumber = document.getElementById("conveyorbeltQueueNumber");
        conveyorbeltQueueNumber.textContent = this.getQueueLength();
    }

    createConveyorbeltQueue() {
        let form = document.getElementById("conveyerbeltform");

        let formgroup = document.createElement("div");
        formgroup.className = "form-group small-form-group ml-2 mt-2 mb-2 border border-dark rounded";
        formgroup.id = "size";

        let title = document.createElement("h5");
        title.textContent = "Packages in queue:";
        title.className = "centeralign"
        title.id = "conveyorbeltQueueTitle";
        formgroup.appendChild(title);

        let button = document.createElement("h1");
        button.textContent = this.getQueueLength();
        button.className = "centeralign"
        button.id = "conveyorbeltQueueNumber";
        formgroup.appendChild(button);

        // button.onclick = () => {
        //     this.addConveyorbelt();
        // };
        form.appendChild(formgroup);
    }

}