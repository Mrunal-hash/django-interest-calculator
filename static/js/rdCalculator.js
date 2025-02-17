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
    let principal = parseFloat(document.getElementById('principal').value);
    let rate = parseFloat(document.getElementById('outputRate').value);
    let time = parseInt(document.getElementById('outputTime').value);
    
    // Validate the inputs
    // Clear previous errors
    document.getElementById("principalError").innerText = "";
    document.getElementById("timeError").innerText = "";
    document.getElementById("rateError").innerText = "";

    let isValid = true;
    // validation message for principal
    if (isNaN(principal) || principal < 0 || principal > 20000) {
        document.getElementById("principalError").innerText = "Please enter a valid amount (Range between 0-20000).";
        isValid = false;
    }
    if (isNaN(principal) || principal%100 != 0) {
        document.getElementById("principalError").innerText = "Please enter amount in multiple of 100.";
        isValid = false;
    }
    // validation message for rate
    if (isNaN(rate) || rate < 0 || rate > 20) {
        document.getElementById("rateError").innerText = "Please enter a valid rate.";
        isValid = false;
    }
    // validation message for time
    if (isNaN(time) || time < 1 || time > 30) {
        document.getElementById("timeError").innerText = "Please enter a valid number of years.";
        isValid = false;
    }
    // returns error message if isValid = False
    if (!isValid) {
        return;
    }

    // Calculate the maturity amount and interest
    let investedAmount = principal * time * 12;

    rate /= 400;
    
    let quarters = time * 4;
    
    let A = Math.pow((1+rate), quarters) - 1;
    
    let B = (1 - Math.pow((1 + rate),(-1/3)));
    
    let totalAmount = principal * (A/B);    
    
    let rdInterest = totalAmount - investedAmount;

    document.getElementById("displayPrincipal").innerText = Intl.NumberFormat().format(investedAmount.toFixed(2));
    document.getElementById("displayInterest").innerText = Intl.NumberFormat().format(rdInterest.toFixed(2));
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
                        data: [rdInterest, investedAmount], // their values
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
