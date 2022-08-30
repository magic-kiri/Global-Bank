import React, { useState } from "react";
import { Row, Col } from "antd";
import bodyStyle from "./homeBody.module.css";
import Image from "next/image";
import Logo from "../../public/BankLogo.png";
import InputCard from "./InputCard";
import Button from "../ui-base-components/Button";
import { BankInfo } from "../../lib/types";
import { success, error } from "../ui-base-components/Modal";

function HomeBody() {
  const [bankInfo, setBankInfo] = useState<Partial<BankInfo>>({});

  const checkInputs = () => {
    if (!bankInfo.accountNumber)
      return { status: false, message: "একাউন্ট নম্বরটি সঠিক নয়!" };
    if (!bankInfo.secretKey)
      return { status: false, message: "পাসওার্ডটি সঠিক নয়" };
    return { status: true, message: "Ok" };
  };

  const handleSubmit = async () => {
    const { status, message } = checkInputs();
    if (!status) {
      return error("দুঃখিত!", message);
    }

    const res = await fetch("/api/bankBalance", {
      method: "POST",
      body: JSON.stringify(bankInfo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const body = await res.json();
    //console.log(body);
    if (body.status === true) {
      //alert(body.balance);

      success("দারুণ!", `আপনার বর্তমান ব্যালেন্স ${body.balance}৳`);
    } else {
      console.log(body.message);
      error("দুঃখিত!", body.message);
    }
  };

  return (
    <div className={bodyStyle.homeBody}>
      <Row>
        <Col span={4} offset={10}>
          <Image src={Logo} alt="banklogo" height="120.5vh" width="200vh" />
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={9} className={bodyStyle.inputCard}>
          <InputCard bankInfo={bankInfo} setBankInfo={setBankInfo} />
        </Col>
      </Row>
      <Row>
        <Col span={2} offset={11}>
          <Button onClick={handleSubmit} style={{ marginTop: "15px" }}>
            ব্যালেন্স দেখুন
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default HomeBody;
