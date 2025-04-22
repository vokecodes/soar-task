"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  LabelList,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";
import { ChevronRightIcon, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import CreditCards from "./components/CreditCards";
import moment from "moment";
import { formatAmount } from "@/lib/utils";
import Preloader from "./components/Preloader";
import {
  CreditCardProps,
  IBalanceData,
  IExpense,
  IPerson,
  ITransaction,
  IWeeklyData,
} from "@/lib/interfaces";

type DashboardData = {
  weeklyData: IWeeklyData[];
  expenseData: IExpense[];
  balanceData: IBalanceData[];
  transactionsData: ITransaction[];
  peopleData: IPerson[];
  cardsData: CreditCardProps[];
};

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const getDashboardData = async () => {
    try {
      setIsSending(true);
      const res = await fetch("http://localhost:3000/api/dashboard-data");
      const data = await res.json();
      setDashboardData(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const [selectedPerson, setSelectedPerson] = useState<string | null>();

  const [amount, setAmount] = useState<number>(0);
  const [isSending, setIsSending] = useState(false);

  const handleSendAmount = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
    }, 2000);
  };

  const handleSelect = (name: string) => {
    setSelectedPerson(name === selectedPerson ? null : name);
  };

  const Spinner = () => (
    <svg
      className=""
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 1.75C15.75 0.78125 14.7812 0.78125 14.7812 1.75C14.7812 2.71875 15.75 2.71875 15.75 1.75ZM15.75 15.25C15.75 14.2812 14.7812 14.2812 14.7812 15.25C14.7812 16.2188 15.75 16.2188 15.75 15.25ZM1.75 15.25C1.75 14.2812 0.78125 14.2812 0.78125 15.25C0.78125 16.2188 1.75 16.2188 1.75 15.25ZM1.75 1.75C1.75 0.78125 0.78125 0.78125 0.78125 1.75C0.78125 2.71875 1.75 2.71875 1.75 1.75Z"
        fill="#718EBF"
      />
      <path
        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
        fill="#718EBF"
      />
      <path
        d="M7.5 8C7.5 6.13401 9.13401 4 11.5 4C13.866 4 15.5 6.13401 15.5 8C15.5 9.86599 13.866 11.5 11.5 11.5C9.13401 11.5 7.5 9.86599 7.5 8Z"
        fill="#718EBF"
      />
    </svg>
  );

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="p-4 lg:p-10 min-h-screen">
      {/* Cards and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        {/* My Cards */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[16px] lg:text-[22px] font-semibold text-[#343C6A]">
              My Cards
            </h2>
            <Link
              href={""}
              className="text-[#343C6A] font-semibold text-[17px] hover:text-[#232323] hover:underline"
            >
              See All
            </Link>
          </div>
          {dashboardData && dashboardData.cardsData && (
            <CreditCards cards={dashboardData.cardsData} />
          )}
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <h2 className="text-[16px] lg:text-[22px] font-semibold text-[#343C6A] mb-4">
            Recent Transaction
          </h2>
          <div className="space-y-3 bg-white p-4 rounded-3xl h-full max-h-[240px] overflow-y-auto">
            {dashboardData &&
              dashboardData.transactionsData.length > 0 &&
              dashboardData.transactionsData.map(
                (transaction: ITransaction) => (
                  <div
                    key={transaction.id}
                    className="py-[5px] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={
                          transaction.source === "card"
                            ? "/cc.png"
                            : transaction.source === "paypal"
                            ? "/pp.png"
                            : "/jw.png"
                        }
                        alt="Transaction Source"
                        className="rounded-full"
                        width={55}
                        height={55}
                        priority
                      />
                      <div>
                        <p className="text-sm lg:text-base font-medium text-[#232323]">
                          {transaction.title}
                        </p>
                        <p className="text-[#718EBF] font-normal text-xs lg:text-[15px]">
                          {moment(transaction.date).format("DD MMMM YYYY")}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`font-medium text-xs lg:text-base ${
                        transaction.type === "Withdraw"
                          ? "text-[#FF4B4A]"
                          : "text-[#41D4A8]"
                      }`}
                    >
                      {formatAmount(transaction.amount)}
                    </p>
                  </div>
                )
              )}
          </div>
        </div>
      </div>

      {/* Weekly Activity and Expense Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        {/* Weekly Activity */}
        <div className="lg:col-span-3">
          <h2 className="text-[16px] lg:text-[22px] font-semibold text-[#343C6A] mb-4">
            Weekly Activity
          </h2>
          <div className="bg-white p-3 lg:p-6 rounded-3xl">
            <div className="">
              <div className="flex justify-end mt-4 space-x-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-[#718EBF] font-light text-sm">
                    Deposit
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-black rounded-full mr-2"></div>
                  <span className="text-[#718EBF] font-light text-sm">
                    Withdraw
                  </span>
                </div>
              </div>
              {dashboardData && dashboardData.weeklyData && (
                <div
                  className="w-full"
                  style={{ maxWidth: "100%", height: "300px" }}
                >
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    className="mt-6"
                  >
                    <BarChart
                      data={dashboardData.weeklyData}
                      barGap={window.innerWidth < 768 ? 5 : 12}
                    >
                      <CartesianGrid
                        horizontal={true}
                        vertical={false}
                        stroke="#F3F3F5"
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 14, fill: "#718EBF", dy: 15 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 14, fill: "#718EBF", dx: -15 }}
                      />
                      <Tooltip />
                      <Bar
                        dataKey="withdraw"
                        fill="#232323"
                        radius={[10, 10, 10, 10]}
                        barSize={window.innerWidth < 768 ? 10 : 15}
                      />

                      <Bar
                        dataKey="deposit"
                        fill="#396AFF"
                        radius={[10, 10, 10, 10]}
                        barSize={window.innerWidth < 768 ? 10 : 15}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expense Statistics */}
        <div className="lg:col-span-2">
          <h2 className="text-[16px] lg:text-[22px] font-semibold text-[#343C6A] mb-4">
            Expense Statistics
          </h2>
          {dashboardData && dashboardData.expenseData && (
            <div className="bg-white p-3 lg:p-6 rounded-3xl">
              <div
                className="w-full font-bold text-sm"
                style={{ maxWidth: "100%", height: "360px" }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip />
                    <Pie
                      data={dashboardData.expenseData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={140}
                      paddingAngle={4}
                    >
                      <LabelList
                        dataKey="name"
                        position="insideLeft"
                        className="fill-background"
                        stroke="none"
                        fontSize={10}
                        formatter={(value: unknown) => `${value}`}
                      />
                      {dashboardData.expenseData.map((expense: IExpense) => (
                        <Cell
                          key={`cell-${expense.name}`}
                          fill={expense.color}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Transfer and Balance History */}
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 h-full">
        {/* Quick Transfer */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <h2 className="text-base lg:text-[22px] font-semibold text-[#343C6A] mb-5">
            Quick Transfer
          </h2>
          <div className="bg-white px-[18px] lg:px-[25px] py-[20px] lg:py-[35px] rounded-3xl flex-1 flex flex-col">
            <div className="flex space-x-2 lg:space-x-4 mb-6 items-center">
              {dashboardData &&
                dashboardData.peopleData.length > 0 &&
                dashboardData.peopleData.map((person: IPerson) => (
                  <div
                    key={person.name}
                    className="flex-1 text-center cursor-pointer"
                    onClick={() => handleSelect(person.name)}
                  >
                    <div className="w-12 lg:w-16 h-12 lg:h-16 rounded-full bg-gray-200 mb-2 mx-auto overflow-hidden">
                      <Image
                        src={person.image}
                        alt={person.name}
                        width={70}
                        height={70}
                      />
                    </div>
                    <p
                      className={`text-sm lg:text-base ${
                        selectedPerson === person.name
                          ? "font-bold"
                          : "font-light"
                      } text-[#232323]`}
                    >
                      {person.name}
                    </p>
                    <p
                      className={`text-xs lg:text-[15px] ${
                        selectedPerson === person.name
                          ? "font-bold"
                          : "font-light"
                      } text-[#718EBF]`}
                    >
                      {person.title}
                    </p>
                  </div>
                ))}
              <div className="flex items-center cursor-pointer justify-center bg-white rounded-full w-[40px] lg:w-[50px] h-[40px] lg:h-[50px] shadow-sm">
                <ChevronRightIcon size={24} className="text-[#718EBF]" />
              </div>
            </div>
            <div className="flex gap-2 justify-between items-center mt-auto">
              <p className="text-[#718EBF] font-light text-sm lg:text-base">
                Write Amount
              </p>
              {/* <div className="hidden lg:block flex-1" /> */}
              <div className="bg-[#EDF1F7] flex items-center rounded-full">
                <Input
                  type="number"
                  placeholder="525.50"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="border-none w-[100px] lg:w-[120px]"
                />
                <button
                  className="bg-black text-white px-6 py-2 cursor-pointer rounded-full flex items-center hover:bg-[#718EBF]"
                  onClick={() => handleSendAmount()}
                >
                  {isSending ? (
                    <Spinner />
                  ) : (
                    <>
                      Send <Send size={16} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Balance History */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <h2 className="text-base lg:text-[22px] font-semibold text-[#343C6A] mb-5">
            Balance History
          </h2>
          <div className="bg-white px-[18px] lg:px-[25px] py-[20px] lg:py-[35px] rounded-3xl flex-1 flex flex-col justify-center">
            {dashboardData && dashboardData.balanceData && (
              <div className="h-48 md:h-64 lg:h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={dashboardData.balanceData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorBalance"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#2563EB"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#2563EB"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      vertical={true}
                      horizontal={true}
                      strokeDasharray="3 3"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={true}
                      tick={{
                        fontSize: 12,
                        fill: "#718EBF",
                        fontWeight: 300,
                        dy: 5,
                      }}
                      height={50}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={true}
                      tick={{
                        fontSize: 12,
                        fill: "#718EBF",
                        fontWeight: 300,
                        dx: -5,
                      }}
                      width={40}
                    />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#1814F3"
                      strokeWidth={3}
                      fill="url(#colorBalance)"
                      fillOpacity={0.4}
                      dot={{
                        fill: "#FFFFFF",
                        stroke: "#FFFFFF",
                        strokeWidth: 1,
                        r: 2,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
