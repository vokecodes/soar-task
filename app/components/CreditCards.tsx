import React from "react";
import Image from "next/image";
import { formatAmount } from "@/lib/utils";

type ICard = {
  id: string;
  balance: number;
  cardHolder: string;
  valid: string;
  cardNumber: string;
  type: string;
};

export default function CreditCards({ cards }: { cards: ICard[] }) {
  return (
    <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
      {cards.length > 0 &&
        cards.map((card) => (
          <div
            key={card.id}
            className={`min-w-[300px] lg:w-1/2  h-[235px] rounded-3xl p-6 flex flex-col justify-between shadow-lg ${
              card.type === "Dark"
                ? "bg-gradient-to-br from-[#5B5A6F] to-black"
                : "bg-white shadow-[#DFEAF2] shadow-sm"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p
                  className={`text-xs font-lato font-light ${
                    card.type === "Dark" ? "text-white" : "text-[#718EBF]"
                  }`}
                >
                  Balance
                </p>
                <p
                  className={`text-xl font-lato font-semibold ${
                    card.type === "Dark" ? "text-white" : "text-[#343C6A]"
                  }`}
                >
                  {formatAmount(card.balance)}
                </p>
              </div>
              <div className="w-10 h-10">
                <Image
                  src={card.type === "Dark" ? "/ChipL.png" : "/ChipD.png"}
                  alt="CEO"
                  width={70}
                  height={70}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-10 lg:gap-15 items-center">
                <div>
                  <p
                    className={`opacity-70 text-xs font-lato ${
                      card.type === "Dark" ? "text-white" : "text-[#718EBF]"
                    }`}
                  >
                    CARD HOLDER
                  </p>
                  <p
                    className={`text-[15px] font-semibold font-lato ${
                      card.type === "Dark" ? "text-white" : "text-[#343C6A]"
                    }`}
                  >
                    {card.cardHolder}
                  </p>
                </div>
                <div>
                  <p
                    className={`opacity-70 text-xs font-lato ${
                      card.type === "Dark" ? "text-white" : "text-[#718EBF]"
                    }`}
                  >
                    VALID THRU
                  </p>
                  <p
                    className={`text-[15px] font-semibold font-lato ${
                      card.type === "Dark" ? "text-white" : "text-[#343C6A]"
                    }`}
                  >
                    {card.valid}
                  </p>
                </div>
              </div>

              <div
                className={`flex justify-between items-center -mx-6 pt-4 px-6 ${
                  card.type === "Dark"
                    ? "bg-gradient-to-br from-[#5B5A6F] to-black"
                    : "border-t border-[#DFEAF2]"
                }`}
              >
                <p
                  className={`text-xl font-lato tracking-wider ${
                    card.type === "Dark" ? "text-white" : "text-[#343C6A]"
                  }`}
                >
                  {card.cardNumber}
                </p>
                <div className="flex space-x-1 opacity-70">
                  <div
                    className={`w-8 h-8 rounded-full opacity-50 ${
                      card.type === "Dark" ? "bg-white" : "bg-[#9199AF]"
                    }`}
                  />
                  <div
                    className={`w-8 h-8 rounded-full opacity-50 -ml-5 ${
                      card.type === "Dark" ? "bg-white" : "bg-[#9199AF]"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
