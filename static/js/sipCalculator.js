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
    if (isNaN(principal) || principal < 100 || principal > 1000000) {
        document.getElementById("principalError").innerText = "Please enter a valid amount (Range between 100-100000).";
        isValid = false;
    }
    if (isNaN(principal) || principal%100 != 0) {
        document.getElementById("principalError").innerText = "Please enter amount in multiple of 100.";
        isValid = false;
    }
    // validation message for rate
    if (isNaN(rate) || rate < 0 || rate > 70) {
        document.getElementById("rateError").innerText = "Please enter a valid rate.";
        isValid = false;
    }
    // validation message for time
    if (isNaN(time) || time < 1 || time > 50) {
        document.getElementById("timeError").innerText = "Please enter a valid number of years.";
        isValid = false;
    }
    // returns error message if isValid = False
    if (!isValid) {
        return;
    }

    // Calculate the maturity amount and interest
    rate = rate / 1200;
    time *= 12;

    let investedAmount = principal * time;

    let totalAmount = principal * (((Math.pow((1 + rate), time) - 1)/rate)*(1 + rate));    

    let sipInterest = totalAmount - investedAmount;

    document.getElementById("displayPrincipal").innerText = Intl.NumberFormat().format(investedAmount.toFixed(2));
    document.getElementById("displayInterest").innerText = Intl.NumberFormat().format(sipInterest.toFixed(2));
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
                    labels: ["Interest", "SIP Amount"], // categories in the chart
                    datasets: [{
                        label: "Amount in ₹",
                        data: [sipInterest, investedAmount], // their values
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
