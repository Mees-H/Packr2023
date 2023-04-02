class Weather {
    location;
    temperature;
    conditionText;
    windspeed;

    constructor(location) {
        this.location = location;
        this.getWeatherFromApi();
        this.createChangeWeatherForm();
    }
    
    createChangeWeatherForm() {
        let formgroup = document.createElement("div");
        formgroup.className = "forms small-form-group ml-2 mt-2 mb-2 border border-dark rounded";
        formgroup.id = "size";

        let label = document.createElement("label");
        label.textContent = "Change Location:";

        let input = document.createElement("input");
        input.setAttribute("type", "newWeather");
        input.className = "form-control";
        input.id = "newWeather";
        input.setAttribute("placeholder", "New Location")

        let button = document.createElement("button");
        button.className = "btn btn-primary mt-2 ml";
        button.textContent = "Change location";
        button.id = "changeLocation";

        button.onclick = () => {
            this.changeWeatherLocation(input.value);
        };

        formgroup.appendChild(label);
        formgroup.appendChild(input);
        formgroup.appendChild(button);

        document.getElementById("weather-form").appendChild(formgroup);
    }

    changeWeatherLocation(location) {
        let form = document.getElementById("weather");
        form.innerHTML = "";
        this.location = location;
        this.getWeatherFromApi();
    }

    async getWeatherFromApi() {
        try {
            await fetch("http://api.weatherapi.com/v1/current.json?key=8a52679ad6f243a98e2144608230104&q="+this.location+"&aqi=no")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.setCurrentWeather(data.location.name, data.current.temp_c, data.current.condition.text, data.current.wind_kph);
                });
        }
        catch (error) {
            console.log(error);
        }
    }

    setCurrentWeather(location, temperature, conditionText, windspeed) {
        this.temperature = temperature;
        this.conditionText = conditionText;
        this.windspeed = windspeed;

        let form = document.getElementById("weather");

        let formgroup = document.createElement("div");
        formgroup.className = "forms small-form-group ml-2 mt-2 mb-2 border border-dark rounded";
        formgroup.id = "size";

        let title = document.createElement("h5");
        title.textContent = "Current Weather:";
        title.className = "centeralign"
        title.id = "weatherTitle";
        formgroup.appendChild(title);

        let button = document.createElement("h6");
        button.textContent = "The weather condition in "+location+" is "+conditionText+" with a temperature of "+temperature+"C and a windspeed of "+windspeed+"KPH.";
        button.className = "centeralign"
        button.id = "weatherNumber";
        formgroup.appendChild(button);

        form.appendChild(formgroup);
        
        this.refreshAllCanCarDrive();
    }

    refreshAllCanCarDrive() {
        let canDriveArray = document.getElementsByClassName("can-truck-drive");
        for (let i = 0; i < canDriveArray.length; i++) {
            if (canDriveArray[i].className.includes("type-Fragile")) {
                if (this.conditionText.includes("rain") || this.conditionText.includes("drizzle")){
                    canDriveArray[i].textContent = "Cant drive because of the rain.";
                }
                else {
                    canDriveArray[i].textContent = "This truck can drive.";
                }
            }
            if (canDriveArray[i].className.includes("type-Cold")) {
                if (this.temperature > 35){
                    canDriveArray[i].textContent = "Its too warm to drive.";
                }
                else {
                    canDriveArray[i].textContent = "This truck can drive.";
                }
            }
            if (canDriveArray[i].className.includes("type-Pallets")) {
                if (this.windspeed > 20){
                    canDriveArray[i].textContent = "Its too windy to drive.";
                }
                else {
                    canDriveArray[i].textContent = "This truck can drive.";
                }
            }
        }
    }
}