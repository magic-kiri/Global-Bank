import React from "react";
import InputText from "../ui-base-components/InputText";
import InputPassword from "../ui-base-components/InputPassword";
import { BankInfo } from "../../lib/types";

//@ts-ignore
const InputCard = ({
  bankInfo,
  setBankInfo,
}: {
  bankInfo: Partial<BankInfo>;
  setBankInfo: React.Dispatch<React.SetStateAction<Partial<BankInfo>>>;
}) => {
  function handleChange(e: any) {
    const { id, value } = e.target;
    setBankInfo((prev) => {
      return { ...prev, [id]: value };
    });
  }
  return (
    <div>
      <div style={{ marginBottom: "15px" }}>
        <p style={{ marginBottom: "3px", fontSize: "16px" }}>
          {" "}
          অ্যাকাউন্ট নাম্বারটি লিখুন{" "}
        </p>
        <InputText
          id="accountNumber"
          placeholder="অ্যাকাউন্ট নাম্বার"
          value={bankInfo.accountNumber}
          onChange={handleChange}
        ></InputText>
      </div>
      <div>
        <p style={{ marginBottom: "3px", fontSize: "16px" }}>
          {" "}
          গোপন নাম্বারটি লিখুন{" "}
        </p>
        <InputPassword
          id="secretKey"
          placeholder="গোপন নাম্বার"
          value={bankInfo.secretKey}
          onChange={handleChange}
        ></InputPassword>
      </div>
    </div>
  );
};

export default InputCard;
