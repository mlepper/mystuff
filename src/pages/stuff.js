import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import ButtonWrapper from "../components/generic/buttonWrapper";
import Button from "../components/generic/button";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";

export default () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main>
        <section>
          <ButtonWrapper>
            <Button
              buttonClasses={["exit-add-stuff"]}
              handleClick={e => {
                e.preventDefault();
                navigate("/stuff/add");
              }}
            >
              {t("stuff.button.add")}
            </Button>
          </ButtonWrapper>
        </section>
      </main>
      <Footer />
    </>
  );
};
