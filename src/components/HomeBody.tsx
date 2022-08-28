import React from "react";
import { Row, Col } from "antd";
import bodyStyle from "./homeBody.module.css";
import Image from "next/image";
import Logo from "../../public/BankLogo.png";
import InputCard from "./InputCard";
import Button from "../ui-base-components/Button";

function HomeBody() {
  return (
    <div className={bodyStyle.homeBody}>
      <Row>
        <Col span={4} offset={10}>
          <Image src={Logo} alt="banklogo" height="120.5vh" width="200vh" />
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={9} className={bodyStyle.inputCard}>
          <InputCard/>
        </Col>
      </Row>
      <Row>
        <Col span={2} offset={11}>
          <Button style={{marginTop: "15px"}}>
            ব্যালেন্স দেখুন
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default HomeBody;
