// Linking of slider and the input box for number of years
let slider = document.getElementById('time');
let output = document.getElementById('outputTime');

slider.addEventListener('input',function(e){
    output.value = e.target.value;
})
output.addEventListener('input',function(e){
    slider.value = e.target.value;
})

function calculateInterest(){
    
    // Get the inputs
    let period = parseFloat(document.getElementById('period').value);
    let principal = parseFloat(document.getElementById('principal').value);
    let rate = parseFloat(document.getElementById('rate').value);
    let time = parseInt(document.getElementById('outputTime').value);

    // Validate the inputs
    // Clear previous errors
    document.getElementById("principalError").innerText = "";
    document.getElementById("timeError").innerText = "";

    let isValid = true;
    // validation message for principal
        if (period == 12 && (principal < 1000 || principal > 10000)) {
            document.getElementById("principalError").innerText = "Please enter principal amount between 1000-10000 for monthly installment.";
            isValid = false;
        }else if (period == 4 && (principal < 1000 || principal > 20000)) {
            document.getElementById("principalError").innerText = "Please enter principal amount between 1000-20000 for quarterly installment.";
            isValid = false;
        } else if (period == 2 && (principal < 1000 || principal > 50000)) {
            document.getElementById("principalError").innerText = "Please enter principal amount between 1000-50000 for semi-annual installment.";
            isValid = false;
        } else if(period == 1 && (principal < 10000 || principal > 150000)){
            document.getElementById("principalError").innerText = "Please enter principal amount between 10000-150000 for yearly installment.";
            isValid = false;
        }else if (isNaN(principal)) {
            document.getElementById("principalError").innerText = "Please enter a valid principal amount.";
            isValid = false;
        }
    // validation message for time
    if (isNaN(time) || time < 15 || time > 50) {
        document.getElementById("timeError").innerText = "Please enter a valid number of years.";
        isValid = false;
    }
    // returns error message if isValid = False
    if (!isValid) {
        return;
    }

    // Calculate the maturity amount and interest
    rate /= 100;

    
    let investedAmount = principal * period * time;
    
    let totalAmount = 0
    
    for (let index = 0; index < time; index++) {
        totalAmount = (totalAmount + principal*period)*(1 + rate);
    }
    
    let ppfInterest = totalAmount - investedAmount;

    document.getElementById("displayPrincipal").innerText = Intl.NumberFormat().format(investedAmount.toFixed(2));
    document.getElementById("displayInterest").innerText = Intl.NumberFormat().format(ppfInterest.toFixed(2));
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
                        data: [ppfInterest, investedAmount], // their values
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
