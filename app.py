from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    nti = 0
    gross = 0
    tax = 0
    if (data != None): 
        gross = calculate_gross(data)
        nti = calculate_nontaxincome(data, gross)
        tax = calculate_tax(gross - nti)
    return {'gross': gross, 'nti': nti, 'tax': tax, 'ti': gross - nti}

def calculate_nontaxincome(salary_breakdowns, gross):
    nti = max(200000, 0.01 * gross) + (0.2 * gross)
    basic = salary_breakdowns['basic']
    transportation = salary_breakdowns['transportation']
    housing = salary_breakdowns['housing']
    nti += 0.08 * (basic + transportation + housing)
    if (salary_breakdowns['nhis']):
        nti += 0.05 * basic;
    if (salary_breakdowns['nhf']):
        nti += 0.025 * basic;
    if (salary_breakdowns['does_voluntary_pension']):
        nti += salary_breakdowns['voluntary_pension']
    return nti

def calculate_gross(salary_breakdowns):
    gross = 0
    for breakdown in salary_breakdowns.values():
        if (isinstance(breakdown, float)):
            gross += breakdown
    return gross

def calculate_tax(taxable_income):
    tax = 0
    if (taxable_income >= 300000):
        taxable_income -= 300000
        tax += 21000
    else:
        tax+= taxable_income * 0.07
        taxable_income-= taxable_income * 0.07
        return tax
    if (taxable_income >= 300000):
        taxable_income -= 300000
        tax += 33000
    else:
        tax+= taxable_income * 0.11
        taxable_income -= taxable_income * 0.11
        return tax
    if (taxable_income >= 500000):
        taxable_income -= 500000
        tax += 75000
    else:
        tax+= taxable_income * 0.15
        taxable_income -= taxable_income * 0.15
        return tax
    if (taxable_income >= 500000):
        taxable_income -= 500000
        tax += 95000
    else:
        tax+= taxable_income * 0.19
        taxable_income -= taxable_income * 0.19
        return tax
    if (taxable_income >= 1600000):
        taxable_income -= 1600000
        tax += 336000
    else:
        tax+= taxable_income * 0.21
        taxable_income -= taxable_income * 0.21
        return tax
    if (taxable_income >= 3200000):
        taxable_income -= 3200000
        tax += 768000
    else:
        tax+= taxable_income * 0.24
        taxable_income -= taxable_income * 0.24
        return tax
