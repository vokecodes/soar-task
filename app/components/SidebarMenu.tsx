"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  HomeIcon,
  TransactionIcon,
  AccountIcon,
  InvestmentIcon,
  CreditCardIcon,
  LoanIcon,
  ServiceIcon,
  PrivilegeIcon,
  SettingIcon,
  ActiveSettingIcon,
  ActiveHomeIcon,
} from "@/public/index";

const menuItems = [
  { icon: HomeIcon, activeIcon: ActiveHomeIcon, label: "Dashboard", href: "/" },
  {
    icon: TransactionIcon,
    activeIcon: TransactionIcon,
    label: "Transactions",
    href: "/transactions",
  },
  {
    icon: AccountIcon,
    activeIcon: AccountIcon,
    label: "Accounts",
    href: "/accounts",
  },
  {
    icon: InvestmentIcon,
    activeIcon: InvestmentIcon,
    label: "Investments",
    href: "/investments",
  },
  {
    icon: CreditCardIcon,
    activeIcon: CreditCardIcon,
    label: "Credit Cards",
    href: "/credit-cards",
  },
  { icon: LoanIcon, activeIcon: LoanIcon, label: "Loans", href: "/loans" },
  {
    icon: ServiceIcon,
    activeIcon: ServiceIcon,
    label: "Services",
    href: "/services",
  },
  {
    icon: PrivilegeIcon,
    activeIcon: PrivilegeIcon,
    label: "My Privileges",
    href: "/my-privileges",
  },
  {
    icon: SettingIcon,
    activeIcon: ActiveSettingIcon,
    label: "Setting",
    href: "/setting",
  },
];

export function SidebarMenu() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-white h-full py-8 border-r border-gray-200">
      <div className="px-6 mb-8">
        <Image src="/Logo.svg" alt="Logo" width={167} height={35} />
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <li key={item.label}>
                <Link href={item.href}>
                  <div className="relative flex font-medium items-center px-6 py-3 text-[18px] hover:bg-gray-50 transition-colors">
                    {isActive && (
                      <div className="absolute left-0 top-0 h-full w-1 bg-[#232323] rounded-r-sm" />
                    )}
                    {isActive ? (
                      <Image
                        src={item.activeIcon}
                        alt={`${item.label} icon`}
                        className={cn("mr-[26px] h-6 w-6")}
                      />
                    ) : (
                      <Image
                        src={item.icon}
                        alt={`${item.label} icon`}
                        className={cn("mr-[26px] h-6 w-6")}
                      />
                    )}
                    <span
                      className={cn(
                        "text-lg font-medium font-sans",
                        isActive ? "text-[#232323]" : "text-[#b1b1b1]"
                      )}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
