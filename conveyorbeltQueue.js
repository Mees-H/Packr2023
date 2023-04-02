class ConveyorbeltQueue {

    conveyorbelt;
    packages;
    latestID;
    
    constructor(conveyorbelt) {
        this.conveyorbelt = conveyorbelt;
        this.latestID = 0;
        this.packages = [];
        this.createConveyorbeltQueue();
        this.autoGeneratePackages();
        this.generatePackageBatch();
    }

    createPackage(chosenShape) {
        let shape
        if (chosenShape) {
            shape = chosenShape;
        }
        else {
            shape = this.getRandomShape();
        }
        this.latestID++;
        let newPackage = new Package(this.latestID, shape, this, this.conveyorbelt);
        this.addPackageToQueue(newPackage);
    }

    addPackageToQueue(newPackage) {
        this.packages.push(newPackage);
        this.reloadQueNumber();
    }

    addPackageToBeginingOfQueue(newPackage) {
        this.packages.unshift(newPackage);
        this.reloadQueNumber();
    }

    getPackageFromQueue() {
        if (this.getQueueLength() != 0){
            let firstPackage = this.packages[0];
            return firstPackage;
        }
    }
    
    removePackageFromQueue() {
        if (this.getQueueLength() != 0){
            this.packages.shift()
            this.reloadQueNumber();
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
        formgroup.className = "forms small-form-group ml-2 mt-2 mb-2 border border-dark rounded";
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

        form.appendChild(formgroup);
    }

    getRandomShape() {
        return Math.floor(Math.random() * 7) + 1;
    }

    autoGeneratePackages(){
        this.start = function() {
            var self = this;
            this.timer = setInterval(function() {
                self.createPackage();
            }, 5000)
        }
        this.start();
    }

    generatePackageBatch() {
        let numberOfGeneratedPackages = 5;
        for(var i = 0; i < numberOfGeneratedPackages; i++){
            this.createPackage(this.getRandomShape());
        }
    }

}