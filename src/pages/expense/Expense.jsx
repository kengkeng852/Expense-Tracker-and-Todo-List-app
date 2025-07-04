import "./expense.css";
import React, { useState, useEffect } from 'react';

const Expense = () => {
    const [entryList, setEntryList] = useState(JSON.parse(localStorage.getItem('entry_list')) || []);
    const [balance, setBalance] = useState(0);
    const [income, setIncome] = useState(0);
    const [outcome, setOutcome] = useState(0);
    const [incomeTitle, setIncomeTitle] = useState('');
    const [incomeAmount, setIncomeAmount] = useState('');
    const [expenseTitle, setExpenseTitle] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [editId, setEditId] = useState(-99);

    useEffect(() => {
        const storedEntryList = JSON.parse(localStorage.getItem("entry_list"));
        if (storedEntryList) {
            setEntryList(storedEntryList);
        }
    }, []);

    useEffect(() => {
        updateUI();
    }, );

    const updateUI = () => {
        const newIncome = calculateTotal("income", entryList);
        const newOutcome = calculateTotal("expense", entryList);
        const newBalance = calculateBalance(newIncome, newOutcome);

        setIncome(newIncome);
        setOutcome(newOutcome);
        setBalance(newBalance);

        localStorage.setItem("entry_list", JSON.stringify(entryList));
    }

    const calculateTotal = (type, entryLists) => {
        return entryLists.reduce((total, entry) => {
            if (entry.type === type) {
                return total + entry.amount;
            }
            return total;
        }, 0);
    }

    const calculateBalance = (income, expense) => {
        return income - expense;
    }

    const handleIncomeAdd = () => {
        if (!incomeTitle || !incomeAmount) return;

        const updatedIncome = editId >= 0 ?
        entryList.map((entry, index) =>
            index === editId? { title: incomeTitle, amount: parseInt(incomeAmount), type: "income" } : entry
        )
        : [...entryList, { title: incomeTitle, amount: parseInt(incomeAmount), type: "income" }];

        setEntryList(updatedIncome);
        clearInput('income');
        setEditId(-99);
    }

    const handleExpenseAdd = () => {
        if (!expenseTitle || !expenseAmount) return;

        const updatedExpense = editId >= 0 ?
        entryList.map((entry, index) =>
            index === editId? { title: expenseTitle, amount: parseInt(expenseAmount), type: "expense" } : entry
        )
        : [...entryList, { title: expenseTitle, amount: parseInt(expenseAmount), type: "expense" }];

        setEntryList(updatedExpense);
        clearInput('expense');
        setEditId(-99);
    }

    const clearInput = (type) => {
        if (type === 'income') {
            setIncomeTitle('');
            setIncomeAmount('');
        } else if (type === 'expense') {
            setExpenseTitle('');
            setExpenseAmount('');
        }
    }

    const handleDelete = (index) => {
        const newList = [...entryList];
        newList.splice(index, 1);
        setEntryList(newList);
    }

    const handleEdit = (index) => {
        const entry = entryList[index];
        setIncomeTitle(entry.type === 'income' ? entry.title : '');
        setExpenseTitle(entry.type === 'expense' ? entry.title : '');
        setIncomeAmount(entry.type === 'income' ? entry.amount : 0);
        setExpenseAmount(entry.type === 'expense' ? entry.amount : 0);

        setEditId(index);
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
                                    <small>$</small>{income}
                                </div>
                            </div>
                            <div className="outcome">
                                <div className="title">
                                    Expense
                                </div>
                                <div className="outcome-total">
                                    <small>$</small>{outcome}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="budget-dashboard">
                        <div className="dash-title"> Dashboard</div>
                        <div className="toggle">
                            <div className={activeTab === 'income' ? 'tab1 active' : 'tab1'} onClick={() => setActiveTab('income')}>Income</div>
                            <div className={activeTab === 'expense' ? 'tab2 active' : 'tab2'} onClick={() => setActiveTab('expense')}>Expense</div>
                            <div className={activeTab === 'all'? 'tab3 active' : 'tab3'} onClick={() => setActiveTab('all')}>All</div>
                        </div>
                        <div className={activeTab === 'all' ? '' : 'hide'} id="all">
                            <ul className="list">
                                {entryList.map((entry, index) => {
                                         if (entry.type === 'expense') {
                                            return (
                                                <li key={index}>
                                                    <div style={{color:"Red"}} className="entry">{entry.title}: ${entry.amount}</div>
                                                </li>
                                            );
                                        }
                                        else if (entry.type === 'income') {
                                            return (
                                                <li key={index}>
                                                    <div style={{color:"#398825"}} className="entry">{entry.title}: ${entry.amount}</div>
                                                </li>
                                            );
                                        }
                                        return null; // Return null for any other types
                                })}
                            </ul>
                        </div>
                        <div className={activeTab === 'income' ? '' : 'hide'} id="income">
                            <ul className="list">
                            {entryList.map((entry, index) => {
                                            if (entry.type === 'income') {
                                            return (
                                                <li key={index}>
                                                    <div className="entry">{entry.title}: ${entry.amount}</div>
                                                    <div id="edit" onClick={() => handleEdit(index)}></div>
                                                    <div id="delete" onClick={() => handleDelete(index)}></div>
                                                </li>
                                            );
                                        }
                                        return null;
                                })}
                            </ul>
                            <div className="input">
                                <input type="text" id="income-title-input" value={incomeTitle} onChange={(e) => setIncomeTitle(e.target.value)} name ='title' placeholder="Title.." />
                                <input type="number" id="income-amount-input" value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} name = 'amount' placeholder="$0" />
                                <div className="add-income" onClick={handleIncomeAdd}><i className="bi bi-plus-circle-dotted"></i></div>
                            </div>
                        </div>
                        <div className={activeTab === 'expense' ? '' : 'hide'} id="expense">
                            <ul className="list">
                                {entryList.map((entry, index) => {
                                        if (entry.type === 'expense') {
                                            return (
                                                <li key={index}>
                                                    <div className="entry">{entry.title}: ${entry.amount}</div>
                                                    <div id="edit" onClick={() => handleEdit(index)}></div>
                                                    <div id="delete" onClick={() => handleDelete(index)}></div>
                                                </li>
                                            );
                                        }
                                        return null;
                                })}
                            </ul>
                            <div className="input">   
                                <input type="text" id="expense-title-input" value={expenseTitle} onChange={(e) => setExpenseTitle(e.target.value)} name ='title' placeholder="Title.." />
                                <input type="number" id="expense-amount-input" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} name = 'amount' placeholder="$0" />
                                <div className="add-expense" onClick={handleExpenseAdd}><i className="bi bi-plus-circle-dotted"></i></div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Expense;
