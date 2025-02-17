// Linking of slider and the input box for number of years
let time_slider = document.getElementById('time');
let time_output = document.getElementById('outputTime');

time_slider.addEventListener('input',function(e){
    time_output.value = e.target.value;
})
time_output.addEventListener('input',function(e){
    time_slider.value = e.target.value;
})

function calculateInterest(){
    
    // Get the inputs
    let principal = parseFloat(document.getElementById('principal').value);
    let rate = parseFloat(document.getElementById('rate').value);
    let time = parseInt(document.getElementById('outputTime').value);
    
    // Validate the inputs
    // Clear previous errors
    document.getElementById("principalError").innerText = "";
    document.getElementById("timeError").innerText = "";
    document.getElementById("rateError").innerText = "";

    let isValid = true;
    // validation message for principal
    if (isNaN(principal) || principal < 10000 || principal > 10000000) {
        document.getElementById("principalError").innerText = "Please enter a valid amount (Range between 10000-10000000).";
        isValid = false;
    }
    if (isNaN(principal) || principal%100 != 0) {
        document.getElementById("principalError").innerText = "Please enter amount in multiple of 1000.";
        isValid = false;
    }
    // validation message for rate
    if (isNaN(rate) || rate < 1 || rate > 70) {
        document.getElementById("rateError").innerText = "Please enter a valid rate (Range: 1-70).";
        isValid = false;
    }
    // validation message for time
    if (isNaN(time) || time < 1 || time > 50) {
        document.getElementById("timeError").innerText = "Please enter a valid number of years (Range: 1-50 years).";
        isValid = false;
    }
    // returns error message if isValid = False
    if (!isValid) {
        return;
    }

    // Calculate the maturity amount and interest
    rate /= 100;
    
    let totalAmount = principal * Math.pow((1 + rate),time);    

    let lumpsumInterest = totalAmount - principal;

    document.getElementById("displayPrincipal").innerText = Intl.NumberFormat().format(principal.toFixed(2));
    document.getElementById("displayInterest").innerText = Intl.NumberFormat().format(lumpsumInterest.toFixed(2));
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
                    labels: ["Interest", "Lumpsum Amount"], // categories in the chart
                    datasets: [{
                        label: "Amount in ₹",
                        data: [lumpsumInterest, principal], // their values
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
