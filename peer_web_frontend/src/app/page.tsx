"use client";
import { ArrowDropDown, ArrowDropUp, Edit } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Container, Fab, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react"
import ProjectCard from "./panel/ProjectCard";
import OptionDetail from "./panel/OptionDetail";
import SelectSort from "./panel/SelectSort";
import { IProject } from "@/types/IProejct";

export type ProjectSort = 'recent' | 'old' | 'popular';

//더미데이터 (임시. 다음에 jsonserver 만들예정)
const dummyData: IProject[] = [
  {
    id: '1',
    nickname: 'Project A',
    imageUrl: 'https://picsum.photos/200/300',
    profileImgUrl: 'https://picsum.photos/100/100',
    description: 'This is Project A description.',
    tags: ['Framework A', 'Language 1', 'Language 2'],
    isFavorite: false,
    inProgress: true,
  },
  {
    id: '2',
    nickname: 'Project B',
    imageUrl: 'https://picsum.photos/200/300',
    profileImgUrl: 'https://picsum.photos/100/100',
    description: 'This is Project B description.',
    tags: ['Framework B', 'Language 2', 'Language 3'],
    isFavorite: true,
    inProgress: true,
  },
  {
    id: '3',
    nickname: 'Project C',
    imageUrl: 'https://picsum.photos/200/300',
    profileImgUrl: 'https://picsum.photos/100/100',
    description: 'This is Project C description.',
    tags: ['Framework C', 'Language 3', 'Language 4'],
    isFavorite: false,
    inProgress: false,
  },
  {
    id: '4',
    nickname: 'Project D',
    imageUrl: 'https://picsum.photos/200/300',
    profileImgUrl: 'https://picsum.photos/100/100',
    description: 'This is Project D description.This is Project D description.This is Project D description.This is Project D description.This is Project D description.This is Project D description.This is Project D description.',
    tags: [],
    isFavorite: false,
    inProgress: false,
  },
];

// export type ProjectType = 'study' | 'project';
export default function Home() {
  const [type, setType] = useState<"study" | "project">("study");
  const [openOption, setOpenOption] = useState(false);
  const [sort, setSort] = useState<ProjectSort>('recent');

  /* sort가 변할때마다 다시 get해오기 */
  /* 지울 예정 */
  console.log("type", type);
  return (
    <Container sx={{ backgroundColor: "gray" }}>
      <Box sx={{ backgroundColor: "white" }}>
        <ButtonGroup
          variant="contained"
          aria-label="study or project button"
          fullWidth
          sx={{
            justifyContent: 'space-evenly',
            border: 'none',
          }}
        >
          {/* type에 따라 다른 내용 보여주는 것 처리 필요. get해올때 처리될듯*/}
          <Button onClick={() => { setType('study') }}>스터디</Button>
          <Button onClick={() => { setType('project') }}>프로젝트</Button>
        </ButtonGroup>
        <Grid container p={2}>
          <Grid item xs={8}>
            <Stack justifyContent={"center"}>
              <Typography variant="body2">맞춤 프로젝트를 빠르게 찾아요.</Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row" alignItems={"center"} justifyContent={"flex-end"} onClick={() => { setOpenOption(!openOption) }}>
              <Typography variant="body2">세부 옵션</Typography>
              <IconButton>
                {openOption ? <ArrowDropDown /> : <ArrowDropUp />}
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            {openOption && <OptionDetail />}
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" alignItems={"center"} justifyContent={"flex-end"}>
              <SelectSort sort={sort} setSort={setSort} />
            </Stack>
          </Grid>
        </Grid>
        <Stack alignItems={"center"} gap={2}>
          {
            dummyData?.map((project) => <Box key={project.id}><ProjectCard {...project} /></Box>)
          }
        </Stack>
        <Fab color="secondary" aria-label="edit" sx={{
          position: 'fixed', right: 20,
          bottom: 80,
        }}>
          {/* <Link href={"글쓰기 페이지로"}>*/}
          <Edit />
          {/* </Link> */}
        </Fab>
      </Box>
    </Container >)
}
