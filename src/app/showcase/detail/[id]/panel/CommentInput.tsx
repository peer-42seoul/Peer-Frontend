import OthersProfile from '@/app/panel/OthersProfile'
import CuAvatar from '@/components/CuAvatar'
import CuButton from '@/components/CuButton'
import CuTextModal from '@/components/CuTextModal'
import { CommentMoreDropdownMenu } from '@/components/board/CommentPanel'
import useComment from '@/hook/useComment'
import useModal from '@/hook/useModal'
import { CommentProps } from '@/types/IComment'
import { Box, Stack, TextField, Typography } from '@mui/material'
import * as style from './CommentContainer.style'

const CommentInput = ({ data, postId }: CommentProps) => {
  const { closeModal, openModal, isOpen } = useModal()
  const {
    isEdit,
    setIsEdit,
    newContent,
    onDeleteComment,
    onEditComment,
    onChangeContent,
  } = useComment({
    data,
    postId,
  })

  return (
    <>
      <Stack sx={style.commentListContainer}>
        <Box sx={style.isEditContainer}>
          <Box sx={style.commenterInfo}>
            <OthersProfile
              userId={data.authorId.toString()}
              name={data.authorNickname}
            >
              <CuAvatar
                key={data.commentId}
                src={data.authorImage ?? undefined}
                sx={style.avatarStyle}
              />
            </OthersProfile>
            <Typography variant="Caption" color={'text.alternative'}>
              {data.authorNickname}
            </Typography>
          </Box>
          {/* 댓글 입력 인풋창 */}
          {isEdit ? (
            <Stack alignItems={'flex-end'}>
              <TextField
                type="text"
                id="content"
                defaultValue={newContent}
                fullWidth
                onChange={(event) => onChangeContent(event)}
                placeholder="댓글을 작성해주세요."
                style={{
                  color: 'text.alternative',
                  width: '100%',
                }}
                inputProps={{ maxLength: 150, style: { padding: '1rem' } }}
              />
              <Stack direction={'row'} spacing={1} style={{ marginTop: '8px' }}>
                <CuButton
                  message={'취소'}
                  action={() => setIsEdit(false)}
                  variant={'outlined'}
                />
                <CuButton
                  action={() => onEditComment(data.commentId)}
                  message={'수정'}
                  type={'submit'}
                  variant={'contained'}
                />
              </Stack>
            </Stack>
          ) : (
            <>
              <Typography variant="Body2" color={'text.normal'}>
                {data.content}
              </Typography>
              <Typography variant="Tag" color={'text.assistive'}>
                {data.createAt
                  .split('T')[0]
                  .replace(/-/g, '월 ')
                  .replace('월 ', '년 ') + '일'}
              </Typography>
            </>
          )}
        </Box>
        {!isEdit && data.isAuthor && (
          <Box sx={style.iconContainer}>
            <CommentMoreDropdownMenu
              handleDelete={() => openModal()}
              setEditMode={() => setIsEdit(true)}
            />
          </Box>
        )}
        <CuTextModal
          open={isOpen}
          onClose={closeModal}
          title={'댓글을 삭제할까요?'}
          content={'댓글을 삭제하면 복구할 수 없어요.'}
          containedButton={{
            text: '삭제',
            onClick: onDeleteComment,
          }}
          textButton={{
            text: '취소',
            onClick: closeModal,
          }}
        />
      </Stack>
    </>
  )
}

export default CommentInput
