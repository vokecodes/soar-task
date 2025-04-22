"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Edit2 } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { DatePicker } from "../components/DatePicker";
import { ProfileFormValues } from "@/lib/interfaces";

const TABS = ["Edit Profile", "Preferences", "Security"];

export default function Setting() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      profileImage: "/profile.svg",
      name: "",
      username: "",
      email: "",
      password: "",
      dateOfBirth: null,
      presentAddress: "",
      permanentAddress: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Form Data:", data);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setValue("profileImage", imageUrl);
    }
  };

  return (
    <div className="p-4 pb-10 lg:p-10 min-h-screen">
      <div className="bg-white px-4 lg:px-6 pt-3 pb-5 lg:rounded-3xl rounded-2xl overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex justify-between items-center lg:justify-start">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`px-3 py-2 text-sm lg:text-base lg:mr-12 font-medium relative cursor-pointer ${
                  activeTab === tab
                    ? "text-[#232323]"
                    : "text-[#718EBF] hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#232323] rounded-t" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Form Content */}
        <div className="mt-5 lg:p-6">
          {activeTab === TABS[0] && (
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
              {/* Profile Image */}
              <div className="relative flex-shrink-0 flex justify-center sm:block">
                <div className="w-[100px] lg:w-24 h-[100px] lg:h-24">
                  <Image
                    src={getValues("profileImage")}
                    alt="Profile Picture"
                    className="rounded-full"
                    width={100}
                    height={100}
                    priority
                  />
                </div>
                <label
                  htmlFor="profileImageUpload"
                  className="absolute bottom-2 -right-2 bg-[#232323] text-white p-2 rounded-full cursor-pointer"
                >
                  <Edit2 className="h-4 w-4" />
                  <Input
                    id="profileImageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full sm:flex-1"
              >
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="col-span-1">
                    <label
                      htmlFor="name"
                      className="block text-sm text-[#232323]"
                    >
                      Your Name
                    </label>
                    <Input
                      {...register("name", { required: "Name is required" })}
                      placeholder="Charlene Reed"
                      className="mt-1 block w-full border placeholder:text-[#8BA3CB] text-[15px] border-[#DFEAF2] rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="username"
                      className="block text-sm text-[#232323]"
                    >
                      User Name
                    </label>
                    <Input
                      {...register("username", {
                        required: "Username is required",
                      })}
                      placeholder="Charlene Reed"
                      className="mt-1 block w-full border placeholder:text-[#8BA3CB] text-[15px] border-[#DFEAF2] rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.username && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.username.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="email"
                      className="block text-sm text-[#232323]"
                    >
                      Email
                    </label>

                    <Input
                      {...register("email", { required: "Email is required" })}
                      type="email"
                      placeholder="charlenereed@gmail.com"
                      className="mt-1 block w-full border placeholder:text-[#8BA3CB] text-[15px] border-[#DFEAF2] rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="password"
                      className="block text-sm text-[#232323]"
                    >
                      Password
                    </label>

                    <Input
                      {...register("password", {
                        required: "Password is required",
                      })}
                      type="password"
                      placeholder="**********"
                      className="mt-1 block w-full border placeholder:text-[#8BA3CB] text-[15px] border-[#DFEAF2] rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <Controller
                      control={control}
                      name="dateOfBirth"
                      rules={{ required: "Date of Birth is required" }}
                      render={({ field: { onChange, value } }) => (
                        <DatePicker
                          htmlFor="dateOfBirth"
                          label="Date of Birth"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="presentAddress"
                      className="block text-sm text-[#232323]"
                    >
                      Present Address
                    </label>

                    <Input
                      {...register("presentAddress", {
                        required: "Present Address is required",
                      })}
                      placeholder="San Jose, California, USA"
                      className="mt-1 block w-full border placeholder:text-[#8BA3CB] text-[15px] border-[#DFEAF2] rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.presentAddress && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.presentAddress.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="permanentAddress"
                      className="block text-sm text-[#232323]"
                    >
                      Permanent Address
                    </label>
                    <Input
                      {...register("permanentAddress", {
                        required: "Permanent Address is required",
                      })}
                      placeholder="San Jose, California, USA"
                      className="mt-1 block w-full border placeholder:text-[#8BA3CB] text-[15px] border-[#DFEAF2] rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.permanentAddress && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.permanentAddress.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="city"
                      className="block text-sm text-[#232323]"
                    >
                      City
                    </label>
                    <Input
                      {...register("city", { required: "City is required" })}
                      placeholder="San Jose"
                      className="mt-1 block w-full border placeholder:text-[#8BA3CB] text-[15px] border-[#DFEAF2] rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="postalCode"
                      className="block text-sm text-[#232323]"
                    >
                      Postal Code
                    </label>
                    <Input
                      {...register("postalCode", {
                        required: "Postal Code is required",
                      })}
                      type="number"
                      placeholder="4596"
                      className="mt-1 block w-full border placeholder:text-[#8BA3CB] text-[15px] border-[#DFEAF2] rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="country"
                      className="block text-sm text-[#232323]"
                    >
                      Country
                    </label>
                    <Input
                      {...register("country", {
                        required: "Country is required",
                      })}
                      placeholder="USA"
                      className="mt-1 block w-full border placeholder:text-[#8BA3CB] text-[15px] border-[#DFEAF2] rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.country && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex  min-w-[200px] justify-center sm:justify-end">
                  <button
                    type="submit"
                    className="w-full lg:max-w-[160px] inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium cursor-pointer rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
