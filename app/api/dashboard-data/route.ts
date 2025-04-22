// app/api/dashboard-data/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    weeklyData: [
      { name: "Sat", deposit: 220, withdraw: 450 },
      { name: "Sun", deposit: 110, withdraw: 320 },
      { name: "Mon", deposit: 260, withdraw: 310 },
      { name: "Tue", deposit: 340, withdraw: 430 },
      { name: "Wed", deposit: 240, withdraw: 140 },
      { name: "Thu", deposit: 240, withdraw: 370 },
      { name: "Fri", deposit: 330, withdraw: 370 },
    ],
    expenseData: [
      { name: "15% Bill Expense", value: 15, color: "#F58A40" },
      { name: "30% Entertainment", value: 30, color: "#32416E" },
      { name: "25% Investment", value: 25, color: "#396AFF" },
      { name: "30% Others", value: 30, color: "#212121" },
    ],
    balanceData: [
      { name: "Jul", value: 150 },
      { name: "Aug", value: 300 },
      { name: "Sep", value: 450 },
      { name: "Oct", value: 800 },
      { name: "Nov", value: 200 },
      { name: "Dec", value: 600 },
      { name: "Jan", value: 700 },
    ],
    transactionsData: [
      {
        id: "0",
        title: "Deposit from my Card",
        amount: -85000,
        date: "2021-01-28",
        type: "Withdraw",
        source: "card",
      },
      {
        id: "1",
        title: "Deposit Paypal",
        amount: 250000,
        date: "2021-01-25",
        type: "Deposit",
        source: "paypal",
      },
      {
        id: "2",
        title: "Jemi Wilson",
        amount: 540000,
        date: "2021-01-21",
        type: "Deposit",
        source: "wire transfer",
      },
      {
        id: "3",
        title: "Eric Tom",
        amount: 40000,
        date: "2021-01-18",
        type: "Deposit",
        source: "wire transfer",
      },
    ],
    peopleData: [
      { name: "Livia Bator", title: "CEO", image: "/ceo.png" },
      { name: "Randy Press", title: "Director", image: "/director.png" },
      { name: "Workman", title: "Designer", image: "/designer.png" },
    ],
    cardsData: [
      {
        id: "0",
        balance: 575600,
        cardHolder: "Eddy Cusuma",
        valid: "12/22",
        cardNumber: "3778 **** **** 1234",
        type: "Dark",
      },
      {
        id: "1",
        balance: 575600,
        cardHolder: "Eddy Cusuma",
        valid: "12/22",
        cardNumber: "3778 **** **** 1234",
        type: "Light",
      },
    ],
  };

  return NextResponse.json(data);
}
