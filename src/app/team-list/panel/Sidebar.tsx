"use client";

import { TeamStatus } from "@/app/teams/@setting/[id]/page";
import useMedia from "@/hook/useMedia";
import useShowTeams from "@/states/useShowTeams";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useState } from "react";

const Sidebar = () => {
  const { isPc } = useMedia();
  const [alignment, setAlignment] = useState(TeamStatus.RECRUITING);
  const { setShowTeams } = useShowTeams();

  const handleChange = (event: any, newAlignment: any) => {
    setAlignment(newAlignment);
  };
  const onClickGather = () => setShowTeams(TeamStatus.RECRUITING);
  const onClickBefore = () => setShowTeams(TeamStatus.BEFORE);
  const onClickProgress = () => setShowTeams(TeamStatus.ONGOING);
  const onClickComplete = () => setShowTeams(TeamStatus.COMPLETE);

  return (
    <>
      {isPc ? (
        <ToggleButtonGroup
          orientation="vertical"
          value={alignment}
          exclusive
          onChange={handleChange}
          sx={{
            border: "1px solid",
            borderRadius: 2,
            alignItems: "center",
            flex: isPc ? 1 : 0,
            height: "fit-content",
          }}
        >
          <ToggleButton
            value={"모집중"}
            onClick={onClickGather}
            sx={{
              width: "100%",
              "&.MuiToggleButtonGroup-grouped": {
                border: "none",
              },
              m: "dense",
            }}
          >
            모집 중
          </ToggleButton>

          <ToggleButton
            value={"시작전"}
            onClick={onClickBefore}
            sx={{
              width: "100%",
              "&.MuiToggleButtonGroup-grouped": {
                border: "none",
              },
              m: "dense",
            }}
          >
            시작 전
          </ToggleButton>

          <ToggleButton
            value={"진행중"}
            onClick={onClickProgress}
            sx={{
              width: "100%",
              "&.MuiToggleButtonGroup-grouped": {
                border: "none",
              },
              m: "dense",
            }}
          >
            진행 중
          </ToggleButton>

          <ToggleButton
            value={"진행완료"}
            onClick={onClickComplete}
            sx={{
              width: "100%",
              "&.MuiToggleButtonGroup-grouped": {
                border: "none",
              },
              m: "dense",
            }}
          >
            진행 완료
          </ToggleButton>
        </ToggleButtonGroup>
      ) : (
        <ToggleButtonGroup
          fullWidth
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton
            value={"모집중"}
            onClick={onClickGather}
            sx={{
              width: "100%",
              "&.MuiToggleButtonGroup-grouped": {
                border: "none",
              },
              m: "dense",
            }}
          >
            모집 중
          </ToggleButton>

          <ToggleButton
            value={"시작전"}
            onClick={onClickBefore}
            sx={{
              width: "100%",
              "&.MuiToggleButtonGroup-grouped": {
                border: "none",
              },
              m: "dense",
            }}
          >
            시작 전
          </ToggleButton>

          <ToggleButton
            value={"진행중"}
            onClick={onClickProgress}
            sx={{
              width: "100%",
              "&.MuiToggleButtonGroup-grouped": {
                border: "none",
              },
              m: "dense",
            }}
          >
            진행 중
          </ToggleButton>

          <ToggleButton
            value={"진행완료"}
            onClick={onClickComplete}
            sx={{
              width: "100%",
              "&.MuiToggleButtonGroup-grouped": {
                border: "none",
              },
              m: "dense",
            }}
          >
            진행 완료
          </ToggleButton>
        </ToggleButtonGroup>
      )}
    </>
  );
};

export default Sidebar;
