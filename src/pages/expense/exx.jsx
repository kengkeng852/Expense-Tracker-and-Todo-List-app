import "./expense.css";
import React, { useState, useEffect } from 'react';

const Expense = () => {
    const [entryList, setEntryList] = useState(JSON.parse(localStorage.getItem('entry_list')) || []);
    const [balance, setBalance] = useState(0);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [activeTab, setActiveTab] = useState();
    const [isIncomeOpen, setIsIncomeOpen] = useState(false); 
    const [isExpenseOpen, setIsExpenseOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    const incomeList = document.querySelector("#income .list");
    const expenseList = document.querySelector("#expense .list"); 

    useEffect(() => { //run at initial state to check if there are any list in localStorage if yes take it
        const storedList = JSON.parse(localStorage.getItem('entry_list'));
        if (storedList) {
            setEntryList(storedList);
        }
    }, []);

    useEffect(() => { //run every time when entryList is updated
        updateUI();
    }, [entryList])

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if(tab === 'income') {
            setIsIncomeOpen(true);
            setIsExpenseOpen(false);
        }
        else { //if tab is expense
            setIsIncomeOpen(false);
            setIsExpenseOpen(true);
        }
    }

    const handleIncomeSubmit = (event) => {
        event.preventDefault();
        const title = event.target.elements.title.value;
        const amount = parseInt(event.target.elements.amount.value, 10); 

        if (!title || !amount) return;

        const newEntry = { type: 'income', title, amount };

        if (editId !== null) {
            setEntryList(entryList.map((entry, index) => index === editId ? newEntry : entry));
            setEditId(null); 
        } else {
            setEntryList([...entryList, newEntry]);
        }

        event.target.elements.title.value = '';
        event.target.elements.amount.value = '';
    };

    const handleExpenseSubmit = (event) => {
        event.preventDefault();
        const title = event.target.elements.title.value;
        const amount = parseInt(event.target.elements.amount.value, 10); 

        if (!title || !amount) return;

        const newEntry = { type: 'expense', title, amount };

        if (editId !== null) {
            setEntryList(entryList.map((entry, index) => index === editId ? newEntry : entry));
            setEditId(null); 
        } else {
            setEntryList([...entryList, newEntry]);
        }

        event.target.elements.title.value = '';
        event.target.elements.amount.value = '';
    };

    const deleteEntry = (index) => {
        setEntryList(entryList.filter((entry, i) => i !== index));
    }

    const editEntry = (index) => {
        const entry = entryList[index];
        setEditId(index);

        if (entry.type === 'income') {
            const incomeTitleInput = document.getElementById('income-title-input');
            const incomeAmountInput = document.getElementById('income-amount-input');
            incomeTitleInput.value = entry.title;
            incomeAmountInput.value = entry.amount;
    
        } else if (entry.type === 'expense') {
            const expenseTitleInput = document.getElementById('expense-title-input');
            const expenseAmountInput = document.getElementById('expense-amount-input');
            expenseTitleInput.value = entry.title;
            expenseAmountInput.value = entry.amount;
        }
    };
     
    const updateUI = () => {
        const income = calculateTotal('income', entryList);
        const expense = calculateTotal('expense', entryList);
        const balance = calculateBalance(income, expense);

        setBalance(balance);
        setIncome(income);
        setExpense(expense);

        clearElement([expenseList, incomeList]);

        entryList.forEach((entry, index) => {
            if(entry.type === 'income') {
                showEntry(incomeList, entry.type, entry.title, entry.amount, index)
            }
            else if (entry.) {
                showEntry(expenseList, entry.type, entry.title, entry.amount, index)
            }
        });
    }

    const showEntry = (list, type, title, amount, id) => {
        const entry = `
            <li id="${id}" class="${type}">
                <div class="entry">${title}: $${amount}</div>
                <div id="edit" onClick={() => editEntry(${id})}></div>
                <div id="delete" onClick={() => deleteEntry(${id})}></div>
            </li> `;

        const position = "afterbegin";

        list.insertAdjacentHTML(position, entry);
    };

    const clearElement = (elements) => {
        elements.forEach(element => {
            if (element) { 
                element.innerHTML = '';
            }
        });
    };

    const calculateTotal = (type, list) => {
        let sum = 0;
        list.forEach(entry => {
            if (entry.type === type) {
                sum += entry.amount;
            }
        });
        return sum;
    };

    const calculateBalance = (income, outcome) => {
        return Math.abs(income - outcome);
    };

    return (
        <body>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            <div className="container">
                <div className="tracker-box"> 
                    <div className="budget-header">
                        <div className="balance">
                            <div className="title">
                                Balance
                            </div>
                            <div className="value">
                                <small>฿</small>{balance}
                            </div>
                        </div>
                        <div className="account">
                            <div className="income">
                                <div className="title">
                                    Income
                                </div>
                                <div className="income-total">
                                    <small>฿</small>{income} 
                                </div>
                            </div>
                            <div className="outcome">
                                <div className="title">
                                    Expense
                                </div>
                                <div className="outcome-total">
                                    <small>฿</small>{expense}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="budget-dashboard">
                        <div className="dash-title"> Dashboard</div>
                        <div className="toggle">
                            <div className={`tab1 ${activeTab === 'income' ? 'active' : ''}`} onClick={() => handleTabClick('income')}>Income</div>
                            <div className={`tab2 ${activeTab === 'expense' ? 'active' : ''}`} onClick={() => handleTabClick('expense')}>Expense</div>
                        </div>
                        {isIncomeOpen && ( 
                            <div id="income">
                                <ul className="list"></ul>
                                <form className="input" onSubmit={handleIncomeSubmit}>
                                    <input type="text" id="income-title-input" name="title" placeholder="Title.." />
                                    <input type="number" id="income-amount-input" name="amount" placeholder="$0" />
                                    <button type="submit">
                                        <i className="bi bi-plus-circle-dotted"></i>
                                    </button> 
                                </form>
                            </div> )
                        }
                        {isExpenseOpen && (
                            <div id="expense">
                                <ul className="list"></ul>
                                <form className="input" onSubmit={handleExpenseSubmit}>
                                    <input type="text" id="expense-title-input" name="title" placeholder="Title.." />
                                    <input type="number" id="expense-amount-input" name="amount" placeholder="$0" />
                                    <button type="submit">
                                        <i className="bi bi-plus-circle-dotted"></i>
                                    </button> 
                                </form>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Expense;