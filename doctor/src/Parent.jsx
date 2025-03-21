import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import MainContentList from "./components/Maincontentlist";
import MainContentPatient from "./components/Maincontentpatient";
import MClistappointment from "./components/MClistappointment";
import MCappointment from "./components/MCappointment";
import MCcalendar from "./components/MCcalendar";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #e0f7fa;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 20px;
  padding: 20px;
  overflow: hidden;

  & > div {
    display: flex;
    flex-direction: column;
    min-width: 0;
    max-height: 100%;
  }

  & > :first-child {
    flex: 0.5;
  }

  & > :last-child {
    flex: 1.5;
  }
`;

const animationSettings = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
  transition: { duration: 0.5, ease: "easeInOut" },
};

const Parent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedButton, setSelectedButton] = useState("diagnosis");

  return (
    <Wrapper>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
      />
      <ContentContainer>
        <AnimatePresence mode="wait">
          {selectedButton === "diagnosis" && (
            <>
              <motion.div
                key="list"
                {...animationSettings}
                style={{ flex: 0.5, display: "flex", flexDirection: "column" }}
              >
                <MainContentList />
              </motion.div>

              <motion.div
                key="patient"
                {...animationSettings}
                style={{ flex: 1.5, display: "flex", flexDirection: "column" }}
              >
                <MainContentPatient />
              </motion.div>
            </>
          )}

          {selectedButton === "appointments" && (
            <>
              <motion.div
                key="appointmentList"
                {...animationSettings}
                style={{ flex: 0.5, display: "flex", flexDirection: "column" }}
              >
                <MClistappointment />
              </motion.div>

              <motion.div
                key="appointmentForm"
                {...animationSettings}
                style={{ flex: 1.5, display: "flex", flexDirection: "column" }}
              >
                <MCappointment />
              </motion.div>
            </>
          )}

          {selectedButton === "calendar" && (
            <motion.div
              key="calendar"
              {...animationSettings}
              style={{ flex: 1, display: "flex", flexDirection: "column" }}
            >
              <MCcalendar />
            </motion.div>
          )}
        </AnimatePresence>
      </ContentContainer>
    </Wrapper>
  );
};

export default Parent;