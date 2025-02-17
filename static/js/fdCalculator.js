// Linking of slider and the input box for number of years
let time_slider = document.getElementById('time');
let time_output = document.getElementById('outputTime');
let rate_slider = document.getElementById('rate');
let rate_output = document.getElementById('outputRate');

time_slider.addEventListener('input',function(e){
    time_output.value = e.target.value;
})
time_output.addEventListener('input',function(e){
    time_slider.value = e.target.value;
})
rate_slider.addEventListener('input',function(e){
    rate_output.value = e.target.value;
})
rate_output.addEventListener('input',function(e){
    rate_slider.value = e.target.value;
})

function calculateInterest(){
    
    // Get the inputs
    // let period = parseFloat(document.getElementById('period').value);
    let principal = parseFloat(document.getElementById('principal').value);
    let rate = parseFloat(document.getElementById('outputRate').value);
    let time = parseInt(document.getElementById('outputTime').value);

    // Clear previous errors if any
    document.getElementById("principalError").innerText = "";
    document.getElementById("timeError").innerText = "";
    document.getElementById("rateError").innerText = "";

    let isValid = true;
    // validation message for principal
    if (isNaN(principal) || principal < 0) {
        document.getElementById("principalError").innerText = "Please enter a valid principal amount.";
        isValid = false;
    }
    // validation message for rate
    if (isNaN(rate)) {
        document.getElementById("rateError").innerText = "Please enter a valid rate.";
        isValid = false;
    }else if (rate < 4 || rate > 20) {
        document.getElementById("rateError").innerText = "Rate value must be between 4 and 20";
        isValid = false;
    }
        
    // validation message for time
    if (isNaN(time) || time < 6 || time > 120) {
        document.getElementById("timeError").innerText = "Please enter months between 6 and 120.";
        isValid = false;
    }
    // returns error message if isValid = False
    if (!isValid) {
        return;
    }

    // Calculate the maturity amount and interest
    rate /= 100;

    let totalAmount = principal;
    if (time === 1){
        totalAmount = principal+principal*rate*time; 
    }
    else{
        for (let index = 0; index < time; index++) {
            totalAmount = principal + principal*rate*time;
    }   
    }

    let fdInterest = totalAmount - principal;

    document.getElementById("displayPrincipal").innerText = Intl.NumberFormat().format(principal.toFixed(2));
    document.getElementById("displayInterest").innerText = Intl.NumberFormat().format(fdInterest.toFixed(2));
    document.getElementById("displayTotal").innerText = Intl.NumberFormat().format(totalAmount.toFixed(2));

    // Setting up the chart context
    // ctx is the drawing context for the canvas element where the chart will be rendered.
    let ctx = document.getElementById("interestChart").getContext("2d");
            
            // If previous chart exists, destroy to avoid overlap
            if (window.myChart) {
                window.myChart.destroy();
            }
            
            // Creating new pie chart
            window.myChart = new Chart(ctx, {
                type: 'doughnut', // specifies the type of the chart
                data: {
                    labels: ["Interest", "Invested Amount"], // categories in the chart
                    datasets: [{
                        label: "Amount in ₹",
                        data: [fdInterest, principal], // their values
                        backgroundColor: ["#007bff", "#28a745"], // their respective colors
                        circumference: 180,
                        rotation: -90,
                    }]
                },
                options: {
                    responsive: true // makes the chart adjustable to the screen size
                }
            });
}
