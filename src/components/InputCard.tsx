import React from "react";
import InputText from "../ui-base-components/InputText";
import InputPassword from "../ui-base-components/InputPassword";

const InputCard = () => {
  return (
    <div>
      <div style={{marginBottom: "15px"}}>
        <p style={{ marginBottom: "3px", fontSize: "16px" }}> অ্যাকাউন্ট নাম্বারটি লিখুন </p>
        <InputText placeholder="অ্যাকাউন্ট নাম্বার"></InputText>
      </div>
      <div>
        <p style={{ marginBottom: "3px", fontSize: "16px" }}> গোপন নাম্বারটি লিখুন </p>
        <InputPassword placeholder="গোপন নাম্বার"></InputPassword>
      </div>
    </div>
  );
};

export default InputCard;
