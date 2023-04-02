class Conveyorbelt {

    docks;
    queue;
    numberOfConveyorbelts;
    conveyorbeltDictionary;
    
    constructor(docks) {
        this.docks = docks;
        this.conveyorbeltDictionary = [];
        this.numberOfConveyorbelts = 0;
        this.createConveyorbeltButton();
        
        this.queue = new ConveyorbeltQueue();
    }

    addConveyorbelt(givenDocknumber) {
        this.numberOfConveyorbelts +=1;
        if (givenDocknumber) {
            this.placeInThisDock = givenDocknumber;
        }
        else {
            this.placeInThisDock = this.docks.getDockNumber();
        }
        let conveyorbelts = document.getElementById("conveyorbelts"+this.placeInThisDock);
        let conveyorbeltRow = document.createElement("div");
        conveyorbeltRow.id = "conveyorbeltRow"+this.numberOfConveyorbelts; 
        conveyorbeltRow.className = "conveyorbeltRow";


        let tube = document.createElement("img"); 
        tube.id = "tube"+this.numberOfConveyorbelts;
        tube.className = "tube rotateimg180";
        tube.setAttribute('draggable', false);
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
        conveyorbelt.setAttribute('draggable', false);
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
        let docknumber = this.docks.getDockNumber()
        let conveyorbelts = document.querySelector('#conveyorbelts'+docknumber);
        let activeConveyorbelts = conveyorbelts.getElementsByClassName("conveyorbeltRow");

        let conveyorbeltHeightNumber = 0;
        for (let i = 0; i < activeConveyorbelts.length; i++) {
            let thisConveyorbeltNumber = activeConveyorbelts[i].id.replace('conveyorbeltRow','');
            if (thisConveyorbeltNumber == conveyerbeltNumber) {
                conveyorbeltHeightNumber = i;
                break;
            }
        }
        let height = 70 + ((conveyorbeltHeightNumber) * 200);
        return height;
    }

    deletePackageFromConveyorbelt(deletedPackage) {
        let theDeletedPackage = document.getElementById("package"+deletedPackage.id)
        let rownumber = theDeletedPackage.parentElement.id.replace("conveyorbeltRow", "")
        let packagesInThisConveyorbelt = this.conveyorbeltDictionary[rownumber];
        let packageDeleted = false;
        let deleteThisPackage = -1;
        for (let i = 0; i < packagesInThisConveyorbelt.length; i++) {
            if (packageDeleted) {
                let reverseI = 3 - i;
                let moveFromTo = (reverseI)+"-"+(reverseI+1);
                let packageElement = document.getElementById("package"+packagesInThisConveyorbelt[i].id);
                packageElement.style.animation = "move-"+moveFromTo+" 2s linear forwards";
            }
            else {
                if (deletedPackage.id == packagesInThisConveyorbelt[i].id) {
                    deleteThisPackage = i;
                    packageDeleted = true;
                }
            }
        }
        if (deleteThisPackage > -1) {
            packagesInThisConveyorbelt.splice(deleteThisPackage, 1)
        }
    }

    addPackageOnConveyorbelt(thePackage, conveyorbeltNumber) {
        if (!this.conveyorbeltDictionary[conveyorbeltNumber] || this.conveyorbeltDictionary[conveyorbeltNumber].length < 3) {
            this.queue.removePackageFromQueue();
            if (this.conveyorbeltDictionary[conveyorbeltNumber]) {
                // Not the first package
                this.conveyorbeltDictionary[conveyorbeltNumber].push(thePackage);
            }
            else {
                // First package
                this.conveyorbeltDictionary[conveyorbeltNumber] = [thePackage];
            }
            this.addAnimationToPackage(thePackage, conveyorbeltNumber);
        }
        else {
            console.log("Error: The selected conveyorbelt is full");
        }
    }

    addAnimationToPackage(thePackage, conveyorbeltNumber) {
        thePackage.drawImage(this.getHightForPackageOnConveyorbelt(conveyorbeltNumber), conveyorbeltNumber);

        let packagesOnConveyorbelt = this.conveyorbeltDictionary[conveyorbeltNumber].length;
        switch(packagesOnConveyorbelt){
            case 1:
                document.getElementById("package"+thePackage.id).style.animation = "move-0-3 7s linear forwards";
                break;
            case 2:
                document.getElementById("package"+thePackage.id).style.animation = "move-0-2 4.8s linear forwards";
                break;
            case 3:
                document.getElementById("package"+thePackage.id).style.animation = "move-0-1 2.3s linear forwards";
                break;
        }
    }
}