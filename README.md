**Interest Calculator**

A django project to calculate various types of interests.

**1. Simple Interest:**

  **A = P (1+rt)**
  
P = Principal Amount
R = Rate of interest
t = Number of years
A = Total accrued amount (Both principal and the interest)
Interest = A – P.


**2. Compound Interest:**

  **A = P (1 + R/N) ^ NT**

A  = Compound Interest
P = Principal Amount
R = Rate of Interest
N = Number of times interest compound in a year
T = Number of years

**3. PPF calculator:**

  **M = P [ ( { (1 + i) ^ n } - 1 ) / i ]**

M = Maturity benefit
P = Annual installments
i = Interest rate
n = Number of years

**4. SIP calculator:**

  **FV = P [ (1+i)^n - 1 ] * (1+i)/i**

FV = Future value or the amount you get at maturity.
P = Amount you invest through SIP
i = Compounded rate of return
n = Investment duration in months

**6. Lumpsum:**

  **FV = PV(1+r)^n**

FV = Future Value
PV = Present Value
r = Rate of interest n = Number of years

**6. RD calculator:**

  **M = R[((1+i)^n) - 1]/(1-(1+i)^(-1/3))**

M = Maturity Value
R = Monthly Installment
n = Number of quarters
I = Rate of interest/400

**7. FD calculator:**

  **A = P * (1+ r/n) ^ n*t**

I = A – P
A = Maturity value
P = Principal amount
r = rate of interest
t = Number of years
n = Compounded interest frequency
I = Interest earned amount

**8. EMI calculator:**

  **EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]**

EMI = Equated Monthly Instalment
P = Loan principal amount
r = Monthly interest rate (annual interest rate divided by 12)
n = Loan tenure in months
