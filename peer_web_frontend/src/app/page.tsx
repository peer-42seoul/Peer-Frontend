"use client";
import { ArrowDropDown, ArrowDropUp, Edit } from "@mui/icons-material";
import { Button, ButtonGroup, Container, Fab, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react"
import ProjectCard from "./panel/ProjectCard";
import OptionDetail from "./panel/OptionDetail";
import SelectSort from "./panel/SelectSort";

export type ProjectSort = 'recent' | 'old' | 'popular';
// export type ProjectType = 'study' | 'project';
export default function Home() {
  const [type, setType] = useState<"study" | "project">("study");
  const [openOption, setOpenOption] = useState(false);

  return (
    <Container>
      <ButtonGroup
        variant="contained"
        aria-label="study or project button"
        fullWidth
        sx={{
          justifyContent: 'space-evenly',
          border: 'none',
        }}
      >
        <Button onClick={() => { setType('study') }}>스터디</Button>
        <Button onClick={() => { setType('project') }}>프로젝트</Button>
      </ButtonGroup>
      {/* type에 따라 다른 내용 보여주는 것 처리 필요 */}
      <Grid container p={2}>
        <Grid item xs={8}>
          <Stack justifyContent={"center"}>
            <Typography variant="body2">맞춤 프로젝트를 빠르게 찾아요.</Typography>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack direction="row" alignItems={"center"} justifyContent={"flex-end"}>
            <Typography variant="body2">세부 옵션</Typography>
            <IconButton onClick={() => { setOpenOption(!openOption) }}>
              {openOption ? <ArrowDropDown /> : <ArrowDropUp />}
            </IconButton>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {openOption && <OptionDetail />}
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems={"center"} justifyContent={"flex-end"}>
            <SelectSort />
          </Stack>
        </Grid>
      </Grid>
      <Stack alignItems={"center"}>
        <ProjectCard />
      </Stack>
      <Fab color="secondary" aria-label="edit" sx={{
        position: 'fixed', right: 20,
        bottom: 20,
      }}>
        <Edit />
      </Fab>
    </Container >)
}
