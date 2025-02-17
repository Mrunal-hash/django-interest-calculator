
function calculateInterest(){
    // Get input values
    let principal = parseFloat(document.getElementById('principal').value);
    let rate = parseFloat(document.getElementById('rate').value);
    let time = parseFloat(document.getElementById('time').value);
    let period = parseFloat(document.getElementById('period').value);

    // Validate the inputs
    // Clear previous errors
    document.getElementById("principalError").innerText = "";
    document.getElementById("rateError").innerText = "";
    document.getElementById("timeError").innerText = "";
    document.getElementById("periodError").innerText = "";

    let isValid = true;
    // validation message for principal
    if (isNaN(principal) || principal <= 0) {
        document.getElementById("principalError").innerText = "Please enter a valid principal amount.";
        isValid = false;
    }
    // validation message for rate
    if (isNaN(rate) || rate <= 0) {
        document.getElementById("rateError").innerText = "Please enter a valid interest rate.";
        isValid = false;
    }
    // validation message for time
    if (isNaN(time) || time <= 0) {
        document.getElementById("timeError").innerText = "Please enter a valid number of years.";
        isValid = false;
    }
    // validation message for period
    if (isNaN(period) || period <= 0) {
        document.getElementById("periodError").innerText = "Please select a valid time period.";
        isValid = false;
    }
    // returns error message if isValid = False
    if (!isValid) {
        return;
    }
    // Calculate the simple interest and total amount
    rate /= 100;
    let totalAmount = principal * Math.pow(1 + rate/period, period*time);
    let compoundInterest = totalAmount - principal;

    document.getElementById("displayPrincipal").innerText = Intl.NumberFormat().format(principal.toFixed(2));
    document.getElementById("displayInterest").innerText = Intl.NumberFormat().format(compoundInterest.toFixed(2));
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
                type: 'doughnut', // specie=fies the type of the chart
                data: {
                    labels: ["Compound Interest", "Invested Amount"], // categories in the chart
                    datasets: [{
                        label: "Amount in ₹",
                        data: [compoundInterest, principal], // their values
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