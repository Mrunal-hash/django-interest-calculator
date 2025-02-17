
function calculateInterest(){
    // Get input values
    let principal = parseFloat(document.getElementById('principal').value);
    let rate = parseFloat(document.getElementById('rate').value);
    let time = parseFloat(document.getElementById('time').value);

    // Validate the inputs
    // Clear previous errors
    document.getElementById("principalError").innerText = "";
    document.getElementById("rateError").innerText = "";
    document.getElementById("timeError").innerText = "";

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
        document.getElementById("timeError").innerText = "Please enter a valid time period.";
        isValid = false;
    }
    // returns error message if isValid = False
    if (!isValid) {
        return;
    }
    // Calculate the simple interest and total amount
    let simpleInterest = (principal * rate * time)/100;
    let totalAmount = simpleInterest + principal;

    document.getElementById("displayPrincipal").innerText = Intl.NumberFormat().format(principal.toFixed(2));
    document.getElementById("displayInterest").innerText = Intl.NumberFormat().format(simpleInterest.toFixed(2));
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
                    labels: ["Simple Interest", "Principal"], // categories in the chart
                    datasets: [{
                        label: "Amount in ₹",
                        data: [simpleInterest, principal], // their values
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