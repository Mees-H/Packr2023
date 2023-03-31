class Conveyorbelt {

    queue;
    numberOfConveyorbelts;
    conveyorbeltDictionary;
    
    constructor() {
        this.conveyorbeltDictionary = [];
        this.numberOfConveyorbelts = 0;
        this.createConveyorbeltButton();
        
        this.queue = new ConveyorbeltQueue();
        
        let newPackage = new Package(1, 1, 0);
        this.queue.addPackageToQueue(newPackage);
        let newPackage2 = new Package(2, 2, 0);
        this.queue.addPackageToQueue(newPackage2);
        let newPackage3 = new Package(3, 3, 0);
        this.queue.addPackageToQueue(newPackage3);
        let newPackage4 = new Package(4, 4, 0);
        this.queue.addPackageToQueue(newPackage4);
        let newPackage5 = new Package(5, 5, 0);
        this.queue.addPackageToQueue(newPackage5);
        let newPackage6 = new Package(6, 6, 0);
        this.queue.addPackageToQueue(newPackage6);
        let newPackage7 = new Package(7, 7, 0);
        this.queue.addPackageToQueue(newPackage7);
    }

    addConveyorbelt() {
        this.numberOfConveyorbelts +=1;
        let conveyorbelts = document.getElementById("conveyorbelts");
        let conveyorbeltRow = document.createElement("div");
        conveyorbeltRow.id = "conveyorbeltRow"; 


        let tube = document.createElement("img"); 
        tube.id = "tube"+this.numberOfConveyorbelts;
        tube.className = "tube rotateimg180";
        tube.src = "https://static.wikia.nocookie.net/newersupermariobroswii/images/b/bf/Warp_pipe.png/revision/latest?cb=20181227070915";
        
        tube.onclick = () => {
            let newPackage = this.queue.getPackageFromQueue();
            let conveyorbeltNumber = tube.id.replace('tube','');

            if(newPackage){
                this.addPackageOnConveyorbelt(newPackage, conveyorbeltNumber);
            }
        };
        conveyorbeltRow.appendChild(tube);

        let conveyorbelt = document.createElement("img"); 
        conveyorbelt.id = "conveyorbelt"+this.numberOfConveyorbelts;
        conveyorbelt.className = "conveyorbelt";
        conveyorbelt.src = "https://thumbs.gfycat.com/FrailTanHarlequinbug-max-1mb.gif";
        conveyorbeltRow.appendChild(conveyorbelt);

        conveyorbelts.appendChild(conveyorbeltRow);
    }

    createConveyorbeltButton() {
        let form = document.getElementById("conveyerbeltform");

        let button = document.createElement("button");
        button.className = "btn btn-primary ml-2";
        button.textContent = "Create new conveyorbelt";
        button.id = "createnewconveyorbelt";

        button.onclick = () => {
            this.addConveyorbelt();
        };
        form.appendChild(button);
    }

    getHightForPackageOnConveyorbelt(conveyerbeltNumber) {
        let height = 70 + ((conveyerbeltNumber - 1) * 200);
        return height;
    }

    movePackageOnConveyorbelt(movingPackage, from, to) {

    }

    addPackageOnConveyorbelt(thePackage, conveyorbeltNumber) {
        if (!this.conveyorbeltDictionary[conveyorbeltNumber] || this.conveyorbeltDictionary[conveyorbeltNumber].length < 3) {
            this.queue.removePackageFromQueue();
            if (this.conveyorbeltDictionary[conveyorbeltNumber]) {
                //not the first package
                this.conveyorbeltDictionary[conveyorbeltNumber].push(thePackage);
            }
            else {
                //first package
                this.conveyorbeltDictionary[conveyorbeltNumber] = [thePackage];
            }
            this.addAnimationToPackage(thePackage, conveyorbeltNumber);
        }
        else {
            // error message because of full conveyor belt
            console.log("error: conveyor belt is full");
        }
    }

    addAnimationToPackage(thePackage, conveyorbeltNumber) {
        thePackage.drawImage(this.getHightForPackageOnConveyorbelt(conveyorbeltNumber));

        let packagesOnConveyorbelt = this.conveyorbeltDictionary[conveyorbeltNumber].length;
        switch(packagesOnConveyorbelt){
            case 1:
                //animation move to place 3
                document.getElementById("package"+thePackage.id).style.animation = "move-0-3 5.6s linear forwards";
                break;
            case 2:
                //animation move to place 2
                document.getElementById("package"+thePackage.id).style.animation = "move-0-2 4s linear forwards";
                break;
            case 3:
                //animation move to place 1
                document.getElementById("package"+thePackage.id).style.animation = "move-0-1 2.3s linear forwards";
                break;
        }
    }
}